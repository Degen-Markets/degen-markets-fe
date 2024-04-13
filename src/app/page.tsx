"use client";
import dynamic from "next/dynamic";

const GameCanvasWithNoSSR = dynamic(() => import("./components/GameCanvas"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <GameCanvasWithNoSSR />
    </main>
  );
}
