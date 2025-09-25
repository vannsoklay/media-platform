import { apiBE } from "@/config/interceptor";
import { handleError } from "@/utils/error";

interface Params {
  follower_id?: string;
  following_id?: string;
  limit?: number;
  skip?: number;
}

export const FollowToggleService = {
  createOrRemove: (values: any) =>
    apiBE.post("/follow/toggle", values).catch(handleError),
};

export const FollowStatus = {
  followByUser: async (params: Params) => {
    try {
      return await apiBE.get("/follow/status", { params });
    } catch (error) {
      return handleError(error);
    }
  },
};

export const Follower = {
  follower: async (params: Params) => {
    try {
      return await apiBE.get("/follow/followers", { params });
    } catch (error) {
      return handleError(error);
    }
  },
};

export const Following = {
  following: async (params: Params) => {
    try {
      return await apiBE.get("/follow/following", { params });
    } catch (error) {
      return handleError(error);
    }
  },
};
