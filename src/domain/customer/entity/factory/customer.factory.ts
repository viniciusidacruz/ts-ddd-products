import { v4 as uuid } from "uuid";

import { CustomerEntity } from "../customer.entity";
import { AddressEntity } from "../../value-objects";
import { CustomerInterface } from "../customer.interface";

export class CustomerFactory {
  public static create(name: string): CustomerInterface {
    return new CustomerEntity(uuid(), name);
  }

  public static createWithAddress(
    name: string,
    address: AddressEntity
  ): CustomerInterface {
    const customer = new CustomerEntity(uuid(), name);
    customer.changeAddress(address);
    return customer;
  }
}
