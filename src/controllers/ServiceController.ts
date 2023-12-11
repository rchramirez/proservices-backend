import { Request, Response } from "express";
import Service from "../models/Service";

class ServiceController {

    static async getServices(req: Request, res: Response): Promise<void> {
        const listServices = await Service.findAll()

        res.json(listServices)
    }

    static async getService(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const service = await Service.findByPk(id);

        if (service) {
            res.json(service)
        } else {
            res.status(404).json({
                msg: `No existe un service con el id ${id}`
            })
        }
    }

    static async deleteService(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const service = await Service.findByPk(id);

        if (!service) {
            res.status(404).json({
                responseCode: 10010,
                responseMessage: `No existe un service con el id ${id}`
            })
        } else {
            await service?.destroy();
            res.json({
                msg: 'El service fue eliminado con exito!'
            })
        }
    }

    static async postService(req: Request, res: Response): Promise<void> {
        const service = new Service(req.body);
        try {
            await service.save();

            res.json({
                msg: 'El service fue agregado con exito!'
            })
        } catch (error) {
            console.log(error);
            res.json({
                msg: 'Error al insertar el service!'
            })
        }
    }

    static async updateService(req: Request, res: Response): Promise<void> {
        const { body } = req;
        const { id } = req.params;

        const service = await Service.findByPk(id);
        try {
            if (service) {
                await service.update(body);
                res.json({
                    msg: 'El service fue actualizado con exito!'
                })
            } else {
                res.status(404).json({
                    msg: `No existe un service con el id ${id}`
                })
            }
        } catch (error) {
            console.log(error);
            res.json({
                msg: 'Error al actualizar el service!'
            })
        }
    }
}

export default ServiceController;