"use client";
import PostList from "./PostList";

import { useAuth } from "@/contexts/useAuth";

export default function PostProvider() {
  const { loading } = useAuth();

  return loading ? <div>loading...</div> : <PostList isPrivate={true} />;
}
