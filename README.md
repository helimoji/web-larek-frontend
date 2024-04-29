# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```


## Данные и типы данных, используемые в приложении:
Карточка:
```
interface ProdItem {
    id: string;
    description: string;
    image: string;
    title: string;
    category: Categorys;
    price: number;
}
```
Т.к категории это не просто строки, а повторяющиеся значения, выносим их в отдельный тип, который передаем ProdItem
```
type Categorys = "софт-скил" | "кнопка" | "хард-скил" | "другое" | "дополнительное";
```
Заказ:
```
interface TOrder {
    payment: string;
	email: string;
	phone: string;
	address: string;
    items: string[];
}
```


## Приложение реализуется с помощью MVP архитектуры и состоит из слоев:
- слой представления, отвечает за отображение данных на странице
- слой данных, отвечает за хранение и изменение данных
- презентер, отвеает за связь данных и представления

## Базовый код
### Класс API  
Это базовый класс, который предоставляет методы для выполнения HTTP-запросов к удаленному API.

- ApiListResponse<Type>: ответ API, содержащий общее количество элементов (total) и массив элементов (items) указанного типа Type.

- ApiPostMethods: методы HTTP-запросов: 'POST', 'PUT' или 'DELETE'.

- baseUrl: базовый URL для всех запросов. 

- options: Объект RequestInit, содержащий параметры запроса, такие как заголовки и другие настройки.

- constructor(baseUrl: string, options: RequestInit = {}): Конструктор класса, который принимает базовый URL и настройки запроса(по умолчанию без настроек).

- handleResponse(response: Response): Promise<object>: Метод для обработки ответа от сервера. Если ответ от сервера успешный, возвращает JSON объект, в противном случае возвращает ошибку.

- get(uri: string): Метод для выполнения HTTP-запроса методом GET к указанному URI.

- post(uri: string, data: object, method: ApiPostMethods = 'POST'): Метод для выполнения HTTP-запроса методом POST или другим методом к указанному URI. 

### Класс EventEmmiter

Это класс предоставляет основные методы для работы с событиями и подпичисками(наблюдателями) событий.

- _events: Map<EventName, Set<Subscriber>>: Приватное свойство, которое представляет собой карту, где ключ- имя события, а значение- набор подписчиков этого события.
- constructor(): Конструктор класса, который инициализирует
_events как пустую карту.
- on(eventName: EventName, callback: (event: T) => void): Метод для подписки на событие. 
- off(eventName: EventName, callback: Subscriber): Метод для отписки от события.
- emit(eventName: string, data?: T): Метод для вызова события. 
- onAll(callback: (event: EmitterEvent) => void): Метод для подписки на все события.
- offAll(): Метод для отписки от всех событий.
- trigger(eventName: string, context?: Partial<T>): Метод, который возвращает функцию, предназначенную для вызова события с указанным именем и контекстом данных.

## Model - отвечает за часть приложения отвечающую за работу с данными.

#### Класс WebLarekApi Реализует интерфейс IWebLarekApi. 
Методы:  
- getCardList- получаем отвтет  от сервера в виде данных типа ApiListResponse, передавая тип ProdItem. 

- makeOrder - отправляем пут запрос серверу с данными типа TOrder, которые ожидает сервер

```
interface IWebLarekApi {
    getCardList(): Promise<ApiListResponse<ProdItem>>;
    makeOrder(order: TOrder): void
}
```

#### Класс CatalogModel Реализует интерфейс ICatalogModel.
Поля:  
- catalogItemList- для хранения списка карточек  

Методы:  
- addToCatalog- для добавления карточки в католог товаров.
```
interface ICatalogModel {
    catalogItemList: ProdItem[];
    addToCatalog(items: ProdItem[]):void;
}
```
#### Класс BasketModel Реализует интерфейс IBasketModel.
Поля:  
- basketItemList- для хранения списка карточек добавленных в корзину  
- events- для инициализации события при изменении данных

Методы:  
- addItem - для добавления товара в корзину,   
- deleteItem- для удаления товара из корзины,   
- getBasketItemIndex- для нумерации списка товаров в козине,   
- clearBasket- для очистки корзины после успешного заказа.

```
interface IBasketModel {
    events: EventEmitter;
    basketItemList: ProdItem[];
    addItem(item: ProdItem): void;
    deleteItem(item: ProdItem): void;
    getBasketItemIndex(item: ProdItem): number;
    clearBasket():void;
}
```

## Компоненты отображения(View)

### Класс Card Реализует интерфейс ICard.
Поля:  
- container- темплейт карточки;  
- category- категория товара карточкиж,  
- title- название товара,  
- image - картинка карточки,  
- price- цена товра,  
- description- описание карточки,  
- addToBasketButton- кнопка добавления карточки в корзину,  

