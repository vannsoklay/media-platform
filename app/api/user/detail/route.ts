import axios from "axios";

import { ApihandleError } from "@/utils/error";

const backend_url = process.env.NEXT_PUBLIC_GETAWAY_API_V1;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username");
    const current_user_id = searchParams.get("current_user_id") ?? null;

    const endpoint = `/user/detail`;

    const response = await axios.get(`${backend_url}${endpoint}`, {
      params: {
        username,
        current_user_id,
      },
    });

    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return ApihandleError(error);
  }
}
