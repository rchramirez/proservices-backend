import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from "../models/User";

dotenv.config();

const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
    const headerToken = req.headers['authorization']
    console.log(headerToken);

    if (headerToken != undefined && headerToken.startsWith('Bearer')) {
        try {
            const bearerToken = headerToken.slice(7);
            const decoded = jwt.verify(bearerToken, process.env.JWT_SECRET_KEY || 'mysecretkey') as User
            req.body.user = await User.findByPk(decoded.id)
            next()
        } catch (error) {
            res.status(401).json({
                msg: 'Token invalid'
            })
        }
    } else {
        res.status(401).json({
            msg: 'Acceso denegado'
        })
    }
}

export default checkAuth;