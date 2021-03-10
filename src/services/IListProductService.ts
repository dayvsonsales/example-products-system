import Product from '@domain/Product';

export default interface IListProductService {
  find(): Promise<Product[]>;
  findById(id: string): Promise<Product | null>;
  findByTitleOrCategory(query: string): Promise<Product[] | null>;
}
