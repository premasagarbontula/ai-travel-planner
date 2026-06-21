"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import ProtectedRoute from "@/components/ProtectedRoute";
import { generateTrip } from "@/services/tripService";

export default function CreateTripPage() {
  const router = useRouter();

  const [destination, setDestination] = useState("");

  const [days, setDays] = useState(3);

  const [budget, setBudget] = useState("medium");

  const [interests, setInterests] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      await generateTrip({
        destination,
        days,
        budget,
        interests: interests
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
      });

      router.push("/dashboard");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div>
        <h1>Generate Trip</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />

          <input
            type="number"
            min={1}
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
          />

          <select value={budget} onChange={(e) => setBudget(e.target.value)}>
            <option value="low">Low</option>

            <option value="medium">Medium</option>

            <option value="high">High</option>
          </select>

          <input
            type="text"
            placeholder="Interests (comma separated)"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Generating..." : "Generate Trip"}
          </button>
        </form>
      </div>
    </ProtectedRoute>
  );
}
