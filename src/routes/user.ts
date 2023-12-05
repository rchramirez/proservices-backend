import { Router } from "express";
import { UserController } from "../controllers/UserController";


const router = Router();

router.post('/', UserController.register);
router.post('/login', UserController.authenticate)

export default router;