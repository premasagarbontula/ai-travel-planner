"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import toast from "react-hot-toast";
import { Plane, LogOut, Menu, X } from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import { logoutUser } from "@/services/authService";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/create-trip", label: "Generate Trip" },
];

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const { user, loading, setUser } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      setMenuOpen(false);

      await logoutUser();

      setUser(null);

      toast.success("Signed out successfully");

      router.push("/login");
    } catch (error) {
      console.error(error);

      toast.error("Failed to sign out");
    }
  };

  if (loading || !user) {
    return null;
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/dashboard" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
            <Plane className="h-5 w-5 -rotate-45" />
          </span>

          <span className="text-xl font-bold text-slate-900">
            AI Travel Planner
          </span>
        </Link>

        <div className="hidden items-center gap-6 sm:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                pathname === link.href
                  ? "text-blue-600"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <div className="flex items-center gap-3 border-l border-slate-200 pl-6">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
              {user.name.charAt(0).toUpperCase()}
            </span>

            <span className="text-sm font-medium text-slate-700">
              {user.name}
            </span>

            <button
              onClick={handleLogout}
              className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-slate-900 sm:hidden"
          aria-label="Toggle Menu"
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-3 sm:hidden">
          <div className="flex flex-col gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`rounded-lg px-3 py-2 text-sm font-medium ${
                  pathname === link.href
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="mt-3 flex items-center justify-between border-t border-slate-200 pt-3">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
                  {user.name.charAt(0).toUpperCase()}
                </span>

                <span className="text-sm text-slate-700">{user.name}</span>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-sm font-medium text-red-600"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
