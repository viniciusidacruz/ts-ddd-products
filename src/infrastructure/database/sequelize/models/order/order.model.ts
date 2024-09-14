import {
  Model,
  Column,
  Table,
  AllowNull,
  PrimaryKey,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import { CustomerModel } from "../customer/customer.model";
import { OrderItemModel } from "./order-item";

@Table({
  tableName: "orders",
  timestamps: false,
})
export class OrderModel extends Model {
  @PrimaryKey
  @Column
  declare id: string;

  @ForeignKey(() => CustomerModel)
  @AllowNull(false)
  @Column
  declare customer_id: string;

  @BelongsTo(() => CustomerModel)
  declare customer: CustomerModel;

  @AllowNull(false)
  @Column
  declare total: number;

  @AllowNull(false)
  @Column
  declare order_date: Date;

  @HasMany(() => OrderItemModel)
  declare orderItems: OrderItemModel[];
}
