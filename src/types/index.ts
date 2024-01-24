export interface Product {
	id: string;
	title: string;
	price: Price;
	image: string;
	description: string;
	category: Category;
}

export type Price = number | null;
export type Category =
	| 'софт-скил'
	| 'другое'
	| 'дополнительное'
	| 'кнопка'
	| 'хард-скил';

// Все события в игре
export enum Events {
	OPEN_CART = 'open-cart', // открыть корзину
	UPDATE_CART_INDICATOR = 'update-cart-indicator', // обновить индикатор корзины
	ADD_TO_CART = 'add-to-cart', // добавить в корзину
	CLOSE_MODAL = 'close-modal', // закрыть модальное окно
	REMOVE_FROM_CART = 'remove-from-cart', // удалить из корзины,
	OPEN_ORDER_MODAL = 'open-order-modal', // открыть модальное окно заказа
	OPEN_SUCCESS_MODAL = 'open-success-modal', // открыть модальное окно успешного заказа,
	EMPTY_CART = 'empty-cart', // очистить корзину
}
