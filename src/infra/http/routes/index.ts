import { Router } from 'express';

import productsRouter from '@infra/http/routes/products.routes';

const routes = Router();

routes.use('/products', productsRouter);

export default routes;
