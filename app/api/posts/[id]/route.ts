import { ApihandleError } from "@/utils/error";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const backend_url = process.env.NEXT_PUBLIC_GETAWAY_API_V1;

export async function GET(request: NextRequest, context: { params: { id: string } }) {
    const { id } = await context.params;
    const token = request.headers.get("Authorization");

    try {
        const response = await axios.get(`${backend_url}/posts/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
        });

        return NextResponse.json({
            message: "Successfully",
            data: response.data,
        }, {
            status: 200
        });
    }
    catch (error) {
        return ApihandleError(error)
    }
}

export async function PUT(request: NextRequest, context: { params: { id: string } }) {
    const { id } = await context.params;
    const token = request.headers.get("Authorization");

    try {
        const body = await request.json()
        const response = await axios.put(`${backend_url}/posts/${id}`, body, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
        });

        return NextResponse.json({
            message: "Post deleted successfully",
            data: response.data,
        }, {
            status: 200
        });
    }
    catch (error) {
        return ApihandleError(error)
    }
}

export async function DELETE(request: NextRequest, context: { params: { id: string } }) {
    const { id } = await context.params;
    const token = request.headers.get("Authorization");

    try {
        const response = await axios.delete(`${backend_url}/posts/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
        });

        return NextResponse.json({
            message: "Post deleted successfully",
            fileUrl: response.data.file_url,
        }, {
            status: 200
        });
    }
    catch (error) {
        return ApihandleError(error)
    }
}