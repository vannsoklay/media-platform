"use client";

import type React from "react";

import { useState, useRef, useEffect, ChangeEvent, FormEvent } from "react";
import { X, Upload, ImageIcon } from "lucide-react";
import {
  Button,
  Chip,
  Form,
  Input,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  addToast,
} from "@heroui/react";
import _ from "lodash";

import { usePost } from "@/hooks/usePost";
import { Post, PostPayload } from "@/types/posts";
import { useAuth } from "@/contexts/useAuth";
import { ImageService } from "@/services/image";

interface Props {
  username?: string;
  isEdit: string | null;
  setIsEdit: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function PostForm({ username, isEdit, setIsEdit }: Props) {
  const { isPostModalOpen, setIsPostModalOpen } = useAuth();
  const { createPost, editPost, getPostById } = usePost({
    username,
    isAuth: true,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  const { data: post } = getPostById(isEdit || "");
  const dataEdit = post?.data ?? {};

  const isEditing = _.isBoolean(isEdit && isEdit === dataEdit._id);

  useEffect(() => {
    if (post) {
      setTitle(dataEdit.title || "");
      setImagePreviewUrls(dataEdit.media_urls || []);
      setTags(dataEdit.tags || []);
    }
  }, [post]);

  const generateTags = (title: string): string[] => {
    return Array.from(
      new Set(
        title
          .toLowerCase()
          .split(/\s+/)
          .filter(
            (word) =>
              word.length > 3 &&
              !["this", "that", "with", "from", "your"].includes(word)
          )
          .slice(0, 5)
      )
    );
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;

    setTitle(newTitle);
    if (newTitle.length > 3) setTags(generateTags(newTitle));
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files) return;

    const newFiles: File[] = [];
    const newPreviews: string[] = [];

    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) {
        newFiles.push(file);
        newPreviews.push(URL.createObjectURL(file));
      }
    });

    setSelectedImages((prev) => [...prev, ...newFiles]);
    setImagePreviewUrls((prev) => [...prev, ...newPreviews]);
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(imagePreviewUrls[index]);
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const removeTag = (index: number) => {
    setTags((prev) => prev.filter((_, i) => i !== index));
  };

  const uploadImages = async (): Promise<string[]> => {
    const uploadedUrls: string[] = [];
    const failedImages: string[] = [];

    await Promise.all(
      selectedImages.map(async (image) => {
        try {
          const formData = new FormData();
          formData.append("image", image);

          const { data } = await ImageService.create(formData);

          if (!data?.fileUrl) {
            throw new Error(`No URL returned for "${image.name}"`);
          }

          uploadedUrls.push(data.fileUrl);
        } catch (err) {
          failedImages.push(image.name);
        }
      })
    );

    if (failedImages.length > 0) {
      throw new Error(`Failed to upload: ${failedImages.join(", ")}`);
    }

    return uploadedUrls;
  };

  const resetForm = () => {
    setTitle("");
    setTags([]);
    imagePreviewUrls.forEach((url) => URL.revokeObjectURL(url));
    setSelectedImages([]);
    setImagePreviewUrls([]);
  };

  const clearEditData = () => {
    setTitle("");
    setTags([]);
    setImagePreviewUrls([]);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      let media_urls: string[];

      if (_.isEmpty(selectedImages)) {
        media_urls = imagePreviewUrls || [];
      } else {
        media_urls = await uploadImages();
      }

      const payload: PostPayload = {
        title,
        content: title || "No content provided",
        media_urls,
        tags,
        post_type: "SocialMedia",
      };

      if (isEditing) {
        await editPost({ id: dataEdit._id, payload });
        setIsEdit(null);
      } else {
        await createPost({ payload });
      }

      setIsPostModalOpen(false);
      setIsOpen(false);
      resetForm();
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen || isEditing || isPostModalOpen}
      size="md"
      onOpenChange={() => {
        setIsOpen(false);
        setIsPostModalOpen(false);
        setIsEdit(null);
        clearEditData();
      }}
    >
      <ModalContent>
        {(onClose) => (
          <Form className="items-stretch" onSubmit={handleSubmit}>
            <ModalHeader className="flex flex-col gap-1">
              {isEditing ? "Edit Post" : "Create New Post"}
            </ModalHeader>
            <ModalBody>
              <Input
                fullWidth
                isRequired
                label="Title"
                name="title"
                placeholder="Enter post title"
                value={title}
                variant="bordered"
                onChange={handleTitleChange}
              />

              <div className="space-y-2 mt-6">
                <span className="text-sm font-medium">Upload Images</span>
                <div className="flex items-center gap-2">
                  <Button
                    fullWidth
                    startContent={<Upload size={16} />}
                    type="button"
                    variant="bordered"
                    onPress={() => fileInputRef.current?.click()}
                  >
                    Select Images
                  </Button>
                  <input
                    ref={fileInputRef}
                    multiple
                    accept="image/*"
                    className="hidden"
                    type="file"
                    onChange={handleImageUpload}
                  />
                </div>

                {imagePreviewUrls.length > 0 ? (
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {imagePreviewUrls.map((url, index) => (
                      <div key={index} className="relative group">
                        <Image
                          alt={`Preview ${index}`}
                          className="w-full h-32 object-cover rounded-md"
                          src={url}
                        />
                        <Button
                          isIconOnly
                          className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          color="danger"
                          size="sm"
                          type="button"
                          onPress={() => removeImage(index)}
                        >
                          <X size={12} />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="border border-dashed border-gray-300 rounded-md p-8 text-center">
                    <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">
                      No images selected
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-2 mt-6">
                <label className="text-sm font-medium">
                  Auto-generated Tags
                </label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {tags.length > 0 ? (
                    tags.map((tag, index) => (
                      <Chip
                        key={index}
                        color="secondary"
                        variant="flat"
                        onClose={() => removeTag(index)}
                      >
                        {tag}
                      </Chip>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">
                      Tags will be generated from your title
                    </p>
                  )}
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button
                color="primary"
                isDisabled={!title || imagePreviewUrls.length === 0 || loading}
                isLoading={loading}
                type="submit"
              >
                {isEditing ? "Update" : "Create"}
              </Button>
            </ModalFooter>
          </Form>
        )}
      </ModalContent>
    </Modal>
  );
}
