import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { FollowStatus, FollowToggleService } from "@/services/follow";

export const useFollow = () => {
  const limit = 10;
  const queryClient = useQueryClient();

  const { mutateAsync: toggleFollow } = useMutation<
    void,
    Error,
    { payload: Record<string, any> }
  >({
    mutationFn: async ({ payload }) => {
      await FollowToggleService.createOrRemove(payload);
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

  return {
    toggleFollow,
    useFollowStatus,
  };
};
