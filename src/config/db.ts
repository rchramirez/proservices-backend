import { Sequelize } from 'sequelize'
import * as config from '../config'

console.log(config.DB_HOST)

const sequelize = new Sequelize({
    username: config.DB_NAME,
    password: config.DB_USER,
    database: config.DB_PASSWORD, 
    dialect: "mysql",
    port: 48458,
    host: config.DB_HOST
    }
)

export default sequelize;