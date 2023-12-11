import { Router } from "express";
import Administrator from "../controllers/AdministratorController";
import checkAuth from "../middleware/checkAuth";

const router = Router();

router
    .route('/')
    .get(checkAuth, Administrator.getAdministrators)
    .post(checkAuth, Administrator.postAdministrator);

router
    .route('/:id')
    .get(checkAuth, Administrator.getAdministrator)
    .delete(checkAuth, Administrator.deleteAdministrator)
    .put(checkAuth, Administrator.updateAdministrator);

export default router; 