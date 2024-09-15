import { OrderItemEntity } from "../../order-item/order-item.entity";
import { OrderEntity } from "../../order/order.entity";
import { OrderInterface } from "../../order/order.interface";

interface ItemProps {
  id: string;
  name: string;
  productId: string;
  quantity: number;
  price: number;
}

interface OrderFactoryProps {
  id: string;
  customerId: string;
  items: ItemProps[];
}

export class OrderFactory {
  public static create(props: OrderFactoryProps): OrderInterface {
    const items = props.items.map((item) => {
      return new OrderItemEntity(
        item.id,
        item.name,
        item.price,
        item.quantity,
        item.productId
      );
    });

    return new OrderEntity(props.id, props.customerId, items);
  }
}
