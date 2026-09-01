import type { Metadata } from "next";
import { App } from "./components/App";

export const metadata: Metadata = {
  title: "冯一帆｜AI 产品、游戏与交互体验",
  description:
    "冯一帆的个人网站，记录 Moonshadow Tarot、溪谷新芽等 AI 项目，以及公众号“AI星球的随笔”中的产品观察与实践。",
};

export default function Home() {
  return <App />;
}
