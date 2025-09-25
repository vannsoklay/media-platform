import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

import { ApihandleError } from "@/utils/error";

const backend_url = process.env.NEXT_PUBLIC_GETAWAY_API_V1;

export async function POST(request: NextRequest) {
  const body = await request.json();

  try {
    const { data } = await axios.post(`${backend_url}/auth/register`, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json(
      {
        message: data.message,
        access_token: data.access_token,
        user: data.user,
      },
      {
        status: 200,
      },
    );
  } catch (error: any) {
    return ApihandleError(error);
  }
}
