"use client";

import { Button } from "@heroui/button";
import { useCallback } from "react";
import { addToast } from "@heroui/react";

import { useFollow } from "@/hooks/useFollow";

export const ButtonFollow = ({
  followerId,
  followingId,
  isFollow = false,
}: {
  followerId?: string;
  followingId?: string;
  isFollow: boolean;
}) => {
  const { toggleFollow } = useFollow();

  const handleFollow = useCallback(async () => {
    try {
      const payload = {
        following_id: followingId,
        follower_id: followerId,
      };

      await toggleFollow({ payload })
        .then((res: any) => {
          addToast({
            description: res.message,
            color: "success",
          });
        })
        .catch((e) => {
          throw Error(e.message);
        });
    } catch (e: any) {
      addToast({
        title: "Error",
        description: e.message,
        color: "danger",
      });
    }
  }, [followingId]);

  return (
    followerId != followingId && (
      <Button size="sm" variant="solid" onPress={handleFollow}>
        {isFollow ? "Following" : "Follow"}
      </Button>
    )
  );
};
