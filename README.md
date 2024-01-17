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

## Архитектура

### Класс ProductCard

Отвечает за отрисовку карточек товаров

```ts
interface ProductCard {
	constructor(
		product: Product,
		container: HTMLElement,
	);

	render(): void;
}

interface Product {
	id: number;
	title: string;
	price: number;
	image: string;
	description: string;
	category: string;
}
```

### Класс ProductPreviewCard

Отвечает за отрисовку детального вида товара,
также дает возможность добавить товар в корзину

```ts
interface ProductPreviewCard {
	constructor(
		product: Product,
		container: HTMLElement,
	);

	render(): void;

	addToCart(): void;
}
```

### Класс PopupSystem и Popup

Отвечает за менеджмент попапов. хранит их состояние, отрисовывает их
и дает удобный апи для работы с ними

```ts
interface PopupSystem {
	constructor(
		container: HTMLElement,
		currentPopup: Popup,
	);

	render(): void;

	openPopup(popup: Popup): void;

	closePopup(): void;
}

interface Popup {
	constructor(
		container: HTMLElement,
		popupSystem: PopupSystem,
	);

	open(): void;

	close(): void;
}
```

### Класс Cart и CartItem

Менеджмент корзины и товаров в ней

```ts
interface CartItem {
	product: Product;
	quantity: number;
}

interface Cart {
	constructor(
		container: HTMLElement,
		cartItems: CartItem[],
	);

	addItem(product: Product): void;

	removeItem(id: number): void;

	makeOrder(): void;

	render(): void;
}
```

### Класс OrderProcess

Менеджмент создания заказа

```ts
interface OrderProcess {
	constructor(
		container: HTMLElement,
		cart: Cart,
		steps: Step[],
		currentStep: number,
		onSuccessfulOrder: () => void,
	);

	render(): void;

	makeOrder(): void;
}

interface Step {
	render(): void;

	form: Form;

	isValid(): boolean;
}
```

### Класс Form
Менеджмент формы

```ts
interface Form {
	constructor(
		container: HTMLElement,
		inputs: Input[],
		onSubmit: () => void,
	);

	render(): void;

	isValid(): boolean;
}

interface Input {
	constructor(
		container: HTMLElement,
		validation: Validation,
	);

	render(): void;

	isValid(): boolean;
}

interface Validation {
	validate(value: string): boolean;

	message: string;

}
```

### SuccessOrderPopup

Попап успешного заказа implements Popup


