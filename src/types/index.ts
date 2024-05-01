import { EventEmitter } from "../components/base/events";
import { ApiListResponse, ApiPostMethods } from "../components/base/api";

export interface ProdItem  {
    id: string;
    description: string;
    image: string;
    title: string;
    category: Categorys;
    price: number;
}

export interface IOrder {
    payment: string;
	email: string;
	phone: string;
	address: string;
    total: number;
    items: string[];
}

export type Categorys = "софт-скил" | "кнопка" | "хард-скил" | "другое" | "дополнительное";

export interface IWebLarekApi {
    getCardList(): Promise<ApiListResponse<ProdItem>>;
    makeOrder(order: IOrder): void
}

export interface IApi {
    baseUrl: string;
    get<T>(uri: string): Promise<T>;
    post<T>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export interface IWebLarekApi {
    getCardList(): Promise<ApiListResponse<ProdItem>>;
    makeOrder(order: IOrder): void
}

export interface ICatalogModel {
    catalogItemList: ProdItem[];
    addToCatalog(items: ProdItem[]):void;
}

export interface IBasketModel {
    events: EventEmitter;
    basketItemList: ProdItem[];
    addItem(item: ProdItem): void;
    deleteItem(item: ProdItem): void;
    getBasketItemIndex(item: ProdItem): number;
    clearBasket():void;
}

export interface ICard {
    container: HTMLTemplateElement;
    category: HTMLSpanElement;
    title: HTMLHeadingElement;
    image?: HTMLImageElement;
    price: HTMLParagraphElement;
    description?: HTMLParagraphElement;
    addToBasketButton?: HTMLButtonElement;
    render(): HTMLElement
    openCard(): void;
}

export interface IModal {
    container:HTMLElement;
    closeButton: HTMLButtonElement;
    open(content: HTMLElement): void;
    close():void;
    clearContent():void;
}

export interface IBasket {
    basket: HTMLElement;
    cardBasketTemplate: HTMLTemplateElement;
    cardList: ProdItem[];
    deleteCardButton: HTMLButtonElement;
    totalPrice: HTMLElement;
    deleteCard(index: number): void;
    calcPrice(): string;
    updateBasket(): void;
    setCardToBasket(): void;
}

export interface IPaymentDeliveryForm {
    paymentDeliveryFormContent: HTMLTemplateElement;
	onlineButton: HTMLButtonElement;
	cashButton: HTMLButtonElement;
    adressInput: HTMLInputElement;
	nextButton: HTMLButtonElement;
    toggleActiveButton(button: HTMLButtonElement): void;
    clearInput(input: HTMLInputElement): void;
    getAddressInputValue(): string
}

export interface IContactForm {
    contactFormContent: HTMLTemplateElement;
    emailInput: HTMLInputElement;
    phoneNumberInput: HTMLInputElement;
    payButton: HTMLButtonElement;
    toggleActiveButton(button: HTMLButtonElement): void;
}

export interface ISucsess {
    sucsessFormContent: HTMLTemplateElement;
    orderDescription: HTMLParagraphElement;
    finalButton: HTMLButtonElement;
    setOrderDescription(totalPrice:HTMLElement):void;
}

export interface IPage {
    logo: HTMLElement;
    basketButton: HTMLButtonElement;
    basketCounter: HTMLElement;
    catalog: HTMLElement;
    updateBasketCounter(basketLength: number): void ;
    setCatalog(items: ICard[]): void
    scrolPage(): void;
    unscrolPage(): void;
}

 