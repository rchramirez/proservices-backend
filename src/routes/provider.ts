import { Router } from "express";
import Provider from "../controllers/ProviderController";
import checkAuth from "../middleware/checkAuth";

const router = Router();

router
    .route('/')
    .get(checkAuth, Provider.getProviders)
    .post(checkAuth, Provider.postProvider);

router
    .route('/:id')
    .get(checkAuth, Provider.getProvider)
    .delete(checkAuth, Provider.deleteProvider)
    .put(checkAuth, Provider.updateProvider);

export default router; 