import mongoose from 'mongoose';

export default mongoose.model(
  'Product',
  new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Please provide a name for the product.'],
      length: [2, 255, 'Name must be longer than 2 characters.'],
    },
    company: {
      type: String,
      required: [true, 'Please provide a company for the product.'],
      length: [2, 255, 'Company must be longer than 2 characters.'],
      enum: {
        values: ['ikea', 'liddy', 'caressa', 'marcos'],
        message: '{VALUE} is not supported.',
      },
    },
    featured: {
      type: Boolean,
      required: true,
      default: false,
    },
    price: {
      type: Number,
      required: [true, 'Please provide a price for the product.'],
      min: 0,
    },
    rating: {
      type: Number,
      required: false,
      Range: [1, 5],
    },
    createdAt: {
      type: Date,
      required: false,
      range: [new Date(2023, 1, 1), new Date()],
      default: Date.now(),
    },
  })
);
