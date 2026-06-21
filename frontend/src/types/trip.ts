export interface Activity {
  time: string;
  activity: string;
  bestTime: string;
  proTip: string;
}

export interface Hotel {
  name: string;
  type: "Budget" | "Mid Range" | "Luxury";
  description: string;
}

export interface DayPlan {
  day: number;
  theme: string;
  activities: Activity[];
}

export interface Trip {
  _id: string;
  title: string;
  destination: string;
  days: number;
  budget: string;
  interests: string[];
  estimatedBudget: string;
  hotels: Hotel[];
  itinerary: DayPlan[];
}
