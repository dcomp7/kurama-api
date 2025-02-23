import CustomerAddress from "../models/CustomerAddress.js";
import { Op } from "sequelize";
import { parseISO } from "date-fns";
import * as Yup from "yup";

class CustomerAddressController {
  async index(req, res) {
    const {
      customer_id,
      city,
      state,
      createdBefore,
      createdAfter,
      updatedBefore,
      updatedAfter,
      sort,
    } = req.query;

    const page = req.query.page || 1;
    const limit = req.query.limit || 10;

    let where = {};
    let order = [];

    if (customer_id) where = { ...where, customer_id };
    if (city) where = { ...where, city: { [Op.like]: `%${city}%` } };
    if (state) where = { ...where, state: { [Op.like]: `%${state}%` } };
    if (createdBefore)
      where = { ...where, created_at: { [Op.lte]: parseISO(createdBefore) } };
    if (createdAfter)
      where = { ...where, created_at: { [Op.gte]: parseISO(createdAfter) } };
    if (updatedBefore)
      where = { ...where, modified_at: { [Op.lte]: parseISO(updatedBefore) } };
    if (updatedAfter)
      where = { ...where, modified_at: { [Op.gte]: parseISO(updatedAfter) } };

    if (sort) {
      order = sort.split(",").map((item) => item.split(":"));
    }

    const data = await CustomerAddress.findAll({
      where,
      order,
      limit,
      offset: limit * page - limit,
    });

    return res.json(data);
  }

  async show(req, res) {
    try {
      const { customerAddressId } = req.params;
      const customerAddress = await CustomerAddress.findByPk(customerAddressId);

      if (customerAddress) {
        return res.json(customerAddress);
      } else {
        return res.status(404).json({ error: "Customer address not found" });
      }
    } catch {
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async create(req, res) {
    try {
      const schema = Yup.object().shape({
        customer_id: Yup.number().required(),
        address_type: Yup.string().oneOf(["delivery", "billing"]).required(),
        description: Yup.string().required(),
        street: Yup.string().required(),
        street_number: Yup.number().required(),
        complement: Yup.string(),
        postal_code: Yup.string().required(),
        neighborhood: Yup.string().required(),
        city: Yup.string().required(),
        state: Yup.string().required(),
        country: Yup.string().default("BR"),
      });

      try {
        await schema.validate(req.body, { abortEarly: false });
      } catch (err) {
        console.log("Validation error:", err.errors);
        return res
          .status(400)
          .json({ error: "Validation fails", messages: err.errors });
      }

      const customerAddress = await CustomerAddress.create(req.body);

      return res.status(201).json(customerAddress);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async update(req, res) {
    try {
      const schema = Yup.object().shape({
        address_type: Yup.string().oneOf(["delivery", "billing"]),
        description: Yup.string(),
        street: Yup.string(),
        street_number: Yup.number(),
        complement: Yup.string(),
        postal_code: Yup.string(),
        neighborhood: Yup.string(),
        city: Yup.string(),
        state: Yup.string(),
        country: Yup.string().default("BR"),
      });

      try {
        await schema.validate(req.body, { abortEarly: false });
      } catch (err) {
        return res
          .status(400)
          .json({ error: "Validation fails", messages: err.inner });
      }

      const { customerAddressId } = req.params;

      const customerAddress = await CustomerAddress.findByPk(customerAddressId);
      if (!customerAddress) {
        return res.status(404).json({ error: "Customer address not found" });
      }

      customerAddress.set(req.body);

      await customerAddress.save();

      return res.json(customerAddress);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async delete(req, res) {
    try {
      const { customerAddressId } = req.params;

      const customerAddress = await CustomerAddress.findByPk(customerAddressId);

      if (!customerAddress) {
        return res.status(404).json({ error: "Customer address not found" });
      }

      await customerAddress.destroy();

      return res.status(204).send();
    } catch {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default new CustomerAddressController();
