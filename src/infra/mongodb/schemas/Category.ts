import { Schema, model } from 'mongoose';

const CategorySchema = new Schema({
  name: String,
});

const Category = model('Category', CategorySchema);

export { Category, CategorySchema };
