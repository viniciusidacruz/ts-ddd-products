import { CustomerRepositoryInterface } from "../../../domain/customer/repositories";
import {
  InputFindCustomerDTO,
  OutputFindCustomerDTO,
} from "./find.customer.dto";

export class FindCustomerUseCase {
  constructor(private customerRepository: CustomerRepositoryInterface) {}

  async execute(input: InputFindCustomerDTO): Promise<OutputFindCustomerDTO> {
    const customer = await this.customerRepository.find(input.id);

    return {
      id: customer.getId(),
      name: customer.name,
      address: {
        street: customer.address.street,
        city: customer.address.city,
        state: customer.address.state,
        zipCode: customer.address.zipCode,
      },
      rewardPoints: customer.rewardPoints,
      active: customer.isActive(),
    };
  }
}
