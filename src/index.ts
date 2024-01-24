import './scss/styles.scss';
import { Api } from './components/base/api';
import {
	API_URL,
	CART_INDICATOR_SELECTOR,
	CATALOG_CONTAINER_SELECTOR,
	MODAL_CONTAINER_ID,
} from './utils/constants';
import { CardCatalogFullModal } from './components/modals/CardCatalogFullModal';
import { EventEmitter } from './components/base/events';
import { CartIndicatorUI } from './components/view/CartIndicatorUI';
import { CatalogUI } from './components/view/CatalogUI';
import { Products } from './components/model/Products';
import { Cart } from './components/model/Cart';
import { CartModal } from './components/modals/CartModal';
import { OrderModal } from './components/modals/OrderModal';
import { SuccessModal } from './components/modals/SuccessModal';

const api = new Api(API_URL);
const eventEmitter = new EventEmitter();
const cart = new Cart(eventEmitter);
const cardCatalogFullModal = new CardCatalogFullModal(
	MODAL_CONTAINER_ID,
	cart.isItemInCart.bind(cart),
	eventEmitter
);
new CartModal(MODAL_CONTAINER_ID, eventEmitter, cart);
new OrderModal(MODAL_CONTAINER_ID, eventEmitter);
new SuccessModal(MODAL_CONTAINER_ID, eventEmitter);

new CartIndicatorUI(
	document.querySelector(CART_INDICATOR_SELECTOR),
	eventEmitter
);
const catalogUI = new CatalogUI(
	document.querySelector(CATALOG_CONTAINER_SELECTOR)
);
new Products(api, (products) => {
	catalogUI.renderProducts(
		products,
		cardCatalogFullModal.open.bind(cardCatalogFullModal)
	);
});
