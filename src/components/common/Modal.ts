import { IModal, IModalHandler } from "../../types";
import { ensureElement } from "../../utils/utils";

export abstract class Modal implements IModal {
    protected _container: HTMLElement;
    protected closeButton: HTMLElement;

    constructor(container: HTMLElement, handler?: IModalHandler) {
        this._container=container;
        this.closeButton = ensureElement('.modal__close', container);

        this.closeButton.addEventListener('click', handler.handleModalClose);
    }

    open(content: HTMLElement): void {
        this._container.classList.add('modal_active');
    }

    close(): void {
        this._container.classList.remove('modal_active');
    }
}