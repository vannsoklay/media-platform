import { ApihandleError } from "@/utils/error";
import axios from "axios";

const backend_url = "http://localhost:8443";

export async function GET(request: Request) {
    try {
        const authHeader = request.headers.get("Authorization");

        const response = await axios.get(`${backend_url}/api/v1/user`, {
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