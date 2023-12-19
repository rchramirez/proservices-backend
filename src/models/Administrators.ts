import { CreationOptional , DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from 'sequelize'
import sequelize from '../config/database'
import User from './User';

class Administrators extends Model<InferAttributes<Administrators>, InferCreationAttributes<Administrators>> {

    declare id: CreationOptional<number>;
    declare userId: ForeignKey<User['id']>;
    declare name: string;
}

Administrators.init({
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
        tableName: 'administrators',
        timestamps: true,
        //underscored: true
});

export default Administrators;