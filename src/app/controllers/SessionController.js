import jwt from "jsonwebtoken";
import * as Yup from "yup";
import User from "../models/User.js";
import authConfig from "../../config/auth.js";
import Customer from "../models/Customer.js";

class SessionController {
  async create(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
      type: Yup.string().oneOf(["user", "customer"]).default("user"),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Validation fails" });
    }

    if (!req.body.type) {
      req.body.type = "user";
    }

    const { type, email, password } = req.body;

    let user;
    let customer;
    const output = {
      type: type,
      userId: 0,
      customerId: 0,
      name: "",
      email: "",
    };

    if (type === "user") {
      user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ error: "User not found" });
      }

      if (!(await user.checkPassword(password))) {
        return res.status(401).json({ error: "Password does not match" });
      }

      output.userId = user.user_id;
      output.name = user.full_name;
      output.email = user.email;
    } else if (type === "customer") {
      customer = await Customer.findOne({ where: { email } });
      if (!customer) {
        return res.status(401).json({ error: "User not found" });
      }

      if (!(await customer.checkPassword(password))) {
        return res.status(401).json({ error: "Password does not match" });
      }

      output.customerId = customer.customer_id;
      output.name = customer.full_name;
      output.email = customer.email;
    }

    return res.json({
      data: output,
      token: jwt.sign(output, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
