import request from "supertest";
import { jest, describe, it, expect, beforeAll } from "@jest/globals";
import app from "../../app";
import User from "../../app/models/User";
import jwt from "jsonwebtoken";
import authConfig from "../../config/auth";

jest.mock("../../app/middlewares/auth", () => {
  return (req, res, next) => {
    req.userId = 1;
    req.customerId = 0;
    return next();
  };
});

describe("UserController", () => {
  let token;
  let user;

  beforeAll(async () => {
    user = await User.create({
      name: "Test User",
      email: "testuser@example.com",
      password: "password123",
    });

    token = jwt.sign(
      { userId: user.user_id, type: "user" },
      authConfig.secret,
      {
        expiresIn: authConfig.expiresIn,
      },
    );
  });

  it("should create a new user", async () => {
    const response = await request(app)
      .post("/users")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "New User",
        email: "newuser@example.com",
        role: "admin",
        password: "password123",
        passwordConfirmation: "password123",
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("user_id");
    expect(response.body.name).toBe("New User");
    expect(response.body.email).toBe("newuser@example.com");
  });

  it("should list users", async () => {
    const response = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it("should show a user", async () => {
    const response = await request(app)
      .get(`/users/${user.user_id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("user_id");
    expect(response.body.name).toBe("Test User");
    expect(response.body.email).toBe("testuser@example.com");
  });

  it("should update a user", async () => {
    const response = await request(app)
      .put(`/users/${user.user_id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Updated User",
        email: "updateduser@example.com",
        oldPassword: "password123",
        password: "newpassword123",
        passwordConfirmation: "newpassword123",
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("userId");
    expect(response.body.name).toBe("Updated User");
    expect(response.body.email).toBe("updateduser@example.com");
  });

  it("should delete a user", async () => {
    const response = await request(app)
      .delete(`/users/${user.user_id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(204);
  });
});
