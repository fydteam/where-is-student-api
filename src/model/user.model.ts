import { InferAttributes, InferCreationAttributes } from 'sequelize';
import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, PrimaryKey } from 'sequelize-typescript';

@Table({
  charset:'utf-8',
  modelName:'person-table',
  tableName:'person-tables'
})
export class Person extends Model<InferAttributes<Person>, InferCreationAttributes<Person>> {  
  @PrimaryKey
  @Column(DataType.STRING)
  declare id:string

  @Column(DataType.STRING)
  declare user_id: string;
  
  @Column(DataType.STRING)
  declare name: string;

  @Column(DataType.STRING)
  declare secret:string;

  @CreatedAt
  declare createdAt?: Date;

  @UpdatedAt
  declare updatedAt?: Date;
}

@Table({
  charset:'utf-8',
  modelName:'userstate-table',
  tableName:'userstate-tables'
})
export class UserState extends Model<InferAttributes<UserState>, InferCreationAttributes<Person>> {
  @PrimaryKey
  @Column(DataType.STRING)
  declare user_id:string;

  @Column(DataType.ENUM(...(Bun.env.HAN_ROOMS ?? '').split(',')))
  declare state:string;

  @CreatedAt
  declare createdAt?: Date;

  @UpdatedAt
  declare updatedAt?: Date;
}