import { Request, Response } from "express";
import Publication from "../models/Publication";

class PublicationController {

    static async getPublications(req: Request, res: Response): Promise<void> {
        const listPublications = await Publication.findAll()

        res.json(listPublications)
    }

    static async getPublication(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const publication = await Publication.findByPk(id);

        if (publication) {
            res.json(publication)
        } else {
            res.status(404).json({
                msg: `No existe un publication con el id ${id}`
            })
        }
    }

    static async deletePublication(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const publication = await Publication.findByPk(id);

        if (!publication) {
            res.status(404).json({
                responseCode: 10010,
                responseMessage: `No existe un publication con el id ${id}`
            })
        } else {
            await publication?.destroy();
            res.json({
                msg: 'El publication fue eliminado con exito!'
            })
        }
    }

    static async postPublication(req: Request, res: Response): Promise<void> {
        const publication = new Publication(req.body);
        try {
            await publication.save();

            res.json({
                msg: 'El publication fue agregado con exito!'
            })
        } catch (error) {
            console.log(error);
            res.json({
                msg: 'Error al insertar el publication!'
            })
        }
    }

    static async updatePublication(req: Request, res: Response): Promise<void> {
        const { body } = req;
        const { id } = req.params;

        const publication = await Publication.findByPk(id);
        try {
            if (publication) {
                await publication.update(body);
                res.json({
                    msg: 'El publication fue actualizado con exito!'
                })
            } else {
                res.status(404).json({
                    msg: `No existe un publication con el id ${id}`
                })
            }
        } catch (error) {
            console.log(error);
            res.json({
                msg: 'Error al actualizar el publication!'
            })
        }
    }
}

export default PublicationController;