import { AddressEntity } from "../address/address.entity";

describe("Address unit tests", () => {
  describe("Error ❌", () => {
    it("Should throw error when street is empty", () => {
      expect(() => {
        new AddressEntity("", "Ribeirão Pires", "São Paulo", "09421-540");
      }).toThrow("Street is required");
    });

    it("Should throw error when city is empty", () => {
      expect(() => {
        new AddressEntity(
          "Av. Papa João XXIII, 695",
          "",
          "São Paulo",
          "09421-540"
        );
      }).toThrow("City is required");
    });

    it("Should throw error when state is empty", () => {
      expect(() => {
        new AddressEntity(
          "Av. Papa João XXIII, 695",
          "Ribeirão Pires",
          "",
          "09421-540"
        );
      }).toThrow("State is required");
    });

    it("Should throw error when zip code is empty", () => {
      expect(() => {
        new AddressEntity(
          "Av. Papa João XXIII, 695",
          "Ribeirão Pires",
          "São Paulo",
          ""
        );
      }).toThrow("Zip code is required");
    });
  });

  describe("Success ✅", () => {
    it("Should create valid address", () => {
      const address = new AddressEntity(
        "Av. Papa João XXIII, 695",
        "Ribeirão Pires",
        "São Paulo",
        "09421-540"
      );

      expect(address.toString()).toBe(
        "Av. Papa João XXIII, 695, Ribeirão Pires, São Paulo 09421-540"
      );
    });

    it("Should validated", () => {
      const address = new AddressEntity(
        "Av. Papa João XXIII, 695",
        "Ribeirão Pires",
        "São Paulo",
        "09421-540"
      );

      expect(address.validate()).toBeTruthy();
    });
  });
});
