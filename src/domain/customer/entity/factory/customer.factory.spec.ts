import { AddressEntity } from "../../value-objects";

import { CustomerFactory } from "./customer.factory";

describe("Customer factory tests", () => {
  it("Should create a customer", () => {
    const customer = CustomerFactory.create("Vinicius Italo");

    expect(customer.id).toBeDefined();
    expect(customer.name).toEqual("Vinicius Italo");
    expect(customer.address).toBeUndefined();
  });

  it("Should create a new customer with address", () => {
    const address = new AddressEntity(
      "Rua dos Amores",
      "São Paulo",
      "SP",
      "01234-567"
    );
    const customer = CustomerFactory.createWithAddress(
      "Vinicius Italo",
      address
    );

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("Vinicius Italo");
    expect(customer.address).toBe(address);
  });
});
