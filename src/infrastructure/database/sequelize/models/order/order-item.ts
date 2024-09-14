import {
  Model,
  Column,
  Table,
  AllowNull,
  PrimaryKey,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { ProductModel } from "../product/product.model";
import { OrderModel } from "./order.model";

@Table({
  tableName: "order_items",
  timestamps: false,
})
export class OrderItemModel extends Model {
  @PrimaryKey
  @Column
  declare id: string;

  @ForeignKey(() => ProductModel)
  @AllowNull(false)
  @Column
  declare product_id: string;

  @BelongsTo(() => ProductModel)
  declare product: ProductModel;

  @ForeignKey(() => OrderModel)
  @AllowNull(false)
  @Column
  declare order_id: string;

  @BelongsTo(() => OrderModel)
  declare order: OrderModel;

  @AllowNull(false)
  @Column
  declare name: string;

  @AllowNull(false)
  @Column
  declare quantity: number;

  @AllowNull(false)
  @Column
  declare price: number;
}
