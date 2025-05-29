import React, { Dispatch, SetStateAction, useEffect } from "react";
import { Heart, MessageCircle, Send, Bookmark } from "lucide-react";
import { Post } from "@/types/posts";

interface PostActionsProps {
  post: Post;
  isLiked: boolean;
  isSaved: boolean;
  setLikedPosts: Dispatch<SetStateAction<Set<string>>>;
  onLike: (postId: string) => void;
  onSave: (postId: string) => void;
  onToggleComments: (postId: string) => void;
}

export const PostActions: React.FC<PostActionsProps> = ({
  post,
  isLiked,
  isSaved,
  setLikedPosts,
  onLike,
  onSave,
  onToggleComments,
}) => {
  useEffect(() => {
    if (post.voted_by_user) {
      setLikedPosts((prev) => new Set(prev.add(post.permalink)));
    }
  }, [post]);

  const likes = post.voted_by_user ? post.total_votes - 1 : post.total_votes;

  return (
    <div className="pb-2 py-2">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <button
            className="p-0 m-0 bg-transparent border-none outline-none cursor-pointer"
            onClick={() => onLike(post.permalink)}
          >
            <Heart
              size={24}
              className={isLiked ? "text-red-500 fill-red-500" : "text-black"}
            />
          </button>
          <button
            className="p-0 m-0 bg-transparent border-none outline-none cursor-pointer"
            onClick={() => onToggleComments(post.permalink)}
          >
            <MessageCircle size={24} className="text-black" />
          </button>
          <button className="p-0 m-0 bg-transparent border-none outline-none cursor-pointer">
            <Send size={24} className="text-black" />
          </button>
        </div>
        <button
          className="p-0 m-0 bg-transparent border-none outline-none cursor-pointer"
          onClick={() => onSave(post.permalink)}
        >
          <Bookmark
            size={24}
            className={isSaved ? "text-black fill-black" : "text-black"}
          />
        </button>
      </div>

      {/* Likes */}
      <div className="mb-1">
        <span className="font-semibold text-sm text-black">
          {isLiked
            ? `${likes + 1} like${likes + 1 > 1 ? "s" : ""}`
            : `${likes} like${likes > 1 ? "s" : ""}`}
        </span>
      </div>
    </div>
  );
};
