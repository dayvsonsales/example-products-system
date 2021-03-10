import IProductRepository from '@domain/IProductRepository';
import Product from '@domain/Product';
import IListProductService from '@services/IListProductService';

export default class FakeListProductService implements IListProductService {
  constructor(private repository: IProductRepository) {}

  async find(): Promise<Product[]> {
    const products = this.repository.find();

    return products;
  }

  async findById(id: string): Promise<Product | null> {
    const products = this.repository.findById(id);

    return products;
  }

  async findByTitleOrCategory(query: string): Promise<Product[] | null> {
    const products = this.repository.findByTitleOrCategory(query);

    return products;
  }
}
