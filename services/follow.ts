import { apiBE } from "@/config/interceptor";
import { handleError } from "@/utils/error";

interface Params {
  follower_id: string;
  following_id: string;
}

export const FollowToggleService = {
  createOrRemove: (values: any) =>
    apiBE.post("/follow/toggle", values).catch(handleError),
};

export const FollowStatus = {
  followByUser: (params: Params) => {
    return apiBE.get("/follow/status", { params }).catch(handleError);
  },
};
