import { CreationOptional , DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from 'sequelize'
import sequelize from '../config/database'
import Consumer from './Consumer';
import Publication from './Publication';

class Work extends Model<InferAttributes<Work>, InferCreationAttributes<Work>> {

    declare id: CreationOptional<number>;
    declare publicationId: ForeignKey<Publication['id']>;
    declare consumerId: ForeignKey<Consumer['id']>;
    declare name: string;
    declare photo: Buffer;
    declare status: string;
    declare place: string;
    declare timeRange: string;
    declare startDate: Date;
    declare endDate: Date;
    declare raiting: number;
    declare comment: Text;
}

Work.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
        },
    publicationId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
        },
    consumerId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
        },
    name: new DataTypes.STRING(45),
    photo: new DataTypes.BLOB,
    status: new DataTypes.CHAR(1),
    place: new DataTypes.STRING(15),
    timeRange: new DataTypes.STRING(45),
    startDate: new DataTypes.DATE,
    endDate: new DataTypes.DATE,
    raiting: new DataTypes.FLOAT,
    comment: new DataTypes.TEXT,
    },
    {
        sequelize,
        tableName: 'works',
        createdAt: false,
        updatedAt: false
});

export default Work;