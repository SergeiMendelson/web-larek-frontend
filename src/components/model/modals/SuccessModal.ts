import { Events, Product } from '../../../types';
import { Modal } from '../../view/Modal';
import { EventEmitter } from '../../base/events';
import { MODAL_CONTENT_SELECTOR } from '../../../utils/constants';
import { SuccessUI } from '../../view/SuccessUI';

export class SuccessModal {
	cartItems: Product[] = [];
	modal: Modal;
	constructor(modalContainerId: string, eventEmitter: EventEmitter) {
		this.modal = new Modal(modalContainerId, eventEmitter);
		this.modal.eventEmitter.on<{ payload: { cartItems: Product[] } }>(
			Events.OPEN_SUCCESS_MODAL,
			(data) => {
				this.cartItems = data.payload.cartItems;
				this.open();
			}
		);
	}
	open() {
		const modalContent = this.modal.modalContainer.querySelector(
			MODAL_CONTENT_SELECTOR
		);
		modalContent.innerHTML = ``;
		SuccessUI.render(modalContent, this.cartItems, () => {
			this.modal.eventEmitter.emit(Events.EMPTY_CART);
			this.close();
		});
		this.modal.openModal();
	}
	close() {
		this.modal.closeModal();
	}
}
