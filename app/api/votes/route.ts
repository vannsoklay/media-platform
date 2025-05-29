import { ApihandleError } from "@/utils/error";
import axios from "axios";
import { NextRequest } from "next/server";

const backend_url = "http://localhost:8443";

export async function POST(request: NextRequest) {
    const body = await request.json();
    try {
        const authHeader = request.headers.get("Authorization");

        const response = await axios.post(`${backend_url}/api/v1/votes`, body, {
            headers: authHeader ? { Authorization: authHeader } : {},
        });

        return new Response(JSON.stringify(response.data), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        return ApihandleError(error)
    }
}