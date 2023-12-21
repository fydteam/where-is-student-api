import { InferAttributes, InferCreationAttributes } from 'sequelize';
import { Table, Column, Model, HasMany, DataType, CreatedAt, UpdatedAt, PrimaryKey } from 'sequelize-typescript';

@Table({
  charset:'utf-8',
  modelName:'svc_student',
  tableName:'svc_student',
})
export class IncodingStudent extends Model<InferAttributes<IncodingStudent>, InferCreationAttributes<IncodingStudent>> {  
  @PrimaryKey
  @Column(DataType.STRING)
  declare id: string;
  
  @Column(DataType.STRING)
  declare name: string;

  @Column(DataType.STRING)
  declare personal_code:string;

  @Column(DataType.STRING)
  declare phone_number:string;

  @Column(DataType.STRING)
  declare status:string;
}