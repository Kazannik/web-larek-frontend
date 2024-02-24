import { IPaymentInfo } from '../types';
import { Form } from './Form';
import { IEvents } from './base/events';

export class OrderPaymentInfo extends Form<IPaymentInfo> {
	protected selectorOn?: HTMLElement;
	protected selectorOff?: HTMLElement;

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);
		this.selectorOn = this.container.querySelector('[name="card"]');
		this.selectorOff = this.container.querySelector('[name="cash"]');

		this.selectorOn.addEventListener('click', (e: Event) => {
			e.preventDefault();
			this.selectorOn.classList.add('button_alt-active');
			this.selectorOff.classList.remove('button_alt-active');
			this.onInputChange('payment', 'online');
		});

		this.selectorOff.addEventListener('click', (e: Event) => {
			e.preventDefault();
			this.selectorOff.classList.add('button_alt-active');
			this.selectorOn.classList.remove('button_alt-active');
			this.onInputChange('payment', 'offline');
		});

		this.container.addEventListener('submit', (e: Event) => {
			e.preventDefault();
			this.events.emit(`orderPaymentInfo:submit`);
		});
	}

	protected onInputChange(field: keyof IPaymentInfo, value: string) {
		this.events.emit('orderPaymentInfo:change', {
			field,
			value,
		});
	}

	reset(): void {
		this.selectorOn.classList.remove('button_alt-active');
		this.selectorOff.classList.remove('button_alt-active');
	}
}
