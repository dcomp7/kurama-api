import { describe, it, expect, beforeAll, afterAll } from "@jest/globals";
import sequelize from "../../database";
import Media from "../../app/models/Media";

describe("Media Model", () => {
  let media;

  beforeAll(async () => {
    await sequelize.sync({ force: true });

    media = await Media.create({
      trip_id: 1,
      product_id: 1,
      review_id: 1,
      user_id: 1,
      customer_id: 1,
      context: "product_main",
      type: "photo",
      path: "path/to/media.jpg",
      seo_file_name: "media.jpg",
      uploaded_at: new Date(),
      is_active: "yes",
    });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a media", async () => {
    const newMedia = await Media.create({
      trip_id: 2,
      product_id: 2,
      review_id: 2,
      user_id: 2,
      customer_id: 2,
      context: "product_gallery",
      type: "video",
      path: "path/to/media.mp4",
      seo_file_name: "media.mp4",
      uploaded_at: new Date(),
      is_active: "yes",
    });

    expect(newMedia).toHaveProperty("media_id");
    expect(newMedia.context).toBe("product_gallery");
    expect(newMedia.type).toBe("video");
  });

  it("should update a media", async () => {
    media.context = "trip_main";
    media.type = "video";

    await media.save();

    const updatedMedia = await Media.findByPk(media.media_id);

    expect(updatedMedia.context).toBe("trip_main");
    expect(updatedMedia.type).toBe("video");
  });

  it("should delete a media", async () => {
    await media.destroy();

    const deletedMedia = await Media.findByPk(media.media_id);

    expect(deletedMedia).toBeNull();
  });
});
