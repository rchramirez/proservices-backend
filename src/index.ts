import dotenv from 'dotenv';
import Server from "./server";

dotenv.config();

console.log(`Server Run On Port ${process.env.PORT}`);

const server = new Server();