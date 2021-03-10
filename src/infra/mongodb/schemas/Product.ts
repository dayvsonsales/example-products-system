import { Schema, model, Document } from 'mongoose';
import { CategorySchema } from '@schemas/Category';
import ProductDomain from '@domain/Product';

const ProductSchema = new Schema({
  title: String,
  price: Number,
  description: String,
  categories: [CategorySchema],
});

const Product = model<ProductDomain & Document>('Product', ProductSchema);

export { Product, ProductSchema };
