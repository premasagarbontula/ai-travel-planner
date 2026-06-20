import { Response } from "express";
import { validationResult } from "express-validator";

import Trip from "../models/Trip";
import { AuthRequest } from "../types/auth";

const mockItinerary = [
  {
    day: 1,
    activities: [
      {
        time: "09:00 AM",
        activity: "Explore local attractions",
      },
      {
        time: "01:00 PM",
        activity: "Lunch at famous restaurant",
      },
    ],
  },
];

export const generateTrip = async (req: AuthRequest, res: Response) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { destination, days, budget, interests } = req.body;

    const trip = await Trip.create({
      title: `${destination} Trip`,
      destination,
      days,
      budget,
      interests,
      itinerary: mockItinerary,
      user: req.userId,
    });

    res.status(201).json({
      message: "Trip generated successfully",
      trip,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
