import { Request, Response } from "express";
import { User } from "../models/User";
import bcrypt from 'bcrypt';
import generateJWT from "../helpers/generateJWT";

export class UserController {

    static async register(req: Request, res: Response) {
        const user = new User(req.body);
        const newEmail = user.email;

        const isDuplicateEmail = await User.findOne({ where: { email: user.email } });

        if(isDuplicateEmail) {
            const error = new Error(`Email ${newEmail} is already in use.`);
            return res.status(400).json({ msg: error.message });
        }

        const hash = await bcrypt.hash(user.password, 10)
        user.password = hash;

        try {
            await user.save()
            res.json({
                msg: `User with ${newEmail} created successfully!`
            })
        } catch (error) {
            res.status(400).json({
                msg: 'An error occured',
                error
            })
        }
    }

    static async authenticate(req: Request, res: Response) {
        const { email, password } = req.body;

        const user: any = await User.findOne({ where: { email: email } })

        if (!user) {
            const error = new Error(`No Invalid Login Details for email ${email}`);
            return res.status(404).json({ msg: error.message });
        }

        const passwordValid = await bcrypt.compare(password, user.password)
        if (!passwordValid) {
            const error = new Error(`Password Incorrect!`);
            return res.status(400).json({ msg: error.message });
        }

        res.json({
            username: user.username,
            email: user.email,
            token: generateJWT(user.email),
          });
    }

}