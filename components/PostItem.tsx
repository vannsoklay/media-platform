import React, { Dispatch, SetStateAction } from "react";

import { PostHeader } from "./PostHeader";
import { AspectRatioSelector } from "./AspectRatioSelector";
import { PostMedia } from "./PostMedia";
import { PostActions } from "./PostActions";
import { PostContent } from "./PostContent";
import { CommentsSection } from "./CommentsSection";
import { ButtonFollow } from "./ButtonFollow";

import { AspectRatioType, Post } from "@/types/posts";
import { useAuth } from "@/contexts/useAuth";

interface PostItemProps {
  post: Post;
  currentUserId?: string;
  isMenuOpen: boolean;
  isLiked: boolean;
  isSaved: boolean;
  setLikedPosts: Dispatch<SetStateAction<Set<string>>>;
  showAspectSelector: boolean;
  imageAspectRatios: Map<string, Map<number, AspectRatioType>>;
  onMenuToggle: (postId: string) => void;
  onEdit: (postId: string) => void;
  onDelete: (postId: string) => void;
  onLike: (permalink: string) => void;
  onSave: (postId: string) => void;
  onToggleComments: (postId: string) => void;
  onAspectRatioToggle: (postId: string) => void;
  onAspectRatioChange: (
    postId: string,
    imageIndex: number,
    aspectRatio: AspectRatioType
  ) => void;
}

export const PostItem: React.FC<PostItemProps> = ({
  post,
  currentUserId,
  isMenuOpen,
  isLiked,
  isSaved,
  setLikedPosts,
  showAspectSelector,
  imageAspectRatios,
  onMenuToggle,
  onEdit,
  onDelete,
  onLike,
  onSave,
  onToggleComments,
  onAspectRatioToggle,
  onAspectRatioChange,
}) => {
  const { user } = useAuth();
  const hasMedia = Array.isArray(post.media_urls) && post.media_urls.length > 0;

  const handleCloseAspectSelector = () => {
    // This should be handled by parent component
    onAspectRatioToggle(post.id);
  };

  return (
    <div className="bg-white border-b border-gray-100 py-8">
      <ButtonFollow
        followerId={user?.id}
        followingId={post.author.id}
        isFollow={post.followed_by_user}
      />
      <PostHeader
        currentUserId={currentUserId}
        hasMedia={hasMedia}
        isMenuOpen={isMenuOpen}
        post={post}
        onAspectRatioToggle={onAspectRatioToggle}
        onDelete={onDelete}
        onEdit={onEdit}
        onMenuToggle={onMenuToggle}
      />

      {showAspectSelector && (
        <AspectRatioSelector
          imageAspectRatios={imageAspectRatios}
          post={post}
          onAspectRatioChange={onAspectRatioChange}
          onClose={handleCloseAspectSelector}
        />
      )}

      <PostMedia
        id={post?.id}
        imageAspectRatios={imageAspectRatios}
        mediaUrls={post?.media_urls}
      />

      <PostActions
        isLiked={isLiked}
        isSaved={isSaved}
        post={post}
        setLikedPosts={setLikedPosts}
        onLike={onLike}
        onSave={onSave}
        onToggleComments={onToggleComments}
      />

      <PostContent post={post} />

      <CommentsSection
        totalComments={post.total_comments}
        onToggleVisibility={() => onToggleComments(post.permalink)}
      />
    </div>
  );
};
