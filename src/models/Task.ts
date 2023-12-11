import { CreationOptional , DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from 'sequelize'
import sequelize from '../config/database'
import Publication from './Publication';

class Task extends Model<InferAttributes<Task>, InferCreationAttributes<Task>> {

    declare id: CreationOptional<number>;
    declare publicationId: ForeignKey<Publication['id']>;
    declare name: string;
    declare status: string;
    declare deadline: Date;
}

Task.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    publicationId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    name: new DataTypes.STRING(45),
    status: new DataTypes.TINYINT,
    deadline: new DataTypes.DATE,
    },
    {
        sequelize,
        tableName: 'tasks',
        createdAt: false,
        updatedAt: false
});

export default Task;