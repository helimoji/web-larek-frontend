import { ISucsess, ISuccessHandler } from '../types';
import { cloneTemplate } from '../utils/utils';

export class Sucsess implements ISucsess {
	sucsessFormContent: HTMLTemplateElement;
	orderDescription: HTMLParagraphElement;
	finalButton: HTMLButtonElement;

	constructor(
		sucsessFormContent: HTMLTemplateElement,
		handler: ISuccessHandler
	) {
		this.sucsessFormContent = cloneTemplate(sucsessFormContent);

		this.finalButton = this.sucsessFormContent.querySelector(
			'.order-success__close'
		);
		this.orderDescription = this.sucsessFormContent.querySelector(
			'.order-success__description'
		);

		this.finalButton.addEventListener('click', handler.handleSuccessClose);
	}

	setOrderDescription(totalPrice: number): void {
		this.orderDescription.textContent = `Списано ${totalPrice} синапсов`;
	}
}
