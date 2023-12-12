import { CreationOptional , DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from 'sequelize'
import sequelize from '../config/database'
import Service from './Service';
import Provider from './Provider';
import Task from './Task';
import Work from './Work';

class Publication extends Model<InferAttributes<Publication>, InferCreationAttributes<Publication>> {

    declare id: CreationOptional<number>;
    declare providerId: ForeignKey<Provider['id']>;
    declare serviceId: ForeignKey<Service['id']>;
    declare status: string;
    declare startDate: Date;
    declare endDate: Date;
}

Publication.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    providerId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    serviceId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    status: new DataTypes.CHAR(1),
    startDate: new DataTypes.DATE,
    endDate: new DataTypes.DATE
    },
    {
        sequelize,
        tableName: 'publications',
        createdAt: false,
        updatedAt: false
});

Publication.hasMany(Task, {
    sourceKey: 'id',
    foreignKey: 'publicationId',
    as: 'fkPublicationTaskId'
});
Publication.hasMany(Work, {
    sourceKey: 'id',
    foreignKey: 'publicationId',
    as: 'fkPublicationWorkId'
});

export default Publication;