import { Product } from '../../types';
import { CartUI } from './CartUI';

export class SuccessUI {
	static render(
		container: Element,
		cartItems: Product[],
		onButtonClick: () => void
	) {
		container.innerHTML = `
			<div class="order-success">
<h2 class="order-success__title">Заказ оформлен</h2>
<p class="order-success__description">0</p>
<button class="button order-success__close">
За новыми покупками!
</button>
</div>
		`;

		const price = container.querySelector('.order-success__description');
		CartUI.renderTotalPrice(cartItems, price);

		const button = container.querySelector('.order-success__close');
		button.addEventListener('click', () => {
			onButtonClick();
		});
	}
}
