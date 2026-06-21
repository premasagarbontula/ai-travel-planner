"use client";

import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) return <h1>Loading...</h1>;

  return <div>{user ? user.name : "Not Logged In"}</div>;
}
