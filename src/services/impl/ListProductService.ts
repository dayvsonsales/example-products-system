import IProductRepository from '@domain/IProductRepository';
import Product from '@domain/Product';
import IListProductService from '@services/IListProductService';
import { injectable, inject } from 'tsyringe';

@injectable()
class ListProductService implements IListProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) {}

  async find(): Promise<Product[]> {
    const products = await this.productRepository.find();

    return products;
  }

  async findById(id: string): Promise<Product | null> {
    const product = await this.productRepository.findById(id);

    return product;
  }

  async findByTitleOrCategory(query: string): Promise<Product[] | null> {
    const product = await this.productRepository.findByTitleOrCategory(query);

    return product;
  }
}

export default ListProductService;
