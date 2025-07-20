import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
  Textarea,
} from "@heroui/react";
import { getRelativeTimeString } from "@/utils/date";
import { Comment } from "@/types/comment";
import { useAuth } from "@/contexts/useAuth";

interface CommentItemProps {
  comment: Comment;
  onDelete?: (commentId: string) => void;
  onEdit?: (commentId: string, newContent: string) => void;
}

export const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  onDelete,
  onEdit,
}) => {
  const { user } = useAuth();
  const timeAgo = getRelativeTimeString(new Date(comment.created_at));
  const [editValue, setEditValue] = useState(comment.content);

  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onOpenChange: onDeleteOpenChange,
    onClose: onDeleteClose,
  } = useDisclosure();
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onOpenChange: onEditOpenChange,
    onClose: onEditClose,
  } = useDisclosure();

  const handleDelete = () => {
    if (onDelete) onDelete(comment.id);
    onDeleteClose();
  };

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onEdit) onEdit(comment.id, editValue);
    onEditClose();
  };

  return (
    <div className="flex items-start space-x-3 p-3 border-b border-gray-100 last:border-b-0 group relative">
      <div className="flex-shrink-0">
        <Link href={`/profile/${comment.author.username}`}>
          {comment.author.avatar ? (
            <Image
              src={comment.author.avatar}
              alt={comment.author.username}
              width={32}
              height={32}
              className="rounded-full object-cover w-8 h-8"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-semibold text-gray-600">
              {comment.author.username.charAt(0).toUpperCase()}
            </div>
          )}
        </Link>
      </div>
      <div className="flex-grow">
        <div className="flex items-baseline space-x-1">
          <Link
            href={`/${comment.author.username}`}
            className="font-semibold text-sm text-gray-800 hover:underline"
          >
            {comment.author.username}
            {comment.author.is_verified && (
              <span className="ml-1 text-blue-500" title="Verified">
                ✓
              </span>
            )}
          </Link>
          <span className="text-gray-500 text-xs">· {timeAgo}</span>
        </div>
        <p className="text-gray-700 text-sm mt-1 break-words">
          {comment.content}
        </p>
      </div>
      {/* NextUI Popover for actions */}
      {user?.id === comment.author.id && (
        <div className="ml-auto flex items-center">
          <Popover placement="bottom-end">
            <PopoverTrigger>
              <Button
                isIconOnly
                size="sm"
                variant="light"
                className="opacity-0 group-hover:opacity-100 transition"
                aria-label="Comment actions"
              >
                ⋮
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-36">
              <Button
                fullWidth
                variant="light"
                className="justify-start rounded-none"
                onPress={onEditOpen}
              >
                Edit
              </Button>
              <Button
                fullWidth
                variant="light"
                color="danger"
                className="justify-start rounded-none"
                onPress={onDeleteOpen}
              >
                Delete
              </Button>
            </PopoverContent>
          </Popover>
        </div>
      )}
      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteOpen} onOpenChange={onDeleteOpenChange}>
        <ModalContent>
          <ModalHeader>Delete Comment</ModalHeader>
          <ModalBody>
            <div className="mb-2 text-sm text-gray-600">
              Are you sure you want to delete this comment?
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={onDeleteClose}>
              Cancel
            </Button>
            <Button color="danger" onPress={handleDelete}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* Edit Modal */}
      <Modal isOpen={isEditOpen} onOpenChange={onEditOpenChange}>
        <ModalContent>
          <ModalHeader>Edit Comment</ModalHeader>
          <form onSubmit={handleEdit}>
            <ModalBody>
              <Textarea
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                minRows={3}
                required
                className="w-full"
                autoFocus
              />
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={onEditClose}>
                Cancel
              </Button>
              <Button color="primary" type="submit">
                Save
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
};
