import { IApi, IOrder, IWebLarekApi, ProdItem } from "../types";
import { ApiListResponse } from "./base/api";

export class AppApi implements IWebLarekApi{
    private _baseApi: IApi;

	constructor(baseApi: IApi, ) {
		this._baseApi = baseApi;
	}

    getCardList(): Promise<ApiListResponse<ProdItem>> {
        return this._baseApi.get<ApiListResponse<ProdItem>>('/product')
    };

    makeOrder(order: IOrder): Promise<IOrder> {
        return this._baseApi.post<IOrder>('/order', order)
    }
}