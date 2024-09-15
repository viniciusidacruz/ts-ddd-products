import {
  Model,
  Column,
  Table,
  ForeignKey,
  BelongsTo,
  PrimaryKey,
} from "sequelize-typescript";
import { OrderModel } from "./order.model";
import { ProductModel } from "../product/repository/sequelize/product.model";

@Table({
  tableName: "order_items",
  timestamps: false,
})
export class OrderItemModel extends Model {
  @PrimaryKey
  @Column
  declare id: string;

  @ForeignKey(() => OrderModel)
  @Column
  declare order_id: string;

  @BelongsTo(() => OrderModel)
  declare order: OrderModel;

  @ForeignKey(() => ProductModel)
  @Column
  declare product_id: string;

  @BelongsTo(() => ProductModel)
  declare product: ProductModel;

  @Column
  declare name: string;

  @Column
  declare price: number;

  @Column
  declare quantity: number;
}
