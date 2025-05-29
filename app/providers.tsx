"use client";
import * as React from "react";
import { HeroUIProvider } from "@heroui/system";
import { useRouter } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastProvider } from "@heroui/react";
import { useAuth } from "@/contexts/useAuth";

export interface ProvidersProps {
  children: React.ReactNode;
}

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>["push"]>[1]
    >;
  }
}

export function Providers({ children }: ProvidersProps) {
  const router = useRouter();
  const queryClient = new QueryClient();
  return (
    <HeroUIProvider navigate={router.push}>
      <ToastProvider placement="top-center" />
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </HeroUIProvider>
  );
}
