"use client";
import React from "react";
import { motion } from "framer-motion";
import { TokenDistribution } from "./TokenDistribution";
import useMediaQuery from "@/app/hooks/useMediaQuery";
import { tokenSaleData } from "./constants";
import {
  CurveSegment,
  DesktopEndpoints,
  DesktopLineConfigs,
  MobileEndpoints,
  MobileLineConfigs,
  PieSegment,
} from "./types";

const AnimatedSpreadingLines: React.FC = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Dynamic dimensions based on viewport
  const baseSize = isMobile ? 300 : 400;
  const scale = isMobile ? 0.7 : 1;

  const centerX = baseSize / 2;
  const centerY = isMobile ? baseSize / 3 : baseSize / 2; // Move center up on mobile
  const innerRadius = baseSize * 0.4 * scale;
  const outerRadius = baseSize * 0.425 * scale;

  const MOBILE_CONSTANTS = {
    VERTICAL_SPACING: 250, // Spacing between nodes
    LINE_LENGTH: 120, // Length of each line
    CURVE_OFFSET: 40, // Curve control point offset
  };

  const LINE_CONSTANTS = {
    STRAIGHT_LENGTH: isMobile ? MOBILE_CONSTANTS.LINE_LENGTH : 300,
    EXTENSION_LENGTH: isMobile ? 40 : 80,
    VERTICAL_OFFSET: {
      SMALL: isMobile ? 40 : 80,
      MEDIUM: isMobile ? 90 : 180,
      LARGE: isMobile ? 135 : 270,
      LARGE_2: isMobile ? 150 : 300,
    },
    CONTROL_POINT: {
      HALF: isMobile ? 20 : 40,
      FULL: isMobile ? 40 : 80,
    },
    SPACING: {
      VERTICAL: isMobile ? 10 : 20,
    },
    HORIZONTAL_OFFSET: {
      SMALL: isMobile ? 45 : 90,
      MEDIUM: isMobile ? 90 : 180,
      LARGE: isMobile ? 190 : 380,
    },
  } as const;

  // Mobile-specific endpoint configurations
  const getMobileEndpoints = (): MobileEndpoints => {
    const baseY = centerY + innerRadius + 50;
    return {
      first: {
        x: centerX + outerRadius + 30,
        y: baseY + MOBILE_CONSTANTS.VERTICAL_SPACING * 0,
        text: "First Node",
      },
      second: {
        x: centerX + outerRadius + 30,
        y: baseY + MOBILE_CONSTANTS.VERTICAL_SPACING * 1,
        text: "Second Node",
      },
      third: {
        x: centerX + outerRadius + 20,
        y: baseY + MOBILE_CONSTANTS.VERTICAL_SPACING * 2,
        text: "Third Node",
      },
      fourth: {
        x: centerX - outerRadius - 30,
        y: baseY + MOBILE_CONSTANTS.VERTICAL_SPACING * 3,
        text: "Fourth Node",
      },
      fifth: {
        x: centerX - outerRadius - 40,
        y: baseY + MOBILE_CONSTANTS.VERTICAL_SPACING * 4,
        text: "Fifth Node",
      },
    };
  };

  const getDesktopEndpoints = (): DesktopEndpoints => ({
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
  });

  const endpointConfigurations = isMobile
    ? getMobileEndpoints()
    : getDesktopEndpoints();

  // Mobile-specific line configurations
  const getMobileLineConfigurations = (): MobileLineConfigs => {
    const mobileEndpoints = getMobileEndpoints();

    // Horizontal extension lengths for lines
    const RIGHT_EXTENSION = 50;
    const RIGHT_EXTENSION_MEDIUM = 60;
    const RIGHT_EXTENSION_MEDIUM_2 = 40;
    const LEFT_EXTENSION = 60;
    const LEFT_EXTENSION_MEDIUM = 40;

    const baseConfigs: MobileLineConfigs = {
      // First line (Right side, topmost)
      first: {
        initialPoint: {
          x: centerX + outerRadius,
          y: centerY,
        },
        segments: [
          // 1. Extend horizontally to the right
          {
            x: centerX + outerRadius + RIGHT_EXTENSION,
            y: centerY,
            curve: { type: "linear" },
          },
          // 2. Go straight down
          {
            x: centerX + outerRadius + RIGHT_EXTENSION,
            y: mobileEndpoints.first.y - 20,
            curve: { type: "linear" },
          },
          // 3. Short curve to endpoint
          {
            x: mobileEndpoints.first.x,
            y: mobileEndpoints.first.y,
            curve: { type: "linear" },
          },
        ],
        color: "#E4D493",
      },
      // Second line (Right side, middle)
      second: {
        initialPoint: {
          x: centerX + outerRadius * Math.cos(-Math.PI / 6),
          y: centerY + outerRadius * Math.sin(-Math.PI / 6),
        },
        segments: [
          {
            x: centerX + outerRadius + RIGHT_EXTENSION_MEDIUM,
            y: centerY + outerRadius * Math.sin(-Math.PI / 6),
            curve: { type: "linear" },
          },
          {
            x: centerX + outerRadius + RIGHT_EXTENSION_MEDIUM,
            y: mobileEndpoints.second.y - 20,
            curve: { type: "linear" },
          },
          {
            x: mobileEndpoints.second.x,
            y: mobileEndpoints.second.y,
            curve: { type: "linear" },
          },
        ],
        color: "#A6B1D6",
      },
      // Third line (Right side, bottom)
      third: {
        initialPoint: {
          x: centerX + outerRadius * Math.cos(Math.PI / 6),
          y: centerY + outerRadius * Math.sin(Math.PI / 6),
        },
        segments: [
          {
            x: centerX + outerRadius + RIGHT_EXTENSION_MEDIUM_2,
            y: centerY + outerRadius * Math.sin(Math.PI / 6),
            curve: { type: "linear" },
          },
          {
            x: centerX + outerRadius + RIGHT_EXTENSION_MEDIUM_2,
            y: mobileEndpoints.third.y - 20,
            curve: { type: "linear" },
          },
          {
            x: mobileEndpoints.third.x,
            y: mobileEndpoints.third.y,
            curve: { type: "linear" },
          },
        ],
        color: "#DCDCDC",
      },
      // Fourth line (Left side, top)
      fourth: {
        initialPoint: {
          x: centerX - outerRadius * Math.cos(-Math.PI / 6),
          y: centerY + outerRadius * Math.sin(-Math.PI / 6),
        },
        segments: [
          {
            x: centerX - outerRadius - LEFT_EXTENSION_MEDIUM,
            y: centerY + outerRadius * Math.sin(-Math.PI / 6),
            curve: { type: "linear" },
          },
          {
            x: centerX - outerRadius - LEFT_EXTENSION_MEDIUM,
            y: mobileEndpoints.fourth.y - 20,
            curve: { type: "linear" },
          },
          {
            x: mobileEndpoints.fourth.x,
            y: mobileEndpoints.fourth.y,
            curve: { type: "linear" },
          },
        ],
        color: "#3FDA8D",
      },
      // Fifth line (Left side, bottom)
      fifth: {
        initialPoint: {
          x: centerX - outerRadius * Math.cos(Math.PI / 6),
          y: centerY + outerRadius * Math.sin(Math.PI / 6),
        },
        segments: [
          {
            x: centerX - outerRadius - LEFT_EXTENSION,
            y: centerY + outerRadius * Math.sin(Math.PI / 6),
            curve: { type: "linear" },
          },
          {
            x: centerX - outerRadius - LEFT_EXTENSION,
            y: mobileEndpoints.fifth.y - 20,
            curve: { type: "linear" },
          },
          {
            x: mobileEndpoints.fifth.x,
            y: mobileEndpoints.fifth.y,
            curve: { type: "linear" },
          },
        ],
        color: "#8F7CFF",
      },
    };
    return baseConfigs;
  };

  const getDesktopLineConfigurations = (): DesktopLineConfigs => {
    const desktopEndpoints = getDesktopEndpoints();

    const baseConfigs: DesktopLineConfigs = {
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

    return baseConfigs;
  };
  const lineConfigurations: MobileLineConfigs | DesktopLineConfigs = isMobile
    ? getMobileLineConfigurations()
    : getDesktopLineConfigurations();

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
    { percentage: 20, color: "#E4D493" },
    { percentage: 20, color: "#A6B1D6" },
    { percentage: 10, color: "#DCDCDC" },
    { percentage: 20, color: "#3FDA8D" },
    { percentage: 30, color: "#8F7CFF" },
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
        {createPieSegments(segments)}

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

  return (
    <>
      <div className="flex justify-center items-center w-full h-full">
        <div
          className={`relative ${isMobile ? "w-[300px] h-[1500px]" : "w-[400px] h-[400px]"}`}
        >
          <svg
            width="100%"
            height="100%"
            className="overflow-visible"
            viewBox={`0 0 ${baseSize} ${isMobile ? baseSize * 3 : baseSize}`}
            preserveAspectRatio="xMidYMin meet"
          >
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
            {(() => {
              if (isMobile) {
                const mobileConfig = lineConfigurations as MobileLineConfigs;
                return (
                  <>
                    <CurvedLine {...mobileConfig.first} />
                    <CurvedLine {...mobileConfig.second} />
                    <CurvedLine {...mobileConfig.third} />
                    <CurvedLine {...mobileConfig.fourth} />
                    <CurvedLine {...mobileConfig.fifth} />
                  </>
                );
              }
              const desktopConfig = lineConfigurations as DesktopLineConfigs;
              return (
                <>
                  <CurvedLine {...desktopConfig.right} />
                  <CurvedLine {...desktopConfig.top} />
                  <CurvedLine {...desktopConfig.leftFirst} />
                  <CurvedLine {...desktopConfig.leftSecond} />
                  <CurvedLine {...desktopConfig.down} />
                </>
              );
            })()}
          </svg>

          {/* TokenDistribution Components */}
          {tokenSaleData.map((data, index) => {
            const position = (() => {
              if (isMobile) {
                const mobileEndpoints = getMobileEndpoints();
                switch (index) {
                  case 0: // first
                    return {
                      x: centerX - 120, // 120px from the horizontal movement of the  node
                      y: mobileEndpoints.first.y - 20, // 20px from the bottom vertical movement of the first node
                    };
                  case 1: // second
                    return {
                      x: centerX - 120,
                      y: mobileEndpoints.second.y - 20,
                    };
                  case 2: // third
                    return {
                      x: centerX - 120,
                      y: mobileEndpoints.third.y - 20,
                    };
                  case 3: // fourth
                    return {
                      x: centerX - 120,
                      y: mobileEndpoints.fourth.y - 20,
                    };
                  case 4: // fifth
                    return {
                      x: centerX - 120,
                      y: mobileEndpoints.fifth.y - 20,
                    };
                  default:
                    return { x: 0, y: 0 };
                }
              } else {
                const endpoints = getDesktopEndpoints();
                switch (index) {
                  case 0: // right
                    return {
                      x: endpoints.right.x - 80,
                      y: endpoints.right.y + 180,
                    };
                  case 1: // top
                    return {
                      x: endpoints.top.x,
                      y: endpoints.top.y - 20,
                    };
                  case 2: // leftFirst
                    return {
                      x: endpoints.leftFirst.x - 200,
                      y: endpoints.leftFirst.y - 25,
                    };
                  case 3: // leftSecond
                    return {
                      x: endpoints.leftSecond.x - 220,
                      y: endpoints.leftSecond.y - 25,
                    };
                  case 4: // down
                    return {
                      x: endpoints.down.x,
                      y: endpoints.down.y - 20,
                    };
                  default:
                    return { x: 0, y: 0 };
                }
              }
            })();

            return (
              <TokenDistribution
                key={index}
                x={position.x}
                y={position.y}
                title={data.title}
                items={data.items}
                progress={data.progress}
                totalTokens={data.totalTokens}
                isMobile={isMobile}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default AnimatedSpreadingLines;
