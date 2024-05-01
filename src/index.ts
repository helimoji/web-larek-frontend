import './scss/styles.scss';
import { CatalogModel } from './components/CatalogModel';
import { BasketModel } from './components/BasketModel';
import { EventEmitter } from './components/base/events';
import { Api } from './components/base/api';
import { AppApi } from './components/AppApi';
import { API_URL, settings } from './utils/constants';

// Экземляры классов
const eventEmitter = new EventEmitter
const catalogModel = new CatalogModel(eventEmitter);
const basketModel = new BasketModel(eventEmitter)

const baseApi = new Api(API_URL, settings)
const appApi = new AppApi(baseApi)

// Получем каталог товаров с ссервера и сохраняем его
appApi.getCardList()
.then((data) => catalogModel.addToCatalog(data.items));

// Тест заказа
appApi.makeOrder({
    "payment": "online",
    "email": "test@test.ru",
    "phone": "+71234567890",
    "address": "Spb Vosstania 1",
    "total": 2200,
    "items": [
        "854cef69-976d-4c2a-a18c-2aa45046c390",
        "c101ab44-ed99-4a54-990d-47aa2bb4e7d9"
    ]
})

