import express from "express";

import { registerUser, loginUser } from "../controllers/authController";
import {
  registerValidation,
  loginValidation,
} from "../validations/authValidation";

const router = express.Router();

router.post("/register", registerValidation, registerUser);
router.post("/login", loginValidation, loginUser);
export default router;
