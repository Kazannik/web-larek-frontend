import { IProduct } from '../types';
import { objectModel } from './base/model';

export class Product extends objectModel<IProduct> {
  id: string;
  description: string;
  imageUrl: string;
  title: string;
  category: string;
  price: number | null;
}