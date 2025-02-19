import { describe, it, expect, beforeAll, afterAll } from "@jest/globals";
import sequelize from "../../database";
import User from "../../app/models/User";

describe("User Model", () => {
  let user;

  beforeAll(async () => {
    await sequelize.sync({ force: true });

    user = await User.create({
      name: "Test User",
      email: "testuser@example.com",
      password: "password123",
    });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a user", async () => {
    const newUser = await User.create({
      name: "New User",
      email: "newuser@example.com",
      password: "password123",
    });

    expect(newUser).toHaveProperty("user_id");
    expect(newUser.name).toBe("New User");
    expect(newUser.email).toBe("newuser@example.com");
  });

  it("should update a user", async () => {
    user.name = "Updated User";
    user.email = "updateduser@example.com";
    user.password = "newpassword123";

    await user.save();

    const updatedUser = await User.findByPk(user.user_id);

    expect(updatedUser.name).toBe("Updated User");
    expect(updatedUser.email).toBe("updateduser@example.com");
  });

  it("should delete a user", async () => {
    await user.destroy();

    const deletedUser = await User.findByPk(user.user_id);

    expect(deletedUser).toBeNull();
  });

  it("should check password", async () => {
    const passwordMatch = await user.checkPassword("newpassword123");
    expect(passwordMatch).toBe(true);

    const passwordMismatch = await user.checkPassword("wrongpassword");
    expect(passwordMismatch).toBe(false);
  });
});
