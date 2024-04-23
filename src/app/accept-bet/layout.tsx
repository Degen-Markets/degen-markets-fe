import Navbar from "@/app/components/Navbar";
import React, { ReactNode } from "react";
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}
