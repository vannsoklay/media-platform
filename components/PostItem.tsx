import React, { Dispatch, SetStateAction } from "react";
import { PostHeader } from "./PostHeader";
import { AspectRatioSelector } from "./AspectRatioSelector";
import { PostMedia } from "./PostMedia";
import { PostActions } from "./PostActions";
import { PostContent } from "./PostContent";
import { CommentsSection } from "./CommentsSection";
import { AspectRatioType, Post } from "@/types/posts";

interface PostItemProps {
  post: Post;
  currentUserId?: string;
  isMenuOpen: boolean;
  isLiked: boolean;
  isSaved: boolean;
  setLikedPosts: Dispatch<SetStateAction<Set<string>>>;
  showComments: boolean;
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
  showComments,
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
  const hasMedia = Array.isArray(post.media_urls) && post.media_urls.length > 0;

  const handleCloseAspectSelector = () => {
    // This should be handled by parent component
    onAspectRatioToggle(post.id);
  };

  return (
    <div className="bg-white border-b border-gray-100 py-8">
      <PostHeader
        post={post}
        currentUserId={currentUserId}
        isMenuOpen={isMenuOpen}
        onMenuToggle={onMenuToggle}
        onEdit={onEdit}
        onDelete={onDelete}
        onAspectRatioToggle={onAspectRatioToggle}
        hasMedia={hasMedia}
      />

      {showAspectSelector && (
        <AspectRatioSelector
          post={post}
          imageAspectRatios={imageAspectRatios}
          onAspectRatioChange={onAspectRatioChange}
          onClose={handleCloseAspectSelector}
        />
      )}

      <PostMedia post={post} imageAspectRatios={imageAspectRatios} />

      <PostActions
        post={post}
        isLiked={isLiked}
        isSaved={isSaved}
        setLikedPosts={setLikedPosts}
        onLike={onLike}
        onSave={onSave}
        onToggleComments={onToggleComments}
      />

      <PostContent post={post} />

      <CommentsSection
        isVisible={showComments}
        onToggleVisibility={() => onToggleComments(post.id)}
      />
    </div>
  );
};
