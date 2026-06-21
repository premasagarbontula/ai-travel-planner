import Link from "next/link";

import { Trip } from "@/types/trip";

interface TripCardProps {
  trip: Trip;
}

export default function TripCard({ trip }: TripCardProps) {
  return (
    <div className="border rounded-lg p-4">
      <h2>{trip.title}</h2>

      <p>
        Destination:
        {trip.destination}
      </p>

      <p>
        Budget:
        {trip.estimatedBudget}
      </p>

      <Link href={`/trips/${trip._id}`}>View Details</Link>
    </div>
  );
}
