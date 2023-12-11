import { Router } from "express";
import Service from "../controllers/ServiceController";
import checkAuth from "../middleware/checkAuth";

const router = Router();

router
    .route('/')
    .get(checkAuth, Service.getServices)
    .post(checkAuth, Service.postService);

router
    .route('/:id')
    .get(checkAuth, Service.getService)
    .delete(checkAuth, Service.deleteService)
    .put(checkAuth, Service.updateService);

export default router; 