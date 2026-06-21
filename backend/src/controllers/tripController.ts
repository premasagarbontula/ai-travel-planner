import { Response } from "express";
import { validationResult } from "express-validator";

import Trip, { IDayPlan } from "../models/Trip";

import { AuthRequest } from "../types/auth";

import { generateTravelPlan } from "../services/geminiService";

interface AIHotel {
  name: string;
  type: "Budget" | "Mid Range" | "Luxury";
  description: string;
}

interface AITripResponse {
  estimatedBudget: string;
  hotels: AIHotel[];
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
    if (
      !parsedData.estimatedBudget ||
      !Array.isArray(parsedData.itinerary) ||
      !Array.isArray(parsedData.hotels)
    ) {
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

      hotels: parsedData.hotels,

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

export const getTrips = async (req: AuthRequest, res: Response) => {
  try {
    const trips = await Trip.find({
      user: req.userId,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json(trips);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const getTripById = async (req: AuthRequest, res: Response) => {
  try {
    const trip = await Trip.findOne({
      _id: req.params.id,
      user: req.userId,
    });

    if (!trip) {
      return res.status(404).json({
        message: "Trip not found",
      });
    }

    res.status(200).json(trip);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const deleteTrip = async (req: AuthRequest, res: Response) => {
  try {
    const trip = await Trip.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,
    });

    if (!trip) {
      return res.status(404).json({
        message: "Trip not found",
      });
    }

    res.status(200).json({
      message: "Trip deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
