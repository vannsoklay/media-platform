import React, { Dispatch, SetStateAction } from "react";

import { AspectRatioType, Post } from "@/types/posts";
import { useAuth } from "@/contexts/useAuth";
import { PostMediaGrid } from "@/components/PostMediaGrid";

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

export const GridPostItem: React.FC<PostItemProps> = ({
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
    <div className="bg-white border-b border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <PostMediaGrid
        id={post?.id}
        imageAspectRatios={imageAspectRatios}
        mediaUrls={post?.media_urls}
      />
    </div>
  );
};
