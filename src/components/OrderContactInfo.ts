import { IContactsInfo } from '../types';
import { Form } from './Form';
import { IEvents } from './base/events';

export class OrderContactInfo extends Form<IContactsInfo> {
	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);

		this.container.addEventListener('submit', (e: Event) => {
			e.preventDefault();
			this.events.emit(`orderContactsInfo:submit`);
		});
	}

	protected onInputChange(field: keyof IContactsInfo, value: string) {
		this.events.emit('orderContactsInfo:change', {
			field,
			value,
		});
	}
}
