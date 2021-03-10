import Category from './Category';

export default interface Product {
  _id?: string;
  title: string;
  description: string;
  price: number;
  categories: Category[];
  created_at?: Date;
  updated_at?: Date;
}
