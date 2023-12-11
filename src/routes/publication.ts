import { Router } from "express";
import Publication from "../controllers/PublicationController";
import checkAuth from "../middleware/checkAuth";

const router = Router();

router
    .route('/')
    .get(checkAuth, Publication.getPublications)
    .post(checkAuth, Publication.postPublication);

router
    .route('/:id')
    .get(checkAuth, Publication.getPublication)
    .delete(checkAuth, Publication.deletePublication)
    .put(checkAuth, Publication.updatePublication);

export default router; 