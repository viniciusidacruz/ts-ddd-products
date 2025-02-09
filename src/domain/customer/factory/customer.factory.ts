import { v4 as uuid } from "uuid";

import { CustomerEntity } from "../entity/customer.entity";
import { AddressEntity } from "../value-objects";

export class CustomerFactory {
  public static create(name: string): CustomerEntity {
    return new CustomerEntity(uuid(), name);
  }

  public static createWithAddress(
    name: string,
    address: AddressEntity
  ): CustomerEntity {
    const customer = new CustomerEntity(uuid(), name);
    customer.changeAddress(address);
    return customer;
  }
}
