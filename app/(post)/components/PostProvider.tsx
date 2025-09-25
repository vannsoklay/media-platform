"use client";
import PostList from "./PostList";

import { useAuth } from "@/contexts/useAuth";

export default function PostProvider() {
  const { loading, user } = useAuth();

  return loading ? (
    <div>loading...</div>
  ) : user ? (
    <PostList username={user.username} />
  ) : (
    <PostList />
  );
}
