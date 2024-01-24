import { Events } from '../../types';
import { EventEmitter } from '../base/events';

export class CartIndicatorUI {
	container: Element;
	eventEmitter: EventEmitter;
	constructor(container: Element, eventEmitter: EventEmitter) {
		this.container = container;
		this.eventEmitter = eventEmitter;
		eventEmitter.on<{ payload: number }>(
			Events.UPDATE_CART_INDICATOR,
			(event) => this.renderIndicator(event.payload)
		);
		this.eventEmitter.emit(Events.UPDATE_CART_INDICATOR, { payload: 0 });
	}
	renderIndicator(count: number) {
		if (count < 0) {
			throw new Error('count must be greater than or equal to 0');
		}
		this.container.innerHTML = `<span class="header__basket-counter">${count}</span>`;
		this.container.addEventListener('click', () => {
			this.eventEmitter.emit(Events.OPEN_CART);
		});
	}
}
