import Product from '@domain/Product';
import IProductRepository from '@domain/IProductRepository';
import ICreateProductService from '@services/ICreateProductService';
import { injectable, inject } from 'tsyringe';

@injectable()
class CreateProductService implements ICreateProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) {}

  async execute(data: Product): Promise<Product> {
    const product = await this.productRepository.create(data);

    return product;
  }
}

export default CreateProductService;
