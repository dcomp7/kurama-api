import { afterAll, beforeAll } from "@jest/globals";
import sequelize from "../database";
import Queue from "../lib/Queue";
import { jest } from "@jest/globals";

jest.mock("../lib/Mail", () => ({
  send: jest.fn(),
}));

jest.mock("../lib/Queue", () => {
  return {
    processQueue: jest.fn(),
    add: jest.fn().mockResolvedValue(true),
    closeQueues: jest.fn().mockResolvedValue(true),
    default: {
      add: jest.fn().mockResolvedValue(true),
    },
    queues: {
      WelcomeEmailJob: {
        bee: {
          close: jest.fn().mockResolvedValue(true),
        },
      },
    },
  };
});

beforeAll(() => {
  Queue.processQueue();
});

afterAll(() => {
  Queue.closeQueues();
  sequelize.close();
});
