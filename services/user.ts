import api from "@/config/interceptor";
import { handleError } from "@/utils/error";

export const UserService = {
    getUser: () =>
        api.get(`/user`).catch(handleError),

    login: (values: any) =>
        api.post(`/auth/login`, values).catch(handleError),
    register: (values: any) =>
        api.post(`/auth/register`, values).catch(handleError),
};
