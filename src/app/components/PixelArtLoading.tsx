import React from "react";
import PropTypes from "prop-types";
import { PixelArtLoaderProps, TextSize } from "../lib/utils/bets/types";
import cx from "classnames";

const PixelArtLoader: React.FC<PixelArtLoaderProps> = ({
  text = "Loading",
  textSize = "2xl",
}) => {
  const numPixels = 9;
  const pixels = [...Array(numPixels)];
  const textSizeClass = `text-${textSize}`;

  return (
    <>
      <div className="flex items-center space-x-2">
        <div className={`relative w-5 h-5`}>
          {pixels.map((_, index) => (
            <div
              key={index}
              className={"absolute bg-blue-dark w-1 h-1"}
              style={{
                top: `${Math.floor(index / 3) * (4 + 2)}px`,
                left: `${(index % 3) * (4 + 2)}px`,
                animation: `pixel-animation 1.2s ${(index * 0.2).toFixed(1)}s infinite ease-in-out`,
              }}
            />
          ))}
        </div>
        <span className={`text-black ${textSizeClass}`}>{text}</span>
      </div>
    </>
  );
};

PixelArtLoader.propTypes = {
  text: PropTypes.string.isRequired,
  textSize: PropTypes.oneOf([
    "sm",
    "md",
    "base",
    "lg",
    "xl",
    "2xl",
    "3xl",
    "4xl",
    "5xl",
    "6xl",
    "7xl",
    "8xl",
    "9xl",
    "xl",
    "2xl",
    "3xl",
    "4xl",
    "5xl",
    "6xl",
    "7xl",
    "8xl",
    "9xl",
  ]) as PropTypes.Validator<TextSize>,
};

export default PixelArtLoader;
