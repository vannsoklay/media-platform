import React from "react";
import { useComment } from "@/hooks/useComment";
import InfiniteScroll from "react-infinite-scroll-component";
import { CommentItem } from "./CommentItem";
import { addToast, Button, Form, Input } from "@heroui/react";
import { CommentPayload } from "@/types/comment";

interface CommentListProps {
  permalink: string;
}

export const CommentList: React.FC<CommentListProps> = ({ permalink }) => {
  const { data, loading, error, hasMore, fetchNextPage, createComment } =
    useComment({
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

      await createComment({ payload });
      
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

  return (
    <div>
      {data.length === 0 && !loading && !error && (
        <p className="text-center text-gray-500 text-sm mt-4">
          No data yet. Be the first to comment!
        </p>
      )}
      <InfiniteScroll
        dataLength={data.length}
        next={fetchNextPage}
        hasMore={hasMore}
        loader={<LoadingIndicator />}
        endMessage={
          data.length > 0 && (
            <p className="text-center text-gray-500 text-sm py-2">
              All comments loaded.
            </p>
          )
        }
        scrollableTarget={`scrollableComments-${permalink}`}
      >
        <div
          id={`scrollableComments-${permalink}`}
          className="max-h-96 overflow-y-auto custom-scrollbar"
        >
          {data.map((comment, key) => (
            <div key={key}>
              <CommentItem comment={comment} />
            </div>
          ))}
        </div>
      </InfiniteScroll>
      <Form
        className="flex-1 text-sm bg-transparent border-none outline-none placeholder-gray-400"
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
