import mongoose from 'mongoose';

mongoose
  .connect(process.env.MONGO_CONNECTION || 'mongodb://localhost/products_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch(e => {
    throw new Error(`Cannot connect to mongodb ${e.message}`);
  });

mongoose.set('debug', true);
