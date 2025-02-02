
import { CustomerRepositoryInterface } from "../../../domain/customer/repositories";
import {
  InputCreateCustomerDTO,
  OutputCreateCustomerDTO,
} from "./create.customer.dto";
import { CustomerFactory } from "../../../domain/customer/entity/factory/customer.factory";
import { AddressEntity } from "../../../domain/customer/value-objects";

export class CreateCustomerUseCase {
  constructor(private customerRepository: CustomerRepositoryInterface) {}

  async execute(
    input: InputCreateCustomerDTO
  ): Promise<OutputCreateCustomerDTO> {
    const customer = CustomerFactory.createWithAddress(
      input.name,
      new AddressEntity(
        input.address.street,
        input.address.city,
        input.address.state,
        input.address.zipCode
      )
    );

    await this.customerRepository.create(customer);

    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.address.street,
        city: customer.address.city,
        state: customer.address.state,
        zipCode: customer.address.zipCode,
      },
    };
  }
}