Методы:  
- render- возвращает готовую карточку,  
- openCard - открывает карточку

```
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
```

### Класс Modal реализуется интерфейсом IModal.
Это будет общий класс который по сути является сборником с методами.  

Поля:
- events- для инициализации события при изменении данных
- container- контейнер модального окна,
- closeButton- кнопка закрытия модального окна,  

Методы:
- open- метод открытия модального окна с передачей в него контента,
- close - закрытие модального окна
- clearContent- очищает модальное окно после закрытия

```
interface IModal {
    events: EventEmitter;
    container:HTMLElement;
    closeButton: HTMLButtonElement;
    open(content: HTMLElement): void;
    close():void;
    clearContent():void;
}
```

### Класс Basket реализует интерфейс IBasket.
Наследуется от класса BasketModel, для использования функциональности. Он принимет шаблон корзины template.  

Поля:  
- basket- корзина,
- cardList- список товаров добавленных в корзину,
- deleteCardButton- кнопка удаления карточки из списка,
- totalPrice- сумма заказа  

Методы:  
- deleteCard- для удаления карточки из списка,
- calcPrice- для посчета суммы заказа,
- updateBasket- для обновления списка корзины,
- setCardToBasket- для добавления карточки в корзину

```
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
```

### Класс PaymentDeliveryForm реализуется интерфейсом IPaymentDeliveryForm. 
Поля:  

- paymentDeliveryFormContent- темплейт формы выбора оплты и андресса доставки,
- onlineButton- кнопка онлайн оплаты,
- cashButton- кнопка оплаты при получении,
- adressInput- инпут для введения адресса 
- nextButton- кнопка для перехода к следующему этапу оформления заказа.  

Методы:  
- toggleActiveButton- для переключения активности выбранной кнопки
- clearInput- для очищения инпута адресса
- getAddressInputValue- для получения значения инпута адресса

```
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
```

### Класс ContactForm реализуется интерфейсом IContactForm.
Поля:
- contactFormContent- темплейт формы укащания контактов,
- emailInput- инпут имейла,
- phoneNumberInput- инпут номера телефона,
- payButton- кнопка для перехода к оплате,  

Методы:  
- toggleActiveButton - для переключения активнсти кнопки

```
interface IContactForm {
    contactFormContent: HTMLTemplateElement;
    emailInput: HTMLInputElement;
    phoneNumberInput: HTMLInputElement;
    payButton: HTMLButtonElement;
    toggleActiveButton(button: HTMLButtonElement): void;
}
```

### Класс Sucsess реализуется интерфейсом ISucsess.
Поля:
- sucsessFormContent- темплейт успешного офрмления заказа,
- orderDescription- описание деталей заказа,
- finalButton- кнопка завершения заказа  

Методы:  
- setOrderDescription- для установления значения в детали заказа  

```
interface ISucsess {
    sucsessFormContent: HTMLTemplateElement;
    orderDescription: HTMLParagraphElement;
    finalButton: HTMLButtonElement;
    setOrderDescription(totalPrice:HTMLElement):void;
}
```

### Класс Page реализуется интерфейсом IPage.
Поля: 
- logo - эдемент с логотипом проекта,
- basketButton - кнопка корзины,
- basketCounter- счетчик корзины,
- catalog- коталог товров 

Методы:
- updateBasketCounter- для обновления счетчика корзины,
- setCatalog- для установления католога товров,
- scrolPage- для доступа к скролу страницы,
- unscrolPage- для блокировки скрола страницы

```
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
```


## PRESENTER 
Связующее звено между вьюшкой и моделями данных, для связыванниях этих данных будет использоваться EventEmmiter подписывая на определенные события. Реализация взаимодействия слоев будет в файле Index.ts, который будет выполнять роль презентера. В файле сначала создаются все необходимые инстанты классов, а затем настраивается обработка событий.

Cписок собитий:
- Card:open- открытие карточки,
- Modal:close- закрытие модального окна,
- Basket:open- открытие корзины,
- Basket:addItem -добавление товара в корзину,
- Card:delete- удаление карточки из  корзины,
- PaymentDelivery:open- открытие модального окна со - способом доставки и адресом,
- ButtonOnline:active- выбор способа оплаты(онлайн),
- ButtonCash:active- выбор способа оплаты(наличными),
- adressInput:tiping- введение адреса в поле инпута,
- NextButton:active- активация кнопки далее при выбранном способе оплаты и введенном адресе,
- Contact:open- открытие формы контактов,
- emailInput:tiping- введение имейла в поле инпута,
- phoneNumberInput:tiping- введение номера в поле инпута,
- payButton:active- активация кнопки оплатить привведеных имейле и номере,
- sucsess:open- открытие формы успешного оформления заказа,
- sucsess:close- закрытие формы успешного оформления заказа