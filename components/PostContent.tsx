import { Post } from "@/types/posts";
import React from "react";

interface PostContentProps {
  post: Post;
}

export const PostContent: React.FC<PostContentProps> = ({ post }) => {
  return (
    <>
      {/* Post Content */}
      {post.content && (
        <div className="mb-1">
          <span className="font-semibold text-sm text-black mr-2">
            {post.author?.username || "unknown"}
          </span>
          <span className="text-sm text-black whitespace-pre-line">
            {post.content}
          </span>
        </div>
      )}

      {/* Post Tags */}
      {(post.tags || post.content?.match(/#\w+/g)) && (
        <div className="mb-1">
          <div className="flex flex-wrap gap-1">
            {(
              post.tags ||
              post.content?.match(/#\w+/g) || ["#social", "#media"]
            )
              .slice(0, 3)
              .map((tag: string, index: number) => (
                <span
                  key={index}
                  className="text-sm text-blue-900 cursor-pointer hover:underline"
                >
                  {tag.startsWith("#") ? tag : `#${tag}`}
                </span>
              ))}
            {(post.tags?.length > 3 ||
              (post.content?.match(/#\w+/g) || []).length > 3) && (
              <span className="text-sm text-gray-500">
                +
                {(post.tags?.length ||
                  post.content?.match(/#\w+/g)?.length ||
                  0) - 3}{" "}
                more
              </span>
            )}
          </div>
        </div>
      )}
    </>
  );
};