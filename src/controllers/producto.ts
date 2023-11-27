import { Request, Response } from "express";
import Producto from "../models/producto";

export const getProducts = async (req: Request, res: Response) => {
    const listProducts = await Producto.findAll()

    res.json(listProducts)
}

export const getProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await Producto.findByPk(id);

    if(product) {
        res.json(product)
    } else {
        res.status(404).json({
            msg: `No existe un producto con el id ${id}`
        })
    }
}

export const deleteProduct = (req: Request, res: Response) => {
    const { id } = req.params;
    
    res.json({
        msg: 'delete Product',
        id
    })
}

export const postProduct = (req: Request, res: Response) => {
    const { body } = req;
    
    res.json({
        msg: 'post Product',
        body
    })
}

export const updateProduct = (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;
    
    res.json({
        msg: 'Update Product',
        id,
        body
    })
}
