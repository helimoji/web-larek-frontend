import { IBasketModel, IBasketModelHandler, ProdItem } from '../types';
import { IOrder } from '../types';

export class BasketModel implements IBasketModel {
	handler: IBasketModelHandler;
	protected _basketItemList: ProdItem[] = [];

	constructor(handler: IBasketModelHandler) {
		this.handler = handler;
	}

	order: IOrder = {
		payment: '',
		email: '',
		phone: '',
		address: '',
		total: 0,
		items: [],
	};

	get basketItemList(): ProdItem[] {
		return this._basketItemList;
	}

	addItem(item: ProdItem): void {
		if (
			!this._basketItemList.find((BasketItem) => BasketItem.id === item.id) &&
			item.price !== null
		) {
			this._basketItemList.push(item);
			this.order.items.push(item.id);
			this.updateBasketCards();
		}
	}

	deleteItem(item: ProdItem): void {
		this._basketItemList = this._basketItemList.filter(
			(current) => current.id !== item.id
		);
		this.order.items = this.order.items.filter(
			(current) => current !== item.id
		);
		this.updateBasketCards();
	}

	getBasketItemIndex(item: ProdItem): number {
		return this._basketItemList.indexOf(item) + 1;
	}

	getBasketItemsLength(): string {
		return this._basketItemList.length.toString();
	}

	clearBasket(): void {
		this._basketItemList = [];
		this.order = {
			payment: '',
			email: '',
			phone: '',
			address: '',
			total: 0,
			items: [],
		};
		this.updateBasketCards();
	}

	private updateBasketCards(): void {
		this.handler.handleUpdateBasket();
	}
}
