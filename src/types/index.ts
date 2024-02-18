interface ISmallProductCard {
  id: string;
  title: string;
  price: number | null;
}

interface IProductCard extends ISmallProductCard {
  category: string;
  imageUrl: string;
}

interface IProduct extends IProductCard {
	description: string;	
}

interface IGallery {
  items: IProduct[];  
}

interface IBasket {
  id: string;
  total: number;
  items: IGallery;
  addProduct(id: string): void;
  removeProduct(id: string): void;
  clear(): void;
} 

type payment = 'outline' | 'upon delivery';

interface IPaymentInfo {
  payment: payment;
  email: string;  
}

interface IContactInfo {
  phone: string;
  address: string;  
}

interface IOrder extends IBasket, IPaymentInfo, IContactInfo {  
	pay(): boolean;
}

type PaymentFormErrors = {
  address?: string;
  payment?: string;
};

type ContactsFormErrors = {
  email?: string;
  phone?: string;
};

interface IOrderFormError extends PaymentFormErrors, ContactsFormErrors {}