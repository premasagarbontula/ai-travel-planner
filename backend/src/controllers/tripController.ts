import { Response } from "express";
import { validationResult } from "express-validator";

import Trip, { IDayPlan } from "../models/Trip";

import { AuthRequest } from "../types/auth";

import { generateTravelPlan } from "../services/geminiService";

interface AITripResponse {
  estimatedBudget: string;
  itinerary: IDayPlan[];
}

export const generateTrip = async (req: AuthRequest, res: Response) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { destination, days, budget, interests } = req.body;
    const aiResponse = await generateTravelPlan(
      destination,
      days,
      budget,
      interests,
    );
    if (!aiResponse) {
      return res.status(500).json({
        message: "No response from AI",
      });
    }

    let parsedData: AITripResponse;
    
    try {
      parsedData = JSON.parse(aiResponse) as AITripResponse;
    } catch {
      return res.status(500).json({
        message: "Failed to parse AI response",
      });
    }
    if (!parsedData.estimatedBudget || !Array.isArray(parsedData.itinerary)) {
      return res.status(500).json({
        message: "Invalid AI response",
      });
    }

    const trip = await Trip.create({
      title: `${destination} ${days}-Day Trip`,
      destination,
      days,
      budget,
      interests,

      estimatedBudget: parsedData.estimatedBudget,

      itinerary: parsedData.itinerary,

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
