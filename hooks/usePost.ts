"use client";

import {
    useInfiniteQuery,
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";
import { PostService } from "@/services/post";
import { useEffect, useRef } from "react";
import _ from "lodash";
import { useAuth } from "@/contexts/useAuth";

export const usePost = ({ author, username, isAuth }: { author?: string, username?: string, isAuth: boolean }) => {
    const { user } = useAuth();

    const limit = 10;
    const queryClient = useQueryClient();
    const scrollTimeout = useRef<number | null>(null);

    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ["posts", username, author],
        queryFn: async ({ pageParam }) => {
            try {
                const response = await PostService.getAll(
                    pageParam * limit,
                    limit,
                    username,
                    author
                );
                return response.data?.data || [];
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
        enabled: isAuth ? !!username || !!author : true,
    });

    const getPostById = (id: string) => {
        return useQuery({
            queryKey: ["post", id],
            queryFn: async () => {
                const response = await PostService.getById(id);
                return response.data;
            },
            enabled: !!id,
            staleTime: 1000 * 60 * 5,
        });
    };

    const { mutateAsync: createPost } = useMutation({
        mutationFn: async ({
            payload,
        }: {
            payload: Record<string, any>;
        }) => {
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

    useEffect(() => {
        const handleScroll = () => {
            if (scrollTimeout.current) {
                clearTimeout(scrollTimeout.current);
            }

            scrollTimeout.current = window.setTimeout(() => {
                const { scrollY, innerHeight } = window;
                const { scrollHeight } = document.documentElement;
                const scrollThreshold = 200;

                if (
                    scrollY + innerHeight >= scrollHeight - scrollThreshold &&
                    hasNextPage &&
                    !isFetching &&
                    !isFetchingNextPage
                ) {
                    fetchNextPage();
                }
            }, 100);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (scrollTimeout.current) {
                clearTimeout(scrollTimeout.current);
            }
        };
    }, [hasNextPage, isFetching, isFetchingNextPage, fetchNextPage]);

    return {
        createPost,
        editPost,
        deletePost,
        data: data?.pages.flat() || [],
        loading: isFetching,
        error: error?.message || null,
        hasMore: hasNextPage,
        getPostById,
        fetchNextPage,
        isFetchingNextPage
    };
};
