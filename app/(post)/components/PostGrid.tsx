"use client";
import React, { useEffect, useRef } from "react";
import { addToast } from "@heroui/react";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import _ from "lodash";
import { useRouter } from "next/navigation";

import PostForm from "./PostForm";
import { GridPostItem } from "./GridPostItem";

import { usePost } from "@/hooks/usePost";
import { useAuth } from "@/contexts/useAuth";
import { AspectRatioType } from "@/types/posts";
import { PostSkeleton } from "@/components/PostSkeleton";
import { VoteService } from "@/services/vote";

const PostGrid = ({
  username,
  isPrivate = false,
}: {
  username?: string;
  isPrivate?: boolean;
}) => {
  const router = useRouter();
  const { user } = useAuth();
  const { usePosts, deletePost } = usePost();
  const [isOpen, setIsOpen] = useState<string | null>(null);
  const [isEdit, setIsEdit] = useState<string | null>(null);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [savedPosts, setSavedPosts] = useState<Set<string>>(new Set());
  const [imageAspectRatios, setImageAspectRatios] = useState<
    Map<string, Map<number, AspectRatioType>>
  >(new Map());
  const [showAspectSelector, setShowAspectSelector] = useState<Set<string>>(
    new Set(),
  );
  const scrollTimeout = useRef<number | null>(null);

  const {
    data,
    isFetching,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = usePosts({
    username,
    current_user_id: user && isPrivate ? user.id : null,
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

  const handleDelete = async (postId: string) => {
    try {
      await deletePost(postId);
      setIsOpen(null);
    } catch {
      addToast({
        title: "Invalid Delete Post",
        variant: "solid",
        description:
          "An error occurred while deleting the post. Please try again.",
        color: "danger",
        icon: (
          <svg
            height="1.7em"
            viewBox="0 0 512 512"
            width="1.7em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M256 42.667c117.803 0 213.334 95.53 213.334 213.333S373.803 469.334 256 469.334S42.667 373.803 42.667 256S138.197 42.667 256 42.667m48.918 134.25L256 225.836l-48.917-48.917l-30.165 30.165L225.835 256l-48.917 48.918l30.165 30.165L256 286.166l48.918 48.917l30.165-30.165L286.166 256l48.917-48.917z"
              fill="#fff"
              fillRule="evenodd"
            />
          </svg>
        ),
      });
    }
  };

  const handleLike = async (permalink: string) => {
    if (_.isEmpty(user)) {
      // Prevent action before touching UI
      addToast({
        title: "Login required",
        description: "Please log in to like posts.",
        variant: "solid",
        color: "warning",
        icon: (
          <svg
            height="1.7em"
            viewBox="0 0 512 512"
            width="1.7em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M256 42.667c117.803 0 213.334 95.53 213.334 213.333S373.803 469.334 256 469.334S42.667 373.803 42.667 256S138.197 42.667 256 42.667m48.918 134.25L256 225.836l-48.917-48.917l-30.165 30.165L225.835 256l-48.917 48.918l30.165 30.165L256 286.166l48.918 48.917l30.165-30.165L286.166 256l48.917-48.917z"
              fill="#fff"
              fillRule="evenodd"
            />
          </svg>
        ),
      });

      return;
    }

    try {
      setLikedPosts((prev) => {
        const newSet = new Set(prev);

        if (newSet.has(permalink)) {
          newSet.delete(permalink);
        } else {
          newSet.add(permalink);
        }

        return newSet;
      });
      await VoteService.create_or_remove({ permalink });
    } catch {
      // Revert UI if API call fails
      setLikedPosts((prev) => {
        const newSet = new Set(prev);

        if (newSet.has(permalink)) {
          newSet.delete(permalink);
        } else {
          newSet.add(permalink);
        }

        return newSet;
      });

      addToast({
        title: "Like failed",
        description: "Something went wrong while liking the post.",
        variant: "solid",
        color: "danger",
        icon: (
          <svg
            height="1.7em"
            viewBox="0 0 512 512"
            width="1.7em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M256 42.667c117.803 0 213.334 95.53 213.334 213.333S373.803 469.334 256 469.334S42.667 373.803 42.667 256S138.197 42.667 256 42.667m48.918 134.25L256 225.836l-48.917-48.917l-30.165 30.165L225.835 256l-48.917 48.918l30.165 30.165L256 286.166l48.918 48.917l30.165-30.165L286.166 256l48.917-48.917z"
              fill="#fff"
              fillRule="evenodd"
            />
          </svg>
        ),
      });
    }
  };

  const handleSave = (postId: string) => {
    setSavedPosts((prev) => {
      const newSet = new Set(prev);

      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }

      return newSet;
    });
  };

  const toggleComments = (permalink: string) => {
    router.push(`/post/${permalink}`);
  };

  const toggleAspectSelector = (postId: string) => {
    setShowAspectSelector((prev) => {
      const newSet = new Set(prev);

      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }

      return newSet;
    });
  };

  const handleAspectRatioChange = (
    postId: string,
    imageIndex: number,
    aspectRatio: AspectRatioType,
  ) => {
    setImageAspectRatios((prev) => {
      const newMap = new Map(prev);
      const postRatios = newMap.get(postId) || new Map();

      postRatios.set(imageIndex, aspectRatio);
      newMap.set(postId, postRatios);

      return newMap;
    });
  };

  if (error) {
    return <p className="text-red-500">{error.message}</p>;
  }

  return (
    <div className="w-full max-w-2xl">
      <div className="max-w-2xl mx-auto">
        <PostForm isEdit={isEdit} setIsEdit={setIsEdit} />
      </div>
      {isFetching && data?.pages.flat().length === 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[1, 2, 3].map((item) => (
            <PostSkeleton key={item} />
          ))}
        </div>
      ) : (
        <InfiniteScroll
          dataLength={data?.pages.flat().length ?? 0}
          endMessage={
            (data?.pages.flat() || []).length > 10 && (
              <div className="text-center py-8 text-gray-500 text-sm">
                <p>You&#39;re all caught up! 🎉</p>
              </div>
            )
          }
          hasMore={hasNextPage}
          loader={
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {[1, 2, 3].map((item) => (
                <PostSkeleton key={item} />
              ))}
            </div>
          }
          next={() => {
            if (!isFetchingNextPage && hasNextPage) {
              fetchNextPage();
            }
          }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
            {data?.pages.flat().map((post, index) => (
              <div key={index}>
                <GridPostItem
                  currentUserId={user?.id}
                  imageAspectRatios={imageAspectRatios}
                  isLiked={likedPosts.has(post.permalink)}
                  isMenuOpen={isOpen === post.id}
                  isSaved={savedPosts.has(post.id)}
                  post={post}
                  setLikedPosts={setLikedPosts}
                  showAspectSelector={showAspectSelector.has(post.id)}
                  onAspectRatioChange={handleAspectRatioChange}
                  onAspectRatioToggle={toggleAspectSelector}
                  onDelete={handleDelete}
                  onEdit={() => setIsEdit(post.id)}
                  onLike={() => handleLike(post.permalink)}
                  onMenuToggle={() => setIsOpen(post.id)}
                  onSave={() => handleSave(post.id)}
                  onToggleComments={toggleComments}
                />
              </div>
            ))}
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
};

export default PostGrid;
