import mongoose, { Document, Schema } from "mongoose";

export interface IActivity {
  time: string;
  activity: string;
  bestTime: string;
  proTip: string;
}

export interface IHotel {
  name: string;
  type: string;
  description: string;
}

export interface IDayPlan {
  day: number;
  theme: string;
  activities: IActivity[];
}

export interface ITrip extends Document {
  title: string;
  destination: string;
  days: number;
  budget: string;
  interests: string[];
  itinerary: IDayPlan[];
  estimatedBudget: string;
  hotels: IHotel[];
  user: mongoose.Types.ObjectId;
}

const activitySchema = new Schema(
  {
    time: {
      type: String,
      required: true,
    },
    activity: {
      type: String,
      required: true,
    },
    bestTime: {
      type: String,
      default: "",
    },
    proTip: {
      type: String,
      default: "",
    },
  },
  { _id: false },
);

const dayPlanSchema = new Schema(
  {
    day: {
      type: Number,
      required: true,
    },
    theme: {
      type: String,
      required: true,
    },
    activities: [activitySchema],
  },
  { _id: false },
);

const hotelSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["Budget", "Mid Range", "Luxury"],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);

const tripSchema = new Schema<ITrip>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    destination: {
      type: String,
      required: [true, "Destination is required"],
      trim: true,
    },

    days: {
      type: Number,
      required: [true, "Days are required"],
      min: 1,
    },

    budget: {
      type: String,
      required: [true, "Budget is required"],
      enum: ["low", "medium", "high"],
    },

    interests: {
      type: [String],
      required: [true, "At least one interest is required"],
    },

    itinerary: {
      type: [dayPlanSchema],
      default: [],
    },
    estimatedBudget: {
      type: String,
      default: "",
    },
    hotels: {
      type: [hotelSchema],
      default: [],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Trip = mongoose.model<ITrip>("Trip", tripSchema);

export default Trip;
