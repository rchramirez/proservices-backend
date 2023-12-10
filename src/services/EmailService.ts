import nodemailer from 'nodemailer';
import User from '../models/User';
import dotenv from 'dotenv';

dotenv.config();

class EmailService {

  static async registration(user: User) {
    const { username, email, token } = user;

    const transport = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transport.sendMail({
      from: '"ProServices" <noreply@proservices.com>',
      to: email,
      subject: "ProServices - Comprueba tu cuenta",
      text: "Comprueba tu cuenta en ProServices",
      html: `<p>Hola ${username} Comprueba tu cuenta en ProServices</p>
      <p>Tu cuenta ya esta casi lista, solo debes comprobarla en el siguiente enlace: 

      <a href="${process.env.FRONTEND_URL}/confirm/${token}">Comprobar Cuenta</a>
      
      <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>
      
      
      `,
    });
  };

  static async forgetPassword(user: User) {
    const { username, email, token } = user;

    const transport = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transport.sendMail({
      from: '"ProServices" <noreply@proservices.com>',
      to: email,
      subject: "ProServices - Reestablece tu Password",
      text: "Reestablece tu Password",
      html: `<p>Hola: ${username} has solicitado reestablecer tu password</p>

      <p>Sigue el siguiente enlace para generar un nuevo password: 

      <a href="${process.env.FRONTEND_URL}/forget-password/${token}">Reestablecer Password</a>
      
      <p>Si tu no solicitaste este email, puedes ignorar el mensaje</p>
      
      
      `,
    });
  };
}

export default EmailService