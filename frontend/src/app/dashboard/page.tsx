"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

import ProtectedRoute from "@/components/ProtectedRoute";
import TripCard from "@/components/TripCard";

import { useAuth } from "@/context/AuthContext";
import { deleteTrip, getTrips } from "@/services/tripService";

import { Trip } from "@/types/trip";
import { Plane, Sparkles } from "lucide-react";

export default function DashboardPage() {
  const { user } = useAuth();

  const [trips, setTrips] = useState<Trip[]>([]);
  const [loadingTrips, setLoadingTrips] = useState(true);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const { data } = await getTrips();

        setTrips(data);
      } catch (error) {
        console.error(error);
        toast.error("Couldn't load your trips. Refresh to try again.");
      } finally {
        setLoadingTrips(false);
      }
    };

    fetchTrips();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteTrip(id);

      setTrips((prev) => prev.filter((trip) => trip._id !== id));
      toast.success("Trip deleted.");
    } catch (error) {
      console.error(error);
      toast.error("Couldn't delete that trip. Try again.");
    }
  };

  return (
    <ProtectedRoute>
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-slate-500">
              Welcome back
            </p>

            <h1 className="mt-1 text-3xl font-bold text-slate-900">
              {user?.name}&apos;s Trips
            </h1>
          </div>

          <Link
            href="/create-trip"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            <Sparkles className="h-4 w-4" />
            Generate Trip
          </Link>
        </div>

        <div className="mt-8">
          {loadingTrips ? (
            <div className="grid gap-5 md:grid-cols-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-48 animate-pulse rounded-2xl bg-slate-200"
                />
              ))}
            </div>
          ) : trips.length === 0 ? (
            <div className="flex flex-col items-center rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center shadow-sm">
              <Plane className="h-10 w-10 text-slate-400" />

              <h2 className="mt-4 text-xl font-semibold text-slate-900">
                No Trips Yet
              </h2>

              <p className="mt-2 max-w-md text-sm text-slate-500">
                Generate your first AI itinerary by choosing a destination,
                budget, and interests.
              </p>

              <Link
                href="/create-trip"
                className="mt-6 rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700"
              >
                Generate Trip
              </Link>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2">
              {trips.map((trip) => (
                <TripCard key={trip._id} trip={trip} onDelete={handleDelete} />
              ))}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
