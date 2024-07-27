import { FC } from "react";

interface GradiantBorderProps {
  width: number;
}

const GradiantBorder: FC<GradiantBorderProps> = ({ width }) => {
  return (
    <div className="relative h-1 w-full bg-white">
      <div
        style={{ width: `${width}px` }}
        className="absolute h-1 bg-gradient-to-r from-pink-light via-vivid-medium to-yellow-light"
      ></div>
    </div>
  );
};

export default GradiantBorder;
