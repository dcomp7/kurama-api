import request from "supertest";
import { jest, describe, it, expect, beforeAll, afterAll } from "@jest/globals";
import app from "../../app";
import sequelize from "../../database";
import Customer from "../../app/models/Customer";
import CustomerAddress from "../../app/models/CustomerAddress";
import jwt from "jsonwebtoken";
import authConfig from "../../config/auth";

jest.mock("../../app/middlewares/auth", () => {
  return (req, res, next) => {
    req.userId = 1;
    req.customerId = 0;
    return next();
  };
});

describe("CustomerAddressController", () => {
  let token;
  let customer;
  let customerAddress;

  beforeAll(async () => {
    await sequelize.sync({ force: true });

    customer = await Customer.create({
      full_name: "Test Customer",
      document_id: "123456789", // Add document_id field
      gender: "M",
      birth_date: new Date(1990, 1, 1),
      mobile_phone: "1234567890",
      is_mobile_phone_confirmed: "no",
      email: "testcustomer@example.com",
      is_email_confirmed: "no",
      password: "password123",
      has_newsletter_subscription: "no",
      internal_note: "Test note",
      is_active: "yes",
    });

    customerAddress = await CustomerAddress.create({
      customer_id: customer.customer_id,
      is_main_address: "yes",
      address_type: "billing",
      description: "Main billing address",
      street: "Test Street",
      street_number: 123,
      complement: "Apt 1",
      postal_code: "12345678",
      neighborhood: "Test Neighborhood",
      city: "Test City",
      state: "TS",
      country: "BR",
      is_active: "yes",
    });

    token = jwt.sign(
      { customerId: customer.customer_id, type: "customer" },
      authConfig.secret,
      {
        expiresIn: authConfig.expiresIn,
      },
    );
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a new customer address", async () => {
    const response = await request(app)
      .post("/customer-addresses")
      .set("Authorization", `Bearer ${token}`)
      .send({
        customer_id: customer.customer_id,
        is_main_address: "no",
        address_type: "delivery",
        description: "Secondary delivery address",
        street: "New Street",
        street_number: 456,
        complement: "Apt 2",
        postal_code: "87654321",
        neighborhood: "New Neighborhood",
        city: "New City",
        state: "NC",
        country: "BR",
        is_active: "yes",
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("customer_address_id");
    expect(response.body.description).toBe("Secondary delivery address");
    expect(response.body.city).toBe("New City");
  });

  it("should list customer addresses", async () => {
    const response = await request(app)
      .get("/customer-addresses")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it("should show a customer address", async () => {
    const response = await request(app)
      .get(`/customer-addresses/${customerAddress.customer_address_id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("customer_address_id");
    expect(response.body.description).toBe("Main billing address");
    expect(response.body.city).toBe("Test City");
  });

  it("should update a customer address", async () => {
    const response = await request(app)
      .put(`/customer-addresses/${customerAddress.customer_address_id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        description: "Updated address",
        street: "Updated Street",
        street_number: 789,
        complement: "Apt 3",
        postal_code: "98765432",
        neighborhood: "Updated Neighborhood",
        city: "Updated City",
        state: "UC",
        country: "BR",
        is_active: "yes",
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("customer_address_id");
    expect(response.body.description).toBe("Updated address");
    expect(response.body.city).toBe("Updated City");
  });

  it("should delete a customer address", async () => {
    const response = await request(app)
      .delete(`/customer-addresses/${customerAddress.customer_address_id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(204);
  });
});
