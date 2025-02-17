import jwt from "jsonwebtoken";
import * as Yup from "yup";
import User from "../models/User.js";
import authConfig from "../../config/auth.js";

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

    if (type === "user") {
      user = await User.findOne({ where: { email } });
    }

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: "Password does not match" });
    }

    const output = {
      type: type,
      userId: type === "user" ? user.user_id : null,
      customerId: type === "customer" ? user.customer_id : null,
    };

    return res.json({
      data: {
        ...output,
        name: user.name,
        email: user.email,
      },
      token: jwt.sign(output, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
