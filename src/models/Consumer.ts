import { CreationOptional , DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from 'sequelize'
import sequelize from '../config/database'
import User from './User';
import Work from './Work';

class Consumer extends Model<InferAttributes<Consumer>, InferCreationAttributes<Consumer>> {

    declare id: CreationOptional<number>;
    declare userId: ForeignKey<User['id']>;
    declare name: string;
}

Consumer.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
        },
    userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
        },
    name: new DataTypes.STRING(20),
    },
    {
        sequelize,
        tableName: 'consumers',
        createdAt: false,
        updatedAt: false
});

Consumer.hasMany(Work, {
    sourceKey: 'id',
    foreignKey: 'consumerId',
    as: 'fkConsumerWorkId'
});

export default Consumer;