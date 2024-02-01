import { EventEmitter } from '../../base/events';
import { Cart } from '../Cart';
import { Modal } from '../../view/Modal';
import { Events } from '../../../types';
import {
	CART_TEMPLATE_SELECTOR,
	MODAL_CONTENT_SELECTOR,
} from '../../../utils/constants';
import { CartUI } from '../../view/CartUI';

export class CartModal {
	cart: Cart;
	modal: Modal;
	constructor(
		modalContainerId: string,
		eventEmitter: EventEmitter,
		cart: Cart
	) {
		this.modal = new Modal(modalContainerId, eventEmitter);
		this.cart = cart;

		this.modal.eventEmitter.on(Events.OPEN_CART, () => {
			this.open();
		});
	}
	open(): void {
		const cartItems = this.cart.getItems();
		const modalContent = this.modal.modalContainer.querySelector(
			MODAL_CONTENT_SELECTOR
		);
		modalContent.innerHTML = '';
		const cartUI = new CartUI(
			modalContent,
			this.modal.eventEmitter,
			document.querySelector(CART_TEMPLATE_SELECTOR) as Element
		);
		cartUI.render(cartItems);
		this.modal.eventEmitter.on(Events.REMOVE_FROM_CART, () => {
			cartUI.render(this.cart.getItems());
		});

		this.modal.openModal();
	}
	close(): void {
		this.modal.closeModal();
	}
}
