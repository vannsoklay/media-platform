// Error Handler
export const handleError = (error: any) => {
    console.log("error", error);
    throw error.response?.data || error.message || error.response?.data?.message || "Something went wrong. Please try again later.";
};

// Simplified API Error Handler
export const ApihandleError = (error: any): Response => {
    const status = error?.response?.status || 500;
    const message =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong. Please try again later.";

    console.error("API Error:", { status, message });

    return new Response(
        JSON.stringify({
            success: false,
            status,
            message,
        }),
        {
            status,
            headers: { "Content-Type": "application/json" },
        }
    );
};
