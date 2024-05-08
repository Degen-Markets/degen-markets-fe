import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import PageWrapper from "@/app/components/PageWrapper";
import React from "react";
import Footer from "@/app/components/Footer";
import Menu from "@/app/components/Menu";

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
          <Menu />
          <PageWrapper>{children}</PageWrapper>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
