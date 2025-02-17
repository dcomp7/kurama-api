import express from "express";
import authMiddleware from "./middlewares/auth.js";
//import customer from "./controllers/CustomerController";
import user from "./controllers/UserController";
import session from "./controllers/SessionController";
//import file from "./controllers/FileController";
//import multer from "multer";
//import multerConfig from "../config/multer";

const router = express.Router();
//const uploadMiddleware = multer(multerConfig);

router.post("/sessions", session.create);

// Authenticated routes
router.use(authMiddleware);

router.get("/users", user.index);
router.get("/users/:id", user.show);
router.post("/users", user.create);
router.put("/users/:id", user.update);
router.delete("/users/:id", user.delete);
/*
router.get("/customers", customer.index);
router.get("/customers/:id", customer.show);
router.post("/customers", customer.create);
router.put("/customers/:id", customer.update);
router.delete("/customers/:id", customer.delete);

router.post("/files", uploadMiddleware.single("file"), file.create);
*/

export default router;
