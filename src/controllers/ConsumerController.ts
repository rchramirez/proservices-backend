import { Request, Response } from "express";
import Consumer from "../models/Consumer";

class ConsumerController {

    static async getConsumers(req: Request, res: Response): Promise<void> {
        const listConsumers = await Consumer.findAll()

        res.json(listConsumers)
    }

    static async getConsumer(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const consumer = await Consumer.findByPk(id);

        if (consumer) {
            res.json(consumer)
        } else {
            res.status(404).json({
                msg: `No existe un consumer con el id ${id}`
            })
        }
    }

    static async deleteConsumer(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const consumer = await Consumer.findByPk(id);

        if (!consumer) {
            res.status(404).json({
                responseCode: 10010,
                responseMessage: `No existe un consumer con el id ${id}`
            })
        } else {
            await consumer?.destroy();
            res.json({
                msg: 'El consumer fue eliminado con exito!'
            })
        }
    }

    static async postConsumer(req: Request, res: Response): Promise<void> {
        const consumer = new Consumer(req.body);

        try {
            await consumer.save();

            res.json({
                msg: 'El consumer fue agregado con exito!'
            })
        } catch (error) {
            console.log(error);
            res.json({
                msg: 'Error al insertar el consumer!'
            })
        }
    }

    static async updateConsumer(req: Request, res: Response): Promise<void> {
        const { body } = req;
        const { id } = req.params;

        const consumer = await Consumer.findByPk(id);
        try {
            if (consumer) {
                await consumer.update(body);
                res.json({
                    msg: 'El consumer fue actualizado con exito!'
                })
            } else {
                res.status(404).json({
                    msg: `No existe un consumer con el id ${id}`
                })
            }
        } catch (error) {
            console.log(error);
            res.json({
                msg: 'Error al actualizar el consumer!'
            })
        }
    }
}

export default ConsumerController;