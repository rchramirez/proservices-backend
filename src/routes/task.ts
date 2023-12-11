import { Router } from "express";
import Task from "../controllers/TaskController";
import checkAuth from "../middleware/checkAuth";

const router = Router();

router
    .route('/')
    .get(checkAuth, Task.getTasks)
    .post(checkAuth, Task.postTask);

router
    .route('/:id')
    .get(checkAuth, Task.getTask)
    .delete(checkAuth, Task.deleteTask)
    .put(checkAuth, Task.updateTask);

export default router; 