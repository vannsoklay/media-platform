import React from "react";
import { Button, Image } from "@heroui/react";
import { RatioIcon as AspectRatio } from "lucide-react";

import { AspectRatioType, Post } from "@/types/posts";
import { aspectRatioOptions } from "@/constants/aspectRatio";

interface AspectRatioSelectorProps {
  post: Post;
  imageAspectRatios: Map<string, Map<number, AspectRatioType>>;
  onAspectRatioChange: (
    postId: string,
    imageIndex: number,
    aspectRatio: AspectRatioType,
  ) => void;
  onClose: () => void;
}

export const AspectRatioSelector: React.FC<AspectRatioSelectorProps> = ({
  post,
  imageAspectRatios,
  onAspectRatioChange,
  onClose,
}) => {
  const postRatios = imageAspectRatios.get(post.id);

  const applyToAllImages = () => {
    const firstImageRatio = postRatios?.get(0) || "original";

    if (Array.isArray(post?.media_urls)) {
      post.media_urls.forEach((_: any, index: number) => {
        onAspectRatioChange(post.id, index, firstImageRatio);
      });
    }
  };

  return (
    <div className="pb-2">
      <div className="bg-gray-50 rounded-lg p-3">
        <div className="flex items-center gap-2 mb-3">
          <AspectRatio className="text-gray-600" size={16} />
          <span className="text-sm font-medium text-gray-700">
            Choose aspect ratio
          </span>
        </div>

        {/* Single Image Controls */}
        {post.media_urls && (
          <div className="space-y-3">
            <div className="text-xs text-gray-600 font-medium">
              Image Aspect Ratio
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {aspectRatioOptions.map((option) => {
                const isSelected =
                  postRatios?.get(0) === option.key ||
                  (!postRatios?.has(0) && option.key === "original");

                return (
                  <Button
                    key={option.key}
                    className="justify-start h-auto p-2"
                    size="sm"
                    startContent={<option.icon />}
                    variant={isSelected ? "solid" : "flat"}
                    onPress={() => onAspectRatioChange(post.id, 0, option.key)}
                  >
                    <span className="text-xs">{option.label}</span>
                  </Button>
                );
              })}
            </div>
          </div>
        )}

        {/* Multiple Images Controls */}
        {Array.isArray(post?.media_urls) && post.media_urls.length > 0 && (
          <div className="space-y-4">
            {post.media_urls.map((mediaUrl: string, index: number) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 rounded overflow-hidden bg-gray-200">
                    <Image
                      alt={`Image ${index + 1}`}
                      className="w-full h-full object-cover"
                      radius="none"
                      src={mediaUrl || "/placeholder.svg"}
                    />
                  </div>
                  <div className="text-xs text-gray-600 font-medium">
                    Image {index + 1}
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1">
                  {aspectRatioOptions.map((option) => {
                    const isSelected =
                      postRatios?.get(index) === option.key ||
                      (!postRatios?.has(index) && option.key === "original");

                    return (
                      <Button
                        key={`${index}-${option.key}`}
                        className="justify-start h-auto p-1.5 text-xs"
                        size="sm"
                        startContent={<option.icon size={12} />}
                        variant={isSelected ? "solid" : "flat"}
                        onPress={() =>
                          onAspectRatioChange(post.id, index, option.key)
                        }
                      >
                        <span className="text-xs">
                          {option.key === "original"
                            ? "Orig"
                            : option.label.split(" ")[0]}
                        </span>
                      </Button>
                    );
                  })}
                </div>
              </div>
            ))}
            <div className="pt-2 border-t border-gray-200">
              <Button
                className="w-full"
                size="sm"
                variant="flat"
                onPress={applyToAllImages}
              >
                Apply to All Images
              </Button>
            </div>
          </div>
        )}

        <div className="pt-3 border-t border-gray-200 mt-3">
          <Button className="w-full" size="sm" variant="flat" onPress={onClose}>
            Done
          </Button>
        </div>
      </div>
    </div>
  );
};
