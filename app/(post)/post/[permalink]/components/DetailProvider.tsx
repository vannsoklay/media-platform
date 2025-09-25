"use client";

import type React from "react";

import { Suspense, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Chip,
  Divider,
  Skeleton,
  User,
} from "@heroui/react";
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
  Calendar,
  Tag,
} from "lucide-react";

import { usePost } from "@/hooks/usePost";
import { CommentList } from "@/components/CommentList";
import { getRelativeTimeString } from "@/utils/date";
import { PostMedia } from "@/components/PostMedia";
import { AspectRatioType, Post } from "@/types/posts";

interface DetailProps {
  permalink: string;
}

const PostDetailSkeleton = () => (
  <Card className="w-full max-w-2xl mx-auto">
    <CardHeader className="flex gap-3">
      <div className="flex gap-3 items-center w-full">
        <Skeleton className="flex rounded-full w-12 h-12" />
        <div className="w-full flex flex-col gap-2">
          <Skeleton className="h-4 w-3/5 rounded-lg" />
          <Skeleton className="h-3 w-2/5 rounded-lg" />
        </div>
      </div>
    </CardHeader>
    <CardBody className="px-3 py-0 text-small">
      <div className="space-y-3">
        <Skeleton className="h-6 w-4/5 rounded-lg" />
        <Skeleton className="h-4 w-full rounded-lg" />
        <Skeleton className="w-full h-64 rounded-lg" />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-12 rounded-full" />
        </div>
      </div>
    </CardBody>
  </Card>
);

const PostContent: React.FC<{ data: Post }> = ({ data }) => {
  const [imageAspectRatios, setImageAspectRatios] = useState<
    Map<string, Map<number, AspectRatioType>>
  >(new Map());

  const formatDate = (dateString: string) => {
    try {
      return getRelativeTimeString(new Date(dateString));
    } catch {
      return "Unknown time";
    }
  };

  const getAuthorInitials = (username: string) => {
    return `${username.charAt(0).toUpperCase()}`;
  };

  return (
    <Card className="p-0" shadow="none">
      <CardHeader className="justify-between p-0">
        <div className="flex gap-3 w-full">
          <User
            avatarProps={{
              src: data.author.avatar || "",
              name: getAuthorInitials(data.author.username),
              size: "md",
              className: "border-2 border-divider",
            }}
            description={
              <div className="flex items-center gap-2 text-small">
                <Calendar size={12} />
                <span>{formatDate(data.created_at ?? "")}</span>
              </div>
            }
            name={data.author.username || "Unknown User"}
          />
          <div className="flex items-center gap-2 ml-auto">
            <Button
              isIconOnly
              className="text-default-400"
              size="sm"
              variant="light"
            >
              <MoreHorizontal size={16} />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardBody className="px-0 py-0 pb-4">
        <div className="space-y-4">
          {data.content && (
            <div className="mt-4">
              <p className="text-default-700 leading-relaxed">{data.content}</p>
            </div>
          )}

          <PostMedia
            id={data?.id}
            imageAspectRatios={imageAspectRatios}
            mediaUrls={data?.media_urls}
          />

          {data.tags && data.tags.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <Tag className="text-default-400" size={16} />
              {data.tags.map((tag, index) => (
                <Chip
                  key={index}
                  className="text-tiny"
                  size="sm"
                  startContent="#"
                  variant="bordered"
                >
                  {tag}
                </Chip>
              ))}
            </div>
          )}

          <Divider className="my-6" />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Button
                className="text-default-500 hover:text-danger transition-colors"
                size="sm"
                startContent={<Heart size={16} />}
                variant="light"
              >
                {data?.total_votes} Like
              </Button>
              <Button
                className="text-default-500 hover:text-primary transition-colors"
                size="sm"
                startContent={<MessageCircle size={16} />}
                variant="light"
              >
                Comment
              </Button>
              <Button
                className="text-default-500 hover:text-success transition-colors"
                size="sm"
                startContent={<Share2 size={16} />}
                variant="light"
              >
                Share
              </Button>
            </div>
            <Button
              isIconOnly
              className="text-default-500 hover:text-warning transition-colors"
              size="sm"
              variant="light"
            >
              <Bookmark size={16} />
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

const CommentsSkeleton = () => (
  <Card className="w-full max-w-2xl mx-auto">
    <CardHeader>
      <Skeleton className="h-6 w-32 rounded-lg" />
    </CardHeader>
    <CardBody className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex gap-3">
          <Skeleton className="flex rounded-full w-8 h-8" />
          <div className="w-full flex flex-col gap-2">
            <Skeleton className="h-4 w-1/4 rounded-lg" />
            <Skeleton className="h-3 w-full rounded-lg" />
          </div>
        </div>
      ))}
    </CardBody>
  </Card>
);

export const DetailProvider: React.FC<DetailProps> = ({ permalink }) => {
  const { getPostByPermalink } = usePost();
  const { data } = getPostByPermalink(permalink);

  return (
    <div className="min-h-screen bg-background py-6 px-4">
      <div className="w-full max-w-2xl mx-auto">
        <Suspense fallback={<PostDetailSkeleton />}>
          {data ? <PostContent data={data} /> : <PostDetailSkeleton />}
        </Suspense>
        <Suspense fallback={<CommentsSkeleton />}>
          <div className="w-full max-w-2xl mx-auto">
            <Divider className="mb-6" />
            <CommentList permalink={permalink} />
          </div>
        </Suspense>
      </div>
    </div>
  );
};
