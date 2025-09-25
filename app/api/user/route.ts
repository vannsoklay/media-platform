import axios from "axios";

import { ApihandleError } from "@/utils/error";

const backend_url = process.env.NEXT_PUBLIC_GETAWAY_API_V1;

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("Authorization");

    const response = await axios.get(`${backend_url}/user`, {
      headers: authHeader ? { Authorization: authHeader } : {},
    });

    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return ApihandleError(error);
  }
}
