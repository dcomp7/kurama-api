import Customer from "../models/Customer";
import { Op } from "sequelize";
import { parseISO } from "date-fns";
import * as Yup from "yup";

class CustomerController {
  async index(req, res) {
    const {
      full_name,
      email,
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

    if (full_name)
      where = { ...where, full_name: { [Op.like]: `%${full_name}%` } };
    if (email) where = { ...where, email: { [Op.like]: `%${email}%` } };
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

    const data = await Customer.findAll({
      attributes: { exclude: ["password_hash"] },
      where,
      order,
      limit,
      offset: limit * page - limit,
    });

    return res.json(data);
  }

  async show(req, res) {
    try {
      const { customerId } = req.params;
      const customer = await Customer.findByPk(customerId, {
        attributes: { exclude: ["password_hash"] },
      });

      if (customer) {
        return res.json(customer);
      } else {
        return res.status(404).json({ error: "Customer not found" });
      }
    } catch {
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async create(req, res) {
    try {
      const schema = Yup.object().shape({
        full_name: Yup.string().required(),
        email: Yup.string().email().required(),
        password: Yup.string().required().min(8),
        passwordConfirmation: Yup.string().when(
          "password",
          (password, field) =>
            password ? field.required().oneOf([Yup.ref("password")]) : field,
        ),
      });

      try {
        await schema.validate(req.body, { abortEarly: false });
      } catch (err) {
        console.log("Validation error:", err.errors);
        return res
          .status(400)
          .json({ error: "Validation fails", messages: err.errors });
      }

      const customer = await Customer.create(req.body);
      let customerJSON = customer.toJSON();
      delete customerJSON.password_hash;

      return res.status(201).json(customerJSON);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async update(req, res) {
    try {
      const schema = Yup.object().shape({
        full_name: Yup.string(),
        email: Yup.string().email(),
        oldPassword: Yup.string().min(8),
        password: Yup.string()
          .min(8)
          .when("oldPassword", {
            is: (oldPassword) => !!oldPassword,
            then: (schema) => schema.required(),
            otherwise: (schema) => schema.notRequired(),
          }),
        passwordConfirmation: Yup.string().when("password", {
          is: (password) => !!password,
          then: (schema) =>
            schema
              .required()
              .oneOf([Yup.ref("password")], "Passwords must match"),
          otherwise: (schema) => schema.notRequired(),
        }),
      });

      try {
        await schema.validate(req.body, { abortEarly: false });
      } catch (err) {
        return res
          .status(400)
          .json({ error: "Validation fails", messages: err.inner });
      }

      const { customerId } = req.params;

      const customer = await Customer.findByPk(customerId);
      if (!customer) {
        return res.status(404).json({ error: "Customer not found" });
      }

      const { oldPassword } = req.body;
      if (oldPassword && !(await customer.checkPassword(oldPassword))) {
        return res.status(401).json({ error: "Password does not match" });
      }

      customer.set(req.body);

      await customer.save();

      let customerJSON = customer.toJSON();
      delete customerJSON.password_hash;

      return res.status(201).json(customerJSON);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async delete(req, res) {
    try {
      const { customerId } = req.params;

      const customer = await Customer.findByPk(customerId);

      if (!customer) {
        return res.status(404).json({ error: "Customer not found" });
      }

      await customer.destroy();

      return res.status(204).send();
    } catch {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default new CustomerController();
