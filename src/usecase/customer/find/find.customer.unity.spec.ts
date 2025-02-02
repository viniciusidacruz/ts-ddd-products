import { AddressEntity } from "../../../domain/customer/value-objects";
import { CustomerEntity } from "../../../domain/customer/entity/customer.entity";

import { FindCustomerUseCase } from "./find.customer.usecase";

const customer = new CustomerEntity(
  "ae594473-6724-4b7e-a0e6-f8704e904b01",
  "John Doe"
);
const address = new AddressEntity(
  "Av. Papa João XXIII, 695",
  "Ribeirão Pires",
  "São Paulo",
  "09421-540"
);
customer.changeAddress(address);

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    update: jest.fn(),
    delete: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
  };
};

describe("Unit test find customer use case", () => {
  it("Should find a customer by id", async () => {
    const customerRepository = MockRepository();
    const findCustomerUseCase = new FindCustomerUseCase(customerRepository);

    const input = {
      id: "ae594473-6724-4b7e-a0e6-f8704e904b01",
    };

    const output = {
      id: "ae594473-6724-4b7e-a0e6-f8704e904b01",
      name: "John Doe",
      rewardPoints: 0,
      active: false,
      address: {
        street: "Av. Papa João XXIII, 695",
        city: "Ribeirão Pires",
        state: "São Paulo",
        zipCode: "09421-540",
      },
    };

    const result = await findCustomerUseCase.execute(input);

    expect(result).toEqual(output);
  });

  it("Should not find a customer", () => {
    const customerRepository = MockRepository();

    customerRepository.find.mockImplementation(() => {
      throw new Error("Customer not found");
    });

    const findCustomerUseCase = new FindCustomerUseCase(customerRepository);

    const input = {
      id: "ae594473-6724-4b7e-a0e6-f8704e904b01",
    };

    expect(() => {
      return findCustomerUseCase.execute(input);
    }).rejects.toThrow("Customer not found");
  });
});
