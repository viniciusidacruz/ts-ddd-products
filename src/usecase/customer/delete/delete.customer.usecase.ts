import { CustomerRepositoryInterface } from "../../../domain/customer/repositories";
import { InputDeleteCustomerDTO } from "./delete.customer.dto";

export class DeleteCustomerUseCase {
  constructor(private customerRepository: CustomerRepositoryInterface) {}

  async execute(input: InputDeleteCustomerDTO): Promise<void> {
    await this.customerRepository.delete(input.id);
  }
}
