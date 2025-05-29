import { ApihandleError } from "@/utils/error";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const backend_upload_url = process.env.NEXT_PUBLIC_BACKEND_UPLOAD_URL || "http://localhost:9000";

export async function GET(request: Request) {
    const { skip, limit } = Object.fromEntries(new URL(request.url).searchParams);
    const response = await axios.get(backend_upload_url + "/posts", {
        params: {
            skip: skip,
            limit: limit
        },
        headers: {
            'X-User-ID': "675871badb5d7bdf5a8ba050",
            'X-User-Role': "user"
        }
    });

    return new Response(JSON.stringify(response.data), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}

export async function POST(request: NextRequest) {
    const formData = await request.formData();
    const file = formData.get("image") as File | null;

    if (!file) {
        return NextResponse.json({ error: "No image uploaded" }, { status: 400 });
    }

    try {
        const { data } = await axios.post(backend_upload_url + "/storage/local/upload", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return NextResponse.json({
            message: "File uploaded successfully",
            fileUrl: data.file_url,
        }, {
            status: 200
        });
    }
    catch (error) {
        return ApihandleError(error)
    }
}