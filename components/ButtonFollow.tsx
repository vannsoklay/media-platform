"use client";

import { Button } from "@heroui/button";
import { useCallback } from "react";

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
  // const { useFollowStatus } = useFollow();

  // const { data: follow } = useFollowStatus(followerId ?? "", followingId ?? "");

  const handleFollow = useCallback(async () => {
    try {
      const payload = {
        following_id: followingId,
        follower_id: followerId,
      };

      await toggleFollow({ payload })
        .then((res) => {
          console.log("res", res);
        })
        .catch((e) => {
          console.log("e", e);
        });
    } catch (e) {
      console.log("e: ", e);
    }
  }, [followingId]);

  return (
    followerId != followingId && (
      <Button variant="solid" onPress={handleFollow}>
        {isFollow ? "Following" : "Follow"}
      </Button>
    )
  );
};
