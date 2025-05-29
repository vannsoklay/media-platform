import React from "react";
import { Skeleton } from "@heroui/react";

export const PostSkeleton: React.FC = () => {
  return (
    <div className="bg-white border-b border-gray-100">
      <div className="pb-3 mt-8">
        <div className="flex items-center gap-3 mb-3">
          <Skeleton isLoaded={false} className="rounded-full">
            <div className="h-8 w-8 rounded-full bg-secondary" />
          </Skeleton>
          <div className="flex-1">
            <Skeleton isLoaded={false} className="rounded mb-1">
              <div className="h-3 w-20 rounded bg-secondary" />
            </Skeleton>
            <Skeleton isLoaded={false} className="rounded">
              <div className="h-2 w-12 rounded bg-secondary-200" />
            </Skeleton>
          </div>
        </div>
      </div>
      <Skeleton isLoaded={false} className="rounded-none">
        <div className="h-80 w-full bg-secondary-300" />
      </Skeleton>
      <div className="pb-3">
        <Skeleton isLoaded={false} className="rounded mb-2">
          <div className="h-6 w-32 rounded bg-secondary" />
        </Skeleton>
        <Skeleton isLoaded={false} className="rounded mb-2">
          <div className="h-4 w-full rounded bg-secondary" />
        </Skeleton>
        <Skeleton isLoaded={false} className="rounded mb-8">
          <div className="h-4 w-full rounded bg-secondary" />
        </Skeleton>
      </div>
    </div>
  );
};
