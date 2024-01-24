import { Product } from '../../types';
import { CardCatalogUI } from './CardCatalogUI';
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
			CardCatalogUI.renderCard(product, container, PriceUI.renderPrice, () => {
				openModal(product);
			});
		});
	}
}
