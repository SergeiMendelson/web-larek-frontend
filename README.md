# Проектная работа "Веб-ларек"
# https://github.com/SergeiMendelson/web-larek-frontend.git

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

# Архитектура

# Base layer

### Класс Api

Класс Api предоставляет интерфейс для работы с API. Все методы класса возвращают промисы, которые разрешаются в JSON.

### Класс EventEmitter

Класс EventEmitter предоставляет интерфейс для работы с событиями. Поддерживает подписку на события и их эмитацию.

```ts
type EventName = string | RegExp;
type Subscriber = Function;
type EmitterEvent = {
	eventName: string,
	data: unknown
};

export interface IEvents {
	on<T extends object>(event: EventName, callback: (data: T) => void): void;

	emit<T extends object>(event: string, data?: T): void;

	trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void;
}
```

# Model layer

### Cart

Класс Cart предоставляет интерфейс для работы с корзиной. Позволяет добавлять и удалять товары, а также получать список товаров в корзине.
Связан событиями с классом CardIndicatorUI чтобы отображать количество товаров в корзине.

```ts
export interface Cart {
	items: Product[];
	eventEmitter: EventEmitter;

	constructor(eventEmitter: EventEmitter);

	isItemInCart(id: string): boolean;

	addItem(product: Product): void;

	removeItem(id: string): void;

	getItems(): Product[];

	getTotalPrice(): number;

	getTotal(): number;
}
```

### Products

Класс Products предоставляет интерфейс для работы с продуктами, запрашивать их с сервера и хранить данные о них

```ts
export interface Products {
	products: Product[];
	api: Api;
	onFetch: (products: Product[]) => void;

	constructor(api: Api, onFetch: (products: Product[]) => void);

	fetchProducts(): void;

	getProducts();
}
```

### CardCatalogFullModal

Класс CardCatalogFullModal предоставляет интерфейс для работы с модальным окном карточки товара. Работает с данными расширенной карточки товара, дает возможность добавить ее в корзину либо удалить из корзины

```ts

class CardCatalogFullModal {
	isItemInCart: boolean;
	modal: Modal;

	constructor(
		modalContainerId: string,
		isItemInCart: (id: string) => boolean,
		eventEmitter: EventEmitter,
	): void;
}
```

### CartModal

Класс CartModal предоставляет интерфейс для работы с модальным окном корзины.
Работает с данными корзины
Здесь мы рендерим корзину с помощью класса CartUI и передаем в нее список товаров в корзине.
Также при удалении товара из корзины мы обновляем индикатор с помощью класса CardIndicatorUI (вызываем событие). 


```ts

class CartModal {
	modal: Modal;
	cart: Cart;

	constructor(
		modalContainerId: string,
		eventEmitter: EventEmitter,
		cart: Cart,
	)
}
```

### OrderModal

Класс OrderModal предоставляет интерфейс для работы с модальным окном заказа.
Основная бизнес логика заказа находится в этом классе.
Мы храним здесь значения полей формы а также индекс активной кнопки.
При изменении этих значений мы вызываем методы рендера формы, которые отрисовывают форму с новыми значениями с помощью класса OrderUI.
Также мы храним здесь список товаров в корзине чтобы потом передать его в модальное окно успешного заказа.

```ts

class OrderModal {
	activeButton: { idx: number | null };
	deliveryInput: { value: string };
	emailInput: { value: string };
	phoneInput: { value: string };

	modal: Modal;

	cartItems: Product[] = [];

	constructor(modalContainerId: string, eventEmitter: EventEmitter): void;
}
```

### SuccessModal

Класс SuccessModal предоставляет интерфейс для работы с модальным окном успешного заказа.

```ts

class SuccessModal {
	cartItems: Product[];
	modal: Modal;

	constructor(modalContainerId: string, eventEmitter: EventEmitter)
}
```

# View layer

Компоненты не наследуют базовый класс отображение для гибкости 
Мы бы получили от базового класса бенефит в виде одного поля - container, это не критично


### Modal

Класс Modal предоставляет интерфейс для работы с модальными окнами. Позволяет открывать и закрывать модальные окна. Слушает события

```ts
export interface Modal {
	modalContainerId: string;
	modalContainer: Element;
	eventEmitter: EventEmitter;

	constructor(modalContainerId: string, eventEmitter: EventEmitter);

	openModal(): void;

	closeModal(): void;
}
```

### CardCatalogUI (not a class, just functions)

Набор функций - CardCatalogUI предоставляет функции для работы с UI карточки товара. Позволяет отрисовывать карточку товара

```ts
export interface CardCatalogUI {
	categoryColors: Record<Category, string>;

	renderCard(
		product: Product,
		container: Element,
		renderPrice: (price: Price) => string,
		onClick: () => void,
	): void;

	renderCategory(category: Category): string;

	renderCardFull(
		product: Product,
		container: Element,
		renderPrice: (price: Price) => string,
		buttonText: string,
		onButtonClick: (product: Product) => void,
	): void;
}
```

### CartIndicatorUI

Класс CartIndicatorUI предоставляет интерфейс для работы с UI индикатора корзины. Позволяет отрисовывать индикатор корзины

```ts
export interface CartIndicatorUI {
	container: Element;
	eventEmitter: EventEmitter;

	renderIndicator(count: number);

	constructor(container: Element, eventEmitter: EventEmitter);
}
```

### CartUI

Класс CartUI предоставляет интерфейс для работы с UI корзины. Позволяет отрисовывать корзину

```ts
export interface CartUI {
	container: Element;
	eventEmitter: EventEmitter;
	basketTemplate: Element;

	constructor(
		container: Element,
		eventEmitter: EventEmitter,
		basketTemplate: Element,
	);

	render(cartItems: Product[]);

	renderTotalPrice(products: Product[], container: Element);

	renderCartItem(product: Product, container: Element, position: number);


}
```

### CatalogUI

Класс CatalogUI предоставляет интерфейс для работы с UI каталога. Позволяет отрисовывать каталог

```ts
export interface CatalogUI {
	container: Element;

	constructor(container: Element);

	renderProducts(
		products: Product[],
		openModal: (product: Product) => void,
	): void;
}
```

### OrderUI (all methods are static)

Класс OrderUI предоставляет интерфейс для работы с UI заказа. Позволяет отрисовывать заказ
Формы заказа построены с помощью promised based flow.

```ts
export interface OrderUI {

	renderPaymentForm(
		activeButton: { idx: number | null },
		onButtonClick: (idx: number) => void,
		container: Element,
		deliveryInput: { value: string },
		onInput: (event: Event) => void,
	): Promise<void>;

	renderContactForm(
		container: Element,
		emailInput: { value: string },
		onEmailInput: (event: Event) => void,
		phoneInput: { value: string },
		onPhoneInput: (event: Event) => void,
	): Promise<void>;
}
```

### PriceUI (all methods are static)

Класс PriceUI предоставляет интерфейс для работы с UI цены. Позволяет отрисовывать цену

```ts
export interface PriceUI {
	renderPrice(price: number | null): string;
}
```

### SuccessUI (all methods are static)

Класс SuccessUI предоставляет интерфейс для работы с UI успешного заказа. Позволяет отрисовывать успешный заказ

```ts
export interface SuccessUI {
	render(
		container: Element,
		cartItems: Product[],
		onButtonClick: () => void,
	);
}
```



