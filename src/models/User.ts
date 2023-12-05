import { Table, DataType, Model, Column, PrimaryKey, AllowNull, Unique, AutoIncrement } from 'sequelize-typescript'
import bcrypt from 'bcrypt';

@Table
export class User extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER.UNSIGNED)
    public id!: number;

    @Unique
    @Column(DataType.STRING)
    public username!: string;

    @Column(DataType.STRING)
    public password!: string;

    @Unique
    @AllowNull
    @Column(DataType.STRING)
    public email!: string;

    @Column(DataType.STRING)
    public token!: string;

}