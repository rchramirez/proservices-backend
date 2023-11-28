import { Sequelize } from 'sequelize'
import * as config from '../config'

console.log(config.DB_HOST)

const sequelize = new Sequelize(
    config.DB_NAME,
    config.DB_USER,
    config.DB_PASSWORD, {
        host: config.DB_HOST,
        dialect: "mysql",
        port: 16698
    }
)

export default sequelize;