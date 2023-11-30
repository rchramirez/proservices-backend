import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import User from "../models/User";
import jwt from 'jsonwebtoken';

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

export const loginUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const user: any = await User.findOne({ where: { username: username } })

    if (!user) {
        return res.status(400).json({
            msg: `User not found with name ${username}`
        })
    }

    const passwordValid = await bcrypt.compare(password, user.password)
    if (!passwordValid) {
        return res.status(400).json({
            msg: `Password Incorrect!`
        })
    }

    const token = jwt.sign({
        username: username
    }, process.env.SECRET_KEY || 'mysecretkey', {
        expiresIn: '60000'
    });

    res.json(token);
}