import { Sequelize } from 'sequelize-typescript'
import dotenv from 'dotenv';
import { join } from 'path';
//import { Product } from '../models/Product';
import { User } from '../models/User';

dotenv.config();

const sequelize = new Sequelize({
    dialect: "mysql",
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT)
});

sequelize.addModels([User])

export default sequelize;