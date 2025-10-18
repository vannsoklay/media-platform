import { api, apiBE } from "@/config/interceptor";
import { handleError } from "@/utils/error";

export const PostService = {
  getAll: async (
    offset: number,
    limit: number,
    username?: string,
    current_user_id?: string | null,
  ) => {
    const params: Record<string, any> = { offset, limit, current_user_id };

    if (username) params.username = username;
    // params.current_user_id = current_user_id;

    return api.get("/posts", { params }).catch(handleError);
  },
  getById: (id: string) =>
    api
      .get(`/posts`, {
        params: {
          id,
        },
      })
      .catch(handleError),

  getByPermalink: async (permalink: string) =>
    apiBE.get(`/posts/post-by-permalink/${permalink}`).catch(handleError),

  create: (values: any) =>
    apiBE
      .post(`/posts`, values, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .catch(handleError),

  update: (id: string, data: any) =>
    api
      .put(`/posts/${id}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .catch(handleError),

  delete: (id: string) =>
    api
      .delete(`/posts/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .catch(handleError),
};
