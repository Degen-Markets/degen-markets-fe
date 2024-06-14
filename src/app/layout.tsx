import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import PageWrapper from "@/app/components/PageWrapper";
import React from "react";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";

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
      <body className="text-sm sm:text-lg md:text-2xl bg-cover bg-center bg-no-repeat min-h-screen">
        <Providers>
          <div className="flex min-h-screen flex-col items-center justify-between lg:min-h-[1200px]">
            <Header />
            <PageWrapper>{children}</PageWrapper>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
