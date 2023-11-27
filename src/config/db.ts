import { Sequelize } from 'sequelize'
import { configDB } from '../config'


const sequelize = new Sequelize(
    configDB.database,
    configDB.username,
    configDB.password, {
        host: configDB.host,
        dialect: "mysql"
    }
)

export default sequelize;