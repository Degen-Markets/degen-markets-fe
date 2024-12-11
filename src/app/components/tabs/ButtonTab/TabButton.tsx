"use client";
import React from "react";
import { TabButtonProps } from "./TabButtonType";
import { getTabButtonStyles } from "../constant";

export function TabButton({ id, label, isActive, onClick }: TabButtonProps) {
  const { buttonStyles, labelStyles } = getTabButtonStyles(isActive);

  return (
    <div key={id} onClick={onClick} className={buttonStyles}>
      <span className={labelStyles}>{label}</span>
    </div>
  );
}
