import { Events, Product } from '../../types';
import { EventEmitter } from '../base/events';

export class Cart {
	items: Product[];
	eventEmitter: EventEmitter;
	constructor(eventEmitter: EventEmitter) {
		this.items = [];
		this.eventEmitter = eventEmitter;

		this.eventEmitter.on<{ payload: Product }>(Events.ADD_TO_CART, (event) => {
			this.addItem(event.payload);
			this.eventEmitter.emit(Events.UPDATE_CART_INDICATOR, {
				payload: this.items.length,
			});
		});
		this.eventEmitter.on<{ payload: string }>(
			Events.REMOVE_FROM_CART,
			(event) => {
				this.removeItem(event.payload);
				this.eventEmitter.emit(Events.UPDATE_CART_INDICATOR, {
					payload: this.items.length,
				});
			}
		);
		this.eventEmitter.on(Events.EMPTY_CART, () => {
			this.removeAll();
			this.eventEmitter.emit(Events.UPDATE_CART_INDICATOR, {
				payload: this.items.length,
			});
		});
	}
	isItemInCart(id: string) {
		return this.items.some((item) => item.id === id);
	}
	addItem(product: Product) {
		if (this.isItemInCart(product.id)) {
			console.log('Cart: Товар уже в корзине');
			return;
		}
		const item = { ...product };
		this.items.push(item);
	}
	removeItem(id: string) {
		const index = this.items.findIndex((item) => item.id === id);
		if (index > -1) {
			this.items.splice(index, 1);
		}
	}
	getItems() {
		return this.items;
	}
	removeAll() {
		this.items = [];
	}
	getTotal() {
		return this.items.reduce((acc, item) => {
			return acc + item.price;
		}, 0);
	}
}
