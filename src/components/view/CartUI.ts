import { Events, Product } from '../../types';
import { EventEmitter } from '../base/events';
import { PriceUI } from './PriceUI';

export class CartUI {
	container: Element;
	eventEmitter: EventEmitter;
	basketTemplate: Element;
	constructor(
		container: Element,
		eventEmitter: EventEmitter,
		basketTemplate: Element
	) {
		this.container = container;
		this.eventEmitter = eventEmitter;
		this.basketTemplate = basketTemplate;
	}
	render(cartItems: Product[]) {
		this.container.innerHTML = '';
		const basket = this.basketTemplate.cloneNode(true) as Element;
		basket.classList.remove('global-hidden');
		const basketList = basket.querySelector('.basket__list');

		cartItems.forEach((product, index) => {
			this.renderCartItem(product, basketList, index + 1);
		});

		const basketTotal = basket.querySelector('.basket__price');
		CartUI.renderTotalPrice(cartItems, basketTotal);
		const createOrderBtn = basket.querySelector('.modal__actions button');
		createOrderBtn.addEventListener('click', () => {
			this.eventEmitter.emit(Events.OPEN_ORDER_MODAL, {
				payload: {
					cartItems,
				},
			});
		});
		if (cartItems.length === 0) {
			createOrderBtn.setAttribute('disabled', 'true');
		} else {
			createOrderBtn.removeAttribute('disabled');
		}
		this.container.appendChild(basket);
	}

	static renderTotalPrice(products: Product[], container: Element) {
		container.innerHTML = PriceUI.renderPrice(
			products.reduce((acc, item) => {
				return acc + item.price;
			}, 0)
		);
	}

	renderCartItem(product: Product, container: Element, position: number) {
		const cartItem = document.createElement('li');
		cartItem.classList.add('basket__item', 'card', 'card_compact');
		cartItem.innerHTML = `
			<span class="basket__item-index">${position}</span>
			<span class="card__title">${product.title}</span>
			<span class="card__price">${PriceUI.renderPrice(product.price)}</span>
			<button
				class="basket__item-delete"
				aria-label="удалить"
			></button>
		`;
		container.appendChild(cartItem);
		const removeBtn = cartItem.querySelector(
			'.basket__item-delete'
		) as HTMLButtonElement;
		removeBtn.addEventListener('click', () => {
			this.eventEmitter.emit(Events.REMOVE_FROM_CART, {
				payload: product.id,
			});
		});
	}
}
