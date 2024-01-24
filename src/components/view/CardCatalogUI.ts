import { Category, Price, Product } from '../../types';
import { CDN_URL } from '../../utils/constants';

export class CardCatalogUI {
	static categoryColors: Record<Category, string> = {
		'софт-скил': '#83FA9D',
		другое: '#FAD883',
		дополнительное: '#B783FA',
		кнопка: '#83DDFA',
		'хард-скил': '#FAA083',
	};
	static renderCard(
		product: Product,
		container: Element,
		renderPrice: (price: Price) => string,
		onClick: () => void
	): void {
		const card = document.createElement('button');
		card.classList.add('gallery__item', 'card');
		card.innerHTML = `
			${CardCatalogUI.renderCategory(product.category)}
			<h2 class="card__title">${product.title}</h2>
			<img class="card__image" src="${CDN_URL}/${product.image}" alt="" />
			<span class="card__price">${renderPrice(product.price)}</span>
		`;
		card.addEventListener('click', onClick);
		container.appendChild(card);
	}
	static renderCategory(category: Category): string {
		return `
			<span class="card__category" style="background-color: ${CardCatalogUI.categoryColors[category]}">${category}</span>
		`;
	}

	static renderCardFull(
		product: Product,
		container: Element,
		renderPrice: (price: Price) => string,
		buttonText: string,
		onButtonClick: (product: Product) => void
	): void {
		const card = document.createElement('button');
		card.classList.add('card', 'card_full');
		card.innerHTML = `
			<img class="card__image" src="${CDN_URL}/${product.image}" alt="" />
			<div class="card__column">
				${CardCatalogUI.renderCategory(product.category)}
				<h2 class="card__title">${product.title}</h2>
				<p class="card__text">${product.description}</p>
				<div class="card__row">
					<button class="button">${buttonText}</button>
					<span class="card__price">${renderPrice(product.price)}</span>
				</div>
			</div>
		`;
		const button = card.querySelector('.button');
		button.addEventListener('click', () => {
			onButtonClick(product);
		});
		container.appendChild(card);
	}
}
