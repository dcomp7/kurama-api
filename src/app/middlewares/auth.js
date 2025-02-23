import jwt from "jsonwebtoken";
import { promisify } from "util";
import authConfig from "../../config/auth.js";

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token not provided" });
  }

  const [, token] = authHeader.split(" ");
  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    req.userId = 0;
    req.customerId = 0;

    if (decoded.type === "user") {
      req.userId = decoded.userId;
    } else if (decoded.type === "customer") {
      req.customerId = decoded.customer;
    }

    return next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: "Invalid token" });
  }
};
