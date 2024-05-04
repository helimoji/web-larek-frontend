import { IDeliveryFormHandlers, IPaymentDeliveryForm } from '../types';
import { cloneTemplate, ensureElement } from '../utils/utils';

export class PaymentDelivery implements IPaymentDeliveryForm {
	paymentDeliveryFormContent: HTMLTemplateElement;
	onlineButton: HTMLButtonElement;
	cashButton: HTMLButtonElement;
	adressInput: HTMLInputElement;
	nextButton: HTMLButtonElement;
	error: HTMLElement; //Добавить в ридми

	constructor(
		paymentDeliveryFormContent: HTMLTemplateElement,
		handler: IDeliveryFormHandlers
	) {
		this.paymentDeliveryFormContent = cloneTemplate(paymentDeliveryFormContent);
		this.adressInput = this.paymentDeliveryFormContent.querySelector(
			'input[name="address"]'
		);
		this.onlineButton = this.paymentDeliveryFormContent.querySelector(
			'button[name="card"]'
		);
		this.cashButton = this.paymentDeliveryFormContent.querySelector(
			'button[name="cash"]'
		);
		this.nextButton =
			this.paymentDeliveryFormContent.querySelector('.order__button');
		this.error = ensureElement(
			'.form__errors',
			this.paymentDeliveryFormContent
		);

		this.nextButton.addEventListener('click', handler.handleNext);
		this.onlineButton.addEventListener('click', handler.handleButtonCard);
		this.cashButton.addEventListener('click', handler.handleButtonCash);
		this.adressInput.addEventListener('input', handler.handleToggleButton);
	}

	toggleButtonCardActivity(): void {
		if (this.cashButton.classList.contains('button_alt-active')) {
			this.onlineButton.classList.toggle('button_alt-active');
			this.cashButton.classList.toggle('button_alt-active');
		}
	}

	toggleButtonCashActivity(): void {
		if (this.onlineButton.classList.contains('button_alt-active')) {
			this.onlineButton.classList.toggle('button_alt-active');
			this.cashButton.classList.toggle('button_alt-active');
		}
	}

	toggleActiveButton(): void {
		if (
			(this.onlineButton.classList.contains('button_alt-active') ||
				this.cashButton.classList.contains('button_alt-active')) &&
			this.adressInput.value.length > 0
		) {
			this.nextButton.removeAttribute('disabled');
			this.error.textContent = '';
		} else {
			this.nextButton.setAttribute('disabled', 'true');
			this.error.textContent = 'Необходимо ввести корректные данные';
		}
	}

	getAddressInputValue(): string {
		return this.adressInput.value;
	}

	getButtonTextContent(): string {
		if (this.cashButton.classList.contains('button_alt-active')) {
			return this.cashButton.textContent;
		} else {
			return this.onlineButton.textContent;
		}
	}

	clearDeliveryForm(): void {
		this.adressInput.value = '';
		this.error.textContent = '';
	}
}
