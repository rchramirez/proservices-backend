import { Router } from "express";
import Consumer from "../controllers/ConsumerController";
import checkAuth from "../middleware/checkAuth";

const router = Router();

router
    .route('/')
    .get(checkAuth, Consumer.getConsumers)
    .post(checkAuth, Consumer.postConsumer);

router
    .route('/:id')
    .get(checkAuth, Consumer.getConsumer)
    .delete(checkAuth, Consumer.deleteConsumer)
    .put(checkAuth, Consumer.updateConsumer);

export default router; 