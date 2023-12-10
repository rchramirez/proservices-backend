import { Sequelize } from 'sequelize'
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize({
    dialect: "mysql",
    username: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT)
});

export default sequelize;