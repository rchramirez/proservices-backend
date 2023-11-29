import dotenv from 'dotenv';
import Server from "./models/server";
//import * as dotenv from 'dotenv';

// Configuramos las variables de ambiente
dotenv.config();

console.log(`Server Run On Port ${process.env.PORT}`);


const server = new Server();