export interface Activity {
  time: string;
  activity: string;
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
  itinerary: DayPlan[];
}
