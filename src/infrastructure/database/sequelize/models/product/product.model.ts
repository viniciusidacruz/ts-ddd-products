import { Model } from "sequelize";
import { AllowNull, Column, PrimaryKey, Table } from "sequelize-typescript";

@Table({
  tableName: "products",
  timestamps: false,
})
export class ProductModel extends Model {
  @PrimaryKey
  @Column
  declare id: string;

  @Column
  @AllowNull(false)
  declare name: string;

  @Column
  @AllowNull(false)
  declare price: number;
}
