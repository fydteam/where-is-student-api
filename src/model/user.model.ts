import { InferAttributes, InferCreationAttributes } from 'sequelize';
import { Table, Column, Model, HasMany, DataType, CreatedAt, UpdatedAt, PrimaryKey } from 'sequelize-typescript';

@Table({
  charset:'utf-8',
  modelName:'person-table',
})
export class Person extends Model<InferAttributes<Person>, InferCreationAttributes<Person>> {  
  @PrimaryKey
  @Column(DataType.STRING)
  declare person_id: string;
  
  @Column(DataType.STRING)
  declare name: string;

  @CreatedAt
  declare createdAt?: Date;

  @UpdatedAt
  declare updatedAt?: Date;
}