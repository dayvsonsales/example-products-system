import { container } from 'tsyringe';
import '@container/providers';

import ProductRepository from '@infra/mongodb/repositories/ProductRepository';
import IProductRepository from '@domain/IProductRepository';

container.registerSingleton<IProductRepository>(
  'ProductRepository',
  ProductRepository,
);
