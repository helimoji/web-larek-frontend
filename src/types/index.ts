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
    order: IOrder;
    basketItemList: ProdItem[];
    addItem(item: ProdItem): void;
    deleteItem(item: ProdItem): void;
    getBasketItemIndex(item: ProdItem): number;
    clearBasket():void;
}

export type ICard = {
    renderCard(cardData: ProdItem, index?: number): HTMLTemplateElement;
}

export interface IModal {
    open(content: HTMLElement): void;
    close():void;
}

export interface ICardModal {
    setButton(button: HTMLButtonElement,  handler: IContentModalHandler): void;
}

export interface IBasket {
    calcPrice(): number;
    updateBasket(): void;
    setCardToBasket(): void;
}

export interface IPaymentDeliveryForm {
    toggleButtonCardActivity(): void;
    toggleButtonCashActivity(): void
    toggleActiveButton(): void;
    getAddressInputValue(): string;
    getButtonTextContent(): string;
    clearDeliveryForm(): void;
}

export interface IContactForm {
    toggleActiveButton(button: HTMLButtonElement): void;
    clearContactForm():void;
}

export interface ISucsess {
    setOrderDescription(totalPrice: number):void;
}

export interface IPage {
    updateBasketCounter(basketLength: string): void ;
    scrollPage(): void;
    unscrollPage(): void;
}


export interface ICatalogCardHandler {
    handleCardOpen: () => void;
}

export interface IBasketCardHandler {
    handleCardDelete: () => void;
}

export interface IBasketModelHandler {
    handleUpdateBasket: () => void;
}

export interface IPageHandler {
    handleBasketOpen: () => void;
}

export interface IContactFormHandlers {
    handleSuccessOpen: (evt: SubmitEvent) => void;
	handleToggleButtonActivity: () => void;
}

export interface IModalHandler {
    handleModalClose: () => void;
}

export interface IContentModalHandler {
    handleAddItemToBasket: () => void;
}

export interface IBasketHandler {
    handleOpenDeliveryForm: () => void;
}

export interface IDeliveryFormHandlers {
    handleButtonCard: () => void;
    handleButtonCash: () => void;
    handleToggleButton: () => void;
    handleNext: () => void;
}

export interface ISuccessHandler {
    handleSuccessClose: () => void;
}

