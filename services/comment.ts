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
            .get(`${process.env.NEXT_PUBLIC_GETAWAY_API_V1}/comments/${permalink}`, {
                params,
            })
            .catch(handleError);
    },

    createComment: async ({ payload }: { payload: CommentPayload }) => {
        apiBE
            .post(`${process.env.NEXT_PUBLIC_GETAWAY_API_V1}/comments`, JSON.stringify(payload), {
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .catch(handleError);
    },
};
