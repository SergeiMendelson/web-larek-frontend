import { Modal } from './Modal';
import { Events, Product } from '../../types';
import { MODAL_CONTENT_SELECTOR } from '../../utils/constants';
import { EventEmitter } from '../base/events';
import { SuccessUI } from '../view/SuccessUI';

export class SuccessModal extends Modal {
	cartItems: Product[] = [];
	constructor(modalContainerId: string, eventEmitter: EventEmitter) {
		super(modalContainerId, eventEmitter);
		this.eventEmitter.on<{ payload: { cartItems: Product[] } }>(
			Events.OPEN_SUCCESS_MODAL,
			(data) => {
				this.cartItems = data.payload.cartItems;
				this.open();
			}
		);
	}
	open() {
		const modalContent = this.modalContainer.querySelector(
			MODAL_CONTENT_SELECTOR
		);
		modalContent.innerHTML = ``;
		SuccessUI.render(modalContent, this.cartItems, () => {
			this.eventEmitter.emit(Events.EMPTY_CART);
			this.close();
		});
		this.openModal();
	}
	close() {
		this.closeModal();
	}
}
