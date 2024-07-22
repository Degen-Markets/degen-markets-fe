import { FC, ReactNode } from "react";
import { usePathname, useSearchParams } from "next/navigation";

interface RenderBGImageProps {
  children: ReactNode;
}

const RenderBGImage: FC<RenderBGImageProps> = ({ children }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const betType = searchParams.get("betType");
  let backgroundImage = "";

  if (pathname === "/create-bet" && betType === "binary") {
    backgroundImage = "url(/games/bull_or_bear.webp)";
  } else if (pathname === "/games/price-is-right/create-bet") {
    backgroundImage = "url(/games/price_is_right.webp)";
  } else if (pathname === "/create-bet/success" && betType === "binary") {
    backgroundImage = "url(/games/bull_or_bear.webp)";
  }

  return (
    <div className="relative">
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-no-repeat opacity-30 -z-10"
          style={{
            backgroundImage,
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default RenderBGImage;
