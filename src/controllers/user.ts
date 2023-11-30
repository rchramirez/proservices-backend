import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import User from "../models/User";

export const newUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username: username } })

    if (user) {
        return res.status(400).json({
            msg: `User exist with name ${username}`
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    try {
        await User.create({
            username: username,
            password: hashedPassword,
        })
        res.json({
            msg: `User ${username} created successfully`
        })
    } catch (error) {
        res.status(400).json({
            msg: 'Error not found',
            error
        })
    }
}

export const loginUser = (req: Request, res: Response) => {
    const { body } = req;

    res.json({
        msg: 'Login User',
        body
    })
}