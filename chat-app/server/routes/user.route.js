import express from "express";
import userController from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/find/:userId", userController.getUserById);
router.get("/", userController.getAllUsers);

export default router;
