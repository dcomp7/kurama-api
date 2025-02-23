import { describe, it, expect, beforeAll, afterAll } from "@jest/globals";
import sequelize from "../../database";
import Category from "../../app/models/Category";

describe("Category Model", () => {
  let category;

  beforeAll(async () => {
    await sequelize.sync({ force: true });

    category = await Category.create({
      name: "Electronics",
      description: "Electronic items",
      seo_url: "electronics",
      content: "All kinds of electronics",
      is_active: "yes",
    });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a category", async () => {
    const newCategory = await Category.create({
      name: "Books",
      description: "All kinds of books",
      seo_url: "books",
      content: "Books content",
      is_active: "yes",
    });

    expect(newCategory).toHaveProperty("category_id");
    expect(newCategory.name).toBe("Books");
    expect(newCategory.description).toBe("All kinds of books");
  });

  it("should update a category", async () => {
    category.name = "Updated Electronics";
    category.description = "Updated electronic items";

    await category.save();

    const updatedCategory = await Category.findByPk(category.category_id);

    expect(updatedCategory.name).toBe("Updated Electronics");
    expect(updatedCategory.description).toBe("Updated electronic items");
  });

  it("should delete a category", async () => {
    await category.destroy();

    const deletedCategory = await Category.findByPk(category.category_id);

    expect(deletedCategory).toBeNull();
  });
});
