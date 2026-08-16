import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yifan — a personal journal",
  description:
    "我叫冯一帆，出生于 2000 年。My name is Yifan. A quiet corner of the internet for small thoughts, drawings, and the person I was before I knew any of this.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#f7f5f0",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- app
            router root layout, so this loads once for the whole site. */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,200..600;1,6..72,200..500&family=Noto+Serif+SC:wght@200;300;400&family=Parisienne&display=swap"
        />
        <link
          rel="preload"
          as="image"
          href="/images/expressions/default-smile.png"
          fetchPriority="high"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
