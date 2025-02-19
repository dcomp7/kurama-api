import User from "../models/User";
import { Op } from "sequelize";
import { parseISO } from "date-fns";
import * as Yup from "yup";
import Queue from "../../lib/Queue";
import { WelcomeEmailJob } from "../jobs";

class UserController {
  async index(req, res) {
    const {
      name,
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

    if (name) where = { ...where, name: { [Op.like]: `%${name}%` } };
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

    const data = await User.findAll({
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
      const { userId } = req.params;
      const user = await User.findByPk(userId, {
        attributes: { exclude: ["password_hash"] },
      });

      if (user) {
        return res.json(user);
      } else {
        return res.status(404).json({ error: "User not found" });
      }
    } catch {
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async create(req, res) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
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

      const { user_id, name, email, created_at, modified_at } =
        await User.create(req.body);

      await Queue.add(WelcomeEmailJob.key, { email, name });

      return res
        .status(201)
        .json({ user_id, name, email, created_at, modified_at });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async update(req, res) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string(),
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

      const { userId } = req.params;

      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const { oldPassword } = req.body;
      if (oldPassword && !(await user.checkPassword(oldPassword))) {
        return res.status(401).json({ error: "Password does not match" });
      }

      user.set(req.body);

      const { name, email, created_at, modified_at } = await user.save();

      return res
        .status(201)
        .json({ userId, name, email, created_at, modified_at });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async delete(req, res) {
    try {
      const { userId } = req.params;

      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      await user.destroy();

      return res.status(204).send();
    } catch {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default new UserController();
