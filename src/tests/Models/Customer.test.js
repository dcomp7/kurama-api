import { describe, it, expect, beforeAll, afterAll } from "@jest/globals";
import sequelize from "../../database";
import Customer from "../../app/models/Customer";

describe("Customer Model", () => {
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
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a customer", async () => {
    const newCustomer = await Customer.create({
      full_name: "New Customer",
      document_id: "987654321",
      gender: "F",
      birth_date: new Date(1995, 5, 15),
      mobile_phone: "0987654321",
      is_mobile_phone_confirmed: "no",
      email: "newcustomer@example.com",
      is_email_confirmed: "no",
      password: "password123",
      has_newsletter_subscription: "no",
      internal_note: "New customer note",
      is_active: "yes",
    });

    expect(newCustomer).toHaveProperty("customer_id");
    expect(newCustomer.full_name).toBe("New Customer");
    expect(newCustomer.email).toBe("newcustomer@example.com");
  });

  it("should update a customer", async () => {
    customer.full_name = "Updated Customer";
    customer.email = "updatedcustomer@example.com";
    customer.password = "newpassword123";

    await customer.save();

    const updatedCustomer = await Customer.findByPk(customer.customer_id);

    expect(updatedCustomer.full_name).toBe("Updated Customer");
    expect(updatedCustomer.email).toBe("updatedcustomer@example.com");
  });

  it("should delete a customer", async () => {
    await customer.destroy();

    const deletedCustomer = await Customer.findByPk(customer.customer_id);

    expect(deletedCustomer).toBeNull();
  });

  it("should check password", async () => {
    const passwordMatch = await customer.checkPassword("newpassword123");
    expect(passwordMatch).toBe(true);

    const passwordMismatch = await customer.checkPassword("wrongpassword");
    expect(passwordMismatch).toBe(false);
  });
});
