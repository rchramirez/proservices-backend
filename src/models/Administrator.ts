import { CreationOptional , DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from 'sequelize'
import sequelize from '../config/database'
import User from './User';

class Administrator extends Model<InferAttributes<Administrator>, InferCreationAttributes<Administrator>> {

    declare id: CreationOptional<number>;
    declare userId: ForeignKey<User['id']>;
    declare name: string;
}

Administrator.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
        },
    userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
        },
    name: {
        type: new DataTypes.STRING(15),
        allowNull: false
        },
    },
    {
        sequelize,
        tableName: 'administrator',
        createdAt: false,
        updatedAt: false
});

export default Administrator;