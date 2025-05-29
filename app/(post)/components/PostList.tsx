"use client";
import React from "react";

import { addToast } from "@heroui/react";
import { useState } from "react";
import PostForm from "./PostForm";
import { usePost } from "@/hooks/usePost";
import { useAuth } from "@/contexts/useAuth";
import InfiniteScroll from "react-infinite-scroll-component";
import { PostItem } from "@/components/PostItem";
import { AspectRatioType } from "@/types/posts";
import { PostSkeleton } from "@/components/PostSkeleton";
import { VoteService } from "@/services/vote";
import _ from "lodash";

const PostList = ({
  author,
  username,
}: {
  author?: string;
  username?: string;
}) => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState<string | null>(null);
  const [isEdit, setIsEdit] = useState<string | null>(null);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [savedPosts, setSavedPosts] = useState<Set<string>>(new Set());
  const [showComments, setShowComments] = useState<Set<string>>(new Set());
  const [imageAspectRatios, setImageAspectRatios] = useState<
    Map<string, Map<number, AspectRatioType>>
  >(new Map());
  const [showAspectSelector, setShowAspectSelector] = useState<Set<string>>(
    new Set()
  );

  const filter = author ? { author } : username ? { username: username } : {};

  const {
    data,
    loading,
    error,
    hasMore,
    deletePost,
    fetchNextPage,
    isFetchingNextPage,
  } = usePost({ ...filter, isAuth: user ? true : false });

  const posts = data ?? [];

  const handleDelete = async (postId: string) => {
    try {
      await deletePost(postId);
      setIsOpen(null);
    } catch (error) {
      addToast({
        title: "Invalid Delete Post",
        variant: "solid",
        description:
          "An error occurred while deleting the post. Please try again.",
        color: "danger",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.7em"
            height="1.7em"
            viewBox="0 0 512 512"
          >
            <path
              fill="#fff"
              fillRule="evenodd"
              d="M256 42.667c117.803 0 213.334 95.53 213.334 213.333S373.803 469.334 256 469.334S42.667 373.803 42.667 256S138.197 42.667 256 42.667m48.918 134.25L256 225.836l-48.917-48.917l-30.165 30.165L225.835 256l-48.917 48.918l30.165 30.165L256 286.166l48.918 48.917l30.165-30.165L286.166 256l48.917-48.917z"
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
            xmlns="http://www.w3.org/2000/svg"
            width="1.7em"
            height="1.7em"
            viewBox="0 0 512 512"
          >
            <path
              fill="#fff"
              fillRule="evenodd"
              d="M256 42.667c117.803 0 213.334 95.53 213.334 213.333S373.803 469.334 256 469.334S42.667 373.803 42.667 256S138.197 42.667 256 42.667m48.918 134.25L256 225.836l-48.917-48.917l-30.165 30.165L225.835 256l-48.917 48.918l30.165 30.165L256 286.166l48.918 48.917l30.165-30.165L286.166 256l48.917-48.917z"
            />
          </svg>
        ),
      });
      return;
    }

    try {
      await VoteService.create_or_remove({ permalink });
    } catch (error) {
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
            xmlns="http://www.w3.org/2000/svg"
            width="1.7em"
            height="1.7em"
            viewBox="0 0 512 512"
          >
            <path
              fill="#fff"
              fillRule="evenodd"
              d="M256 42.667c117.803 0 213.334 95.53 213.334 213.333S373.803 469.334 256 469.334S42.667 373.803 42.667 256S138.197 42.667 256 42.667m48.918 134.25L256 225.836l-48.917-48.917l-30.165 30.165L225.835 256l-48.917 48.918l30.165 30.165L256 286.166l48.918 48.917l30.165-30.165L286.166 256l48.917-48.917z"
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

  const toggleComments = (postId: string) => {
    setShowComments((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
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
    aspectRatio: AspectRatioType
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
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="max-w-sm sm:max-w-md lg:max-w-lg mx-auto bg-white">
      <PostForm isEdit={isEdit} setIsEdit={setIsEdit} />
      {loading && posts.length === 0 ? (
        <div className="space-y-0 px-2">
          {[1, 2, 3].map((item) => (
            <PostSkeleton key={item} />
          ))}
        </div>
      ) : (
        <InfiniteScroll
          dataLength={posts.length}
          next={() => {
            if (!isFetchingNextPage && hasMore) {
              fetchNextPage();
            }
          }}
          hasMore={hasMore}
          loader={
            <div className="space-y-0 px-2">
              {[1, 2, 3].map((item) => (
                <PostSkeleton key={item} />
              ))}
            </div>
          }
          endMessage={
            posts.length > 0 && (
              <div className="text-center py-8 text-gray-500 text-sm">
                <p>You're all caught up! 🎉</p>
              </div>
            )
          }
        >
          <div className="space-y-0 px-2">
            {posts.map((post, index) => (
              <div key={index}>
                <PostItem
                  post={post}
                  currentUserId={user?.id}
                  isMenuOpen={isOpen === post.id}
                  isLiked={likedPosts.has(post.permalink)}
                  setLikedPosts={setLikedPosts}
                  isSaved={savedPosts.has(post.id)}
                  showComments={showComments.has(post.id)}
                  showAspectSelector={showAspectSelector.has(post.id)}
                  imageAspectRatios={imageAspectRatios}
                  onMenuToggle={() => setIsOpen(post.id)}
                  onEdit={() => setIsEdit(post.id)}
                  onDelete={handleDelete}
                  onLike={() => handleLike(post.permalink)}
                  onSave={() => handleSave(post.id)}
                  onToggleComments={toggleComments}
                  onAspectRatioToggle={toggleAspectSelector}
                  onAspectRatioChange={handleAspectRatioChange}
                />
              </div>
            ))}
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
};

export default PostList;
