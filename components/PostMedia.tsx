import React from "react";
import { Image } from "@heroui/react";
import { AspectRatioType, Post } from "@/types/posts";
import { aspectRatioOptions } from "@/constants/aspectRatio";

interface PostMediaProps {
  post: Post;
  imageAspectRatios: Map<string, Map<number, AspectRatioType>>;
}

export const PostMedia: React.FC<PostMediaProps> = ({ post, imageAspectRatios }) => {
  const getImageStyle = (postId: string, imageIndex = 0) => {
    const postRatios = imageAspectRatios.get(postId);
    const selectedRatio = postRatios?.get(imageIndex) || "square";
    const option = aspectRatioOptions.find((opt) => opt.key === selectedRatio);

    if (!option) return {};

    if (selectedRatio === "original") {
      return {
        objectFit: "contain" as const,
        objectPosition: "center",
        maxHeight: "500px",
        width: "100%",
        height: "auto",
      };
    }

    return {
      objectFit: option.objectFit,
      objectPosition: "center",
      aspectRatio: option.ratio,
      width: "100%",
      height: "100%",
    };
  };

  const getContainerStyle = (postId: string, imageIndex = 0) => {
    const postRatios = imageAspectRatios.get(postId);
    const selectedRatio = postRatios?.get(imageIndex) || "square";
    const option = aspectRatioOptions.find((opt) => opt.key === selectedRatio);

    if (!option || selectedRatio === "original") {
      return {
        maxHeight: "500px",
        overflow: "hidden" as const,
        backgroundColor: "#f3f4f6",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      };
    }

    return {
      aspectRatio: option.ratio,
      overflow: "hidden" as const,
      backgroundColor: "#f3f4f6",
    };
  };

  if (Array.isArray(post?.media_urls) && post.media_urls.length > 0) {
    return (
      <div className="relative">
        {post.media_urls.length === 1 ? (
          <div
            className="relative w-full"
            style={getContainerStyle(post.id, 0)}
          >
            <Image
              alt="media"
              className="w-full h-full"
              src={post.media_urls[0] || "/placeholder.svg"}
              radius="none"
              style={getImageStyle(post.id, 0)}
            />
          </div>
        ) : post.media_urls.length === 2 ? (
          <div className="grid grid-cols-2 gap-0.5">
            {post.media_urls.map((media: string, index: number) => (
              <div
                key={index}
                className="relative w-full"
                style={getContainerStyle(post.id, index)}
              >
                <Image
                  alt="media"
                  className="w-full h-full"
                  src={media || "/placeholder.svg"}
                  radius="none"
                  style={getImageStyle(post.id, index)}
                />
              </div>
            ))}
          </div>
        ) : post.media_urls.length === 3 ? (
          <div className="grid grid-cols-2 gap-0.5">
            <div
              className="relative"
              style={getContainerStyle(post.id, 0)}
            >
              <Image
                alt="media"
                className="w-full h-full"
                src={post.media_urls[0] || "/placeholder.svg"}
                radius="none"
                style={getImageStyle(post.id, 0)}
              />
            </div>
            <div className="grid grid-rows-2 gap-0.5">
              {post.media_urls.slice(1, 3).map((media: string, index: number) => (
                <div
                  key={index}
                  className="relative"
                  style={getContainerStyle(post.id, index + 1)}
                >
                  <Image
                    alt="media"
                    className="w-full h-full"
                    src={media || "/placeholder.svg"}
                    radius="none"
                    style={getImageStyle(post.id, index + 1)}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-0.5">
            <div
              className="relative"
              style={getContainerStyle(post.id, 0)}
            >
              <Image
                alt="media"
                className="w-full h-full"
                src={post.media_urls[0] || "/placeholder.svg"}
                radius="none"
                style={getImageStyle(post.id, 0)}
              />
            </div>
            <div className="grid grid-rows-2 gap-0.5">
              <div
                className="relative"
                style={getContainerStyle(post.id, 1)}
              >
                <Image
                  alt="media"
                  className="w-full h-full"
                  src={post.media_urls[1] || "/placeholder.svg"}
                  radius="none"
                  style={getImageStyle(post.id, 1)}
                />
              </div>
              <div
                className="relative"
                style={getContainerStyle(post.id, 2)}
              >
                <Image
                  alt="media"
                  className="w-full h-full"
                  src={post.media_urls[2] || "/placeholder.svg"}
                  radius="none"
                  style={getImageStyle(post.id, 2)}
                />
                {post.media_urls.length > 4 && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="text-white font-semibold text-base sm:text-lg">
                      +{post.media_urls.length - 3}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Image indicators for multiple images */}
        {post.media_urls.length > 1 && (
          <div className="absolute bottom-2 sm:bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1">
            {post.media_urls.slice(0, 8).map((_: any, index: number) => (
              <div
                key={index}
                className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-white bg-opacity-60"
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  if (post?.media_urls) {
    return (
      <div
        className="relative w-full"
        style={getContainerStyle(post.id, 1)}
      >
        <Image
          alt="image"
          className="w-full h-full"
          src={post.media_urls[0] || "/placeholder.svg"}
          radius="none"
          style={getImageStyle(post.id, 1)}
        />
      </div>
    );
  }

  return null;
};