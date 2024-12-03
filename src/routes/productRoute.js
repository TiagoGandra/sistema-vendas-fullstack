import express from 'express';
import { 
  getProduct,
  getProducts,
  createProduct,
  updateProductDetails,
  deleteProductDetails,
} from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.get('/', getProducts);
productRouter.get('/:id', getProduct);
productRouter.post('/', createProduct);
productRouter.put('/:id', updateProductDetails);
productRouter.delete('/:id', deleteProductDetails);

export default productRouter;