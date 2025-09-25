import React from "react";
import { addToast, Button, Form, Input } from "@heroui/react";
import InfiniteScroll from "react-infinite-scroll-component";

import { CommentItem } from "./CommentItem";

import { CommentPayload } from "@/types/comment";
import { useComment } from "@/hooks/useComment";

interface CommentListProps {
  permalink: string;
}

export const CommentList: React.FC<CommentListProps> = ({ permalink }) => {
  const formRef = React.useRef<HTMLFormElement>(null);
  const {
    data,
    loading,
    error,
    hasMore,
    fetchNextPage,
    createComment,
    editComment,
    deleteComment,
  } = useComment({
    permalink,
  });

  if (error) {
    return <p className="text-red-500 text-center py-4">{error}</p>;
  }

  const LoadingIndicator = () => (
    <div className="text-center py-2 text-gray-500">Loading comments...</div>
  );

  const handleComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget));

    try {
      const payload: CommentPayload = {
        permalink: permalink,
        content: data.comment as string,
        parent_comment_id: null,
      };

      console.log("payload", payload);

      await createComment({ payload });
      formRef.current?.reset();
    } catch (error: any) {
      const message =
        error?.message || "Failed to submit post. Please try again.";

      addToast({
        title: "Error",
        variant: "solid",
        description: message,
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

  const handleDelete = async (commentId: string) => {
    try {
      // Assuming deleteComment is a function that deletes a comment by ID
      await deleteComment(commentId);
      addToast({
        title: "Success",
        variant: "solid",
        description: "Comment deleted successfully.",
        color: "success",
      });
    } catch (error: any) {
      addToast({
        title: "Error",
        variant: "solid",
        description: error?.message || "Failed to delete comment.",
        color: "danger",
      });
    }
  };

  const handleEdit = async (commentId: string, newContent: string) => {
    try {
      console.log("edit", commentId);

      await editComment({
        id: commentId,
        payload: { content: newContent, permalink: commentId },
      });
      addToast({
        title: "Success",
        variant: "solid",
        description: "Comment edited successfully.",
        color: "success",
      });
    } catch (error: any) {
      addToast({
        title: "Error",
        variant: "solid",
        description: error?.message || "Failed to edit comment.",
        color: "danger",
      });
    }
  };

  return (
    <div>
      {data.length === 0 && !loading && !error && (
        <p className="text-center text-gray-500 text-sm mt-4">
          No data yet. Be the first to comment!
        </p>
      )}
      <InfiniteScroll
        dataLength={data.length}
        endMessage={
          data.length > 0 && (
            <p className="text-center text-gray-500 text-sm py-2">
              All comments loaded.
            </p>
          )
        }
        hasMore={hasMore}
        loader={<LoadingIndicator />}
        next={fetchNextPage}
        scrollableTarget={`scrollableComments-${permalink}`}
      >
        <div
          className="max-h-96 overflow-y-auto custom-scrollbar"
          id={`scrollableComments-${permalink}`}
        >
          {data.map((comment, key) => (
            <div key={key}>
              <CommentItem
                comment={comment}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            </div>
          ))}
        </div>
      </InfiniteScroll>
      <Form
        ref={formRef}
        className="flex-1 text-sm bg-transparent border-none outline-none placeholder-gray-400"
        onReset={() => {}}
        onSubmit={handleComment}
      >
        <Input
          isRequired
          errorMessage="Please enter a valid comment"
          labelPlacement="outside"
          name="comment"
          placeholder="Add a comment..."
          type="text"
        />
        <Button type="submit" variant="bordered">
          Post
        </Button>
      </Form>
    </div>
  );
};
