import Product from '@domain/Product';

export default interface ICreateProductService {
  execute(
    data: Omit<Product, 'id' | 'created_at' | 'updated_at'>,
  ): Promise<Product>;
}
