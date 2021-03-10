import Category from '@domain/Category';
import IProductRepository from '@domain/IProductRepository';
import Product from '@domain/Product';
import AppError from '@errors/AppError';
import IAssociateCategoryProductService from '@services/IAssociateCategoryProductService';
import { inject, injectable } from 'tsyringe';

@injectable()
class AssociateCategoryProductService
  implements IAssociateCategoryProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) {}

  async execute(id: string, category: Category): Promise<Product> {
    const exists = await this.productRepository.findById(id);

    if (!exists) {
      throw new AppError('Product not found', 404);
    }

    const product = await this.productRepository.associateCategory(
      id,
      category,
    );

    return product;
  }
}

export default AssociateCategoryProductService;
