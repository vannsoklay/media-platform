import { AuthorInfo } from "./user";
import { LucideIcon } from "lucide-react";

export type PostType = "SocialMedia" | "Blog";
export type AspectRatioType = "original" | "square" | "portrait" | "landscape" | "story";

export interface Post {
    id: string;
    title: string;
    permalink: string;
    content: string;
    author: AuthorInfo;
    media_urls?: string[];
    tags: string[];
    total_votes: number | 0;
    voted_by_user: boolean;
    post_type: PostType;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}

export interface PostPayload {
    title: string,
    content: string,
    media_urls: string[],
    tags: string[],
    post_type: "SocialMedia",
  };


export interface AspectRatioOption {
    key: AspectRatioType;
    label: string;
    icon: LucideIcon;
    ratio: string;
    objectFit: "contain" | "cover";
}