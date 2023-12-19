import dotenv from 'dotenv';
import Server from "./server";

dotenv.config();

process.env.TZ = 'America/Argentina/Buenos_Aires';
console.log(`Server Run On Port ${process.env.PORT}`);

const server = new Server();