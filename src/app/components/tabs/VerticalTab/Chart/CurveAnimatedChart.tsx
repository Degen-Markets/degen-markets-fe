"use client";
import React from "react";
import { motion } from "framer-motion";
import { TokenDistribution } from "./TokenDistribution";

interface CurveSegment {
  x: number;
  y: number;
  curve: {
    type: "linear" | "cubic";
    controlPoints?: [number, number, number, number];
  };
}

type LineConfiguration = {
  initialPoint: { x: number; y: number };
  segments: CurveSegment[];
  color: string;
};

interface LineControls {
  straightLength: number;
  extensionLength: number;
  verticalOffsets: {
    small: number;
    medium: number;
    large: number;
    large2: number;
  };
  controlPoints: {
    half: number;
    full: number;
  };
  spacing: {
    vertical: number;
  };
}

interface PieSegment {
  percentage: number;
  color: string;
}

const AnimatedSpreadingLines: React.FC = () => {
  const centerX = 200;
  const centerY = 200;
  const innerRadius = 160;
  const outerRadius = 170;

  const LINE_CONSTANTS = {
    STRAIGHT_LENGTH: 300,
    EXTENSION_LENGTH: 80,
    VERTICAL_OFFSET: {
      SMALL: 80,
      MEDIUM: 180,
      LARGE: 270,
      LARGE_2: 300,
    },
    CONTROL_POINT: {
      HALF: 40,
      FULL: 80,
    },
    SPACING: {
      VERTICAL: 20,
    },
    HORIZONTAL_OFFSET: {
      SMALL: 90,
      MEDIUM: 180,
      LARGE: 380,
    },
  } as const;

  const endpointConfigurations = {
    right: {
      x:
        centerX +
        LINE_CONSTANTS.STRAIGHT_LENGTH +
        LINE_CONSTANTS.EXTENSION_LENGTH,
      y: 0,
      text: "Right Node",
    },
    top: {
      x: centerX + LINE_CONSTANTS.STRAIGHT_LENGTH,
      y: centerY - LINE_CONSTANTS.VERTICAL_OFFSET.LARGE_2,
      text: "Top Node",
    },
    leftFirst: {
      x:
        centerX -
        (LINE_CONSTANTS.STRAIGHT_LENGTH + LINE_CONSTANTS.EXTENSION_LENGTH),
      y: centerY + LINE_CONSTANTS.VERTICAL_OFFSET.MEDIUM,
      text: "Left First Node",
    },
    leftSecond: {
      x:
        centerX -
        (LINE_CONSTANTS.STRAIGHT_LENGTH + LINE_CONSTANTS.EXTENSION_LENGTH),
      y: centerY - LINE_CONSTANTS.VERTICAL_OFFSET.MEDIUM,
      text: "Left Second Node",
    },
    down: {
      x: centerX + LINE_CONSTANTS.STRAIGHT_LENGTH,
      y: centerY + LINE_CONSTANTS.VERTICAL_OFFSET.LARGE,
      text: "Bottom Node",
    },
  };

  const lineConfigurations: Record<string, LineConfiguration> = {
    right: {
      initialPoint: { x: centerX + outerRadius, y: centerY },
      segments: [
        {
          x: centerX + LINE_CONSTANTS.STRAIGHT_LENGTH,
          y: centerY,
          curve: { type: "linear" },
        },
      ],
      color: "#E4D493",
    },
    top: {
      initialPoint: { x: centerX, y: centerY - outerRadius },
      segments: [
        {
          x: centerX,
          y: centerY - LINE_CONSTANTS.VERTICAL_OFFSET.LARGE_2,
          curve: { type: "linear" },
        },
        {
          x: centerX + LINE_CONSTANTS.STRAIGHT_LENGTH * 0.8,
          y: centerY - LINE_CONSTANTS.VERTICAL_OFFSET.LARGE_2,
          curve: {
            type: "cubic",
            controlPoints: [
              centerX,
              centerY - LINE_CONSTANTS.VERTICAL_OFFSET.LARGE_2,
              centerX + LINE_CONSTANTS.STRAIGHT_LENGTH * 0.4,
              centerY - LINE_CONSTANTS.VERTICAL_OFFSET.LARGE_2,
            ],
          },
        },
        {
          x: centerX + LINE_CONSTANTS.STRAIGHT_LENGTH,
          y: centerY - LINE_CONSTANTS.VERTICAL_OFFSET.LARGE_2,
          curve: { type: "linear" },
        },
      ],
      color: "#A6B1D6",
    },
    leftFirst: {
      initialPoint: {
        x: centerX - outerRadius,
        y: centerY - LINE_CONSTANTS.SPACING.VERTICAL,
      },
      segments: [
        {
          // First segment - straight line to the left
          x: centerX - LINE_CONSTANTS.HORIZONTAL_OFFSET.SMALL,
          y: centerY - LINE_CONSTANTS.SPACING.VERTICAL,
          curve: { type: "linear" },
        },
        {
          // Second segment - curve downward
          x: centerX - LINE_CONSTANTS.HORIZONTAL_OFFSET.MEDIUM,
          y: centerY + LINE_CONSTANTS.VERTICAL_OFFSET.MEDIUM,
          curve: {
            type: "linear",
            controlPoints: [
              centerX - LINE_CONSTANTS.HORIZONTAL_OFFSET.SMALL,
              centerY - LINE_CONSTANTS.SPACING.VERTICAL,
              centerX - LINE_CONSTANTS.HORIZONTAL_OFFSET.SMALL,
              centerY + LINE_CONSTANTS.VERTICAL_OFFSET.SMALL,
            ],
          },
        },
        {
          // Final segment - extend left
          x: centerX - LINE_CONSTANTS.HORIZONTAL_OFFSET.LARGE,
          y: centerY + LINE_CONSTANTS.VERTICAL_OFFSET.MEDIUM,
          curve: { type: "linear" },
        },
      ],
      color: "#DCDCDC",
    },
    leftSecond: {
      initialPoint: {
        x: centerX - outerRadius,
        y: centerY + LINE_CONSTANTS.SPACING.VERTICAL,
      },
      segments: [
        {
          // First segment - straight line to the left
          x: centerX - LINE_CONSTANTS.HORIZONTAL_OFFSET.SMALL,
          y: centerY + LINE_CONSTANTS.SPACING.VERTICAL,
          curve: { type: "linear" },
        },
        {
          // Second segment - curve upward
          x: centerX - LINE_CONSTANTS.HORIZONTAL_OFFSET.MEDIUM,
          y: centerY - LINE_CONSTANTS.VERTICAL_OFFSET.MEDIUM,
          curve: {
            type: "linear",
            controlPoints: [
              centerX - LINE_CONSTANTS.HORIZONTAL_OFFSET.SMALL,
              centerY + LINE_CONSTANTS.SPACING.VERTICAL,
              centerX - LINE_CONSTANTS.HORIZONTAL_OFFSET.SMALL,
              centerY - LINE_CONSTANTS.VERTICAL_OFFSET.SMALL,
            ],
          },
        },
        {
          // Final segment - extend left
          x: centerX - LINE_CONSTANTS.HORIZONTAL_OFFSET.LARGE,
          y: centerY - LINE_CONSTANTS.VERTICAL_OFFSET.MEDIUM,
          curve: { type: "linear" },
        },
      ],
      color: "#3FDA8D",
    },
    down: {
      initialPoint: { x: centerX, y: centerY + outerRadius },
      segments: [
        {
          x: centerX,
          y: centerY + LINE_CONSTANTS.VERTICAL_OFFSET.LARGE,
          curve: { type: "linear" },
        },
        {
          x: centerX + LINE_CONSTANTS.STRAIGHT_LENGTH * 0.8,
          y: centerY + LINE_CONSTANTS.VERTICAL_OFFSET.LARGE,
          curve: {
            type: "linear",
            controlPoints: [
              centerX,
              centerY + LINE_CONSTANTS.VERTICAL_OFFSET.LARGE,
              centerX + LINE_CONSTANTS.STRAIGHT_LENGTH * 0.4,
              centerY + LINE_CONSTANTS.VERTICAL_OFFSET.LARGE,
            ],
          },
        },
        {
          x: centerX + LINE_CONSTANTS.STRAIGHT_LENGTH,
          y: centerY + LINE_CONSTANTS.VERTICAL_OFFSET.LARGE,
          curve: { type: "linear" },
        },
      ],
      color: "#8F7CFF",
    },
  };

  const CurvedLine: React.FC<{
    segments: CurveSegment[];
    initialPoint: { x: number; y: number };
    color: string;
  }> = ({ segments, initialPoint, color }) => {
    const pathCommands = segments.reduce(
      (acc, segment, index) => {
        if (segment.curve.type === "linear") {
          return [...acc, `L ${segment.x} ${segment.y}`];
        }
        // For cubic curves
        if (segment.curve.type === "cubic" && segment.curve.controlPoints) {
          return [
            ...acc,
            `C ${segment.curve.controlPoints[0]} ${segment.curve.controlPoints[1]} ` +
              `${segment.curve.controlPoints[2]} ${segment.curve.controlPoints[3]} ` +
              `${segment.x} ${segment.y}`,
          ];
        }
        return acc;
      },
      [`M ${initialPoint.x} ${initialPoint.y}`],
    );

    return (
      <motion.path
        d={pathCommands.join(" ")}
        fill="none"
        stroke={color}
        strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{
          duration: 2,
          times: segments.map((_, i) => i / segments.length),
          type: "tween",
          ease: "easeInOut",
        }}
      />
    );
  };

  const pieSegments: PieSegment[] = [
    { percentage: 20, color: "#E4D493" }, // gold
    { percentage: 20, color: "#A6B1D6" }, // steel-gray
    { percentage: 10, color: "#DCDCDC" }, // main
    { percentage: 20, color: "#3FDA8D" }, // success
    { percentage: 30, color: "#8F7CFF" }, // primary
  ];

  const CenterContent: React.FC<{ segments: PieSegment[] }> = ({
    segments,
  }) => {
    // Function to create pie chart segments
    const createPieSegments = (segments: PieSegment[]) => {
      let currentAngle = 0;
      return segments.map((segment, index) => {
        const startAngle = currentAngle;
        const angle = (segment.percentage / 100) * 2 * Math.PI;
        currentAngle += angle;

        const x1 = centerX + innerRadius * Math.cos(startAngle);
        const y1 = centerY + innerRadius * Math.sin(startAngle);
        const x2 = centerX + innerRadius * Math.cos(startAngle + angle);
        const y2 = centerY + innerRadius * Math.sin(startAngle + angle);

        const largeArcFlag = segment.percentage > 50 ? 1 : 0;

        return (
          <path
            key={index}
            d={`M ${centerX} ${centerY}
                L ${x1} ${y1}
                A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 1 ${x2} ${y2}
                Z`}
            fill={segment.color}
          />
        );
      });
    };

    return (
      <g>
        <defs>
          <clipPath id="circleClip">
            <circle cx={centerX} cy={centerY} r={innerRadius} />
          </clipPath>
        </defs>

        {/* Background circle */}
        <circle cx={centerX} cy={centerY} r={innerRadius} fill="#8F7CFF" />

        {/* Render pie segments */}
        {/* {createPieSegments(segments)} */}

        {/* Content group */}
        <g>
          {/* Image */}
          <image
            x={centerX - innerRadius * 0.2}
            y={centerY - innerRadius * 0.2}
            width={innerRadius * 0.4}
            height={innerRadius * 0.4}
            href="/user-avatars/default.jpg"
            style={{ objectFit: "contain", borderRadius: "50%" }}
          />

          {/* Text group - centered horizontally */}
        </g>
      </g>
    );
  };

  const tokenSaleData = [
    {
      title: "PRIVATE SALE (10-12%)",
      x: endpointConfigurations.right.x,
      y: endpointConfigurations.right.y,
      items: [
        { text: "External investors and Super Crew holders" },
        { text: "6-month lockup", isLocked: true },
        {
          text: "1/10 Unlocked after 6 months",
          highlight: true,
          isLocked: false,
        },
        { text: "9/10 Locked (daily unlock over 18 months)", isLocked: true },
      ],
      progress: 10,
      totalTokens: {
        amount: 759_000_000,
        total: 7_590_000_000,
        symbol: "MEME",
      },
    },

    {
      title: "PUBLIC SALE (10-12%)",
      x: endpointConfigurations.top.x,
      y: endpointConfigurations.top.y,
      items: [
        { text: "Public sale" },
        { text: "10-month lockup", isLocked: true },
        { text: "1/10 Unlocked after 10 months", isLocked: false },
        { text: "9/10 Locked (daily unlock over 18 months)", isLocked: true },
      ],
      progress: 50,
      totalTokens: {
        amount: 759_000_000,
        total: 7_590_000_000,
        symbol: "MEME",
      },
    },

    {
      title: "TEAM (10-12%)",
      x: endpointConfigurations.leftFirst.x,
      y: endpointConfigurations.leftFirst.y,
      items: [
        { text: "Team and advisors" },
        { text: "10-month lockup", isLocked: true },
        { text: "1/10 Unlocked after 10 months", isLocked: false },
        { text: "9/10 Locked (daily unlock over 18 months)", isLocked: true },
      ],
      progress: 60,
      totalTokens: {
        amount: 759_000_000,
        total: 7_590_000_000,
        symbol: "MEME",
      },
    },

    {
      title: "REWARDS (10-12%)",
      x: endpointConfigurations.leftSecond.x,
      y: endpointConfigurations.leftSecond.y,
      items: [
        { text: "Community rewards" },
        { text: "10-month lockup", isLocked: true },
        { text: "1/10 Unlocked after 10 months", isLocked: false },
        { text: "9/10 Locked (daily unlock over 18 months)", isLocked: true },
      ],
      progress: 20,
      totalTokens: {
        amount: 759_000_000,
        total: 7_590_000_000,
        symbol: "MEME",
      },
    },

    {
      title: "REWARDS (10-12%)",
      x: endpointConfigurations.down.x,
      y: endpointConfigurations.down.y,
      items: [
        { text: "Community rewards" },
        { text: "10-month lockup", isLocked: true },
        { text: "1/10 Unlocked after 10 months", isLocked: false },
        { text: "9/10 Locked (daily unlock over 18 months)", isLocked: true },
      ],
      progress: 80,
      totalTokens: {
        amount: 759_000_000,
        total: 7_590_000_000,
        symbol: "MEME",
      },
    },
  ];

  return (
    <>
      <div className="flex justify-center items-center w-full h-full">
        <div className="relative w-[400px] h-[400px]">
          <svg width="100%" height="100%" className="overflow-visible">
            <motion.g
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <circle
                cx={centerX}
                cy={centerY}
                r={outerRadius}
                fill="none"
                stroke="#8F7CFF"
                strokeWidth="5"
              />

              {/* Pass segments to CenterContent */}
              <CenterContent segments={pieSegments} />
            </motion.g>

            {/* Curved Lines */}
            <CurvedLine
              initialPoint={lineConfigurations.right.initialPoint}
              segments={lineConfigurations.right.segments}
              color={lineConfigurations.right.color}
            />
            <CurvedLine
              initialPoint={lineConfigurations.top.initialPoint}
              segments={lineConfigurations.top.segments}
              color={lineConfigurations.top.color}
            />
            <CurvedLine
              initialPoint={lineConfigurations.leftFirst.initialPoint}
              segments={lineConfigurations.leftFirst.segments}
              color={lineConfigurations.leftFirst.color}
            />
            <CurvedLine
              initialPoint={lineConfigurations.leftSecond.initialPoint}
              segments={lineConfigurations.leftSecond.segments}
              color={lineConfigurations.leftSecond.color}
            />
            <CurvedLine
              initialPoint={lineConfigurations.down.initialPoint}
              segments={lineConfigurations.down.segments}
              color={lineConfigurations.down.color}
            />
          </svg>

          {/* TokenDistribution Components */}
          {tokenSaleData.map((data, index) => {
            let position = { x: 0, y: 0 };

            // Determine position based on index
            switch (index) {
              case 0: // right
                position = {
                  x: endpointConfigurations.right.x - 80,
                  y: endpointConfigurations.right.y + 180,
                };
                break;
              case 1: // top
                position = {
                  x: endpointConfigurations.top.x,
                  y: endpointConfigurations.top.y - 20,
                };
                break;
              case 2: // leftFirst
                position = {
                  x: endpointConfigurations.leftFirst.x - 200,
                  y: endpointConfigurations.leftFirst.y - 25,
                };
                break;
              case 3: // leftSecond
                position = {
                  x: endpointConfigurations.leftSecond.x - 220,
                  y: endpointConfigurations.leftSecond.y - 25,
                };
                break;
              case 4: // down
                position = {
                  x: endpointConfigurations.down.x,
                  y: endpointConfigurations.down.y - 20,
                };
                break;
            }

            return (
              <TokenDistribution
                key={index}
                x={position.x}
                y={position.y}
                title={data.title}
                items={data.items}
                progress={data.progress}
                totalTokens={data.totalTokens}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default AnimatedSpreadingLines;
