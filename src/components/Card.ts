import {
	IBasketCardHandler,
	ICard,
	ICatalogCardHandler,
	ProdItem,
} from '../types';
import { cloneTemplate, ensureElement } from '../utils/utils';
import { Component } from './base/component';
import { CDN_URL } from '../utils/constants';

export class Card extends Component<ProdItem> implements ICard {
	handleCardOpen: ICatalogCardHandler;
	protected container: HTMLTemplateElement;
	protected category: HTMLSpanElement;
	protected title: HTMLElement;
	protected image?: HTMLImageElement;
	protected price: HTMLParagraphElement;
	protected description?: HTMLParagraphElement;
	protected index?: HTMLElement; //новое свойство надо добавить в ридми и типы
	addToBasketButton?: HTMLButtonElement;
	deleteFromBasketButton?: HTMLButtonElement; //новое свойство надо добавить в ридми и типы

	constructor(
		container: HTMLTemplateElement,
		handleCardOpen?: ICatalogCardHandler,
		handleCardDelete?: IBasketCardHandler
	) {
		super(container);

		this.handleCardOpen = handleCardOpen;

		this.container = cloneTemplate(container);
		this.category = this.container.querySelector(`.card__category`);
		this.title = ensureElement<HTMLHeadingElement>(
			'.card__title',
			this.container
		);
		this.image = this.container.querySelector(`.card__image`);
		this.price = this.container.querySelector(`.card__price`);
		this.description = this.container.querySelector(`.card__text`);
		this.index = this.container.querySelector('.basket__item-index');
		this.addToBasketButton = this.container.querySelector(`.card__button`);
		this.deleteFromBasketButton = this.container.querySelector(
			'.basket__item-delete'
		);

		if (this.deleteFromBasketButton) {
			this.deleteFromBasketButton.addEventListener(
				'click',
				handleCardDelete.handleCardDelete
			);
		}

		if (this.handleCardOpen?.handleCardOpen) {
			if (this.container) {
				this.container.addEventListener(
					'click',
					this.handleCardOpen.handleCardOpen
				);
			}
		}
	}

	renderCard(cardData: ProdItem, index?: number) {
		this.setText(this.category, cardData.category);

		if (this.category) {
			if (this.category.textContent === 'другое') {
				this.category.classList.add('card__category_other');
			} else if (this.category.textContent === 'хард-скил') {
				this.category.classList.add('card__category_hard');
			} else if (this.category.textContent === 'софт-скил') {
				this.category.classList.add('card__category_soft');
			} else if (this.category.textContent === 'кнопка') {
				this.category.classList.add('card__category_button');
			} else if (this.category.textContent === 'дополнительное') {
				this.category.classList.add('card__category_additional');
			}
		}

		this.setText(this.title, cardData.title);

		if (this.image) {
			this.image.src = `${CDN_URL}${cardData.image}`;
			this.image.alt = cardData.title;
		}

		if (cardData.price == null) {
			this.setText(this.price, `Бесценно`);
		} else {
			this.setText(this.price, `${cardData.price} синапсов`);
		}

		if (this.description) {
			this.setText(this.description, cardData.description);
		}

		if (this.index) {
			this.index.textContent = `${index}`;
		}

		return this.container;
	}
}
