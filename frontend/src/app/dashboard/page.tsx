"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import TripCard from "@/components/TripCard";

import { useAuth } from "@/context/AuthContext";
import { getTrips } from "@/services/tripService";

import { Trip } from "@/types/trip";

export default function DashboardPage() {
  const { user } = useAuth();

  const [trips, setTrips] = useState<Trip[]>([]);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const { data } = await getTrips();

        setTrips(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTrips();
  }, []);

  return (
    <ProtectedRoute>
      <div>
        <h1>Welcome {user?.name}</h1>

        <Link href="/create-trip">Generate Trip</Link>
        <h2>Your Trips</h2>

        {trips.map((trip) => (
          <TripCard key={trip._id} trip={trip} />
        ))}
      </div>
    </ProtectedRoute>
  );
}
