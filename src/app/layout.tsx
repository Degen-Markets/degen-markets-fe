import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

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
      <Providers>
        <body className={inter.className}>{children}</body>
      </Providers>
    </html>
  );
}
