// todo: make dependency inversion
import { Product } from '../../types';
import { Api } from '../base/api';

export class Products {
	products: Product[];
	api: Api;
	onFetch: (products: Product[]) => void;
	constructor(api: Api, onFetch: (products: Product[]) => void) {
		this.products = [];
		this.api = api;
		this.onFetch = onFetch;
		this.fetchProducts();
	}
	fetchProducts(): void {
		this.api
			.get('/product')
			.then((data: { items: Product[] }) => {
				this.products = data.items;
				this.onFetch(this.products);
			})
			.catch((err) => {
				console.log(err, 'ProductManager: Ошибка при получении данных');
			});
	}
	getProducts(): Product[] {
		return this.products;
	}
}
