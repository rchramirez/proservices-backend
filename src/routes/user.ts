import { Router } from "express";
import User from "../controllers/UserController";


const router = Router();

router.post('/', User.register);
router.post('/login', User.authenticate)

export default router;