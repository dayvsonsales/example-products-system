import IProductRepository from '@domain/IProductRepository';
import IDeleteProductService from '@services/IDeleteProductService';
import { inject, injectable } from 'tsyringe';

@injectable()
class DeleteProductService implements IDeleteProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) {}

  async execute(id: string): Promise<string> {
    const data = await this.productRepository.delete(id);

    return data;
  }
}

export default DeleteProductService;
