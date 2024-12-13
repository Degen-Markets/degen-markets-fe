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
  // Core positioning
  const centerX = 200;
  const centerY = 200;
  const innerRadius = 95;
  const outerRadius = 100;

  // Line length constants
  const LINE_CONSTANTS = {
    STRAIGHT_LENGTH: 300, // Length of straight segments
    EXTENSION_LENGTH: 80, // Additional length for extended segments
    VERTICAL_OFFSET: {
      SMALL: 80, // Small vertical bends
      MEDIUM: 120, // Medium vertical bends
      LARGE: 200, // Large vertical movements
      LARGE_2: 250, // Large vertical movements
    },
    CONTROL_POINT: {
      HALF: 40, // Half distance for control points
      FULL: 80, // Full distance for control points
    },
    SPACING: {
      VERTICAL: 10, // Vertical spacing between parallel lines
    },
  } as const;

  // Update endpointConfigurations using constants
  const endpointConfigurations = {
    right: {
      x:
        centerX +
        LINE_CONSTANTS.STRAIGHT_LENGTH +
        LINE_CONSTANTS.EXTENSION_LENGTH,
      y: centerY - LINE_CONSTANTS.VERTICAL_OFFSET.SMALL,
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

  // Update lineConfigurations using constants
  const lineConfigurations: Record<string, LineConfiguration> = {
    right: {
      initialPoint: { x: centerX + outerRadius, y: centerY },
      segments: [
        {
          x: centerX + LINE_CONSTANTS.STRAIGHT_LENGTH,
          y: centerY,
          curve: { type: "linear" },
        },
        {
          x: centerX + LINE_CONSTANTS.STRAIGHT_LENGTH,
          y: centerY - LINE_CONSTANTS.VERTICAL_OFFSET.SMALL,
          curve: {
            type: "cubic",
            controlPoints: [
              centerX + LINE_CONSTANTS.STRAIGHT_LENGTH,
              centerY,
              centerX + LINE_CONSTANTS.STRAIGHT_LENGTH,
              centerY - LINE_CONSTANTS.CONTROL_POINT.HALF,
            ],
          },
        },
        {
          x:
            centerX +
            LINE_CONSTANTS.STRAIGHT_LENGTH +
            LINE_CONSTANTS.EXTENSION_LENGTH,
          y: centerY - LINE_CONSTANTS.VERTICAL_OFFSET.SMALL,
          curve: { type: "linear" },
        },
      ],
    },
    top: {
      initialPoint: { x: centerX, y: centerY - outerRadius },
      segments: [
        {
          x: centerX,
          y: centerY - LINE_CONSTANTS.VERTICAL_OFFSET.LARGE,
          curve: { type: "linear" },
        },
        {
          x: centerX + LINE_CONSTANTS.STRAIGHT_LENGTH * 0.8,
          y: centerY - LINE_CONSTANTS.VERTICAL_OFFSET.LARGE,
          curve: {
            type: "cubic",
            controlPoints: [
              centerX,
              centerY - LINE_CONSTANTS.VERTICAL_OFFSET.LARGE,
              centerX + LINE_CONSTANTS.STRAIGHT_LENGTH * 0.4,
              centerY - LINE_CONSTANTS.VERTICAL_OFFSET.LARGE,
            ],
          },
        },
        {
          x: centerX + LINE_CONSTANTS.STRAIGHT_LENGTH,
          y: centerY - LINE_CONSTANTS.VERTICAL_OFFSET.LARGE,
          curve: { type: "linear" },
        },
      ],
    },
    leftFirst: {
      initialPoint: {
        x: centerX - outerRadius,
        y: centerY - LINE_CONSTANTS.SPACING.VERTICAL,
      },
      segments: [
        {
          x: centerX - LINE_CONSTANTS.STRAIGHT_LENGTH,
          y: centerY - LINE_CONSTANTS.SPACING.VERTICAL,
          curve: { type: "linear" },
        },
        {
          x: centerX - LINE_CONSTANTS.STRAIGHT_LENGTH,
          y: centerY + LINE_CONSTANTS.VERTICAL_OFFSET.MEDIUM,
          curve: {
            type: "cubic",
            controlPoints: [
              centerX - LINE_CONSTANTS.STRAIGHT_LENGTH,
              centerY - LINE_CONSTANTS.SPACING.VERTICAL,
              centerX - LINE_CONSTANTS.STRAIGHT_LENGTH,
              centerY + LINE_CONSTANTS.CONTROL_POINT.FULL,
            ],
          },
        },
        {
          x:
            centerX -
            (LINE_CONSTANTS.STRAIGHT_LENGTH + LINE_CONSTANTS.EXTENSION_LENGTH),
          y: centerY + LINE_CONSTANTS.VERTICAL_OFFSET.MEDIUM,
          curve: { type: "linear" },
        },
      ],
    },
    leftSecond: {
      initialPoint: {
        x: centerX - outerRadius,
        y: centerY + LINE_CONSTANTS.SPACING.VERTICAL,
      },
      segments: [
        {
          x: centerX - LINE_CONSTANTS.STRAIGHT_LENGTH,
          y: centerY + LINE_CONSTANTS.SPACING.VERTICAL,
          curve: { type: "linear" },
        },
        {
          x: centerX - LINE_CONSTANTS.STRAIGHT_LENGTH,
          y: centerY - LINE_CONSTANTS.VERTICAL_OFFSET.MEDIUM,
          curve: {
            type: "cubic",
            controlPoints: [
              centerX - LINE_CONSTANTS.STRAIGHT_LENGTH,
              centerY + LINE_CONSTANTS.SPACING.VERTICAL,
              centerX - LINE_CONSTANTS.STRAIGHT_LENGTH,
              centerY - LINE_CONSTANTS.CONTROL_POINT.FULL,
            ],
          },
        },
        {
          x:
            centerX -
            (LINE_CONSTANTS.STRAIGHT_LENGTH + LINE_CONSTANTS.EXTENSION_LENGTH),
          y: centerY - LINE_CONSTANTS.VERTICAL_OFFSET.MEDIUM,
          curve: { type: "linear" },
        },
      ],
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
            type: "cubic",
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
