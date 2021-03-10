import Product from '@domain/Product';

export default interface IUpdateProductService {
  execute(id: string, data: Product): Promise<Product>;
}
