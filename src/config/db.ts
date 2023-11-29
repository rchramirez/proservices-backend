import { Sequelize } from 'sequelize'
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize({
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    dialect: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT)
});

export default sequelize;