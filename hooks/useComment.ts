import { CommentService } from "@/services/comment";
import { CommentPayload } from "@/types/comment";
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";

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
                    permalink
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
        mutationFn: async ({
            payload,
        }: {
            payload: CommentPayload;
        }) => {
            await CommentService.createComment({ payload });
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
        createComment
    }
}