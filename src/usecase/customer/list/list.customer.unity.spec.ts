import { CustomerFactory } from "../../../domain/customer/factory/customer.factory";
import { AddressEntity } from "../../../domain/customer/value-objects";
import { ListCustomerUseCase } from "./list.customer.usecase";

const customerOne = CustomerFactory.createWithAddress(
  "One",
  new AddressEntity(
    "Av. Papa João XXIII, 695",
    "Ribeirão Pires",
    "São Paulo",
    "09421-540"
  )
);

const customerTwo = CustomerFactory.createWithAddress(
  "Two",
  new AddressEntity(
    "Av. Papa João XXIII, 695",
    "Ribeirão Pires",
    "São Paulo",
    "09421-540"
  )
);

const MockRepository = () => {
  return {
    find: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findAll: jest
      .fn()
      .mockReturnValue(Promise.resolve([customerOne, customerTwo])),
  };
};

describe("Unit test for list customer use case", () => {
  it("should list all customers", async () => {
    const customerRepository = MockRepository();
    const listCustomerUseCase = new ListCustomerUseCase(customerRepository);

    const output = await listCustomerUseCase.execute({});

    expect(output.customers.length).toBe(2);
  });
});
