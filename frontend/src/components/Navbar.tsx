"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useAuth } from "@/context/AuthContext";
import { logoutUser } from "@/services/authService";

export default function Navbar() {
  const router = useRouter();

  const { user, loading, setUser } = useAuth();

  const handleLogout = async () => {
    try {
      await logoutUser();

      setUser(null);

      router.push("/login");
    } catch (error) {
      console.error(error);
    }
  };

  if (loading || !user) {
    return null;
  }

  return (
    <nav>
      <Link href="/dashboard">Dashboard</Link>

      <Link href="/create-trip">Generate Trip</Link>

      <span>{user?.name}</span>

      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}
