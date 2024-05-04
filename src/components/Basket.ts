import { BasketModel } from './BasketModel';
import { IBasket, IBasketHandler } from '../types';
import { cloneTemplate, ensureElement } from '../utils/utils';
import { Component } from './base/component';

export class Basket extends Component<HTMLElement> implements IBasket {
	basket: HTMLElement;
	basketPrice: HTMLElement;
	cardBasketTemplate: HTMLTemplateElement;
	cardsBasket: HTMLElement[] = [];
	basketList: HTMLElement;
	basketButton: HTMLElement;
	basketModel: BasketModel;

	constructor(
		basketTemplate: HTMLTemplateElement,
		basketModel: BasketModel,
		handler: IBasketHandler
	) {
		super(cloneTemplate(basketTemplate));
		this.cardBasketTemplate =
			ensureElement<HTMLTemplateElement>('#card-basket');
		this.basketModel = basketModel;
		this.basket = cloneTemplate(basketTemplate);
		this.basketPrice = ensureElement('.basket__price', this.basket);
		this.basketList = ensureElement('.basket__list', this.basket);
		this.basketButton = ensureElement('.basket__button', this.basket);

		if (this.basket) {
			this.basketButton.addEventListener(
				'click',
				handler.handleOpenDeliveryForm
			);
		}
	}

	setCardToBasket(): void {
		if (this.basketList.lastChild) {
			this.basketList.textContent = '';
		}
		this.cardsBasket.forEach((item) => {
			this.basketList.append(item);
		});
	}

	updateBasket(): void {
		this.setCardToBasket();
		this.calcPrice();
		this.changeButtonActivity();
	}

	calcPrice(): number {
		let totalCost = 0;
		this.basketModel.basketItemList.forEach((item) => {
			totalCost += item.price;
		});
		this.setText(this.basketPrice, `${totalCost} синапсов`);
		return totalCost;
	}

	private changeButtonActivity(): void {
		if (this.cardsBasket.length === 0 || this.calcPrice() === 0) {
			this.basketButton.setAttribute('disabled', 'true');
		} else {
			this.basketButton.removeAttribute('disabled');
		}
	}
}
