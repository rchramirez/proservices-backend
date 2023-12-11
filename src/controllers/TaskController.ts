import { Request, Response } from "express";
import Task from "../models/Task";

class TaskController {

    static async getTasks(req: Request, res: Response): Promise<void> {
        const listTasks = await Task.findAll()

        res.json(listTasks)
    }

    static async getTask(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const task = await Task.findByPk(id);

        if (task) {
            res.json(task)
        } else {
            res.status(404).json({
                msg: `No existe un task con el id ${id}`
            })
        }
    }

    static async deleteTask(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const task = await Task.findByPk(id);

        if (!task) {
            res.status(404).json({
                responseCode: 10010,
                responseMessage: `No existe un task con el id ${id}`
            })
        } else {
            await task?.destroy();
            res.json({
                msg: 'El task fue eliminado con exito!'
            })
        }
    }

    static async postTask(req: Request, res: Response): Promise<void> {
        const task = new Task(req.body);
        try {
            await task.save();

            res.json({
                msg: 'El task fue agregado con exito!'
            })
        } catch (error) {
            console.log(error);
            res.json({
                msg: 'Error al insertar el task!'
            })
        }
    }

    static async updateTask(req: Request, res: Response): Promise<void> {
        const { body } = req;
        const { id } = req.params;

        const task = await Task.findByPk(id);
        try {
            if (task) {
                await task.update(body);
                res.json({
                    msg: 'El task fue actualizado con exito!'
                })
            } else {
                res.status(404).json({
                    msg: `No existe un task con el id ${id}`
                })
            }
        } catch (error) {
            console.log(error);
            res.json({
                msg: 'Error al actualizar el task!'
            })
        }
    }
}

export default TaskController;