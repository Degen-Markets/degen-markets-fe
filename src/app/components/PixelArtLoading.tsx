import React from "react";
import PropTypes from "prop-types";
import { PixelArtLoaderProps, TextSize } from "../lib/utils/bets/types";
import cx from "classnames";

const PixelArtLoader: React.FC<PixelArtLoaderProps> = ({
  size = 20,
  pixelSize = 4,
  gap = 2,
  text = "Loading",
  textSize = "2xl",
}) => {
  const numPixels = 9;
  const pixels = [...Array(numPixels)];

  const textSizeClass = `text-${textSize}`;

  return (
    <>
      <div className="flex items-center space-x-2">
        <div
          className={`relative`}
          style={{
            width: `${size}px`,
            height: `${size}px`,
          }}
        >
          {pixels.map((_, index) => (
            <div
              key={index}
              className={"absolute bg-blue-dark"}
              style={{
                width: `${pixelSize}px`,
                height: `${pixelSize}px`,
                top: `${Math.floor(index / 3) * (pixelSize + gap)}px`,
                left: `${(index % 3) * (pixelSize + gap)}px`,
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
  size: PropTypes.number,
  pixelSize: PropTypes.number,
  gap: PropTypes.number,
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
