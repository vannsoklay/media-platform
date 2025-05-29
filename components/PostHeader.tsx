import React from "react";
import {
  Avatar,
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@heroui/react";
import {
  MoreHorizontal,
  Pencil,
  Trash2,
  RatioIcon as AspectRatio,
} from "lucide-react";
import { getRelativeTimeString } from "@/utils/date";
import { Post } from "@/types/posts";

interface PostHeaderProps {
  post: Post;
  currentUserId?: string;
  isMenuOpen: boolean;
  onMenuToggle: (postId: string) => void;
  onEdit: (postId: string) => void;
  onDelete: (postId: string) => void;
  onAspectRatioToggle: (postId: string) => void;
  hasMedia: boolean;
}

export const PostHeader: React.FC<PostHeaderProps> = ({
  post,
  currentUserId,
  isMenuOpen,
  onMenuToggle,
  onEdit,
  onDelete,
  onAspectRatioToggle,
  hasMedia,
}) => {
  return (
    <div className="flex items-center justify-between px-0.5 pb-4 py-2">
      <div className="flex items-center gap-3">
        <div className="relative">
          <Avatar
            radius="full"
            size="sm"
            src={post.author?.avatar || undefined}
            name={post.author?.username?.charAt(0).toUpperCase() ?? "?"}
            className="w-8 h-8 ring-2 ring-gradient-to-r from-purple-500 to-pink-500 ring-offset-2"
          />
        </div>
        <div className="flex items-center gap-1">
          <span className="font-semibold text-sm text-black">
            {post.author?.username || "unknown"}
          </span>
          <span className="text-gray-500 text-sm">•</span>
          <span className="text-gray-500 text-sm">
            {getRelativeTimeString(new Date(post.created_at ?? ""))}
          </span>
          {new Date(post.updated_at ?? "") >
            new Date(post.created_at ?? "") && (
            <span className="text-gray-400 text-xs">• edited</span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1">
        {hasMedia && (
          <Button
            isIconOnly
            size="sm"
            variant="light"
            className="text-gray-500 hover:text-gray-700"
            onPress={() => onAspectRatioToggle(post.id)}
          >
            <AspectRatio size={16} />
          </Button>
        )}

        {currentUserId === post.author?.id ? (
          <Popover
            showArrow
            isOpen={isMenuOpen}
            offset={10}
            placement="bottom-end"
          >
            <PopoverTrigger onClick={() => onMenuToggle(post.id)}>
              <Button
                isIconOnly
                size="sm"
                variant="light"
                className="text-black"
              >
                <MoreHorizontal size={16} />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className="px-1 py-2 min-w-32">
                <Button
                  size="sm"
                  variant="light"
                  className="w-full justify-start text-left"
                  startContent={<Pencil size={14} />}
                  onPress={() => onEdit(post.id)}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="light"
                  className="w-full justify-start text-left text-red-600"
                  startContent={<Trash2 size={14} />}
                  onPress={() => onDelete(post.id)}
                >
                  Delete
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        ) : (
          <Button isIconOnly size="sm" variant="light" className="text-black">
            <MoreHorizontal size={16} />
          </Button>
        )}
      </div>
    </div>
  );
};
