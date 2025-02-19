import request from "supertest";
import { jest, describe, it, expect, beforeAll, afterAll } from "@jest/globals";
import app from "../../app";
import sequelize from "../../database";
import Customer from "../../app/models/Customer";
import jwt from "jsonwebtoken";
import authConfig from "../../config/auth";

jest.mock("../../app/middlewares/auth", () => {
  return (req, res, next) => {
    req.userId = 1;
    req.customerId = 0;
    return next();
  };
});

describe("CustomerController", () => {
  let token;
  let customer;

  beforeAll(async () => {
    await sequelize.sync({ force: true });

    customer = await Customer.create({
      full_name: "Test Customer",
      document_id: "123456789",
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

  it("should create a new customer", async () => {
    const response = await request(app)
      .post("/customers")
      .set("Authorization", `Bearer ${token}`)
      .send({
        full_name: "New Customer",
        document_id: "987654321",
        gender: "F",
        birth_date: new Date(1995, 5, 15),
        mobile_phone: "0987654321",
        is_mobile_phone_confirmed: "no",
        email: "newcustomer@example.com",
        is_email_confirmed: "no",
        password: "password123",
        passwordConfirmation: "password123",
        has_newsletter_subscription: "no",
        internal_note: "New customer note",
        is_active: "yes",
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("customer_id");
    expect(response.body.full_name).toBe("New Customer");
    expect(response.body.email).toBe("newcustomer@example.com");
  });

  it("should list customers", async () => {
    const response = await request(app)
      .get("/customers")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it("should show a customer", async () => {
    const response = await request(app)
      .get(`/customers/${customer.customer_id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("customer_id");
    expect(response.body.full_name).toBe("Test Customer");
    expect(response.body.email).toBe("testcustomer@example.com");
  });

  it("should update a customer", async () => {
    const response = await request(app)
      .put(`/customers/${customer.customer_id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        full_name: "Updated Customer",
        document_id: "123456789",
        gender: "M",
        birth_date: new Date(1990, 1, 1),
        mobile_phone: "1234567890",
        is_mobile_phone_confirmed: "yes",
        email: "updatedcustomer@example.com",
        is_email_confirmed: "yes",
        oldPassword: "password123",
        password: "newpassword123",
        passwordConfirmation: "newpassword123",
        has_newsletter_subscription: "yes",
        internal_note: "Updated note",
        is_active: "yes",
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("customer_id");
    expect(response.body.full_name).toBe("Updated Customer");
    expect(response.body.email).toBe("updatedcustomer@example.com");
  });

  it("should delete a customer", async () => {
    const response = await request(app)
      .delete(`/customers/${customer.customer_id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(204);
  });
});
