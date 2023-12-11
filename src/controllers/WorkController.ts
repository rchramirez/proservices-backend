import { Request, Response } from "express";
import Work from "../models/Work";

class WorkController {

    static async getWorks(req: Request, res: Response): Promise<void> {
        const listWorks = await Work.findAll()

        res.json(listWorks)
    }

    static async getWork(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const work = await Work.findByPk(id);

        if (work) {
            res.json(work)
        } else {
            res.status(404).json({
                msg: `No existe un work con el id ${id}`
            })
        }
    }

    static async deleteWork(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const work = await Work.findByPk(id);

        if (!work) {
            res.status(404).json({
                responseCode: 10010,
                responseMessage: `No existe un work con el id ${id}`
            })
        } else {
            await work?.destroy();
            res.json({
                msg: 'El work fue eliminado con exito!'
            })
        }
    }

    static async postWork(req: Request, res: Response): Promise<void> {
        const work = new Work(req.body);
        try {
            await work.save();

            res.json({
                msg: 'El work fue agregado con exito!'
            })
        } catch (error) {
            console.log(error);
            res.json({
                msg: 'Error al insertar el work!'
            })
        }
    }

    static async updateWork(req: Request, res: Response): Promise<void> {
        const { body } = req;
        const { id } = req.params;

        const work = await Work.findByPk(id);
        try {
            if (work) {
                await work.update(body);
                res.json({
                    msg: 'El work fue actualizado con exito!'
                })
            } else {
                res.status(404).json({
                    msg: `No existe un work con el id ${id}`
                })
            }
        } catch (error) {
            console.log(error);
            res.json({
                msg: 'Error al actualizar el work!'
            })
        }
    }
}

export default WorkController;