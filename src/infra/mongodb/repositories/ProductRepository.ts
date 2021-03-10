import Category from '@domain/Category';
import IProductRepository from '@domain/IProductRepository';
import Product from '@domain/Product';
import AppError from '@errors/AppError';
import { Product as ProductModel } from '@schemas/Product';

class ProductRepository implements IProductRepository {
  async find(): Promise<Product[]> {
    const products = ProductModel.find({});

    return products;
  }

  async findById(id: string): Promise<Product | null> {
    const product = ProductModel.findById(id);

    return product;
  }

  async findByTitleOrCategory(data: string): Promise<Product[] | null> {
    const query = data.split(',');

    const product = await ProductModel.find({
      $or: [
        { title: { $regex: data, $options: 'i' } },
        { 'categories.name': { $in: [...query] } },
      ],
    });

    return product;
  }

  async create(data: Product): Promise<Product> {
    const product = new ProductModel(data);

    await product.save();

    return product;
  }

  async delete(id: string): Promise<string> {
    await ProductModel.findByIdAndDelete(id);

    return id;
  }

  async save(product: Product): Promise<Product> {
    try {
      const validAtributes: { [key: string]: any } = product;

      Object.keys(validAtributes).forEach(
        key => validAtributes[key] === undefined && delete validAtributes[key],
      );

      const updatedProduct = await ProductModel.findByIdAndUpdate(
        product._id,
        validAtributes,
        {
          returnOriginal: false,
          new: true,
        },
      );

      return updatedProduct as Product;
    } catch (e) {
      throw new AppError('Something wrong happened. Try again later', 500);
    }
  }

  async associateCategory(id: string, category: Category): Promise<Product> {
    const product = await ProductModel.findById(id);

    if (!product) {
      throw new AppError('Product not found', 404);
    }

    if (product && !product?.categories) {
      product.categories = [];
    }

    product?.categories.push(category);

    const data = await product.save();

    return data;
  }
}

export default ProductRepository;
