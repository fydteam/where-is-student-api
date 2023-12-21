import { InferAttributes, InferCreationAttributes } from 'sequelize';
import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, PrimaryKey } from 'sequelize-typescript';

@Table({
  charset:'utf-8',
  modelName:'person-table',
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