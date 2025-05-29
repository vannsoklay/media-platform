import { ApihandleError } from "@/utils/error";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const backend_url = "http://localhost:8443";

export async function POST(request: NextRequest) {
    const body = await request.json();

    try {
        const { data } = await axios.post(`${backend_url}/api/v1/auth/register`, body, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return NextResponse.json({
            message: data.message,
            access_token: data.access_token,
            user: data.user
        }, {
            status: 200
        });
    }
    catch (error: any) {
        return ApihandleError(error)
    }
}
