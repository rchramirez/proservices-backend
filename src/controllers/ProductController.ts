import { Request, Response } from "express";
import Product from "../models/Product";

export class ProductController {

    static async getProducts(req: Request, res: Response): Promise<void> {
        const listProducts = await Product.findAll()

        res.json(listProducts)
    }

    static async getProduct(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const product = await Product.findByPk(id);

        if (product) {
            res.json(product)
        } else {
            res.status(404).json({
                msg: `No existe un producto con el id ${id}`
            })
        }
    }

    static async deleteProduct(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const product = await Product.findByPk(id);

        if (!product) {
            res.status(404).json({
                msg: `No existe un producto con el id ${id}`
            })
        } else {
            await product?.destroy();
            res.json({
                msg: 'El producto fue eliminado con exito!'
            })
        }
    }

    static async postProduct(req: Request, res: Response): Promise<void> {
        const { body } = req;

        try {
            await Product.create(body);

            res.json({
                msg: 'El producto fue agregado con exito!'
            })
        } catch (error) {
            console.log(error);
            res.json({
                msg: 'Error al insertar el producto!'
            })
        }
    }

    static async updateProduct(req: Request, res: Response): Promise<void> {
        const { body } = req;
        const { id } = req.params;

        const product = await Product.findByPk(id);
        try {
            if (product) {
                await product.update(body);
                res.json({
                    msg: 'El producto fue actualizado con exito!'
                })
            } else {
                res.status(404).json({
                    msg: `No existe un producto con el id ${id}`
                })
            }
        } catch (error) {
            console.log(error);
            res.json({
                msg: 'Error al actualizar el producto!'
            })
        }
    }
}
