import { ICardModal, IContentModalHandler, IModalHandler } from '../types';
import { ensureElement } from '../utils/utils';
import { Modal } from './common/Modal';

export class CardModal extends Modal implements ICardModal {
	protected content: HTMLElement;
	protected modalContent: HTMLElement;
	protected button: HTMLButtonElement;

	constructor(modalContainer: HTMLElement, handler?: IModalHandler) {
		super(modalContainer, handler);
		this.modalContent = ensureElement('.modal__content', modalContainer);
	}

	open(content: HTMLElement): void {
		this.clearModalContent();
		this.setContent(content);
		this.modalContent.append(this.content);
		super.open(content);
	}

	close(): void {
		super.close();
		this.clearModalContent();
	}

	private setContent(content: HTMLElement): void {
		this.content = content;
	}

	setButton(button: HTMLButtonElement, handler: IContentModalHandler): void {
		this.button = button;
		this.button.addEventListener('click', handler.handleAddItemToBasket);
	}

	private clearModalContent(): void {
		if (this.content && this.modalContent.contains(this.content)) {
			this.modalContent.removeChild(this.content);
		}
		this.content = null;
	}
}
