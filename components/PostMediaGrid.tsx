import React from "react";
import { Image } from "@heroui/react";
import { Images } from "lucide-react";

import { AspectRatioType } from "@/types/posts";
import { aspectRatioOptions } from "@/constants/aspectRatio";

interface PostMediaProps {
  id: string;
  mediaUrls?: string[];
  imageAspectRatios: Map<string, Map<number, AspectRatioType>>;
}

export const PostMediaGrid: React.FC<PostMediaProps> = ({
  id,
  mediaUrls,
  imageAspectRatios,
}) => {
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

  if (mediaUrls) {
    return (
      <div className="relative w-full" style={getContainerStyle(id, 1)}>
        <div className="absolute top-2 right-2 z-50">
          {Array.isArray(mediaUrls) && mediaUrls.length > 1 && (
            <Images className="text-white drop-shadow" />
          )}
        </div>

        <Image
          alt="image"
          className="w-full h-full object-cover rounded-lg"
          radius="none"
          src={mediaUrls[0] || "/placeholder.svg"}
          style={getImageStyle(id, 1)}
        />

        {Array.isArray(mediaUrls) && mediaUrls.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-50">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full backdrop-blur-md bg-black/30">
              {mediaUrls.map((_, idx) => (
                <div
                  key={idx}
                  className="w-2.5 h-2.5 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor:
                      idx === 0 ? "#fff" : "rgba(255,255,255,0.5)",
                    width: idx === 0 ? "16px" : "10px",
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
};
