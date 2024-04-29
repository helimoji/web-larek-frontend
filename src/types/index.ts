import { EventEmitter } from "../components/base/events";

interface ProdItem  {
    id: string;
    description: string;
    image: string;
    title: string;
    category: Categorys;
    price: number;
}

interface TOrder {
    payment: string;
	email: string;
	phone: string;
	address: string;
    items: string[];
}

type Categorys = "софт-скил" | "кнопка" | "хард-скил" | "другое" | "дополнительное";

interface IWebLarekApi {
    getCardList(): Promise<ApiListResponse<ProdItem>>;
    makeOrder(order: TOrder): void
}
    
type ApiListResponse<Type> = {
    total: number;
    items: Type[];
}

interface IWebLarekApi {
    getCardList(): Promise<ApiListResponse<ProdItem>>;
    makeOrder(order: TOrder): void
}

interface ICatalogModel {
    catalogItemList: ProdItem[];
    addToCatalog(items: ProdItem[]):void;
}

interface IBasketModel {
    eventEmitter: EventEmitter;
    basketItemList: ProdItem[];
    addItem(item: ProdItem): void;
    deleteItem(item: ProdItem): void;
    getBasketItemIndex(item: ProdItem): number;
    clearBasket():void;
}

interface ICard {
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

interface IModal {
    container:HTMLElement;
    closeButton: HTMLButtonElement;
    open(content: HTMLElement): void;
    close():void;
    clearContent():void;
}

interface IBasket {
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

interface IPaymentDeliveryForm {
    paymentDeliveryFormContent: HTMLTemplateElement;
	onlineButton: HTMLButtonElement;
	cashButton: HTMLButtonElement;
    adressInput: HTMLInputElement;
	nextButton: HTMLButtonElement;
    toggleActiveButton(button: HTMLButtonElement): void;
    clearInput(input: HTMLInputElement): void;
    getAddressInputValue(): string
}

interface IContactForm {
    contactFormContent: HTMLTemplateElement;
    emailInput: HTMLInputElement;
    phoneNumberInput: HTMLInputElement;
    payButton: HTMLButtonElement;
    toggleActiveButton(button: HTMLButtonElement): void;
}

interface ISucsess {
    sucsessFormContent: HTMLTemplateElement;
    orderDescription: HTMLParagraphElement;
    finalButton: HTMLButtonElement;
    setOrderDescription(totalPrice:HTMLElement):void;
}

interface IPage {
    logo: HTMLElement;
    basketButton: HTMLButtonElement;
    basketCounter: HTMLElement;
    catalog: HTMLElement;
    updateBasketCounter(basketLength: number): void ;
    setCatalog(items: ICard[]): void
    scrolPage(): void;
    unscrolPage(): void;
}