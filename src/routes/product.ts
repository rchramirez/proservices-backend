import { Router } from "express";
import Product from "../controllers/ProductController";
import checkAuth from "../middleware/checkAuth";

const router = Router();

router
    .route('/')
    .get(checkAuth, Product.getProducts)
    .post(checkAuth, Product.postProduct);

router
    .route('/:id')
    .get(checkAuth, Product.getProduct)
    .delete(checkAuth, Product.deleteProduct)
    .put(checkAuth, Product.updateProduct);

export default router; 