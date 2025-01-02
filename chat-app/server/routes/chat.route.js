import express from "express";
import chatController from "../controllers/chat.controller.js";

const router = express.Router();

router.post("/", chatController.createChat);
router.post("/:userId", chatController.findUserChats);
router.get("/find/:firstId/:secondId", chatController.findChat);

export default router;
