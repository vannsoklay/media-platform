import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getRelativeTimeString } from "@/utils/date";
import { Comment } from "@/types/comment";

interface CommentItemProps {
  comment: Comment;
}

export const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  const timeAgo = getRelativeTimeString(new Date(comment.created_at));

  return (
    <div className="flex items-start space-x-3 p-3 border-b border-gray-100 last:border-b-0">
      <div className="flex-shrink-0">
        <Link href={`/profile/${comment.author.username}`}>
          {comment.author.avatar ? (
            <Image
              src={comment.author.avatar}
              alt={comment.author.username}
              width={32}
              height={32}
              className="rounded-full object-cover w-8 h-8"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-semibold text-gray-600">
              {comment.author.username.charAt(0).toUpperCase()}
            </div>
          )}
        </Link>
      </div>
      <div className="flex-grow">
        <div className="flex items-baseline space-x-1">
          <Link
            href={`/${comment.author.username}`}
            className="font-semibold text-sm text-gray-800 hover:underline"
          >
            {comment.author.username}
            {comment.author.is_verified && (
              <span className="ml-1 text-blue-500" title="Verified">
                ✓
              </span>
            )}
          </Link>
          <span className="text-gray-500 text-xs">· {timeAgo}</span>
        </div>
        <p className="text-gray-700 text-sm mt-1 break-words">
          {comment.content}
        </p>
        {/* You could add reply/like buttons here if needed */}
        {/* {comment.parent_comment_id && (
          <span className="text-xs text-gray-500 mt-1 block">Replying to a comment...</span>
        )} */}
      </div>
    </div>
  );
};
