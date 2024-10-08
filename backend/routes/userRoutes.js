import express from "express";
const router = express.Router();
import { registerUser, loginUser, logoutUser } from "../controllers/userController.js";

// Register user
router.post("/", registerUser)

// Login user
router.post("/login", loginUser)

// logout user
router.post("/logout", logoutUser)

export default router