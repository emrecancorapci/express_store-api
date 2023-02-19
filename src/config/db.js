import mongoose from 'mongoose';

export default async (url) =>
  mongoose
    .set('strictQuery', false)
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('Error connecting to MongoDB', err));
