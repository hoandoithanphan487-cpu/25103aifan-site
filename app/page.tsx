import type { Metadata } from "next";
import { App } from "./components/App";

export const metadata: Metadata = {
  title: "Yifan — a personal journal",
  description:
    "My name is Yifan. I was born in 2000. A quiet corner of the internet for small thoughts, drawings, and the person I was before I knew any of this.",
};

export default function Home() {
  return <App />;
}
