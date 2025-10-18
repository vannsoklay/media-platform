"use client";

import { UserProfile } from "./UesrProfile";

import { useAuth } from "@/contexts/useAuth";

export default function ProfileHero({ username }: { username: string }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>loading...</div>;
  }

  return <UserProfile user={user} username={username} />;
}
