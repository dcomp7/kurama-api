"use strict";

const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface) => {
    const passwordHash = await bcrypt.hash("12345678", 8);
    return queryInterface.bulkInsert("users", [
      {
        name: "Admin",
        email: "admin@admin.com",
        password_hash: passwordHash,
        is_active: "yes",
        created_at: new Date(),
        modified_at: new Date(),
      },
    ]);
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete("users", { email: "admin@admin.com" }, {});
  },
};
