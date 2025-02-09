import { CustomerFactory } from "../../../domain/customer/factory/customer.factory";
import { AddressEntity } from "../../../domain/customer/value-objects";
import { DeleteCustomerUseCase } from "./delete.customer.usecase";

const customer = CustomerFactory.createWithAddress(
  "John",
  new AddressEntity(
    "Av. Papa João XXIII, 695",
    "Ribeirão Pires",
    "São Paulo",
    "09421-540"
  )
);

const input = {
  id: customer.id,
};

const MockRepository = () => {
  return {
    find: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
  };
};

describe("Unit test use case delete a customer", () => {
  it("should delete a customer", async () => {
    const customerRepository = MockRepository();
    const deleteUserCaseCustomer = new DeleteCustomerUseCase(
      customerRepository
    );

    await deleteUserCaseCustomer.execute(input);

    expect(customerRepository.delete).toHaveBeenCalledWith(customer.id);
  });
});
