"use client";
import React from "react";
import { motion } from "framer-motion";

/**
 * This component creates an animated visualization with:
 * 1. A central donut-shaped circle
 * 2. Animated lines spreading out in different directions
 * 3. Each line can have multiple segments (straight or curved)
 * 4. Uses Framer Motion for smooth animations
 * 5. SVG-based for crisp rendering
 */

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
};

const EndpointComponent: React.FC<{
  text: string;
  x: number;
  y: number;
}> = ({ text, x, y }) => {
  return (
    <motion.div
      className="absolute border border-white rounded-lg p-2 flex items-center justify-center"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        transform: "translate(-50%, -50%)",
        width: "80px",
        height: "80px",
        color: "white",
        backgroundColor: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(2px)",
        fontSize: "0.875rem",
        textAlign: "center",
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        duration: 0.5,
        delay: 2.2,
      }}
    >
      {text}
    </motion.div>
  );
};

/**
 * Main component that renders the animated spreading lines visualization
 * Uses a central circle with multiple animated paths spreading outward
 */
const AnimatedSpreadingLines: React.FC = () => {
  const centerX = 190;
  const centerY = 190;
  const innerRadius = 95;
  const outerRadius = 100;

  // Endpoint coordinates matching the line configurations
  const endpointConfigurations = {
    right: {
      x: centerX + 450,
      y: centerY - 120,
      text: "Right Node",
    },
    top: {
      x: centerX + 350,
      y: centerY - 350,
      text: "Top Node",
    },
    leftFirst: {
      x: centerX - 450,
      y: centerY + 180,
      text: "Left First Node",
    },
    leftSecond: {
      x: centerX - 450,
      y: centerY - 180,
      text: "Left Second Node",
    },
    down: {
      x: centerX + 350,
      y: centerY + 350,
      text: "Bottom Node",
    },
  };

  // Curve configurations for different lines
  //   const lineConfigurations: Record<string, LineConfiguration> = {
  //     right: {
  //       initialPoint: { x: 200, y: 200 },
  //       segments: [
  //         {
  //           x: 400,
  //           y: 200,
  //           curve: { type: "linear" }, // Explicitly typed
  //         },
  //       ],
  //     },
  //     top: {
  //       initialPoint: { x: 200, y: 200 },
  //       segments: [
  //         {
  //           x: 200,
  //           y: 100,
  //           curve: { type: "linear" },
  //         },
  //         {
  //           x: 280,
  //           y: 50,
  //           curve: { type: "cubic", controlPoints: [200, 100, 240, 75] },
  //         },
  //         {
  //           x: 350,
  //           y: 50,
  //           curve: { type: "linear" },
  //         },
  //       ],
  //     },
  //     leftFirst: {
  //       initialPoint: { x: 200, y: 200 },
  //       segments: [
  //         {
  //           x: 100,
  //           y: 200,
  //           curve: { type: "linear" },
  //         },
  //         {
  //           x: 100,
  //           y: 280,
  //           curve: { type: "cubic", controlPoints: [100, 200, 100, 240] },
  //         },
  //         {
  //           x: 50,
  //           y: 280,
  //           curve: { type: "linear" },
  //         },
  //       ],
  //     },
  //     leftSecond: {
  //       initialPoint: { x: 200, y: 205 },
  //       segments: [
  //         {
  //           x: 100,
  //           y: 205,
  //           curve: { type: "linear" },
  //         },
  //         {
  //           x: 100,
  //           y: 120,
  //           curve: { type: "cubic", controlPoints: [100, 205, 100, 165] },
  //         },
  //         {
  //           x: 50,
  //           y: 120,
  //           curve: { type: "linear" },
  //         },
  //       ],
  //     },
  //     down: {
  //       initialPoint: { x: 200, y: 200 },
  //       segments: [
  //         {
  //           x: 200,
  //           y: 300,
  //           curve: { type: "linear" },
  //         },
  //         {
  //           x: 300,
  //           y: 350,
  //           curve: { type: "cubic", controlPoints: [200, 300, 250, 325] },
  //         },
  //         {
  //           x: 400,
  //           y: 350,
  //           curve: { type: "linear" },
  //         },
  //       ],
  //     },
  //   };

  /**
   * Defines all the paths that spread out from the center
   * Each path consists of:
   * - initialPoint: Where the line starts (connects to central circle)
   * - segments: Array of points and curves that define the path
   */
  const lineConfigurations: Record<string, LineConfiguration> = {
    right: {
      initialPoint: { x: centerX + outerRadius, y: centerY },
      segments: [
        {
          // First segment - move right
          x: centerX + 350,
          y: centerY,
          curve: { type: "linear" },
        },
        // {
        //   // Second segment - bend up
        //   x: centerX + 350,
        //   y: centerY - 120,
        //   curve: {
        //     type: "cubic",
        //     controlPoints: [
        //       centerX + 350,
        //       centerY,
        //       centerX + 350,
        //       centerY - 60,
        //     ],
        //   },
        // },
        {
          // Final segment - move right
          x: centerX + 450,
          y: centerY - 120,
          curve: { type: "linear" },
        },
      ],
    },
    top: {
      initialPoint: { x: centerX, y: centerY - outerRadius },
      segments: [
        {
          // First segment - move up
          x: centerX,
          y: centerY - 300,
          curve: { type: "linear" },
        },
        {
          // Second segment - curve right
          x: centerX + 280,
          y: centerY - 350,
          curve: {
            type: "cubic",
            controlPoints: [
              centerX,
              centerY - 300,
              centerX + 240,
              centerY - 325,
            ],
          },
        },
        {
          // Final segment - continue right
          x: centerX + 350,
          y: centerY - 350,
          curve: { type: "linear" },
        },
      ],
    },
    leftFirst: {
      initialPoint: { x: centerX - outerRadius, y: centerY - 10 },
      segments: [
        {
          // First segment - move left
          x: centerX - 350,
          y: centerY - 10,
          curve: { type: "linear" },
        },
        {
          // Second segment - bend down
          x: centerX - 350,
          y: centerY + 180,
          curve: {
            type: "cubic",
            controlPoints: [
              centerX - 350,
              centerY - 5,
              centerX - 350,
              centerY + 90,
            ],
          },
        },
        {
          // Final segment - move left
          x: centerX - 450,
          y: centerY + 180,
          curve: { type: "linear" },
        },
      ],
    },
    leftSecond: {
      initialPoint: { x: centerX - outerRadius, y: centerY + 10 },
      segments: [
        {
          // First segment - move left
          x: centerX - 350,
          y: centerY + 10,
          curve: { type: "linear" },
        },
        {
          // Second segment - bend up
          x: centerX - 350,
          y: centerY - 180,
          curve: {
            type: "cubic",
            controlPoints: [
              centerX - 350,
              centerY + 5,
              centerX - 350,
              centerY - 90,
            ],
          },
        },
        {
          // Final segment - move left
          x: centerX - 450,
          y: centerY - 180,
          curve: { type: "linear" },
        },
      ],
    },
    down: {
      initialPoint: { x: centerX, y: centerY + outerRadius },
      segments: [
        {
          // First segment - move down
          x: centerX,
          y: centerY + 300,
          curve: { type: "linear" },
        },
        {
          // Second segment - curve right
          x: centerX + 280,
          y: centerY + 350,
          curve: {
            type: "cubic",
            controlPoints: [
              centerX,
              centerY + 300,
              centerX + 140,
              centerY + 325,
            ],
          },
        },
        {
          // Final segment - continue right
          x: centerX + 350,
          y: centerY + 350,
          curve: { type: "linear" },
        },
      ],
    },
  };

  // Custom component for curved line
  /**
   * Renders a single animated path that can contain multiple segments
   * Uses Framer Motion for path drawing animation
   * @param segments - Array of points and curve configurations
   * @param initialPoint - Starting point of the path
   */
  const CurvedLine: React.FC<{
    segments: CurveSegment[];
    initialPoint: { x: number; y: number };
  }> = ({ segments, initialPoint }) => {
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
        stroke="#fff"
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

  /**
   * Renders the complete visualization with:
   * 1. Central donut circle (animates scale)
   * 2. Multiple spreading lines (animate drawing)
   * All contained in a centered, responsive container
   */
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="relative w-[400px] h-[400px]">
        <svg width="100%" height="100%" className="overflow-visible">
          {/* Donut-like Central Circle */}
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
              stroke="#fff"
              strokeWidth="2"
            />
            <circle cx={centerX} cy={centerY} r={innerRadius} fill="#fff" />
          </motion.g>

          {/* Curved Lines */}
          <CurvedLine
            initialPoint={lineConfigurations.right.initialPoint}
            segments={lineConfigurations.right.segments}
          />
          <CurvedLine
            initialPoint={lineConfigurations.top.initialPoint}
            segments={lineConfigurations.top.segments}
          />
          <CurvedLine
            initialPoint={lineConfigurations.leftFirst.initialPoint}
            segments={lineConfigurations.leftFirst.segments}
          />
          <CurvedLine
            initialPoint={lineConfigurations.leftSecond.initialPoint}
            segments={lineConfigurations.leftSecond.segments}
          />
          <CurvedLine
            initialPoint={lineConfigurations.down.initialPoint}
            segments={lineConfigurations.down.segments}
          />
        </svg>

        {/* Endpoint Components */}
        <EndpointComponent
          x={endpointConfigurations.right.x}
          y={endpointConfigurations.right.y}
          text={endpointConfigurations.right.text}
        />
        <EndpointComponent
          x={endpointConfigurations.top.x}
          y={endpointConfigurations.top.y}
          text={endpointConfigurations.top.text}
        />
        <EndpointComponent
          x={endpointConfigurations.leftFirst.x}
          y={endpointConfigurations.leftFirst.y}
          text={endpointConfigurations.leftFirst.text}
        />
        <EndpointComponent
          x={endpointConfigurations.leftSecond.x}
          y={endpointConfigurations.leftSecond.y}
          text={endpointConfigurations.leftSecond.text}
        />
        <EndpointComponent
          x={endpointConfigurations.down.x}
          y={endpointConfigurations.down.y}
          text={endpointConfigurations.down.text}
        />
      </div>
    </div>
  );
};

export default AnimatedSpreadingLines;
