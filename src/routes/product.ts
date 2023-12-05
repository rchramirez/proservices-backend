import { Router } from "express";
import { ProductController } from "../controllers/ProductController";
import validateToken from "./validate-token";

const router = Router();

router.get('/', validateToken, ProductController.getProducts);
router.get('/:id', validateToken, ProductController.getProduct);
router.delete('/:id', validateToken, ProductController.deleteProduct);
router.post('/', validateToken, ProductController.postProduct);
router.put('/:id', validateToken, ProductController.updateProduct);

export default router; 