import React from "react";

interface CircularProgressProps {
  percentage: number;
  bgColor: string;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  percentage,
  bgColor,
}) => {
  const angle = (percentage / 100) * 360;

  return (
    <div className="relative w-36 h-36 flex items-center justify-center flex-shrink-0">
      <svg className="w-full h-full" viewBox="0 0 160 160">
        <circle
          className="text-gray-300"
          strokeWidth="2"
          stroke="currentColor"
          fill={bgColor}
          r="70"
          cx="80"
          cy="80"
        />
        {/* Fixed line at 12 o'clock */}
        <line
          x1="80"
          y1="80"
          x2="80"
          y2="10"
          stroke="#FFFFFF"
          strokeWidth="2"
        />
        <line
          x1="80"
          y1="80"
          x2="80"
          y2="10"
          stroke="#FFFFFF" // Color of the rotating line
          strokeWidth="2"
          transform={`rotate(${angle}, 80, 80)`}
        />
        {/* Filled area between lines */}
        <path
          d={`M80 80 L80 10 A70 70 0 ${angle > 180 ? 1 : 0} 1 ${80 + 70 * Math.sin((angle * Math.PI) / 180)} ${80 - 70 * Math.cos((angle * Math.PI) / 180)} Z`}
          fill="#FFFFFF"
          fillOpacity="0.2"
        />
      </svg>
      <div className="absolute left-1/2 top-1/2 -translate-x-[120%] -translate-y-1/2 flex flex-col items-center">
        <span className="font-semibold text-white text-lg">{percentage}%</span>
      </div>
    </div>
  );
};

export default CircularProgress;
