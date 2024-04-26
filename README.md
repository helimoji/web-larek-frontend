# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

Описание данных 

Интерфес работы с сервером есть два метода: getCardList- получаем отвтет  от сервера в виде данных типа ApiListResponse,ответ сервера реализуем через дженерик, в которй в последующем передаем тип данных ProdItem. 
makeOrder - отправляем пут запрос серверу с данными типа TOrder, которые ожидает сервер

interface IWebLarekApi = {
    getCardList(): Promise<ApiListResponse<ProdItem>>;
    makeOrder(order: TOrder): void
}

type ApiListResponse<Type> = {
	total: number;
	items: Type[];
}

type ProdItem = {
    id: string;
    description: string;
    image: string;
    title: string;
    category: Categorys;
    price: number;
}

Т.к категории это не просто строки, а повторяющиеся значения, выносим их в отдельный тип, который передаем ProdItem

type Categorys = "софт-скил" | "кнопка" | "хард-скил" | "другое" | "дополнительное";

Помимо получения данных с сервера мы можем и отправлять их туда, чтобы не возникало ошибок создаем тип данных, которому должен будет соответсвовать заказ.

type TOrder = {
    payment: string;
	email: string;
	phone: string;
	address: string;
    items: string[];
}

Интерфейс каталога в котором есть поле catalogItemList- для хранения списка карточек, и метод addToCatalog- для добавления карточки в католог товаров.

interface ICatalogModel {
    catalogItemList: ProdItem[];
    addToCatalog(items: ProdItem[]):void;
}

Класс BasketModel реализуется интерфейсом IBasketModel.
Интерфейс корзины в котором есть поле basketItemList для хранения списка карточек добавленных в корзину. 
Также определяем методы данного класса:
addItem - для добавления товара в корзину, 
deleteItem- для удаления товара из корзины, 
getBasketItemIndex- для нумерации списка товаров в козине, 
clearBasket- для очистки корзины после успешного заказа.

interface IBasketModel {
    basketItemList: ProdItem[];
    addItem(item: ProdItem): void;
    deleteItem(item: ProdItem): void;
    getBasketItemIndex(item: ProdItem): number;
    clearBasket():void;
}


Компоненты отображения(View)

Класс Card наследуется от интерфейса ICard.
Интерфейс ICard включает в себя:
поля:
container- темплейт карточки;
category- категория товара карточкиж,
title- название товара,
image - картинка карточки,
price- цена товра,
description- описание карточки,
addToBasketButton- кнопка добавления карточки в корзину,
методы:
render- возвращает готовую карточку,
openCard - открывает карточку

interface ICard {
    container: HTMLTemplteElement;
    category: HTMLSpanElement;
    title: HTMLHeadingElement;
    image?: HTMLImageElement;
    price: HTMLParagrathElement;
    description?: HTMLParagrathElement;
    addToBasketButton?: HTMLButtonElement;
    render(): HTMLElement
    openCard(): void;
}


Класс Modal реализуется интерфейсом IModal. Это будет общий класс который по сути является контейнером с методами.
поля:
container- контейнер модального окна,
closeButton- кнопка закрытия модального окна,
методы:
open- метод открытия модального окна с передачей в него контента,
close - закрытие модального окна
clearContent- очищает модальное окно после закрытия

interface IModal {
    container:HTMLElement;
    closeButton: HTMLButtonElement;
    open(content: HTMLElement): void;
    close():void;
    clearContent():void;
}


Класс Basket реализует интерфейс IBasket. Наследуется от класса BasketModel, для использования функциональности. Он принимет шаблон корзины template.
basket- корзина,
cardList- список товаров добавленных в корзину,
deleteCardButton- кнопка удаления карточки из списка,
totalPrice- сумма заказа
методы:
deleteCard- для удаления карточки из списка,
calcPrice- для посчета суммы заказа,
updateBasket- для обновления списка корзины,
setCardToBasket- для добавления карточки в корзину

