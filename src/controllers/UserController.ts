import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from 'bcrypt';
import generateJWT from "../helpers/generateJWT";
import generateID from "../helpers/generateID";
import EmailService from "../services/EmailService";

class UserController {
    static emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    static passwordRegex: RegExp = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    
    static async register(req: Request, res: Response) {
        const user = new User(req.body);
        const newEmail = user.email;

        if (!UserController.emailRegex.test(newEmail)) {
            const error = new Error(`Email ${newEmail} is not valid.`);
            return res.status(400).json({ error: error.message });
        }

        if (!UserController.passwordRegex.test(user.password)) {
            const error = new Error(`The password must be at least 6 characters long, including at least one letter and one number.`);
            return res.status(400).json({ error: error.message });
        }

        const isDuplicateEmail = await User.findOne({ where: { email: user.email } });

        if (isDuplicateEmail) {
            const error = new Error(`Email ${newEmail} is already in use.`);
            return res.status(400).json({ msg: error.message });
        }
        //TODO save photo
        //Base64EncodedImageStringHere
        user.password = await bcrypt.hash(user.password, 10)
        user.token = generateID();
        try {
            await user.save()

            EmailService.registration(user)

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

        const user: any = await User.findOne({ where: { email } })

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
            token: generateJWT(user.id),
        });
    }

    static async confirmEmail(req: Request, res: Response) {
        const { token } = req.params;
        const user = await User.findOne({ where: { token } });
        if (!user) {
            const error = new Error("Token invlid");
            return res.status(403).json({ msg: error.message });
        }
      
        try {
            user.isConfirmed = true;
            user.token = "";
            await user.save();
            res.json({ msg: "User confirmed successfully" });
        } catch (error) {
            console.log(error);
        }
    }

    static async forgetPassword(req: Request, res: Response) {
        const { email } = req.body;
        const user = await User.findOne({ where: { email }});
        if (!user) {
          const error = new Error("El Usuario no existe");
          return res.status(404).json({ msg: error.message });
        }
      
        try {
            user.token = generateID();
            await user.save();
        
            EmailService.forgetPassword(user);
        
            res.json({ msg: "Hemos enviado un email con las instrucciones" });
        } catch (error) {
            console.log(error);
        }
    }

    static async checkToken(req: Request, res: Response) {
        const { token } = req.params;
      
        const tokenValido = await User.findOne({ where: { token }});
      
        if (tokenValido) {
            res.json({ msg: "Token válido y el Usuario existe" });
        } else {
            const error = new Error("Token no válido");
            return res.status(404).json({ msg: error.message });
        }
    }
    
    static async newPassword(req: Request, res: Response) {
        const { token } = req.params;
        const { password } = req.body;
        
        if (!this.passwordRegex.test(password)) {
            const error = new Error(`The password must be at least 6 characters long, including at least one letter and one number.`);
            return res.status(400).json({ error: error.message });
        }
        
        const user = await User.findOne({ where: { token }});
        
        if (user) {
            user.password = await bcrypt.hash(password, 10)
            user.token = "";
            try {
                await user.save();
                res.json({ msg: "Password Modificado Correctamente" });
            } catch (error) {
                console.log(error);
            }
        } else {
            const error = new Error("Token no válido");
            return res.status(404).json({ msg: error.message });
        }
    }
    
    static async getUser(req: Request, res: Response) {
        const { id } = req.params;
        const user = await User.findByPk(id);

        if (user) {
            res.json({
                responseCode: 0,
                user: user
            })
        } else {
            res.status(404).json({
                responseCode: 10001,
                responseMessage: `User with id ${id} not found`
            })
        }
    }

    static async deleteUser(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const user = await User.findByPk(id);

        if (!user) {
            res.status(404).json({
                responseCode: 10010,
                responseMessage: `No existe un user con el id ${id}`
            })
        } else {
            await user?.destroy();
            res.json({
                msg: 'El user fue eliminado con exito!'
            })
        }
    }

    static async updateUser(req: Request, res: Response): Promise<void> {
        const { body } = req;
        const { id } = req.params;

        const user = await User.findByPk(id);
        try {
            if (user) {
                await user.update(body);
                res.json({
                    msg: 'El user fue actualizado con exito!'
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

    static async profile(req: Request, res: Response) {
        const { user } = req.body;
      
        res.json(user);
    };

}

export default UserController;