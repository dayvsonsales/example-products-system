import Category from '@domain/Category';
import Product from '@domain/Product';

export default interface IAssociateCategoryProductService {
  execute(id: string, category: Category): Promise<Product>;
}
