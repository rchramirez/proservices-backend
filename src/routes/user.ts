import { Router } from "express";
import User from "../controllers/UserController";
import checkAuth from "../middleware/checkAuth";

const router = Router();

router
    .route('/')
    .get(User.getUsers)
    .post(User.register);

router
    .route('/:id')
    .get(checkAuth, User.getUser)
    .delete(checkAuth, User.deleteUser)
    .put(checkAuth, User.updateUser);
    
router.post('/login', User.authenticate);

router.get("/confirm/:token", User.confirmEmail);

router.post("/forget-password", User.forgetPassword);

router
    .route("/forget-password/:token")
    .get(User.checkToken)
    .post(User.newPassword);

router.get("/profile/one", checkAuth, User.profile);

export default router;