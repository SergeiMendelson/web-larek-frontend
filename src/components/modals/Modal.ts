import { Events } from '../../types';
import { EventEmitter } from '../base/events';
import { MODAL_CLOSE_SELECTOR } from '../../utils/constants';
// todo: make factory
export class Modal {
	modalContainerId: string;
	modalContainer: Element;
	eventEmitter: EventEmitter;

	constructor(modalContainerId: string, eventEmitter: EventEmitter) {
		this.modalContainerId = modalContainerId;
		this.modalContainer = document.createElement('div');
		this.modalContainer.classList.add('modal');
		this.modalContainer.id = this.modalContainerId;
		this.eventEmitter = eventEmitter;

		this.modalContainer.innerHTML = `
			<div class="modal__container">
				<button class="modal__close" aria-label="закрыть"></button>
				<div class="modal__content"></div>
			</div>
		`;

		const closeBtn = this.modalContainer.querySelector(MODAL_CLOSE_SELECTOR);
		if (closeBtn) {
			closeBtn.addEventListener('click', () => {
				this.closeModal();
			});
		}
		const OnEscapePressed = (event: KeyboardEvent) => {
			if (
				event.key === 'Escape' &&
				this.modalContainer.classList.contains('modal_active')
			) {
				this.closeModal();
			}
		};
		document.addEventListener('keydown', OnEscapePressed);
		document.body.appendChild(this.modalContainer);
		this.eventEmitter.on(Events.CLOSE_MODAL, () => {
			this.closeModal();
		});
	}
	openModal(): void {
		this.eventEmitter.emit(Events.CLOSE_MODAL);
		this.modalContainer.classList.add('modal_active');
		document.body.classList.add('no-scroll');
	}
	closeModal(): void {
		document.body.classList.remove('no-scroll');
		this.modalContainer.classList.remove('modal_active');
	}
}
