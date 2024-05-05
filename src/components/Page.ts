import { IPage, IPageHandler } from '../types';
import { ensureElement } from '../utils/utils';

export class Page implements IPage {
	basketCounter: HTMLElement;
	catalog: HTMLElement;
	pageWrapper: HTMLElement;
	basketButton: HTMLButtonElement;

	constructor(handler: IPageHandler) {
		this.basketCounter = ensureElement('.header__basket-counter ');
		this.catalog = ensureElement('.gallery');
		this.pageWrapper = ensureElement('.page__wrapper');
		this.basketButton = ensureElement<HTMLButtonElement>('.header__basket');
		this.basketButton.addEventListener('click', handler.handleBasketOpen);
	}

	updateBasketCounter(basketLength: string): void {
		this.basketCounter.textContent = `${basketLength}`;
	}

	unscrollPage(): void {
		this.pageWrapper.classList.add('page__wrapper_locked');
	}

	scrollPage(): void {
		this.pageWrapper.classList.remove('page__wrapper_locked');
	}
}
