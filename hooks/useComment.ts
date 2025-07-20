import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { CommentService } from "@/services/comment";
import { CommentPayload } from "@/types/comment";

const limit = 10;

export const useComment = ({ permalink }: { permalink: string }) => {
  const queryClient = useQueryClient();

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["comments", permalink],
    queryFn: async ({ pageParam }) => {
      try {
        const response = await CommentService.getComments({
          limit,
          page: pageParam * limit,
          permalink,
        });

        return response.data?.comments || [];
      } catch (err: any) {
        if (err?.status === 404) {
          return [];
        }
        throw new Error(err.response?.data?.message || "Failed to load posts.");
      }
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length < limit ? null : allPages.length;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    enabled: !!permalink,
  });

  const { mutateAsync: createComment } = useMutation({
    mutationFn: async ({ payload }: { payload: CommentPayload }) => {
      const resp = await CommentService.create({ payload });
      return {
        permalink: resp.data.data?.permalink || "",
      };
    },
    onSuccess: ({ permalink }) => {
      queryClient.invalidateQueries({ queryKey: ["comments", permalink] });
    },
  });

  const { mutateAsync: editComment } = useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload: Record<string, any>;
    }) => {
      await CommentService.update(id, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });

  const { mutateAsync: deleteComment } = useMutation({
    mutationFn: async (postId: string) => {
      await CommentService.delete(postId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });

  return {
    data: data?.pages.flat() || [],
    loading: isFetching,
    error: error?.message || null,
    hasMore: hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    createComment,
    editComment,
    deleteComment,
  };
};
