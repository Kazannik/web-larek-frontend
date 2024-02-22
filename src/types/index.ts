export interface ISmallProductCard {
  id: string;
  title: string;
  price: number | null;
}

export interface IProductCard extends ISmallProductCard {
  category: string;
  imageUrl: string;
}

export interface IProduct extends IProductCard {
	description: string;	
}

export type payment = 'outline' | 'upon delivery';

export interface IPaymentInfo {
  payment: payment;
  email: string;  
}

export interface IContactInfo {
  phone: string;
  address: string;  
}

export interface IOrder extends IPaymentInfo, IContactInfo {  
	id: string;
  total: number;
  items: IProduct[];
}

export type PaymentFormErrors = {
  address?: string;
  payment?: string;
};

export type ContactFormErrors = {
  email?: string;
  phone?: string;
};

export interface IOrderFormError extends PaymentFormErrors, ContactFormErrors {}

export interface IAppState {
  
  getInitialStore(items: IProduct[]):void;

  store: IProduct[];
  
  getProductInStore(id: string): IProduct;
  
  basket: ISmallProductCard[];

  addProductToBasket (value: ISmallProductCard): void;

  removeProductFromBasket (value: ISmallProductCard): void;

  existsProductInBasket(value: ISmallProductCard): boolean;

  getTotalBasketPrice(): number;

  setPaymentInfo(payment: payment, address: string): void;
  
  validatePaymentInfo(): boolean;

  setContactsInfo(email: string, phone: string): void;

  validateContactsInfo(): boolean;
  
  pay():void;

}