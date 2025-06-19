export type Comment = {
  author: {
    avatar: string | null;
    follower_count: number;
    following_count: number;
    id: string;
    is_verified: boolean;
    username: string;
  };
  content: string;
  created_at: string;
  deleted_at: string | null;
  id: string;
  parent_comment_id: string | null;
  permalink: string;
  updated_at: string | null;
}

export type CommentPayload = {
  permalink: string,
  content: string,
  parent_comment_id: string | null
}