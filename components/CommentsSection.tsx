import React from "react";
import { Avatar } from "@heroui/react";
import { Heart, Smile } from "lucide-react";

interface CommentsSectionProps {
  isVisible: boolean;
  onToggleVisibility: () => void;
}

export const CommentsSection: React.FC<CommentsSectionProps> = ({
  isVisible,
  onToggleVisibility,
}) => {
  return (
    <>
      {/* View Comments */}
      <button
        className="text-sm text-gray-500 mb-2 hover:text-gray-700"
        onClick={onToggleVisibility}
      >
        View all comments
      </button>

      {/* Comments Section */}
      {isVisible && (
        <div className="space-y-2 mb-3">
          <div className="flex items-start gap-2">
            <Avatar size="sm" className="w-6 h-6" />
            <div className="flex-1">
              <span className="font-semibold text-sm mr-2">johndoe</span>
              <span className="text-sm">Great post! 🔥</span>
            </div>
            <Heart size={12} className="text-gray-400 mt-1" />
          </div>
          <div className="flex items-start gap-2">
            <Avatar size="sm" className="w-6 h-6" />
            <div className="flex-1">
              <span className="font-semibold text-sm mr-2">jane_smith</span>
              <span className="text-sm">Love this! ❤️</span>
            </div>
            <Heart size={12} className="text-gray-400 mt-1" />
          </div>
        </div>
      )}

      {/* Add Comment */}
      <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
        <Smile size={20} className="text-gray-400" />
        <input
          type="text"
          placeholder="Add a comment..."
          className="flex-1 text-sm bg-transparent border-none outline-none placeholder-gray-400"
        />
        <button className="text-sm font-semibold text-blue-500">Post</button>
      </div>
    </>
  );
};