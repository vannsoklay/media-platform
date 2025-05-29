import "@/styles/globals.css";
import { Metadata } from "next";

import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export default function AuthorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
