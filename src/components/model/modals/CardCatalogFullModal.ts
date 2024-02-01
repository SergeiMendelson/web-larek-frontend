import { Modal } from '../../view/Modal';
import { EventEmitter } from '../../base/events';
import { Events, Product } from '../../../types';
import { MODAL_CONTENT_SELECTOR } from '../../../utils/constants';
import { renderCardFull } from '../../view/CardCatalogUIHelpers';
import { PriceUI } from '../../view/PriceUI';

export class CardCatalogFullModal {
	isItemInCart: (id: string) => boolean;
	modal: Modal;
	constructor(
		modalContainerId: string,
		isItemInCart: (id: string) => boolean,
		eventEmitter: EventEmitter
	) {
		this.modal = new Modal(modalContainerId, eventEmitter);
		this.isItemInCart = isItemInCart;
	}
	open(product: Product): void {
		const modalContent = this.modal.modalContainer.querySelector(
			MODAL_CONTENT_SELECTOR
		);
		modalContent.innerHTML = '';
		renderCardFull(
			product,
			modalContent,
			PriceUI.renderPrice,
			this.isItemInCart(product.id) ? 'Убрать из корзины' : 'В корзину',
			(product) => {
				if (this.isItemInCart(product.id)) {
					this.modal.eventEmitter.emit(Events.REMOVE_FROM_CART, {
						payload: product.id,
					});
					this.close();
					return;
				}
				this.modal.eventEmitter.emit(Events.ADD_TO_CART, { payload: product });
				this.close();
			}
		);
		this.modal.openModal();
	}
	close(): void {
		this.modal.closeModal();
	}
}
