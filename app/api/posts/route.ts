import { ApihandleError } from "@/utils/error";
import axios from "axios";
import _ from "lodash";

const backend_url = process.env.NEXT_PUBLIC_GETAWAY_API_V1;

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);

        const skip = searchParams.get("skip") ?? "0";
        const limit = searchParams.get("limit") ?? "10";
        const username = searchParams.get("username") ?? null;
        const author = searchParams.get("author") ?? null;

        const token = request.headers.get("Authorization");

        const basePath =
            !_.isEmpty(username) && !_.isEmpty(author)
                ? `/posts?all`
                : !_.isEmpty(author)
                    ? `/posts?username=${author}`
                    : `/posts/all?username=${username}`;

        const url = `${backend_url}${basePath}`;

        const response = await axios.get(url, {
            params: {
                skip,
                limit,
            },
            headers: token ? { Authorization: token } : {},
        });

        return new Response(JSON.stringify(response.data), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        return ApihandleError(error);
    }
}
