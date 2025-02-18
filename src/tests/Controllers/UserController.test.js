import request from "supertest";
import { jest, describe, it, expect, beforeAll, afterAll } from "@jest/globals";
import app from "../../app"; // Certifique-se de que o caminho para o arquivo app.js está correto
import sequelize from "../../database"; // Certifique-se de que o caminho para o arquivo database.js está correto
import User from "../../app/models/User";
import jwt from "jsonwebtoken";
import authConfig from "../../config/auth";
import Mail from "../../lib/Mail";
import Queue from "../../lib/Queue";

jest.mock("../../app/middlewares/auth", () => {
  return (req, res, next) => {
    req.userId = 1;
    req.customerId = 0;
    return next();
  };
});

describe("UserController", () => {
  let token;

  beforeAll(async () => {
    const user = await User.create({
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
        password: "password123",
        passwordConfirmation: "password123",
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("user_id");
    expect(response.body.name).toBe("New User");
    expect(response.body.email).toBe("newuser@example.com");
  });
});
