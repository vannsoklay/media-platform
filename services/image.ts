import api from "@/config/interceptor";
import { handleError } from "@/utils/error";

export const ImageService = {
    create: (values: FormData) =>
        api.post(`/storages`, values).catch(handleError),
};
