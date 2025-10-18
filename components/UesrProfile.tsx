"use client";

import { Avatar, Card, CardBody, Button, Chip } from "@heroui/react";
import { Calendar, MoreHorizontal, CheckCircle } from "lucide-react";

import { useUser } from "@/hooks/useUser";
import { UserType } from "@/types/user";

interface UserProfileProps {
  username: string;
  user: UserType | null;
}

export function UserProfile({ username, user }: UserProfileProps) {
  const { data, isLoading, isError } = useUser().GET_USER_BY_DETAIL({
    username,
    current_user_id: user ? user.id : null,
  });

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }

    return num.toString();
  };

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <>
      {/* Header Section */}
      <Card className="bg-background/60 backdrop-blur-md border-divider">
        <CardBody className="p-8">
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            {/* Avatar */}
            <div className="relative">
              <Avatar
                alt={data.user.username}
                className="w-24 h-24 ring-2 ring-primary/20"
                fallback={data.user.username
                  .split(" ")
                  .map((n: any) => n[0])
                  .join("")}
                src={data.user.avatar || "/placeholder.svg"}
              />
              {data.user.is_verified && (
                <div className="absolute -bottom-1 -right-1">
                  <CheckCircle className="w-6 h-6 text-primary fill-current" />
                </div>
              )}
            </div>

            {/* Profile Info */}
            <div className="flex-1 space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-2xl font-bold text-foreground">
                    {data.username}
                  </h1>
                  <Chip color="default" size="sm" variant="flat">
                    @{data.user.username}
                  </Chip>
                </div>
                <p className="text-default-600 leading-relaxed">
                  {data.user.bio}
                </p>
              </div>

              {/* Meta Info */}
              <div className="flex flex-wrap gap-4 text-sm text-default-500">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>Joined {data.user.created_at}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {user?.id != data.user.id && (
              <div className="flex gap-2 sm:flex-col sm:items-end">
                <Button
                  className="min-w-[100px]"
                  color={data.followed_by_user ? "default" : "primary"}
                  size="sm"
                  variant={data.followed_by_user ? "flat" : "solid"}
                >
                  {data.followed_by_user ? "Following" : "Follow"}
                </Button>
                <Button isIconOnly size="sm" variant="light">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </CardBody>
      </Card>

      {/* Stats Section */}
      <Card className="bg-background/60 backdrop-blur-md border-divider">
        <CardBody className="p-6">
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center space-y-1">
              <div className="text-2xl font-bold text-foreground">
                {formatNumber(data.stats.total_posts)}
              </div>
              <div className="text-sm text-default-500 font-medium">
                Post{data.stats.total_posts > 1 && `s`}
              </div>
            </div>

            <div className="text-center space-y-1 border-x border-divider">
              <div className="text-2xl font-bold text-foreground">
                {formatNumber(data.stats.total_follower)}
              </div>
              <div className="text-sm text-default-500 font-medium">
                Follower{data.stats.total_follower > 1 && `s`}
              </div>
            </div>

            <div className="text-center space-y-1">
              <div className="text-2xl font-bold text-foreground">
                {formatNumber(data.stats.total_following)}
              </div>
              <div className="text-sm text-default-500 font-medium">
                Following
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
}
