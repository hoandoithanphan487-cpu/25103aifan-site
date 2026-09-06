import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.25103aifan.com"),
  title: "冯一帆｜AI 产品、游戏与交互体验",
  description:
    "冯一帆的个人网站，记录 REJOIN 陶片智能拼合、RELIC 3D、Moonshadow Tarot、溪谷新芽等 AI 产品与数字交互项目，以及公众号“AI星球的随笔”中的产品观察与实践。",
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "/",
    siteName: "Yifan — Selected Works",
    title: "冯一帆｜AI 产品、游戏与交互体验",
    description:
      "REJOIN 陶片智能拼合、RELIC 3D、Moonshadow Tarot 与溪谷新芽：AI 产品、数字文化遗产和交互体验作品集。",
    images: [
      {
        url: "/og.png",
        width: 1734,
        height: 907,
        alt: "Yifan Selected Works：陶片拼合、数字文化遗产、塔罗与农场游戏作品集",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "冯一帆｜AI 产品、游戏与交互体验",
    description:
      "REJOIN 陶片智能拼合、RELIC 3D、Moonshadow Tarot 与溪谷新芽。",
    images: ["/og.png"],
  },
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
          href={`${import.meta.env.BASE_URL}images/expressions/default-smile.png`}
          fetchPriority="high"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
