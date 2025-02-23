import { describe, it, expect, beforeAll, afterAll } from "@jest/globals";
import sequelize from "../../database";
import Trip from "../../app/models/Trip";

describe("Trip Model", () => {
  let trip;

  beforeAll(async () => {
    await sequelize.sync({ force: true });

    trip = await Trip.create({
      name: "Test Trip",
      occurrence: "Once a year",
      description: "A test trip description",
      is_active: "yes",
    });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a trip", async () => {
    const newTrip = await Trip.create({
      name: "New Trip",
      occurrence: "Twice a year",
      description: "A new trip description",
      is_active: "yes",
    });

    expect(newTrip).toHaveProperty("trip_id");
    expect(newTrip.name).toBe("New Trip");
    expect(newTrip.occurrence).toBe("Twice a year");
  });

  it("should update a trip", async () => {
    trip.name = "Updated Trip";
    trip.occurrence = "Once a month";

    await trip.save();

    const updatedTrip = await Trip.findByPk(trip.trip_id);

    expect(updatedTrip.name).toBe("Updated Trip");
    expect(updatedTrip.occurrence).toBe("Once a month");
  });

  it("should delete a trip", async () => {
    await trip.destroy();

    const deletedTrip = await Trip.findByPk(trip.trip_id);

    expect(deletedTrip).toBeNull();
  });
});
