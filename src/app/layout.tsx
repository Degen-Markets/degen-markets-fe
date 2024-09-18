import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import PageWrapper from "@/app/components/PageWrapper";
import React from "react";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import { Chakra_Petch } from "next/font/google";

const chakraPetch = Chakra_Petch({
  weight: ["400", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});
export const metadata: Metadata = {
  title: "Degen Markets",
  description: "Degen Markets Hub",
  icons: {
    icon: "/favicon/favicon.ico",
    shortcut: "/favicon/favicon-16x16.png",
    apple: "/favicon/apple-touch-icon.png",
  },
  manifest: `/favicon/site.webmanifest`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={chakraPetch.className}>
      <body className="text-sm sm:text-lg md:text-xl bg-contain bg-center bg-no-repeat min-h-screen ">
        <Providers>
          <div className="flex min-h-screen flex-col items-center justify-between">
            <Header />
            <PageWrapper>{children}</PageWrapper>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
