"use client";

import Link from "next/link";

import { useAuth } from "@/context/AuthContext";
import { LoaderCircle, Plane, Sparkles, ArrowRight } from "lucide-react";
export default function Home() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoaderCircle className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-blue-50 via-slate-50 to-slate-100" />

      <section className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-6 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-medium uppercase tracking-widest text-blue-600 shadow-sm">
          <Sparkles className="h-3.5 w-3.5" />
          AI-Powered Travel Planning
        </span>

        <h1 className="mt-8 text-4xl font-bold leading-tight text-slate-900 sm:text-5xl md:text-6xl">
          Tell Us Where.
          <br />
          We&apos;ll Plan The Rest.
        </h1>

        <p className="mt-6 max-w-2xl text-base text-slate-600 sm:text-lg">
          Generate complete travel itineraries in seconds. Just choose a
          destination, budget, and interests, and let AI build your perfect
          trip.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          {user ? (
            <Link
              href="/dashboard"
              className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
            >
              Go To Dashboard
              <ArrowRight className="h-4 w-4" />
            </Link>
          ) : (
            <>
              <Link
                href="/register"
                className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
              >
                Plan My First Trip
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/login"
                className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-medium text-slate-700 transition-colors hover:bg-slate-100"
              >
                I Have An Account
              </Link>
            </>
          )}
        </div>

        <div className="mt-10 flex items-center gap-4 text-slate-400">
          <span className="h-px w-16 bg-slate-300" />
          <Plane className="h-5 w-5 -rotate-45" />
          <span className="h-px w-16 bg-slate-300" />
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900">AI Itineraries</h3>
            <p className="mt-2 text-sm text-slate-500">
              Personalized day-by-day travel plans.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900">Budget Friendly</h3>
            <p className="mt-2 text-sm text-slate-500">
              Plans tailored to your budget range.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900">Instant Planning</h3>
            <p className="mt-2 text-sm text-slate-500">
              Generate complete trips in seconds.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
