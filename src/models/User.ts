import { CreationOptional , DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize'
import sequelize from '../config/database'
import Provider from './Provider';

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {

    declare id: CreationOptional<number>;
    declare firstName: string;
    declare lastName: string;
    declare email: string;
    declare phone: string;
    declare token: string;
    declare username: string;
    declare password: string;
    declare documentType: string;
    declare document: string;
    declare isConfirmed: boolean;
    declare photo: Buffer;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

User.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    firstName: {
        type: new DataTypes.STRING(25),
        allowNull: false
    },
    lastName: {
        type: new DataTypes.STRING(25),
        allowNull: false
    },
    email: {
        type: new DataTypes.STRING(25),
        allowNull: false,
        unique: true
    },
    phone: new DataTypes.STRING(12),
    token: new DataTypes.STRING(30),
    username: {
        type: new DataTypes.STRING(15),
        allowNull: false,
        unique: true
    },
    password: {
        type: new DataTypes.STRING(62),
        allowNull: false
    },
    documentType: {
        type: new DataTypes.STRING(10),
        allowNull: false
    },
    document: {
        type: new DataTypes.STRING(8),
        allowNull: false,
        unique: true
    },
    isConfirmed: {
        type: new DataTypes.BOOLEAN,
        defaultValue: false
    },
    photo: DataTypes.BLOB,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    },
    {
        sequelize,
        tableName: 'users'
});

User.hasMany(Provider, {
    sourceKey: 'id',
    foreignKey: 'userId',
    as: 'fkUserProviderId'
});

export default User;