import { ICatalogModel, ProdItem } from "../types";
import { EventEmitter } from "./base/events";


export class CatalogModel implements ICatalogModel {
    protected _catalogItemList: ProdItem[] = [];
    events: EventEmitter;

    constructor(events: EventEmitter) {
        this.events = events;
    }

    get catalogItemList(): ProdItem[] {
        return this._catalogItemList;
    }

    addToCatalog(items: ProdItem[]): void {
          this._catalogItemList.push(...items);
          this.events.emit('Cards:created')
    }
}