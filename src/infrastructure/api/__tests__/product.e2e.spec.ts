import request from "supertest";

import { app, sequelize } from "../express";

describe("E2E test for product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a new product", async () => {
    const response = await request(app).post("/product/create").send({
      name: "One",
      price: 1,
    });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe("One");
    expect(response.body.price).toBe(1);
  });

  it("Should not create a product", async () => {
    const response = await request(app).post("/product/create").send({
      name: "",
      price: 1,
    });

    expect(response.status).toBe(500);
  });

  it("Should find a product", async () => {
    const createResponse = await request(app).post("/product/create").send({
      name: "One",
      price: 1,
    });

    const findResponse = await request(app).get(
      `/product/${createResponse.body.id}/details`
    );

    expect(findResponse.status).toBe(200);
    expect(findResponse.body.name).toBe("One");
    expect(findResponse.body.price).toBe(1);
  });

  it("Should return all products", async () => {
    await request(app).post("/product/create").send({
      name: "One",
      price: 1,
    });

    await request(app).post("/product/create").send({
      name: "Two",
      price: 2,
    });

    const findResponse = await request(app).get("/product/list");

    expect(findResponse.status).toBe(200);
    expect(findResponse.body.products.length).toBe(2);

    expect(findResponse.body.products[0].name).toBe("One");
    expect(findResponse.body.products[0].price).toBe(1);

    expect(findResponse.body.products[1].name).toBe("Two");
    expect(findResponse.body.products[1].price).toBe(2);
  });

  it("Should update a product", async () => {
    const createResponse = await request(app).post("/product/create").send({
      name: "One",
      price: 1,
    });

    const updateResponse = await request(app)
      .put(`/product/${createResponse.body.id}/update`)
      .send({
        name: "One Updated",
        price: 2,
      });

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.name).toBe("One Updated");
    expect(updateResponse.body.price).toBe(2);
  });
});
