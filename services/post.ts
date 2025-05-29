import api from "@/config/interceptor";
import { handleError } from "@/utils/error";

export const PostService = {
    getAll: (offset: number, limit: number, username?: string, author?: string) => {
        const params: Record<string, any> = { offset, limit };
        if (username) params.username = username;
        if (author) params.author = author;

        return api.get("/posts", { params }).catch(handleError);
    },
    getById: (id: string) =>
        api.get(`/posts/${id}`).catch(handleError),

    create: (values: any) =>
        api.post(`/posts`, values, {
            headers: {
                "Content-Type": "application/json",
            },
        }).catch(handleError),

    update: (id: string, data: any) =>
        api.put(`/posts/${id}`, data, {
            headers: {
                "Content-Type": "application/json",
            },
        }).catch(handleError),

    delete: (id: string) =>
        api.delete(`/posts/${id}`, {
            headers: {
                "Content-Type": "application/json",
            },
        }).catch(handleError),
};
