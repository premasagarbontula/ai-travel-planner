import express from "express";

import { registerUser } from "../controllers/authController";
import { registerValidation } from "../validations/authValidation";

const router = express.Router();

router.post("/register", registerValidation, registerUser);

export default router;
