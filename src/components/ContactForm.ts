import { IContactForm, IContactFormHandlers } from '../types';
import { cloneTemplate, ensureElement } from '../utils/utils';

export class ContactForm implements IContactForm {
	contactFormContent: HTMLTemplateElement;
	emailInput: HTMLInputElement;
	phoneNumberInput: HTMLInputElement;
	payButton: HTMLElement;
	error: HTMLElement;

	constructor(
		contactFormContent: HTMLTemplateElement,
		handler: IContactFormHandlers
	) {
		this.contactFormContent = cloneTemplate(contactFormContent);
		this.emailInput = this.contactFormContent.querySelector(
			'input[name="email"]'
		);
		this.phoneNumberInput = this.contactFormContent.querySelector(
			'input[name="phone"]'
		);
		this.payButton = ensureElement('.button', this.contactFormContent);
		this.error = ensureElement('.form__errors', this.contactFormContent);

		this.emailInput.addEventListener(
			'input',
			handler.handleToggleButtonActivity
		);
		this.phoneNumberInput.addEventListener(
			'input',
			handler.handleToggleButtonActivity
		);

		this.contactFormContent.addEventListener(
			'submit',
			handler.handleSuccessOpen
		);
	}

	toggleActiveButton() {
		const emailRegex = /\w+@\w+\.\w+/i;
		const phoneRegex = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
		if (
			emailRegex.test(this.emailInput.value) &&
			phoneRegex.test(this.phoneNumberInput.value)
		) {
			this.payButton.removeAttribute('disabled');
			this.error.textContent = '';
		} else {
			this.payButton.setAttribute('disabled', 'true');
			this.error.textContent = 'Необходимо ввести корректные данные';
		}
	}

	clearContactForm(): void {
		this.emailInput.value = '';
		this.phoneNumberInput.value = '';
		this.payButton.setAttribute('disabled', 'true');
	}

	getPhoneNum(): string {
		return this.phoneNumberInput.value;
	}

	getEmail(): string {
		return this.emailInput.value;
	}
}
