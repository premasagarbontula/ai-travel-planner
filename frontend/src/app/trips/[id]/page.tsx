"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

import { getTripById, regenerateTrip } from "@/services/tripService";

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
  const [editing, setEditing] = useState(false);

  const [destination, setDestination] = useState("");
  const [days, setDays] = useState("3");
  const [budget, setBudget] = useState("medium");
  const [interests, setInterests] = useState("");

  const [regenerating, setRegenerating] = useState(false);
  const [trip, setTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(true);

  const params = useParams();

  const id = params.id as string;

  const handleRegenerate = async () => {
    if (!trip) return;

    try {
      setRegenerating(true);

      const { data } = await regenerateTrip(trip._id, {
        destination,
        days: Number(days),
        budget,
        interests: interests
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
      });

      setTrip(data.trip);

      toast.success("Trip regenerated successfully");

      setEditing(false);
    } catch (error) {
      console.error(error);

      toast.error("Failed to regenerate trip");
    } finally {
      setRegenerating(false);
    }
  };

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const { data } = await getTripById(id);

        setTrip(data);
        setDestination(data.destination);
        setDays(String(data.days));
        setBudget(data.budget);
        setInterests(data.interests.join(", "));
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

        <div className="mt-2 flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-bold text-slate-900">{trip.title}</h1>
          <p
            className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
              trip.budget === "low"
                ? "bg-green-100 text-green-700"
                : trip.budget === "medium"
                  ? "bg-amber-100 text-amber-700"
                  : "bg-purple-100 text-purple-700"
            }`}
          >
            {trip.budget.charAt(0).toUpperCase() + trip.budget.slice(1)} Budget
          </p>
        </div>
        <button
          onClick={() => setEditing(!editing)}
          className="rounded-lg mt-3 bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          {editing ? "Cancel" : "Edit & Regenerate"}
        </button>

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
      {editing && (
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-xl font-semibold text-slate-900">
            Edit & Regenerate Trip
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Destination
              </label>

              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Days
              </label>

              <input
                type="number"
                min={1}
                max={30}
                value={days}
                onChange={(e) => setDays(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Budget
              </label>

              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-blue-600"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Interests
              </label>

              <input
                type="text"
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                placeholder="food, beaches, hiking"
                className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-blue-600"
              />
            </div>
          </div>

          <button
            onClick={handleRegenerate}
            disabled={regenerating}
            className="mt-5 flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {regenerating ? (
              <>
                <LoaderCircle className="h-4 w-4 animate-spin" />
                Regenerating...
              </>
            ) : (
              "Regenerate Trip"
            )}
          </button>
        </div>
      )}
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
