import express from 'express';
import {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/products-controller.js';

const router = express.Router();

router.route('/').get(getProducts).post(addProduct);
router
  .route('/:id')
  .get(getProductById)
  .patch(updateProduct)
  .delete(deleteProduct);


export default router;
