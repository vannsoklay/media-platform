import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { PostService } from "@/services/post";

export const usePost = () => {
  const limit = 10;
  const queryClient = useQueryClient();

  const usePosts = ({
    username,
    current_user_id,
  }: {
    username?: string;
    current_user_id: string | null;
  }) => {
    return useInfiniteQuery({
      queryKey: ["posts", username, current_user_id],
      queryFn: async ({ pageParam }) => {
        try {
          const response = await PostService.getAll(
            pageParam * limit,
            limit,
            username,
            current_user_id,
          );

          return response.data?.data || [];
        } catch (err: any) {
          if (err?.status === 404) {
            return [];
          }
          throw new Error(
            err.response?.data?.message || "Failed to load posts.",
          );
        }
      },
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length < limit ? null : allPages.length;
      },
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      enabled: true,
    });
  };

  const usePostById = (id: string) => {
    return useQuery({
      queryKey: ["post", id],
      queryFn: async () => {
        const response = await PostService.getById(id);

        return response.data;
      },
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
      enabled: !!id,
    });
  };

  const usePostByPermalink = (permalink: string) => {
    return useQuery({
      queryKey: ["post", permalink],
      queryFn: async () => {
        const response = await PostService.getByPermalink(permalink);

        return response.data;
      },
      enabled: !!permalink,
      staleTime: 1000 * 60 * 5,
    });
  };

  const { mutateAsync: createPost } = useMutation({
    mutationFn: async ({ payload }: { payload: Record<string, any> }) => {
      await PostService.create(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const { mutateAsync: editPost } = useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload: Record<string, any>;
    }) => {
      await PostService.update(id, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const { mutateAsync: deletePost } = useMutation({
    mutationFn: async (postId: string) => {
      await PostService.delete(postId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  return {
    createPost,
    editPost,
    deletePost,
    usePostById,
    usePostByPermalink,
    usePosts,
  };
};
