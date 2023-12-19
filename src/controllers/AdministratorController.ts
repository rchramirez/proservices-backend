import { Request, Response } from "express";
import Administrator from "../models/Administrators";

class AdministratorController {

    static async getAdministrators(req: Request, res: Response): Promise<void> {
        const listAdministrators = await Administrator.findAll()

        res.json(listAdministrators)
    }

    static async getAdministrator(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const administrator = await Administrator.findByPk(id);

        if (administrator) {
            res.json(administrator)
        } else {
            res.status(404).json({
                msg: `No existe un administrator con el id ${id}`
            })
        }
    }

    static async deleteAdministrator(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const administrator = await Administrator.findByPk(id);

        if (!administrator) {
            res.status(404).json({
                responseCode: 10010,
                responseMessage: `No existe un administrator con el id ${id}`
            })
        } else {
            await administrator?.destroy();
            res.json({
                msg: 'El administrator fue eliminado con exito!'
            })
        }
    }

    static async postAdministrator(req: Request, res: Response): Promise<void> {
        const administrator = new Administrator(req.body);

        try {
            await administrator.save();

            res.json({
                msg: 'El administrator fue agregado con exito!'
            })
        } catch (error) {
            console.log(error);
            res.json({
                msg: 'Error al insertar el administrator!'
            })
        }
    }

    static async updateAdministrator(req: Request, res: Response): Promise<void> {
        const { body } = req;
        const { id } = req.params;

        const administrator = await Administrator.findByPk(id);
        try {
            if (administrator) {
                await administrator.update(body);
                res.json({
                    msg: 'El administrator fue actualizado con exito!'
                })
            } else {
                res.status(404).json({
                    msg: `No existe un administrator con el id ${id}`
                })
            }
        } catch (error) {
            console.log(error);
            res.json({
                msg: 'Error al actualizar el administrator!'
            })
        }
    }
}

export default AdministratorController;