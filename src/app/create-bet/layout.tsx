import Navbar from "@/app/components/Navbar";
import React, { ReactNode } from "react";
import PageWrapper from "@/app/components/PageWrapper";
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <PageWrapper>{children}</PageWrapper>
    </>
  );
}
