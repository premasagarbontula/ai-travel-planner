import express from "express";

import {
  registerUser,
  loginUser,
  logoutUser,
  getMe,
} from "../controllers/authController";
import {
  registerValidation,
  loginValidation,
} from "../validations/authValidation";
import protect from "../middleware/authMiddleware";

const router = express.Router();

router.post("/register", registerValidation, registerUser);
router.post("/login", loginValidation, loginUser);
router.post("/logout", logoutUser);
router.get("/me", protect, getMe);

export default router;
