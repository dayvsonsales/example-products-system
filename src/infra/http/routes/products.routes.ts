import { Router } from 'express';
import AssociateCategoryController from '../controllers/AssociateCategoryController';

import ProductsController from '../controllers/ProductsController';

const productsRouter = Router();
const productsController = new ProductsController();
const associateCategoryController = new AssociateCategoryController();

productsRouter.get('/', productsController.index);
productsRouter.get('/:id', productsController.show);

productsRouter.post('/', (request, response) =>
  productsController.create(request, response),
);

productsRouter.post('/associate/:id', (request, response) =>
  associateCategoryController.create(request, response),
);

productsRouter.put('/:id', (request, response) =>
  productsController.update(request, response),
);

productsRouter.delete('/:id', productsController.delete);

export default productsRouter;
