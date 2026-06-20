import express from "express";

import protect from "../middleware/authMiddleware";

import { generateTrip } from "../controllers/tripController";

import { generateTripValidation } from "../validations/tripValidation";

const router = express.Router();

router.post("/generate", protect, generateTripValidation, generateTrip);

export default router;
