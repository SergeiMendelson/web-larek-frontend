import { Events, Product } from '../../types';
import { PriceUI } from '../view/PriceUI';
import { CardCatalogUI } from '../view/CardCatalogUI';
import { EventEmitter } from '../base/events';
import { Modal } from './Modal';
import { MODAL_CONTENT_SELECTOR } from '../../utils/constants';

export class CardCatalogFullModal extends Modal {
	isItemInCart: (id: string) => boolean;
	constructor(
		modalContainerId: string,
		isItemInCart: (id: string) => boolean,
		eventEmitter: EventEmitter
	) {
		super(modalContainerId, eventEmitter);
		this.isItemInCart = isItemInCart;
	}
	open(product: Product): void {
		const modalContent = this.modalContainer.querySelector(
			MODAL_CONTENT_SELECTOR
		);
		modalContent.innerHTML = '';
		CardCatalogUI.renderCardFull(
			product,
			modalContent,
			PriceUI.renderPrice,
			this.isItemInCart(product.id) ? 'Убрать из корзины' : 'В корзину',
			(product) => {
				if (this.isItemInCart(product.id)) {
					this.eventEmitter.emit(Events.REMOVE_FROM_CART, {
						payload: product.id,
					});
					this.close();
					return;
				}
				this.eventEmitter.emit(Events.ADD_TO_CART, { payload: product });
				this.close();
			}
		);
		this.openModal();
	}
	close(): void {
		this.closeModal();
	}
}
