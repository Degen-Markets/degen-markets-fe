"use client";
import React from "react";
import { TabContentProps } from "./TabContentType";

export function TabContent({ content }: TabContentProps) {
  return <div className="w-full">{content}</div>;
}
