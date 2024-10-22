import { ReactNode } from "react";
import type { Metadata } from "next";
import { twMerge } from "tailwind-merge";
import PageWrapper from "@/app/components/PageWrapper";
import Footer from "@/app/components/Footer/Footer";
import Header from "@/app/components/Header";
import { Providers } from "@/app/providers";
import { GoogleAnalytics } from "@/app/components/GoogleAnalytics";
import { montserrat, openSans } from "@/app/config/fonts";

import "./globals.css";

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
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={twMerge(
        "scroll-smooth",
        montserrat.variable,
        openSans.variable,
      )}
    >
      <body className="bg-main text-white min-h-screen ">
        <Providers>
          <div className="flex min-h-screen flex-col items-center justify-between">
            <Header />
            <PageWrapper>{children}</PageWrapper>
            <Footer />
          </div>
        </Providers>
        <GoogleAnalytics />
      </body>
    </html>
  );
}
