import { Sequelize } from "sequelize-typescript";
import { CustomerRepository } from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import { CreateCustomerUseCase } from "./create.customer.usecase";
import { CustomerModel } from "../../../infrastructure/customer/repository/sequelize/customer.model";

const input = {
  name: "John Doe",
  address: {
    street: "Av. Papa João XXIII, 695",
    city: "Ribeirão Pires",
    state: "São Paulo",
    zipCode: "09421-540",
  },
};

describe("Integration test create customer use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize("database", "username", "password", {
      dialect: "sqlite",
      logging: false,
      storage: ":memory:",
      sync: { force: true },
    });

    await sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a customer", async () => {
    const customerRepository = new CustomerRepository();
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
    const customerRepository = new CustomerRepository();
    const createCustomerUseCase = new CreateCustomerUseCase(customerRepository);

    input.name = "";

    await expect(createCustomerUseCase.execute(input)).rejects.toThrow(
      "Name is required"
    );
  });

  it("should throw an error when street is missing", async () => {
    const customerRepository = new CustomerRepository();
    const createCustomerUseCase = new CreateCustomerUseCase(customerRepository);

    input.address.street = "";

    await expect(createCustomerUseCase.execute(input)).rejects.toThrow(
      "Street is required"
    );
  });
});
