import request from "supertest";
import { describe, it, expect, beforeAll, afterAll } from "@jest/globals";
import app from "../../app";
import sequelize from "../../database";
import User from "../../app/models/User";
import Customer from "../../app/models/Customer";

describe("SessionController", () => {
  beforeAll(async () => {
    await User.create({
      name: "New User",
      email: "testeabc@example",
      password: "password123",
      passwordConfirmation: "password123",
    });

    await Customer.create({
      full_name: "Test Customer",
      document_id: "123456789", // Add document_id field
      gender: "M",
      birth_date: new Date(1990, 1, 1),
      mobile_phone: "1234567890",
      is_mobile_phone_confirmed: "no",
      email: "testcustomer2@example.com",
      is_email_confirmed: "no",
      password: "password123",
      has_newsletter_subscription: "no",
      internal_note: "Test note",
      is_active: "yes",
    });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should authenticate a user", async () => {
    const response = await request(app).post("/sessions").send({
      email: "testeabc@example",
      password: "password123",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  it("should not authenticate a user with invalid credentials", async () => {
    const response = await request(app).post("/sessions").send({
      email: "testeabc@example",
      password: "wrongpassword",
    });

    expect(response.status).toBe(401);
  });

  it("should authenticate a customer", async () => {
    const response = await request(app).post("/sessions").send({
      type: "customer",
      email: "testcustomer2@example.com",
      password: "password123",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  it("should not authenticate a customer with invalid credentials", async () => {
    const response = await request(app).post("/sessions").send({
      email: "testcustomer2@example.com",
      password: "wrongpassword",
    });

    expect(response.status).toBe(401);
  });
});
