"use client";
import dynamic from "next/dynamic";

const GameCanvasWithNoSSR = dynamic(() => import("./components/GameCanvas"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="">
      <GameCanvasWithNoSSR />
    </main>
  );
}
