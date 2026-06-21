"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

import ProtectedRoute from "@/components/ProtectedRoute";
import { generateTrip } from "@/services/tripService";
import { LoaderCircle, Sparkles } from "lucide-react";

const inputClasses =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-colors focus:border-blue-600";
const budgets = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

export default function CreateTripPage() {
  const router = useRouter();

  const [destination, setDestination] = useState("");

  const [days, setDays] = useState("3");

  const [budget, setBudget] = useState("medium");

  const [interests, setInterests] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!destination.trim()) {
      toast.error("Add a destination to generate a trip.");
      return;
    }
    if (!interests.trim()) {
      toast.error("Please add at least one interest.");
      return;
    }
    if (Number(days) < 1) {
      toast.error("Days must be at least 1");
      return;
    }
    try {
      setLoading(true);

      await generateTrip({
        destination,
        days: Number(days),
        budget,
        interests: interests
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
      });

      toast.success(`Itinerary for ${destination} is ready!`);

      router.push("/dashboard");
    } catch (error) {
      console.error(error);

      const message =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : "Couldn't generate that trip. Try again.";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="mx-auto max-w-xl px-4 py-10 sm:px-6">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-blue-600">
            <Sparkles className="h-3.5 w-3.5" />
            New Itinerary
          </span>

          <h1 className="mt-4 text-3xl font-bold text-slate-900">Where to?</h1>

          <p className="mt-2 text-sm text-slate-500">
            Tell us your destination and preferences. AI will create a travel
            plan for you.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div>
            <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-slate-500">
              Destination
            </label>

            <input
              type="text"
              placeholder="Lisbon, Portugal"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              required
              className={inputClasses}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-slate-500">
                Days
              </label>

              <input
                type="number"
                min={1}
                max={30}
                value={days}
                onChange={(e) => setDays(e.target.value)}
                className={inputClasses}
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-slate-500">
                Budget
              </label>

              <div className="flex rounded-xl border border-slate-300 bg-slate-100 p-1">
                {budgets.map((b) => (
                  <button
                    key={b.value}
                    type="button"
                    onClick={() => setBudget(b.value)}
                    className={`flex-1 cursor-pointer rounded-lg py-2 text-xs font-medium transition-colors ${
                      budget === b.value
                        ? "bg-blue-600 text-white"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-slate-500">
              Interests
              <span className="ml-1 text-slate-400">(comma separated)</span>
            </label>

            <input
              type="text"
              placeholder="food, hiking, museums"
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              className={inputClasses}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <LoaderCircle className="h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4" />
            )}

            {loading ? "Generating..." : "Generate Trip"}
          </button>
        </form>
      </div>
    </ProtectedRoute>
  );
}
