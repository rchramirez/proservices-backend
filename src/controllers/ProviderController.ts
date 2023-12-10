import { Request, Response } from "express";
import Provider from "../models/Provider";

class ProviderController {

    static async getProviders(req: Request, res: Response): Promise<void> {
        const listProviders = await Provider.findAll()

        res.json(listProviders)
    }

    static async getProvider(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const provider = await Provider.findByPk(id);

        if (provider) {
            res.json(provider)
        } else {
            res.status(404).json({
                msg: `No existe un provider con el id ${id}`
            })
        }
    }

    static async deleteProvider(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const provider = await Provider.findByPk(id);

        if (!provider) {
            res.status(404).json({
                responseCode: 10010,
                responseMessage: `No existe un provider con el id ${id}`
            })
        } else {
            await provider?.destroy();
            res.json({
                msg: 'El provider fue eliminado con exito!'
            })
        }
    }

    static async postProvider(req: Request, res: Response): Promise<void> {
        const { body } = req;

        try {
            await Provider.create(body);

            res.json({
                msg: 'El provider fue agregado con exito!'
            })
        } catch (error) {
            console.log(error);
            res.json({
                msg: 'Error al insertar el provider!'
            })
        }
    }

    static async updateProvider(req: Request, res: Response): Promise<void> {
        const { body } = req;
        const { id } = req.params;

        const provider = await Provider.findByPk(id);
        try {
            if (provider) {
                await provider.update(body);
                res.json({
                    msg: 'El provider fue actualizado con exito!'
                })
            } else {
                res.status(404).json({
                    msg: `No existe un provider con el id ${id}`
                })
            }
        } catch (error) {
            console.log(error);
            res.json({
                msg: 'Error al actualizar el provider!'
            })
        }
    }
}

export default ProviderController;