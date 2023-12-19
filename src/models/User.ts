import { Association, CreationOptional, DataTypes, HasManyAddAssociationMixin, HasManyAddAssociationsMixin, HasManyCountAssociationsMixin, HasManyCreateAssociationMixin, HasManyGetAssociationsMixin, HasManyHasAssociationMixin, HasManyHasAssociationsMixin, HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, HasManySetAssociationsMixin, InferAttributes, InferCreationAttributes, Model, NonAttribute } from 'sequelize'
import sequelize from '../config/database'
import Provider from './Provider';
import Administrator from './Administrators';
import Consumer from './Consumer';

class User extends Model<
InferAttributes<
User, { omit: 'providers' | 'consumers'}>, 
InferCreationAttributes<
User, { omit: 'providers' | 'consumers'}>> {

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
    declare birthDate: string;
    declare status: CharacterData;
    declare isConfirmed: boolean;
    declare photo: Buffer;

    declare getProviders: HasManyGetAssociationsMixin<Provider>; // Note the null assertions!
    declare addProvider: HasManyAddAssociationMixin<Provider, number>;
    declare addProviders: HasManyAddAssociationsMixin<Provider, number>;
    declare setProviders: HasManySetAssociationsMixin<Provider, number>;
    declare removeProvider: HasManyRemoveAssociationMixin<Provider, number>;
    declare removeProviders: HasManyRemoveAssociationsMixin<Provider, number>;
    declare hasProvider: HasManyHasAssociationMixin<Provider, number>;
    declare hasProviders: HasManyHasAssociationsMixin<Provider, number>;
    declare countProviders: HasManyCountAssociationsMixin;
    declare createProvider: HasManyCreateAssociationMixin<Provider, 'userId'>;

    declare getConsumers: HasManyGetAssociationsMixin<Consumer>; // Note the null assertions!
    declare addConsumer: HasManyAddAssociationMixin<Consumer, number>;
    declare addConsumers: HasManyAddAssociationsMixin<Consumer, number>;
    declare setConsumers: HasManySetAssociationsMixin<Consumer, number>;
    declare removeConsumer: HasManyRemoveAssociationMixin<Consumer, number>;
    declare removeConsumers: HasManyRemoveAssociationsMixin<Consumer, number>;
    declare hasConsumer: HasManyHasAssociationMixin<Consumer, number>;
    declare hasConsumers: HasManyHasAssociationsMixin<Consumer, number>;
    declare countConsumers: HasManyCountAssociationsMixin;
    declare createConsumer: HasManyCreateAssociationMixin<Consumer, 'userId'>;

    declare getAdministrators: HasManyGetAssociationsMixin<Administrator>; // Note the null assertions!
    declare addAdministrator: HasManyAddAssociationMixin<Administrator, number>;
    declare addAdministrators: HasManyAddAssociationsMixin<Administrator, number>;
    declare setAdministrators: HasManySetAssociationsMixin<Administrator, number>;
    declare removeAdministrator: HasManyRemoveAssociationMixin<Administrator, number>;
    declare removeAdministrators: HasManyRemoveAssociationsMixin<Administrator, number>;
    declare hasAdministrator: HasManyHasAssociationMixin<Administrator, number>;
    declare hasAdministrators: HasManyHasAssociationsMixin<Administrator, number>;
    declare countAdministrators: HasManyCountAssociationsMixin;
    declare createAdministrator: HasManyCreateAssociationMixin<Administrator, 'userId'>;

    get fullName(): NonAttribute<string> {
        return this.firstName + ' ' + this.lastName;
    }

    declare providers?: NonAttribute<Provider[]>;
    declare consumers?: NonAttribute<Consumer[]>;
    declare administrators?: NonAttribute<Administrator[]>;

    declare static associations: {
        providers: Association<User, Provider>,
        consumers: Association<User, Consumer>;
        administrators: Association<User, Administrator>;
    };
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
    birthDate: DataTypes.DATEONLY,
    status: new DataTypes.CHAR(1),
    isConfirmed: {
        type: new DataTypes.BOOLEAN,
        defaultValue: false
    },
    photo: DataTypes.BLOB
},
    {
        sequelize,
        tableName: 'users',
        createdAt: false,
        updatedAt: false
    });

User.hasOne(Administrator, {
    sourceKey: 'id',
    foreignKey: 'userId',
    as: 'administrators'
});
User.hasOne(Provider, {
    sourceKey: 'id',
    foreignKey: 'userId',
    as: 'providers'
});
User.hasOne(Consumer, {
    sourceKey: 'id',
    foreignKey: 'userId',
    as: 'consumers'
});

export default User;