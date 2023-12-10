import { CreationOptional , DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from 'sequelize'
import sequelize from '../config/database'
import User from './User';

class Provider extends Model<InferAttributes<Provider>, InferCreationAttributes<Provider>> {

    declare id: CreationOptional<number>;
    declare userId: ForeignKey<User['id']>;
    declare name: string;
    declare description: string;
    declare attentionSchedule: string;
    declare coverageRadio: string;
    declare availability: string;
    declare document: string;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

Provider.init({
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
    description: new DataTypes.STRING(45),
    attentionSchedule: new DataTypes.STRING(45),
    coverageRadio: new DataTypes.STRING(45),
    availability: new DataTypes.CHAR(1),
    document: new DataTypes.STRING(13),
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    },
    {
        sequelize,
        tableName: 'providers'
});

export default Provider;