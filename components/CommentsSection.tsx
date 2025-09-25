import React from "react";

interface CommentsSectionProps {
  totalComments: number;
  onToggleVisibility: () => void;
}

export const CommentsSection: React.FC<CommentsSectionProps> = ({
  totalComments,
  onToggleVisibility,
}) => {
  return (
    <>
      {/* View Comments */}
      <button
        className="text-sm text-gray-500 mb-2 hover:text-gray-700"
        onClick={onToggleVisibility}
      >
        {totalComments} View all comments
      </button>
    </>
  );
};
