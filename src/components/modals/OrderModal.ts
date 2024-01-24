import { Events, Product } from '../../types';
import { EventEmitter } from '../base/events';
import { CartUI } from '../view/CartUI';
import { Cart } from '../model/Cart';
import { Modal } from './Modal';
import {
	CART_TEMPLATE_SELECTOR,
	MODAL_CONTENT_SELECTOR,
} from '../../utils/constants';
import { OrderUI } from '../view/OrderUI';
// todo: make factory
export class OrderModal extends Modal {
	activeButton: { idx: number | null } = { idx: null };
	deliveryInput: { value: string } = { value: '' };

	emailInput: { value: string } = { value: '' };
	phoneInput: { value: string } = { value: '' };

	cartItems: Product[] = [];
	constructor(modalContainerId: string, eventEmitter: EventEmitter) {
		super(modalContainerId, eventEmitter);

		this.eventEmitter.on<{ payload: { cartItems: Product[] } }>(
			Events.OPEN_ORDER_MODAL,
			(data) => {
				this.open();
				this.cartItems = data.payload.cartItems;
			}
		);
	}
	open(): void {
		const modalContent = this.modalContainer.querySelector(
			MODAL_CONTENT_SELECTOR
		);
		modalContent.innerHTML = ``;

		OrderUI.renderPaymentForm(
			this.activeButton,
			(idx) => {
				this.activeButton.idx = idx;
			},
			modalContent,
			this.deliveryInput,
			(event) => {
				const target = event.target as HTMLInputElement;
				this.deliveryInput.value = target.value;
			}
		)
			.then(() =>
				OrderUI.renderContactForm(
					modalContent,
					this.emailInput,
					(event) => {
						const target = event.target as HTMLInputElement;
						this.emailInput.value = target.value;
					},
					this.phoneInput,
					(event) => {
						const target = event.target as HTMLInputElement;
						this.phoneInput.value = target.value;
					}
				)
			)
			.then(() => {
				console.log(this.cartItems, '123');
				this.eventEmitter.emit(Events.OPEN_SUCCESS_MODAL, {
					payload: {
						cartItems: this.cartItems,
					},
				});
			});

		this.openModal();
	}
	close(): void {
		this.closeModal();
	}
}
