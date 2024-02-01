import { Product } from '../../types';
import { renderCard } from './CardCatalogUIHelpers';
import { PriceUI } from './PriceUI';

export class CatalogUI {
	private container: Element;
	constructor(container: Element) {
		this.container = container;
	}
	renderProducts(
		products: Product[],
		openModal: (product: Product) => void
	): void {
		const container = this.container;
		products.forEach((product) => {
			renderCard(product, container, PriceUI.renderPrice, () => {
				openModal(product);
			});
		});
	}
}
