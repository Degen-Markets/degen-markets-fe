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

// Define the LineControls interface
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

// Add the ControlPanel component
const ControlPanel: React.FC<{
  controls: LineControls;
  onChange: (newControls: LineControls) => void;
}> = ({ controls, onChange }) => {
  const handleChange = (
    category: string,
    subcategory: string | null,
    value: number,
  ) => {
    const newControls = { ...controls };
    if (subcategory) {
      (newControls as any)[category][subcategory] = value;
    } else {
      (newControls as any)[category] = value;
    }
    onChange(newControls);
  };

  return (
    <div className="absolute left-4 top-4 bg-black/20 backdrop-blur-sm p-4 rounded-lg text-white">
      <h3 className="font-bold mb-4">Line Controls</h3>
      {/* Main Line Lengths */}
      <div className="mb-4">
        <label className="block mb-2">Straight Length</label>
        <input
          type="range"
          min="100"
          max="500"
          value={controls.straightLength}
          onChange={(e) =>
            handleChange("straightLength", null, Number(e.target.value))
          }
          className="w-full"
        />
        <span className="text-sm">{controls.straightLength}px</span>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Extension Length</label>
        <input
          type="range"
          min="20"
          max="150"
          value={controls.extensionLength}
          onChange={(e) =>
            handleChange("extensionLength", null, Number(e.target.value))
          }
          className="w-full"
        />
        <span className="text-sm">{controls.extensionLength}px</span>
      </div>
      {/* Vertical Offsets */}
      <div className="mb-4">
        <h4 className="font-bold mb-2">Vertical Offsets</h4>
        {Object.entries(controls.verticalOffsets).map(([key, value]) => (
          <div key={key} className="mb-2">
            <label className="block text-sm mb-1 capitalize">{key}</label>
            <input
              type="range"
              min="20"
              max="400"
              value={value}
              onChange={(e) =>
                handleChange("verticalOffsets", key, Number(e.target.value))
              }
              className="w-full"
            />
            <span className="text-sm">{value}px</span>
          </div>
        ))}
      </div>
      {/* Control Points */}
      <div className="mb-4">
        <h4 className="font-bold mb-2">Control Points</h4>
        {Object.entries(controls.controlPoints).map(([key, value]) => (
          <div key={key} className="mb-2">
            <label className="block text-sm mb-1 capitalize">{key}</label>
            <input
              type="range"
              min="20"
              max="200"
              value={value}
              onChange={(e) =>
                handleChange("controlPoints", key, Number(e.target.value))
              }
              className="w-full"
            />
            <span className="text-sm">{value}px</span>
          </div>
        ))}
      </div>
      {/* Spacing */}
      <div className="mb-4">
        <h4 className="font-bold mb-2">Spacing</h4>
        <label className="block text-sm mb-1">Vertical</label>
        <input
          type="range"
          min="5"
          max="50"
          value={controls.spacing.vertical}
          onChange={(e) =>
            handleChange("spacing", "vertical", Number(e.target.value))
          }
          className="w-full"
        />
        <span className="text-sm">{controls.spacing.vertical}px</span>
      </div>
    </div>
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

  // Convert LINE_CONSTANTS to state
  const [lineControls, setLineControls] = React.useState<LineControls>({
    straightLength: 300,
    extensionLength: 80,
    verticalOffsets: {
      small: 80,
      medium: 120,
      large: 200,
      large2: 250,
    },
    controlPoints: {
      half: 40,
      full: 80,
    },
    spacing: {
      vertical: 10,
    },
  });

  // Create LINE_CONSTANTS from state
  const LINE_CONSTANTS = {
    STRAIGHT_LENGTH: lineControls.straightLength,
    EXTENSION_LENGTH: lineControls.extensionLength,
    VERTICAL_OFFSET: {
      SMALL: lineControls.verticalOffsets.small,
      MEDIUM: lineControls.verticalOffsets.medium,
      LARGE: lineControls.verticalOffsets.large,
      LARGE_2: lineControls.verticalOffsets.large2,
    },
    CONTROL_POINT: {
      HALF: lineControls.controlPoints.half,
      FULL: lineControls.controlPoints.full,
    },
    SPACING: {
      VERTICAL: lineControls.spacing.vertical,
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
    <>
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

      {/* <>
        <ControlPanel controls={lineControls} onChange={setLineControls} />
      </> */}
    </>
  );
};

export default AnimatedSpreadingLines;
