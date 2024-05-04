import './scss/styles.scss';
import { CatalogModel } from './components/CatalogModel';
import { BasketModel } from './components/BasketModel';
import { EventEmitter } from './components/base/events';
import { Api } from './components/base/api';
import { AppApi } from './components/AppApi';
import { API_URL, settings } from './utils/constants';
import { Card } from './components/Card';
import { ensureElement } from './utils/utils';
import { Modal } from './components/common/Modal';
import { CardModal } from './components/CardModal';
import { ProdItem } from './types';
import { Basket } from './components/Basket';
import { Page } from './components/Page';
import { PaymentDelivery } from './components/DeliveryForm';
import { ContactForm } from './components/ContactForm';
import { Sucsess } from './components/SucsessForm';

// Темплеты
const catalogCardTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const previewCardTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const modal = ensureElement<HTMLDivElement>('#modal-container');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');

// DOM элементы
const sectionToCards = document.querySelector('.gallery');

// Экземляры классов
const eventEmitter = new EventEmitter();
const catalogModel = new CatalogModel();

const baseApi = new Api(API_URL, settings);
const appApi = new AppApi(baseApi);

const cardModal = new CardModal(modal, {
	handleModalClose: () => eventEmitter.emit('Modal:close'),
});

const basketModel: BasketModel = new BasketModel({
	handleUpdateBasket: () =>
		eventEmitter.emit('Basket:update', basketModel.basketItemList),
});

const basket = new Basket(basketTemplate, basketModel, {
	handleOpenDeliveryForm: () => eventEmitter.emit('PaymentDelivery:open'),
});

const page = new Page({
	handleBasketOpen: () => {
		eventEmitter.emit('Basket:open');
	},
});

const deliveryForm = new PaymentDelivery(orderTemplate, {
	handleNext: () => eventEmitter.emit('Contact:open'),
	handleButtonCard: () => eventEmitter.emit('ButtonOnline:active'),
	handleButtonCash: () => eventEmitter.emit('ButtonCash:active'),
	handleToggleButton: () => eventEmitter.emit('adressInput:tiping'),
});

const contactForm = new ContactForm(contactsTemplate, {
	handleSuccessOpen: (evt: SubmitEvent) =>
		eventEmitter.emit('sucsess:open', evt),
	handleToggleButtonActivity: () => eventEmitter.emit('ContactInput:tiping'),
});

const sucsess = new Sucsess(successTemplate, {
	handleSuccessClose: () => eventEmitter.emit('sucsess:close'),
});

// Получем каталог товаров с сервера, сохраняем его и отображаем на странице
appApi
	.getCardList()
	.then((data) => {
		catalogModel.addToCatalog(data.items);
		catalogModel.catalogItemList.map((card) => {
			const newCard = new Card(catalogCardTemplate, {
				handleCardOpen: () => eventEmitter.emit('Card:open', card),
			});
			sectionToCards.append(newCard.renderCard(card));
		});
	})
	.catch((error) => {
		console.log(`Произошла ошибка: ${error}`);
	});

// Открытие выбранной карточки
eventEmitter.on<ProdItem>('Card:open', (card) => {
	const previewCard = new Card(previewCardTemplate);
	const renderedCard = previewCard.renderCard(card);
	cardModal.setButton(previewCard.addToBasketButton, {
		handleAddItemToBasket: () => eventEmitter.emit('Basket:addItem', card),
	});
	page.unscrolPage();
	cardModal.open(renderedCard);
});

//Закрытие модального окна
eventEmitter.on('Modal:close', () => {
	cardModal.close();
	page.scrolPage();
});

//добавление карточки в корзину
eventEmitter.on<ProdItem>('Basket:addItem', (card) => {
	basketModel.addItem(card);
	basket.updateBasket();
	page.updateBasketCounter(basketModel.getBasketItemsLength());
	cardModal.close();
	page.scrolPage();
});

//удаление карточки  из корзины
eventEmitter.on<ProdItem>('Card:delete', (item) => {
	basketModel.deleteItem(item);
	basket.updateBasket();
	page.updateBasketCounter(basketModel.getBasketItemsLength());
});

//Открытие корзины
eventEmitter.on('Basket:open', () => {
	cardModal.open(basket.basket);
	basket.updateBasket();
	page.unscrolPage();
});

//обновление товаров в корзине
eventEmitter.on<ProdItem[]>('Basket:update', (basketItems) => {
	basket.cardsBasket = basketItems.map((item: ProdItem) => {
		const basketCard = new Card(cardBasketTemplate, undefined, {
			handleCardDelete: () => eventEmitter.emit('Card:delete', item),
		});
		return basketCard.renderCard(item, basketModel.getBasketItemIndex(item));
	});
});

//открытие формы выбора олаты и введения адресса
eventEmitter.on('PaymentDelivery:open', () => {
	basketModel.order.total = basket.calcPrice();
	cardModal.open(deliveryForm.paymentDeliveryFormContent);
	page.unscrolPage();
	deliveryForm.toggleActiveButton();
});

//выбор онлайн оплаты
eventEmitter.on('ButtonOnline:active', () => {
	deliveryForm.toggleButtonCardActivity();
	deliveryForm.toggleActiveButton();
});

//выбор оплаты наличными
eventEmitter.on('ButtonCash:active', () => {
	deliveryForm.toggleButtonCashActivity();
	deliveryForm.toggleActiveButton();
});

//активация кнопки перехода к форме контактов
eventEmitter.on('adressInput:tiping', () => {
	deliveryForm.toggleActiveButton();
});

//открытие формы контактов
eventEmitter.on('Contact:open', () => {
	basketModel.order.address = deliveryForm.getAddressInputValue();
	basketModel.order.payment = deliveryForm.getButtonTextContent();
	deliveryForm.clearDeliveryForm();
	cardModal.open(contactForm.contactFormContent);
	page.unscrolPage();
});

//активация кнопки перехода к конечной форме
eventEmitter.on('ContactInput:tiping', () => {
	contactForm.toggleActiveButton();
});

//открытие формы успешного заказа и отправление заказа на сервер
eventEmitter.on('sucsess:open', (evt: SubmitEvent) => {
	evt.preventDefault();
	basketModel.order.email = contactForm.getEmail();
	basketModel.order.phone = contactForm.getPhoneNum();
	contactForm.clearContactForm();
	appApi.makeOrder(basketModel.order).then(() => {
		cardModal.open(sucsess.sucsessFormContent);
		sucsess.setOrderDescription(basketModel.order.total);
		basketModel.clearBasket();
		page.updateBasketCounter(basketModel.getBasketItemsLength());
	});
});

//закрытие формы успешного заказа
eventEmitter.on('sucsess:close', () => {
	cardModal.close();
});
