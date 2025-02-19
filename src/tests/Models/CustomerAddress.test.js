import { describe, it, expect, beforeAll, afterAll } from "@jest/globals";
import sequelize from "../../database";
import Customer from "../../app/models/Customer";
import CustomerAddress from "../../app/models/CustomerAddress";

describe("CustomerAddress Model", () => {
  let customer;
  let customerAddress;

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
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a customer address", async () => {
    const address = await CustomerAddress.create({
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

    expect(address).toHaveProperty("customer_address_id");
    expect(address.description).toBe("Secondary delivery address");
    expect(address.city).toBe("New City");
  });

  it("should update a customer address", async () => {
    customerAddress.description = "Updated address";
    customerAddress.street = "Updated Street";
    customerAddress.street_number = 789;
    customerAddress.complement = "Apt 3";
    customerAddress.postal_code = "98765432";
    customerAddress.neighborhood = "Updated Neighborhood";
    customerAddress.city = "Updated City";
    customerAddress.state = "UC";
    customerAddress.country = "BR";
    customerAddress.is_active = "yes";

    await customerAddress.save();

    const updatedAddress = await CustomerAddress.findByPk(
      customerAddress.customer_address_id,
    );

    expect(updatedAddress.description).toBe("Updated address");
    expect(updatedAddress.city).toBe("Updated City");
  });

  it("should delete a customer address", async () => {
    await customerAddress.destroy();

    const deletedAddress = await CustomerAddress.findByPk(
      customerAddress.customer_address_id,
    );

    expect(deletedAddress).toBeNull();
  });
});
