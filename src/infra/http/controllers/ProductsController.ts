import { container } from 'tsyringe';
import { Request, Response } from 'express';
import CreateProductService from '@services/impl/CreateProductService';
import DeleteProductService from '@services/impl/DeleteProductService';
import UpdateProductService from '@services/impl/UpdateProductService';
import Category from '@domain/Category';
import ListProductService from '@services/impl/ListProductService';

import * as Yup from 'yup';
import AppError from '@errors/AppError';

const createValidator = Yup.object().shape({
  title: Yup.string().required().min(3).max(256),
  price: Yup.number().required(),
  description: Yup.string().required().min(8).max(256),
  categories: Yup.string().required(),
});

const updateValidator = Yup.object().shape({
  title: Yup.string().min(3).max(256),
  price: Yup.number(),
  description: Yup.string().min(8).max(256),
  categories: Yup.string(),
});

class ProductsController {
  constructor() {}

  async index(request: Request, response: Response): Promise<Response> {
    const listProductService = container.resolve(ListProductService);

    const { query } = request.query;

    let products;

    if (query) {
      products = await listProductService.findByTitleOrCategory(
        query as string,
      );
    } else {
      products = await listProductService.find();
    }

    return response.json(products);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const product = createValidator.validateSync(request.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    const createProductService = container.resolve(CreateProductService);

    const { title, description, price } = product;

    let { categories } = request.body;
    const listCategories = await this.getCategories(categories);

    if (!listCategories || (listCategories && listCategories.length === 0)) {
      throw new AppError('Missing categories', 400);
    }

    const data = await createProductService.execute({
      title,
      description,
      price,
      categories: listCategories,
    });

    return response.json(data);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const product = updateValidator.validateSync(request.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    const updateProductService = container.resolve(UpdateProductService);

    const { id } = request.params;

    const { title, description, price } = product;

    let { categories } = request.body;

    let listCategories;

    if (categories) {
      listCategories = await this.getCategories(categories);
    }

    const data = await updateProductService.execute(id, {
      title: title as string,
      description: description as string,
      price: price as number,
      categories: listCategories as Category[],
    });

    return response.json(data);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const deleteProductService = container.resolve(DeleteProductService);

    const { id } = request.params;

    const data = await deleteProductService.execute(id);

    return response.json(data);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const listProductService = container.resolve(ListProductService);
    const product = await listProductService.findById(id);

    return response.json(product);
  }

  private async getCategories(
    categories: string,
  ): Promise<Category[] | undefined> {
    let categoriesInstance;

    if (categories) {
      categoriesInstance = [];
      let toArray = categories.split(',');

      for (let category of toArray) {
        if (category !== '') {
          categoriesInstance.push({ name: category });
        }
      }
    }

    return categoriesInstance;
  }
}

export default ProductsController;
