import { body } from "express-validator";

export const generateTripValidation = [
  body("destination").trim().notEmpty().withMessage("Destination is required"),

  body("days").isInt({ min: 1 }).withMessage("Days must be greater than 0"),

  body("budget")
    .isIn(["low", "medium", "high"])
    .withMessage("Budget must be low, medium or high"),

  body("interests")
    .isArray({ min: 1 })
    .withMessage("At least one interest is required"),
];
