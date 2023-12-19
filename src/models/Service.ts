import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from 'sequelize'
import sequelize from '../config/database'
import Publication from './Publication';

class Service extends Model<InferAttributes<Service>, InferCreationAttributes<Service>> {

    declare id: CreationOptional<number>;
    declare name: string;
    declare serviceType: string;
    declare description: string;
}

Service.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: new DataTypes.STRING(45),
        allowNull: false
    },
    serviceType: new DataTypes.STRING(45),
    description: new DataTypes.STRING(45)
},
    {
        sequelize,
        tableName: 'services',
        createdAt: false,
        updatedAt: false
    });

Service.hasMany(Publication, {
    sourceKey: 'id',
    foreignKey: 'serviceId',
    as: 'fkServicePublicationId'
});

export default Service;