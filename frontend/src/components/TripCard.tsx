import Link from "next/link";

import { Trip } from "@/types/trip";
import { MapPin, Calendar, Wallet, Trash2, ArrowRight } from "lucide-react";

interface TripCardProps {
  trip: Trip;
  onDelete: (id: string) => void;
}

export default function TripCard({ trip, onDelete }: TripCardProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start justify-between p-6">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-slate-400">
            AI Itinerary
          </p>

          <h2 className="mt-2 text-xl font-bold text-slate-900">
            {trip.title}
          </h2>

          <div className="mt-3 flex items-center gap-2 text-sm text-slate-600">
            <MapPin className="h-4 w-4 text-blue-600" />
            <span>{trip.destination}</span>
          </div>
        </div>

        <button
          onClick={() => {
            if (confirm("Delete this trip?")) {
              onDelete(trip._id);
            }
          }}
          className="rounded-full p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
          aria-label="Delete trip"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      <div className="border-t border-dashed border-slate-200" />

      <div className="flex flex-wrap items-center justify-between gap-4 p-6">
        <div className="flex flex-wrap gap-5 text-sm text-slate-600">
          <span className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-blue-600" />
            {trip.days} {trip.days === 1 ? "day" : "days"}
          </span>

          <span className="flex items-center gap-2">
            <Wallet className="h-4 w-4 text-green-600" />
            {trip.estimatedBudget}
          </span>
        </div>

        <Link
          href={`/trips/${trip._id}`}
          className="flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          View Details
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
