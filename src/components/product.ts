import { IProduct } from '../types';
import { Model } from './base/Model';

export class Product1 extends Model<IProduct> {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
}
