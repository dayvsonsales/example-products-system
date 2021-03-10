import Product from '@domain/Product';
import IProductRepository from '@domain/IProductRepository';
import AppError from '@errors/AppError';
import Category from '@domain/Category';

export default class FakeProductRepository implements IProductRepository {
  private products: Product[];

  constructor() {
    this.products = [];
  }

  async associateCategory(id: string, category: Category): Promise<Product> {
    const exists = this.products.findIndex(p => p._id === id);

    if (exists !== -1) {
      if (!this.products[exists].categories) {
        this.products[exists].categories = [];
      }

      this.products[exists].categories.push(category);
    }

    return this.products[exists];
  }

  async find(): Promise<Product[]> {
    return this.products;
  }

  async findById(id: string): Promise<Product | null> {
    const products = this.products.find(v => v._id === id);

    return products || null;
  }

  async findByTitleOrCategory(data: string): Promise<Product[] | null> {
    const arrayTitleOrCategories = data.split(',');

    return this.products.filter(
      v =>
        v.categories.find(c => arrayTitleOrCategories.includes(c.name)) ||
        arrayTitleOrCategories.includes(v.title),
    );
  }

  async create(data: Product): Promise<Product> {
    data._id = `id-${Math.random()}`;

    this.products.push(data);

    return data;
  }

  async delete(id: string): Promise<string> {
    const index = this.products.findIndex(v => v._id === id);

    if (index === -1) {
      throw new AppError('Not found');
    }

    this.products.slice(index, 1);

    return id;
  }

  async save(product: Product): Promise<Product> {
    const index = this.products.findIndex(v => v._id === product._id);

    this.products[index] = product;

    return this.products[index];
  }
}
