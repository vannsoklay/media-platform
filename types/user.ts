export type UserType = {
    avatar: string | null;
    bio: string | null;
    created_at: string; // ISO 8601 datetime string
    email: string;
    follower_count: number;
    following_count: number;
    id: string;
    is_verified: boolean;
    last_login: string | null;
    status: 'active' | 'inactive' | 'banned'; // assuming possible statuses
    updated_at: string; // ISO 8601 datetime string
    username: string;
}

export interface AuthorInfo {
    id: string;
    avatar: string | null;
    username: string;
    created_at: string; // ISO 8601 datetime string
    follower_count: number;
    following_count: number;
    is_verified: boolean;
}
