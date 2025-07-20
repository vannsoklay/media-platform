import { apiBE } from "@/config/interceptor";
import { CommentPayload } from "@/types/comment";
import { handleError } from "@/utils/error";

export const CommentService = {
  getComments: async ({
    limit,
    page,
    permalink,
  }: {
    limit: number;
    page: number;
    permalink: string | null;
  }) => {
    const params: Record<string, any> = { page, limit };

    return apiBE
      .get(
        `${process.env.NEXT_PUBLIC_GETAWAY_API_V1}/comments/get-post-comments/${permalink}`,
        {
          params,
        }
      )
      .catch(handleError);
  },

  create: async ({ payload }: { payload: CommentPayload }) => {
    return apiBE
      .post(
        `${process.env.NEXT_PUBLIC_GETAWAY_API_V1}/comments`,
        JSON.stringify(payload),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .catch(handleError);
  },

  update: async (comment_id: string, data: any) => {
    return apiBE
      .put(
        `${process.env.NEXT_PUBLIC_GETAWAY_API_V1}/comments/${comment_id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .catch(handleError);
  },

  delete: async (comment_id: string) => {
    return apiBE
      .delete(
        `${process.env.NEXT_PUBLIC_GETAWAY_API_V1}/comments/${comment_id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .catch(handleError);
  },
};
