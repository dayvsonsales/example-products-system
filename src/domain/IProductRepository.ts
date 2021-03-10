import Category from './Category';
import Product from './Product';

export default interface IProductRepository {
  find(): Promise<Product[]>;
  findById(id: string): Promise<Product | null>;
  findByTitleOrCategory(data: string): Promise<Product[] | null>;
  create(data: Product): Promise<Product>;
  delete(id: string): Promise<string>;
  save(product: Product): Promise<Product>;
  associateCategory(id: string, category: Category): Promise<Product>;
}