interface IBasket {
    basket: HTMLElement;
    cardBasketTemplate: HTMLTemplateElement;
    cardList: ProdItem[];
    deleteCardButton: HTMLButtonElement;
    totalPrice: HTMLElement;
    deleteCard(index: number): void;
    calcPrice(): string:
    updateBasket(): void;
    setCardToBasket(): void;
}


Класс PaymentDeliveryForm реализуется интерфейсом IPaymentDeliveryForm. 
Поля:
paymentDeliveryFormContent- темплейт формы выбора оплты и андресса доставки,
onlineButton- кнопка онлайн оплаты,
cashButton- кнопка оплаты при получении,
adressInput- инпут для введения адресса 
nextButton- кнопка для перехода к следующему этапу оформления заказа.
Методы:
toggleActiveButton- для переключения активности выбранной кнопки
clearInput- для очищения инпута адресса
getAddressInputValue- для получения значения инпута адресса

interface IPaymentDeliveryForm {
    paymentDeliveryFormContent: HTMLTemplateElement;
	onlineButton: HTMLButtonElement;
	cashButton: HTMLButtonElement;
    adressInput: HTMLInputElement;
	nextButton: HTMLButtonElement;
    toggleActiveButton(button: HTMLButtonElement): void;
    clearInput(input: HTMLInputElement): void;
    getAddressInputValue(): string
}


Класс ContactForm реализуется интерфейсом IContactForm.
Поля:
contactFormContent- темплейт формы укащания контактов,
emailInput- инпут имейла,
phoneNumberInput- инпут номера телефона,
payButton- кнопка для перехода к оплате,
Методы:
toggleActiveButton - для переключения активнсти кнопки

interface IContactForm {
    contactFormContent: HTMLTemplateElement;
    emailInput: HTMLInputElement;
    phoneNumberInput: HTMLInputElement;
    payButton: HTMLButtonElement;
    toggleActiveButton(button: HTMLButtonElement): void;
}


Класс Sucsess реализуется интерфейсом ISucsess.
Поля:
sucsessFormContent- темплейт успешного офрмления заказа,
orderDescription- описание деталей заказа,
finalButton- кнопка завершения заказа
Методы:
setOrderDescription- для установления значения в детали заказа

interface ISucsess {
    sucsessFormContent: HTMLTemplateElement;
    orderDescription: HTMLParagrathElement;
    finalButton: HTMLButtonElement;
    setOrderDescription(totalPrice:HTMLElement):void;
}


Класс Page реализуется интерфейсом IPage.
Поля: 
logo - эдемент с логотипом проекта,
basketButton - кнопка корзины,
basketCounter- счетчик корзины,
catalog- коталог товров,
Методы:
updateBasketCounter- для обновления счетчика корзины,
setCatalog- для установления католога товров,
scrolPage- для доступа к скролу страницы,
unscrolPage- для блокировки скрола страницы

inteface IPage {
    logo: HTMLEkement;
    basketButton: HTMLButtonElement;
    basketCounter: HTMLElement;
    catalog: HTMLElement;
    updateBasketCounter(basketLength: number): void ;
    setCatalog(items: ICard[]): void
    scrolPage(): void;
    unscrolPage(): void;
}



PRESENTER связующее звено между вьюшкой и моделями данных, для связыванниях этих данных будет использоваться EventEmmiter подписывая на определенные события.
список собитий:
Card:open- открытие карточки,
Modal:close- закрытие модального окна,
Basket:open- открытие корзины,
Basket:addItem -добавление товара в корзину,
Card:delete- удаление карточки из  корзины,
PaymentDelivery:open- открытие модального окна со способом доставки и адресом,
ButtonOnline:active- выбор способа оплаты(онлайн),
ButtonCash:active- выбор способа оплаты(наличными),
adressInput:tiping- введение адреса в поле инпута,
NextButton:active- активация кнопки далее при выбранном способе оплаты и введенном адресе,
Contact:open- открытие формы контактов,
emailInput:tiping- введение имейла в поле инпута,
phoneNumberInput:tiping- введение номера в поле инпута,
payButton:active- активация кнопки оплатить привведеных имейле и номере,
sucsess:open- открытие формы успешного оформления заказа,
sucsess:close- закрытие формы успешного оформления заказа