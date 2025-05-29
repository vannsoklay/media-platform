"use client";
import { useAuth } from "@/contexts/useAuth";
import PostList from "./PostList";

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