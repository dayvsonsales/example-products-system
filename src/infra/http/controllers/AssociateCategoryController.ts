import AssociateCategoryProductService from '@services/impl/AssociateCategoryProductService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import * as Yup from 'yup';

const validator = Yup.object().shape({
  category: Yup.string().required(),
});

class AssociateCategoryController {
  async create(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const associateCategoryProductService = container.resolve(
      AssociateCategoryProductService,
    );

    const categoryObject = validator.validateSync(request.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    const { category } = categoryObject;

    const product = await associateCategoryProductService.execute(id, {
      name: category,
    });

    return response.json(product);
  }
}

export default AssociateCategoryController;
