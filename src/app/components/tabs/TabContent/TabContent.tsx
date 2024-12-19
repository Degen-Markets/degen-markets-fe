import React from "react";

interface TabContentProps {
  content: React.ReactNode;
}

export function TabContent({ content }: TabContentProps) {
  return <div className="w-full">{content}</div>;
}
