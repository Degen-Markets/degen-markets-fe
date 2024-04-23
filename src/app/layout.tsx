import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers";

const font = localFont({ src: "/fonts/Jersey10-regular.ttf" });

export const metadata: Metadata = {
  title: "Degen Markets",
  description: "Degen Markets Hub",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${font.className} text-2xl bg-cover bg-center bg-no-repeat min-h-screen`}
        style={{ backgroundImage: "url('/bet-bg.svg')" }}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
