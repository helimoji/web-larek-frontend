import { IBasketModel, ProdItem } from "../types";
import { EventEmitter } from "./base/events";
import { IOrder } from "../types";

export class BasketModel implements IBasketModel {
    events: EventEmitter;
    protected _basketItemList: ProdItem[] = [];

    constructor(events: EventEmitter) {
        this.events = events;
    }

    order: IOrder = {
        payment: '',
        email: '',
        phone: '',
        address: '',
        total: 0,
        items: []
    }

    get basketItemList(): ProdItem[] {
        return this._basketItemList
    }

    addItem(item: ProdItem): void {
        this._basketItemList.push(item)
        this.order.items.push(item.id)
        this.events.emit('Basket:addItem')
    }

    deleteItem(item: ProdItem): void {
        this._basketItemList= this._basketItemList.filter(current => current.id !== item.id)
        this.order.items = this.order.items.filter(current => current !== item.id)
        this.events.emit('Card:delete')
    }

    getBasketItemIndex(item: ProdItem): number {
        return (this._basketItemList.indexOf(item) + 1)
    }

    clearBasket(): void {
       this._basketItemList = []
       this.order = {
        payment: '',
        email: '',
        phone: '',
        address: '',
        total: 0,
        items: []
    }
    this.events.emit('Card:delete')
    } 
}