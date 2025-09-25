import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  Following,
  FollowStatus,
  FollowToggleService,
} from "@/services/follow";

export const useFollow = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: toggleFollow } = useMutation<
    void,
    Error,
    { payload: Record<string, any> }
  >({
    mutationFn: async ({ payload }) => {
      const data = await FollowToggleService.createOrRemove(payload);

      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
  });

  const useFollowStatus = (follower_id: string, following_id: string) => {
    return useQuery({
      queryKey: ["follow", follower_id, following_id],
      queryFn: async () => {
        const params = { follower_id, following_id };
        const response = await FollowStatus.followByUser(params);

        return response.data;
      },
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
      enabled: !!follower_id && !!following_id,
    });
  };

  const useFollower = ({
    follower_id,
    skip,
    limit,
  }: {
    follower_id?: string;
    skip: number;
    limit: number;
  }) => {
    return useQuery({
      queryKey: ["follower", follower_id],
      queryFn: async () => {
        const params = { follower_id, skip, limit };
        const response = await Following.following(params);

        return response.data;
      },
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
      enabled: !!follower_id && !!skip && !!limit,
    });
  };

  const useFollowing = ({
    following_id,
    skip,
    limit,
  }: {
    following_id?: string;
    skip: number;
    limit: number;
  }) => {
    return useQuery({
      queryKey: ["following", following_id],
      queryFn: async () => {
        const params = { following_id, skip, limit };
        const response = await Following.following(params);

        return response.data;
      },
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
      enabled: !!following_id && !!skip && !!limit,
    });
  };

  return {
    toggleFollow,
    useFollowStatus,
    useFollower,
    useFollowing,
  };
};
