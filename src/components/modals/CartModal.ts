import { Events } from '../../types';
import { EventEmitter } from '../base/events';
import { CartUI } from '../view/CartUI';
import { Cart } from '../model/Cart';
import { Modal } from './Modal';
import {
	CART_TEMPLATE_SELECTOR,
	MODAL_CONTENT_SELECTOR,
} from '../../utils/constants';
// todo: make factory
export class CartModal extends Modal {
	cart: Cart;

	constructor(
		modalContainerId: string,
		eventEmitter: EventEmitter,
		cart: Cart
	) {
		super(modalContainerId, eventEmitter);
		this.cart = cart;

		this.eventEmitter.on(Events.OPEN_CART, () => {
			this.open();
		});
	}
	open(): void {
		const cartItems = this.cart.getItems();
		const modalContent = this.modalContainer.querySelector(
			MODAL_CONTENT_SELECTOR
		);
		modalContent.innerHTML = '';
		const cartUI = new CartUI(
			modalContent,
			this.eventEmitter,
			document.querySelector(CART_TEMPLATE_SELECTOR) as Element
		);
		cartUI.render(cartItems);
		this.eventEmitter.on(Events.REMOVE_FROM_CART, () => {
			cartUI.render(this.cart.getItems());
		});

		this.openModal();
	}
	close(): void {
		this.closeModal();
	}
}
