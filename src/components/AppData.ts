import {
	ContactsFormErrors,
	IAppState,
	IOrder,
	IOrderFormError,
	IProduct,
	IProductNote,
	PaymentFormErrors,
	payment,
} from '../types';

import { IEvents } from './base/events';

export class AppData implements IAppState {
	protected event: IEvents;
	protected product: IProduct | null;

	constructor(event: IEvents) {
		this.event = event;
	}

	order: IOrder = {
		notes: [],
		payment: null,
		total: null,
		address: '',
		email: '',
		phone: '',
		id: '',
    items:[]
	};

	paymentFormErrors: PaymentFormErrors = {};

	contactsFormErrors: ContactsFormErrors = {};

	setInitialStore(store: IProduct[]): void {
		this.event.emit('store:changed', store);
	}

	setProduct(item: IProduct) {
		this.product = item;
		this.event.emit('card:render', item);
	}

	getProduct(): IProduct | null {
		return this.product;
	}

	addProductToBasket(value: IProductNote): void {
		this.order.notes.push(value);
		this.calculateTotal(value);
	}

	removeProductFromBasket(value: IProductNote): void {
		this.order.notes = this.order.notes.filter((note) => note.id !== value.id);
		this.calculateTotal(value);
	}

	calculateTotal(value: IProductNote): void {
		this.order.total = this.order.notes.reduce(
			(a, c) => a + this.order.notes.find((it) => it.id === c.id).price,
			0
		);
    this.order.items = this.order.notes.map(x => x.id);
		this.event.emit('basket:changed', {
			basket: this.order.notes,
			item: value,
		});
	}

	existsProductInBasket(value: IProductNote): boolean {
		return (
			undefined !== this.order.notes.find((element) => element.id === value.id)
		);
	}

	getTotalBasketPrice(): number {
		return this.order.notes.reduce((sum, next) => sum + next.price, 0);
	}

	setOrderInfoField(field: keyof IOrderFormError, value: string) {
		if (field === 'payment') {
			this.order.payment =  value === 'online' ? 'online' : 'offline';
		}
		if (field === 'address') {
			this.order.address = value;
		}
		if (field === 'email') {
			this.order.email = value;
		}
		if (field === 'phone') {
			this.order.phone = value;
		}
	}

	setPaymentInfo(payment: payment, address: string): void {
		this.order.payment = payment;
		this.order.address = address;

		if (this.validatePaymentInfo()) {
			this.event.emit('payment:ready', this.order);
		}
	}

	validatePaymentInfo(): boolean {
		const errors: typeof this.paymentFormErrors = {};
		if (!this.order.payment) {
			errors.payment = 'Необходимо выбрать способ оплаты';
		}
		if (!this.order.address) {
			errors.address = 'Необходимо указать адрес доставки';
		}
		this.paymentFormErrors = errors;
		this.event.emit('paymentFormErrors:change', this.paymentFormErrors);
		return Object.keys(errors).length === 0;
	}

	setContactsInfo(email: string, phone: string): void {
		this.order.email = email;
		this.order.phone = phone;

		if (this.validateContactsInfo()) {
			this.event.emit('contacts:ready', this.order);
		}
	}

	validateContactsInfo(): boolean {
		const errors: typeof this.contactsFormErrors = {};
		if (!this.order.email) {
			errors.email = 'Необходимо указать email';
		}
		if (!this.order.phone) {
			errors.phone = 'Необходимо указать номер телефона';
		}
		this.contactsFormErrors = errors;
		this.event.emit('contactsFormErrors:change', this.contactsFormErrors);
		return Object.keys(errors).length === 0;
	}

	pay(): void {
		this.event.emit('order:pay', this.order );
		this.order = {
			notes: [],
			payment: null,
			total: null,
			address: '',
			email: '',
			phone: '',
			id: '',
      items:[],
		};
		this.event.emit('basket:changed', this.order.notes);
	}
}
