import { Product } from '../../types';
import { PriceUI } from './PriceUI';

export class OrderUI {
	static renderPaymentForm(
		activeButton: { idx: number | null },
		onButtonClick: (idx: number) => void,
		container: Element,
		deliveryInput: { value: string },
		onInput: (event: Event) => void
	): Promise<void> {
		return new Promise((res) => {
			container.innerHTML = '';
			const element = document.createElement('div');
			element.classList.add('order');

			element.innerHTML = `
<form class="form" name="order">
<div class="order">
			<div class="order__field">
				<h2 class="modal__title">Способ оплаты</h2>
				<div class="order__buttons">
					<button name="card" type="button" class="button button_alt">
						Онлайн
					</button>
					<button name="cash" type="button" class="button button_alt">
						При получении
					</button>
				</div>
			</div>
			<label class="order__field">
				<span class="form__label modal__title">Адрес доставки</span>
				<input
					name="address"
					class="form__input"
					type="text"
					placeholder="Введите адрес доставки"
				/>
			</label>
</div>
<div class="modal__actions">
	<button type="submit" disabled class="button order__button">
		Далее
	</button>
	<span class="form__errors"></span>
</div>
</form>
		`;
			const submitButton = element.querySelector(
				'.order__button'
			) as HTMLButtonElement;

			const checkSubmitButton = () => {
				submitButton.disabled =
					!deliveryInput.value || activeButton.idx === null;
			};
			checkSubmitButton();

			const buttons = element.querySelectorAll('.order__buttons button');
			const renderButtons = () => {
				buttons.forEach((button, idx) => {
					button.addEventListener('click', () => {
						onButtonClick(idx);
						renderButtons();
						checkSubmitButton();
					});
					if (activeButton.idx === idx) {
						button.classList.add('button_alt-active');
					} else {
						button.classList.remove('button_alt-active');
					}
				});
			};
			renderButtons();

			const input = element.querySelector('input');
			input.value = deliveryInput.value;
			input.addEventListener('input', (event) => {
				onInput(event);
				checkSubmitButton();
			});

			const form = element.querySelector('form') as HTMLFormElement;
			form.addEventListener('submit', (event) => {
				event.preventDefault();
				res();
			});
			container.appendChild(element);
		});
	}
	static renderContactForm(
		container: Element,
		emailInput: { value: string },
		onEmailInput: (event: Event) => void,
		phoneInput: { value: string },
		onPhoneInput: (event: Event) => void
	): Promise<void> {
		return new Promise((res, rej) => {
			container.innerHTML = '';
			const element = document.createElement('div');
			element.classList.add('order');
			element.innerHTML = `
<form class="form" name="order">
<div class="order">
			<label class="order__field">
				<span class="form__label modal__title">Email</span>
				<input
					name="email"
					class="form__input"
					placeholder="Введите email"
				/>
			</label>
			<label class="order__field">
				<span class="form__label modal__title">Телефон</span>
				<input
					name="phone"
					class="form__input"
					placeholder="Введите телефон"
				/>
			</label>
</div>
<div class="modal__actions">
	<button type="submit" disabled class="button order__button">
		Далее
	</button>
	<span class="form__errors"></span>
</div>
</form>
		`;

			const submitButton = element.querySelector(
				'.order__button'
			) as HTMLButtonElement;
			const checkSubmitButton = () => {
				submitButton.disabled = !emailInput.value || !phoneInput.value;
			};
			checkSubmitButton();

			const emailInputEl = element.querySelector(
				'input[name="email"]'
			) as HTMLInputElement;
			emailInputEl.value = emailInput.value;
			emailInputEl.addEventListener('input', (event) => {
				onEmailInput(event);
				checkSubmitButton();
			});

			const phoneInputEl = element.querySelector(
				'input[name="phone"]'
			) as HTMLInputElement;
			phoneInputEl.value = phoneInput.value;
			phoneInputEl.addEventListener('input', (event) => {
				onPhoneInput(event);
				checkSubmitButton();
			});

			const form = element.querySelector('form') as HTMLFormElement;

			form.addEventListener('submit', (event) => {
				event.preventDefault();
				res();
			});

			container.appendChild(element);
		});
	}
}
