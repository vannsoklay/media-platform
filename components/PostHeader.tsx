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
import Link from "next/link";

import { getRelativeTimeString } from "@/utils/date";
import { Post } from "@/types/posts";
import { ButtonFollow } from "./ButtonFollow";

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
            className="w-8 h-8 ring-2 ring-gradient-to-r from-purple-500 to-pink-500 ring-offset-2"
            name={post.author?.username?.charAt(0).toUpperCase() ?? "?"}
            radius="full"
            size="sm"
            src={post.author?.avatar || undefined}
          />
        </div>
        <div className="flex items-center gap-1">
          <Link href={`/${post?.author?.username}`}>
            <span className="font-semibold text-sm text-black">
              {post.author?.username || "unknown"}
            </span>
          </Link>
          <span className="text-gray-500 text-sm">•</span>
          <span className="text-gray-500 text-sm">
            {getRelativeTimeString(new Date(post.created_at ?? ""))}
          </span>
          {new Date(post.updated_at ?? "") >
            new Date(post.created_at ?? "") && (
            <span className="text-gray-400 text-xs">• edited</span>
          )}
        </div>
        <div>
          <ButtonFollow
            followerId={currentUserId}
            followingId={post?.author?.id}
            isFollow={post.followed_by_user}
          />
        </div>
      </div>

      <div className="flex items-center gap-1">
        {/* {hasMedia && (
          <Button
            isIconOnly
            className="text-gray-500 hover:text-gray-700"
            size="sm"
            variant="light"
            onPress={() => onAspectRatioToggle(post.id)}
          >
            <AspectRatio size={16} />
          </Button>
        )} */}

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
                className="text-black"
                size="sm"
                variant="light"
              >
                <MoreHorizontal size={16} />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className="px-1 py-2 min-w-32">
                <Button
                  className="w-full justify-start text-left"
                  size="sm"
                  startContent={<Pencil size={14} />}
                  variant="light"
                  onPress={() => onEdit(post.id)}
                >
                  Edit
                </Button>
                <Button
                  className="w-full justify-start text-left text-red-600"
                  size="sm"
                  startContent={<Trash2 size={14} />}
                  variant="light"
                  onPress={() => onDelete(post.id)}
                >
                  Delete
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        ) : (
          <Button isIconOnly className="text-black" size="sm" variant="light">
            <MoreHorizontal size={16} />
          </Button>
        )}
      </div>
    </div>
  );
};
