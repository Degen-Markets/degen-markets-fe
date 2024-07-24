"use client";
import { FC, ReactNode } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { uuidRegex } from "../lib/utils/bets/constants";

interface RenderBGImageProps {
  children: ReactNode;
}

const RenderBGImage: FC<RenderBGImageProps> = ({ children }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const betType = searchParams.get("betType");
  let backgroundImage = "";

  // Function to check if the pathname matches the dynamic [id] route pattern
  const isBetsSuccessRoute = () => {
    const parts = pathname.split("/");
    return (
      parts.length === 4 &&
      parts[1] === "bets" &&
      uuidRegex.test(parts[2]) &&
      parts[3] === "success"
    );
  };

  if (
    pathname === "/create-bet" ||
    betType === "binary" ||
    pathname === "/create-bet/success" ||
    isBetsSuccessRoute()
  ) {
    backgroundImage = "url(/games/bull_or_bear.webp)";
  } else if (pathname === "/games/price-is-right/create-bet") {
    backgroundImage = "url(/games/price_is_right.webp)";
  }

  return (
    <div className="relative">
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-no-repeat opacity-30 -z-10"
          style={{ backgroundImage }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default RenderBGImage;
