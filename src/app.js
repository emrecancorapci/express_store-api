import express from 'express';
import notFoundMiddleware from './middlewares/not-found.js';
import errorHandler from './middlewares/error-handler.js';
import productsRouter from './routes/products.js';

const app = express();

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products">Products Route</a>');
});

app.use('/api/v1/products', productsRouter)

app.use(notFoundMiddleware);
app.use(errorHandler);

export default app;
