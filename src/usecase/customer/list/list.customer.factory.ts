import { OutputListCustomerDTO } from "./list.customer.dto";
import { CustomerEntity } from "../../../domain/customer/entity/customer.entity";

export class OutputMapper {
  static toOutput(customers: CustomerEntity[]): OutputListCustomerDTO {
    return {
      customers: customers.map((customer) => ({
        id: customer.getId(),
        name: customer.name,
        address: {
          street: customer.address.street,
          city: customer.address.city,
          state: customer.address.state,
          zipCode: customer.address.zipCode,
        },
      })),
    };
  }
}
