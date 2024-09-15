import { OrderItemEntity } from "../order-item/order-item.entity";

export interface OrderInterface {
  get id(): string;
  get customerId(): string;
  get items(): OrderItemEntity[];
}
