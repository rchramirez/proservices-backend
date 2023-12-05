import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const checkAuth = (req: Request, res: Response, next: NextFunction) => {
    const headerToken = req.headers['authorization']
    console.log(headerToken);

    if (headerToken != undefined && headerToken.startsWith('Bearer')) {
        try {
            const bearerToken = headerToken.slice(7);
            jwt.verify(bearerToken, process.env.JWT_SECRET_KEY || 'mysecretkey')
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