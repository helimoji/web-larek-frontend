import { ICatalogModel, ProdItem } from '../types';

export class CatalogModel implements ICatalogModel {
	protected _catalogItemList: ProdItem[] = [];

	get catalogItemList(): ProdItem[] {
		return this._catalogItemList;
	}

	addToCatalog(items: ProdItem[]): void {
		this._catalogItemList.push(...items);
	}
}
