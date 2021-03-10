import Product from '@domain/Product';

import IProductRepository from '@domain/IProductRepository';
import AppError from '@errors/AppError';
import IUpdateProductService from '@services/IUpdateProductService';
import { injectable, inject } from 'tsyringe';

@injectable()
class UpdateProductService implements IUpdateProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) {}

  async execute(
    _id: string,
    {
      title,
      description,
      price,
      categories,
    }: Omit<Product, '_id' | 'created_at' | 'updated_at'>,
  ): Promise<Product> {
    const currentProduct = await this.productRepository.findById(_id);

    if (!currentProduct) {
      throw new AppError('Invalid product id', 404);
    }

    const data = await this.productRepository.save({
      _id,
      title,
      description,
      price,
      categories,
    });

    return data;
  }
}

export default UpdateProductService;
