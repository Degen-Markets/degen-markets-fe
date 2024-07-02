import React from "react";
import { PixelArtLoaderProps } from "../lib/utils/bets/types";

const PixelArtLoader: React.FC<PixelArtLoaderProps> = ({
  text = "Loading",
  textSize = "text-2xl",
  loaderColor = "bg-prussian-dark",
  textColor = "text-prussian-dark",
}) => {
  const numPixels = 9;
  const pixels = [...Array(numPixels)];

  return (
    <div className="flex items-center space-x-2">
      <div className="relative w-5 h-5">
        {pixels.map((_, index) => (
          <div
            key={index}
            className={`absolute ${loaderColor} w-1 h-1`}
            style={{
              top: `${Math.floor(index / 3) * (4 + 2)}px`,
              left: `${(index % 3) * (4 + 2)}px`,
              animation: `pixel-animation 1.2s ${(index * 0.2).toFixed(1)}s infinite ease-in-out`,
            }}
          />
        ))}
      </div>
      {text && <span className={`${textColor} ${textSize}`}>{text}</span>}
    </div>
  );
};

export default PixelArtLoader;
