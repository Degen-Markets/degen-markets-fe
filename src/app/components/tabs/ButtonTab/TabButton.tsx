"use client";
import React from "react";
import { getTabButtonStyles } from "../constant";

interface TabButtonProps {
  id: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export function TabButton({ id, label, isActive, onClick }: TabButtonProps) {
  const { buttonStyles, labelStyles } = getTabButtonStyles(isActive);

  return (
    <div key={id} onClick={onClick} className={buttonStyles}>
      <span className={labelStyles}>{label}</span>
    </div>
  );
}
