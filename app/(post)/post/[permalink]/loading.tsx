export default function Loading() {
    return (
        <section className="flex flex-col items-center justify-center gap-4 w-full h-screen">
            <div className="w-full max-w-2xl space-y-4">
                {/* Placeholder for DetailProvider content */}
                <div className="bg-gray-100 p-6 rounded-lg animate-pulse h-48 w-full">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
            </div>
            <div className="w-full max-w-2xl space-y-4">
                {/* Placeholder for CommentList content */}
                <div className="bg-gray-100 p-6 rounded-lg animate-pulse h-32 w-full">
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
            </div>
            <p className="mt-8 text-lg text-gray-600">Loading post details...</p>
        </section>
    );
}