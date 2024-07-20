import { FC, ReactNode } from "react";
import { usePathname } from "next/navigation";

interface RenderBGImageProps {
  children: ReactNode;
}

const RenderBGImage: FC<RenderBGImageProps> = ({ children }) => {
  const pathname = usePathname();

  let backgroundImage = "";

  if (pathname === "/create-bet") {
    backgroundImage = "url(/games/bull_or_bear.webp)";
  } else if (pathname === "/games/price-is-right/create-bet") {
    backgroundImage = "url(/games/price_is_right.webp)";
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
