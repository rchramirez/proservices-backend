import { Router } from "express";
import Work from "../controllers/WorkController";
import checkAuth from "../middleware/checkAuth";

const router = Router();

router
    .route('/')
    .get(Work.getDocumentation)
    .get(checkAuth, Work.getWorks)
    .post(checkAuth, Work.postWork);

router
    .route('/:id')
    .get(checkAuth, Work.getWork)
    .delete(checkAuth, Work.deleteWork)
    .put(checkAuth, Work.updateWork);

export default router; 