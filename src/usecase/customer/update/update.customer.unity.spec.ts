import { CustomerFactory } from "../../../domain/customer/factory/customer.factory";
import { AddressEntity } from "../../../domain/customer/value-objects";
import { UpdateCustomerUseCase } from "./update.customer.usecase";

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
  name: "John Updated",
  address: {
    street: "Nova rua",
    city: "Nova cidade",
    state: "São Paulo",
    zipCode: "09421-540",
  },
};

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    update: jest.fn(),
    delete: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
  };
};

describe("Unit test use case update customer", () => {
  it("should update customer", async () => {
    const customerRepository = MockRepository();
    const updateCustomerUseCase = new UpdateCustomerUseCase(customerRepository);

    const output = await updateCustomerUseCase.execute(input);

    expect(output).toEqual(input);
  });
});
