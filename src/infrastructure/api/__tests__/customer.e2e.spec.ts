import request from "supertest";

import { app, sequelize } from "../express";

describe("E2E test for customer", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a new customer", async () => {
    const response = await request(app)
      .post("/customer/create")
      .send({
        name: "John Doe",
        address: {
          street: "Av. Papa João XXIII, 695",
          city: "Ribeirão Pires",
          state: "São Paulo",
          zipCode: "09421-540",
        },
      });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe("John Doe");
    expect(response.body.address.street).toBe("Av. Papa João XXIII, 695");
    expect(response.body.address.city).toBe("Ribeirão Pires");
    expect(response.body.address.state).toBe("São Paulo");
    expect(response.body.address.zipCode).toBe("09421-540");
  });
});
