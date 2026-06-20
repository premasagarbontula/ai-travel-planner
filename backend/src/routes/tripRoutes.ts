import express from "express";

import protect from "../middleware/authMiddleware";

import {
  generateTrip,
  getTrips,
  getTripById,
  deleteTrip,
} from "../controllers/tripController";

import { generateTripValidation } from "../validations/tripValidation";

const router = express.Router();

router.post("/generate", protect, generateTripValidation, generateTrip);
router.get("/", protect, getTrips);
router.get("/:id", protect, getTripById);
router.delete("/:id", protect, deleteTrip);

export default router;
