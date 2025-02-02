import { CreateCustomerUseCase } from "./create.customer.usecase";

const input = {
  name: "John Doe",
  address: {
    street: "Av. Papa João XXIII, 695",
    city: "Ribeirão Pires",
    state: "São Paulo",
    zipCode: "09421-540",
  },
};

const MockRepository = () => {
  return {
    find: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findAll: jest.fn(),
  };
};

describe("Unit test create customer use case", () => {
  it("should create a customer", async () => {
    const customerRepository = MockRepository();
    const createCustomerUseCase = new CreateCustomerUseCase(customerRepository);

    const output = await createCustomerUseCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      address: {
        street: input.address.street,
        city: input.address.city,
        state: input.address.state,
        zipCode: input.address.zipCode,
      },
    });
  });

  it("should throw an error when name is missing", async () => {
    const customerRepository = MockRepository();
    const createCustomerUseCase = new CreateCustomerUseCase(customerRepository);

    input.name = "";

    await expect(createCustomerUseCase.execute(input)).rejects.toThrow(
      "Name is required"
    );
  });
  
  it("should throw an error when street is missing", async () => {
    const customerRepository = MockRepository();
    const createCustomerUseCase = new CreateCustomerUseCase(customerRepository);

    input.address.street = "";

    await expect(createCustomerUseCase.execute(input)).rejects.toThrow(
      "Street is required"
    );
  });
});
