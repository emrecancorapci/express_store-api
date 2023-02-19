import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Product from './models/product-model.js';

const products = await import('./data/products.json', {
  assert: { type: 'json' },
});

dotenv.config();

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    await Product.deleteMany({});
    await Product.insertMany(products.default);

    console.log('Data imported!');
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
