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
	protected index?: HTMLElement; 
	addToBasketButton?: HTMLButtonElement;
	deleteFromBasketButton?: HTMLButtonElement; 

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

		const categoryClasses: { [key: string]: string } = {
			другое: 'card__category_other',
			'хард-скил': 'card__category_hard',
			'софт-скил': 'card__category_soft',
			кнопка: 'card__category_button',
		};

		if (this.category) {
			const textContent = this.category.textContent?.trim();

			if (textContent) {
				this.category.classList.add(
					categoryClasses[textContent] || 'default__class'
				);
			}
		}

		this.setText(this.title, cardData.title);

		if (this.image) {
			this.image.src = `${CDN_URL}${cardData.image}`;
			this.image.alt = cardData.title;
		}

		if (cardData.price == null) {
			this.setText(this.price, `Бесценно`);
			this.setText(this.addToBasketButton, `Данный товар нельзя купить`);
			if (this.addToBasketButton) {
				this.addToBasketButton.setAttribute('disabled', 'true');
			}
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
