import { ContactFormErrors, IAppState, IOrder, IProduct, ISmallProductCard, PaymentFormErrors, payment } from "../types";
import { IEvents } from "./base/events";
import { Product } from "./product";

export class AppData implements IAppState {

  protected event: IEvents;

  constructor(event: IEvents) {
    this.event = event;
  }

  store: IProduct[];
  
  basket: ISmallProductCard[];

  order: IOrder = {
    items: [],
    payment: 'outline',
    total: null,
    address: '',
    email: '',
    phone: '',
    id: "",
  };

  paymentFormErrors: PaymentFormErrors = {};

  contactFormErrors: ContactFormErrors = {};

  getInitialStore(items: IProduct[]): void {
    this.store = items.map((item) => new Product({ ...item }, this.event));
    this.event.emit('store:changed', { store: this.store });
  }

  getProductInStore(id: string): IProduct {
    return this.store.find(x => x.id === id);    
  }

  addProductToBasket(value: ISmallProductCard): void {
    this.basket.push(value);
    this.event.emit('basket:changed', { bascet: this.basket })
  }

  removeProductFromBasket(value: ISmallProductCard): void {
    this.basket = this.basket.filter(item => item.id !== value.id)
    this.event.emit('basket:changed', { bascet: this.basket })
  }

  existsProductInBasket(value: ISmallProductCard): boolean {    
    return this.basket.find(x => x.id === value.id) != null;
  }

  getTotalBasketPrice(): number {
    return this.basket.reduce((sum, next) => sum + next.price, 0);
  }

  setPaymentInfo(payment: payment, address: string): void {
    this.order.payment = payment;
    this.order.address = address;
    
    if (this.validatePaymentInfo()) {
      this.event.emit('payment:ready', this.order)
    }
  }

  validatePaymentInfo(): boolean {
    const errors: typeof this.paymentFormErrors = {};
    if (!this.order.email) {
      errors.payment = 'Необходимо выбрать способ оплаты';
    }
    if (!this.order.phone) {
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
      this.event.emit('contacts:ready', this.order)
    }
  }

  validateContactsInfo(): boolean {
    const errors: typeof this.contactFormErrors = {};
    if (!this.order.email) {
      errors.email = 'Необходимо указать email';
    }
    if (!this.order.phone) {
      errors.phone = 'Необходимо указать номер телефона';
    }
    this.contactFormErrors = errors;
    this.event.emit('contactFormErrors:change', this.contactFormErrors);
    return Object.keys(errors).length === 0;
  }
  
  pay(): void {
    this.order = {
    items: [],
    payment: 'outline',
    total: null,
    address: '',
    email: '',
    phone: '',
    id: "",
    };
    this.event.emit('basket:changed', { bascet: this.basket })
    this.event.emit('order:pay', { order: this.order })
  }

}