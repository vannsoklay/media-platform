import api from "@/config/interceptor";
import { handleError } from "@/utils/error";

export const VoteService = {
    create_or_remove: (values: any) =>
        api.post(`/votes`, values).catch(handleError),
};
