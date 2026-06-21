"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { getTripById } from "@/services/tripService";

import { Trip } from "@/types/trip";

export default function TripDetailsPage() {
  const params = useParams();

  const id = params.id as string;

  const [trip, setTrip] = useState<Trip | null>(null);

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const { data } = await getTripById(id);

        setTrip(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTrip();
  }, [id]);

  if (!trip) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1>{trip.title}</h1>

      <p>
        Destination:
        {trip.destination}
      </p>

      <p>
        Budget:
        {trip.estimatedBudget}
      </p>

      <p>
        Days:
        {trip.days}
      </p>

      {trip.itinerary.map((day) => (
        <div key={day.day}>
          <h2>Day {day.day}</h2>

          <h3>{day.theme}</h3>

          {day.activities.map((activity, index) => (
            <div key={index}>
              <strong>{activity.time}</strong>

              <p>{activity.activity}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
