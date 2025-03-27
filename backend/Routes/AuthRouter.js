import express from "express";
import { login, signup, verifyEmail } from "../Controllers/AuthController.js";
import {
  loginValidation,
  signupValidation,
} from "../Middlewares/AuthValidation.js";

const router = express.Router();

router.post("/signup", signupValidation, signup);

router.post("/login", loginValidation, login);

router.get("/verify", verifyEmail);

export default router;
