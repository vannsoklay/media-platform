"use client";

import { useAuth } from "@/contexts/useAuth";
import { useFollow } from "@/hooks/useFollow";

export default function ProfileHero({ username }: { username: string }) {
  const { user } = useAuth();
  const { useFollower, useFollowing } = useFollow();
  const { data } = useFollower({ follower_id: user?.id, skip: 0, limit: 10 });

  //   useEffect(() => {
  //     const data = useFollower();
  //   }, [useFollower, useFollowing]);
  return <div>Hello Profile {username}</div>;
}
