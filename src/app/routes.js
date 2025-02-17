import express from "express";
import authMiddleware from "./middlewares/auth.js";
import user from "./controllers/UserController";
import session from "./controllers/SessionController";
import customer from "./controllers/CustomerController";
import customerAddress from "./controllers/CustomerAddressController";
//import file from "./controllers/FileController";
//import multer from "multer";
//import multerConfig from "../config/multer";

const router = express.Router();
//const uploadMiddleware = multer(multerConfig);

router.post("/sessions", session.create);

// Authenticated routes
router.use(authMiddleware);

router.get("/users", user.index);
router.get("/users/:userId", user.show);
router.post("/users", user.create);
router.put("/users/:userId", user.update);
router.delete("/users/:userId", user.delete);

router.get("/customers", customer.index);
router.get("/customers/:customerId", customer.show);
router.post("/customers", customer.create);
router.put("/customers/:customerId", customer.update);
router.delete("/customers/:customerId", customer.delete);

router.get("/customer-addresses", customerAddress.index);
router.get("/customer-addresses/:customerAddressId", customerAddress.show);
router.post("/customer-addresses", customerAddress.create);
router.put("/customer-addresses/:customerAddressId", customerAddress.update);
router.delete("/customer-addresses/:customerAddressId", customerAddress.delete);
/*
router.get("/customers", customer.index);
router.get("/customers/:id", customer.show);
router.post("/customers", customer.create);
router.put("/customers/:id", customer.update);
router.delete("/customers/:id", customer.delete);

router.post("/files", uploadMiddleware.single("file"), file.create);
*/

export default router;
