"use client";
import Link from "next/link";
import { Button } from "./Button";
import { IconButtonProps } from "./type";

const IconButton = ({
  intent,
  className,
  size = "regular",
  label,
  icon,
  href,
  hideLabelOnMobile = false,
  ...props
}: IconButtonProps) => {
  const buttonContent = (
    <Button intent={intent} size={size} icon={icon} {...props}>
      {!hideLabelOnMobile ? (
        label
      ) : (
        <span className="hidden md:inline">{label}</span>
      )}
    </Button>
  );

  return href ? <Link href={href}>{buttonContent}</Link> : buttonContent;
};

export default IconButton;
