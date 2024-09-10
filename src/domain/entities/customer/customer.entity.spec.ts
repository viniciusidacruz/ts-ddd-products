import { AddressEntity } from "../address/address.entity";
import { CustomerEntity } from "./customer.entity";

describe("Customer unit tests", () => {
  describe("Error ❌", () => {
    it("Should throw error when id is empty", () => {
      expect(() => {
        new CustomerEntity("", "John Doe");
      }).toThrow("ID is required");
    });

    it("Should throw error when name is empty", () => {
      expect(() => {
        new CustomerEntity("07556a1c-7b82-4104-94b1-cb8cab474a19", "");
      }).toThrow("Name is required");
    });

    it("Should throw error when called activate but address is empty", () => {
      expect(() => {
        const customer = new CustomerEntity(
          "07556a1c-7b82-4104-94b1-cb8cab474a19",
          "John Doe"
        );

        customer.activate();
      }).toThrow("Address is required to activate customer");
    });
  });

  describe("Success ✅", () => {
    it("Should change name", () => {
      const customer = new CustomerEntity(
        "07556a1c-7b82-4104-94b1-cb8cab474a19",
        "John Doe"
      );

      customer.changeName("Jane Doe");

      expect(customer.name).toBe("Jane Doe");
    });

    it("Should is validated", () => {
      const customer = new CustomerEntity(
        "07556a1c-7b82-4104-94b1-cb8cab474a19",
        "John Doe"
      );

      expect(customer.validate()).toBeTruthy();
    });

    it("Should activate customer", () => {
      const customer = new CustomerEntity(
        "07556a1c-7b82-4104-94b1-cb8cab474a19",
        "John Doe"
      );

      const address = new AddressEntity(
        "Av. Papa João XXIII, 695",
        "Ribeirão Pires",
        "São Paulo",
        "09421-540"
      );

      customer.Address = address;

      customer.activate();

      expect(customer.isActive()).toBeTruthy();
    });

    it("Should is inactive customer", () => {
      const customer = new CustomerEntity(
        "07556a1c-7b82-4104-94b1-cb8cab474a19",
        "John Doe"
      );

      expect(customer.isActive()).toBeFalsy();
    });

    it("Should deactivate customer", () => {
      const customer = new CustomerEntity(
        "07556a1c-7b82-4104-94b1-cb8cab474a19",
        "John Doe"
      );

      customer.deactivate();

      expect(customer.isActive()).toBeFalsy();
    });
  });
});
