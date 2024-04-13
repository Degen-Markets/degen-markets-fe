import Image from "next/image";
import CanvasComponent from "./components/GameCanvas";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <CanvasComponent />
    </main>
  );
}
