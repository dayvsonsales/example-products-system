import AppError from '@errors/AppError';
import AssociateCategoryProductService from '@services/impl/AssociateCategoryProductService';
import FakeProductRepository from '../../repositories/fakes/FakeProductRepository';

describe('Associate Category Product Service', () => {
  it('should be able to associate a category to an existing product', async () => {
    const fakeProductRepository = new FakeProductRepository();

    const associateCategory = new AssociateCategoryProductService(
      fakeProductRepository,
    );

    const product = await fakeProductRepository.create({
      title: 'Celular',
      description: 'Celular bom',
      price: 4000,
      categories: [{ name: 'eletronico' }, { name: 'portatil' }],
    });

    expect(
      await associateCategory.execute(product._id as string, {
        name: 'smartphone',
      }),
    ).toEqual(
      expect.objectContaining({
        categories: [
          { name: 'eletronico' },
          { name: 'portatil' },
          { name: 'smartphone' },
        ],
      }),
    );
  });

  it('should not be able to associate a category to a no existing product', async () => {
    const fakeProductRepository = new FakeProductRepository();

    const associateCategory = new AssociateCategoryProductService(
      fakeProductRepository,
    );

    expect(
      associateCategory.execute('unknown', {
        name: 'smartphone',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
