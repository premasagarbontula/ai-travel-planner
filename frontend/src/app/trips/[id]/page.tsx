"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

import { getTripById } from "@/services/tripService";

import { Trip } from "@/types/trip";
import {
  LoaderCircle,
  MapPin,
  Calendar,
  Wallet,
  Hotel,
  Clock3,
  Lightbulb,
} from "lucide-react";
export default function TripDetailsPage() {
  const params = useParams();

  const id = params.id as string;

  const [trip, setTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const { data } = await getTripById(id);

        setTrip(data);
      } catch (error) {
        console.error(error);
        toast.error("Couldn't load this trip.");
      } finally {
        setLoading(false);
      }
    };

    fetchTrip();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center">
        <LoaderCircle className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-2 text-center">
        <p className="text-xl font-semibold text-slate-900">Trip Not Found</p>

        <p className="text-sm text-slate-500">
          This trip may have been deleted.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-xs font-medium uppercase tracking-widest text-blue-600">
          Travel Itinerary
        </p>

        <h1 className="mt-2 text-3xl font-bold text-slate-900">{trip.title}</h1>

        <div className="mt-5 flex flex-wrap gap-5 text-sm text-slate-600">
          <span className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-blue-600" />
            {trip.destination}
          </span>

          <span className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-blue-600" />
            {trip.days} {trip.days === 1 ? "day" : "days"}
          </span>

          <span className="flex items-center gap-2">
            <Wallet className="h-4 w-4 text-green-600" />
            {trip.estimatedBudget}
          </span>
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-8">
        {trip.itinerary.map((day) => (
          <div
            key={day.day}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                {day.day}
              </span>

              <h2 className="text-xl font-semibold text-slate-900">
                {day.theme}
              </h2>
            </div>

            <div className="mt-4 flex flex-col gap-4 border-l-2 border-slate-200 pl-5">
              {day.activities.map((activity, index) => (
                <div
                  key={index}
                  className="relative rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <span className="absolute -left-[29px] top-5 h-3 w-3 rounded-full bg-blue-600" />

                  <p className="text-xs font-semibold text-blue-600">
                    {activity.time}
                  </p>

                  <p className="mt-1 font-medium text-slate-900">
                    {activity.activity}
                  </p>

                  <div className="mt-3 space-y-2">
                    <div className="flex items-start gap-2">
                      <Clock3 className="mt-0.5 h-4 w-4 text-amber-500" />
                      <div>
                        <p className="text-xs font-semibold text-slate-700">
                          Best Time
                        </p>
                        <p className="text-sm text-slate-600">
                          {activity.bestTime}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <Lightbulb className="mt-0.5 h-4 w-4 text-green-600" />
                      <div>
                        <p className="text-xs font-semibold text-slate-700">
                          Pro Tip
                        </p>
                        <p className="text-sm text-slate-600">
                          {activity.proTip}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <h2 className="mb-4 text-2xl font-bold text-slate-900">
          Recommended Hotels
        </h2>

        <div className="grid gap-4 md:grid-cols-3">
          {trip.hotels.map((hotel, index) => (
            <div
              key={index}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="mb-3 flex items-center gap-2">
                <Hotel className="h-5 w-5 text-blue-600" />

                <span
                  className={`rounded-full px-2 py-1 text-xs font-medium ${
                    hotel.type === "Budget"
                      ? "bg-green-100 text-green-700"
                      : hotel.type === "Mid Range"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-purple-100 text-purple-700"
                  }`}
                >
                  {hotel.type}
                </span>
              </div>

              <h3 className="text-lg font-semibold text-slate-900">
                {hotel.name}
              </h3>

              <p className="mt-2 text-sm text-slate-600">{hotel.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
