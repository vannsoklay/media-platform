import { useQuery } from "@tanstack/react-query";

import { UserService } from "@/services/user";

type GetUserParams = { username: string; current_user_id: string | null };

export const useUser = () => {
  const GET_USER = () => {
    return useQuery({
      queryKey: ["user"],
      queryFn: async () => {
        const response = await UserService.getUser();

        return response.data;
      },
      enabled: true,
      staleTime: 1000 * 60 * 5,
    });
  };

  const GET_USER_BY_DETAIL = (params: GetUserParams) => {
    const { username, current_user_id } = params;

    return useQuery({
      queryKey: ["user", username, current_user_id],
      queryFn: async () => {
        const response = await UserService.getUserByDetail(
          username,
          current_user_id,
        );

        return response.data;
      },
      enabled: current_user_id ? !!username && !!current_user_id : !!username,
      staleTime: 1000 * 60 * 5,
    });
  };

  return {
    GET_USER,
    GET_USER_BY_DETAIL,
  };
};
