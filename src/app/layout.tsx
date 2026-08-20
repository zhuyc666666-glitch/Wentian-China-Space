import type { Metadata } from "next";
import { GlobalNavigation } from "@/components/layout/GlobalNavigation";
import "./globals.css";

export const metadata: Metadata = {
  title: "问天 WENTIAN",
  description: "中国航天沉浸式数字探索平台",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>
        <GlobalNavigation />
        {children}
      </body>
    </html>
  );
}
