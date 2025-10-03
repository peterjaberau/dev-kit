import React, { useMemo, useCallback } from 'react';
import { Box, useTheme, ThemingProps, Text } from '@chakra-ui/react';

// --- Constants ---
const VERTICAL_PADDING = 10;
const ROUNDING_FACTOR = 10;

// --- Geometric Utility Functions (Preserved from original) ---

function roundedValue(v: number): number {
  return Math.round(v * ROUNDING_FACTOR) / ROUNDING_FACTOR;
}

function bezierCurveMidpointAngle(
  startX: number,
  startY: number,
  startHandleX: number,
  startHandleY: number,
  endHandleX: number,
  endHandleY: number,
  endX: number,
  endY: number,
): number {
  // Calculate the tangent at the midpoint of the Bezier curve
  const tangentX =
    (-3 * startX + 9 * startHandleX - 9 * endX + 3 * endHandleX) / 8;
  const tangentY =
    (-3 * startY + 9 * startHandleY - 9 * endY + 3 * endHandleY) / 8;
  // Calculate the angle of the tangent in radians (adding PI to flip 180)
  const rad = Math.atan2(tangentY, tangentX) + Math.PI;
  // Return the angle of the tangent in degrees
  return (rad * 180) / Math.PI;
}

// --- Component Props ---

interface TokenGraphAdjacencyProps {
  fromX?: number;
  fromY?: number;
  toX?: number;
  toY?: number;
  role?: 'selectionConnection' | 'ancestorPath' | 'descendentPath' | string;
  isHighlighted?: boolean;
  isFaded?: boolean;
  label?: string;
}

/**
 * Renders a Bezier curve between two points with a dynamically calculated,
 * rotated label using SVG within a Chakra Box.
 */
export const TokenGraphAdjacency: React.FC<TokenGraphAdjacencyProps> = ({
                                                                          fromX = 0,
                                                                          fromY = 0,
                                                                          toX = 0,
                                                                          toY = 0,
                                                                          role = 'descendentPath',
                                                                          isHighlighted = false,
                                                                          isFaded = false,
                                                                          label = '',
                                                                        }) => {
  const theme = useTheme();

  // --- Dynamic Styling Logic (Replacing willUpdate's color logic) ---
  const { fillColorVar, labelColorVar } = useMemo(() => {
    // default green - should NOT see
    let hue = 'celery';
    let lineValue = 300;
    let textValue = 900;

    switch (role) {
      case 'selectionConnection':
        hue = 'orange';
        lineValue = 300;
        textValue = 1100;
        break;
      case 'ancestorPath':
        hue = 'purple';
        break;
      case 'descendentPath':
        hue = 'fuchsia';
        break;
    }

    if (isFaded) {
      lineValue = Math.max(100, lineValue - 200);
      textValue = Math.max(100, textValue - 200);
    }

    if (isHighlighted) {
      lineValue = Math.min(1200, lineValue + 200);
      textValue = Math.min(1200, textValue + 200);
    }

    // Convert Spectrum naming to a format usable with Chakra/CSS variables
    // Note: Chakra doesn't expose all Spectrum color variants,
    // so we'll use a CSS variable name that assumes Spectrum is loaded or mapped.
    const spectrumLineValue = lineValue.toString().padStart(4, '0');
    const spectrumTextValue = textValue.toString().padStart(4, '0');

    // In a real Chakra app, you'd map these to a custom theme or direct hex codes.
    // We'll stick to the original variable names for direct replacement in SVG.
    return {
      fillColorVar: `--spectrum-${hue}-${spectrumLineValue}`,
      labelColorVar: `--spectrum-${hue}-${spectrumTextValue}`,
    };
  }, [role, isFaded, isHighlighted]);

  // --- Geometric Calculations (Replacing willUpdate's coordinate logic) ---
  const { top, left, width, height, pathData, angle, fillLabel } = useMemo(() => {
    const originX = Math.min(fromX, toX);
    const originY = Math.min(fromY, toY);

    // Calculate handle distance
    const pointsDistance = Math.sqrt(
      Math.pow(fromX - toX, 2) + Math.pow(fromY - toY, 2),
    );
    const handleDistance = pointsDistance / 3;

    // Calculate dynamic padding to account for handle curvature
    const HORIZONTAL_PADDING = Math.max(
      0,
      handleDistance - (toX - fromX),
    );

    // Recalculate coordinates relative to the new SVG bounding box (originX, originY)
    const Ax = roundedValue(fromX - originX + HORIZONTAL_PADDING / 2);
    const Ay = roundedValue(fromY - originY + VERTICAL_PADDING / 2);
    const Bx = roundedValue(toX - originX + HORIZONTAL_PADDING / 2);
    const By = roundedValue(toY - originY + VERTICAL_PADDING / 2);

    // SVG container position and size
    const calculatedTop = roundedValue(originY - VERTICAL_PADDING / 2);
    const calculatedLeft = roundedValue(originX - HORIZONTAL_PADDING / 2);
    const calculatedWidth = Math.ceil(
      Math.abs(fromX - toX) + HORIZONTAL_PADDING,
    );
    const calculatedHeight = Math.ceil(
      Math.abs(fromY - toY) + VERTICAL_PADDING,
    );

    // Bezier path data string
    const d = `M ${Ax},${Ay} C ${Ax + handleDistance},${Ay} ${Bx - handleDistance},${By} ${Bx},${By}`;

    // Midpoint angle for label rotation
    const calculatedAngle = bezierCurveMidpointAngle(
      fromX, fromY,
      fromX + handleDistance, fromY,
      toX - handleDistance, toY,
      toX, toY,
    );

    // Label background fill string (for line protection)
    const calculatedFillLabel = new Array(label.length + 2).join('█');


    return {
      top: calculatedTop,
      left: calculatedLeft,
      width: calculatedWidth,
      height: calculatedHeight,
      pathData: d,
      angle: calculatedAngle,
      fillLabel: calculatedFillLabel,
    };
  }, [fromX, fromY, toX, toY, label]); // Recalculate whenever coordinates or label change

  // --- Render ---

  // If width or height is zero, don't render the SVG
  if (width === 0 || height === 0) {
    return null;
  }

  return (
    // Chakra Box acts as the container, replacing the LitElement host and inline styles
    <Box
      as="svg"
      position="absolute"
      top={`${top}px`}
      left={`${left}px`}
      width={`${width}px`}
      height={`${height}px`}
      // Set viewBox for cleaner rendering if needed, but not strictly necessary here
      // viewBox={`0 0 ${width} ${height}`}
    >
      {/* Bezier Path */}
      <path
        d={pathData}
        stroke={`var(${fillColorVar})`} // Use CSS variable for stroke color
        strokeWidth="2"
        fill="none"
      />

      {/* Label Group (Only render if label is provided) */}
      {label && (
        <g
          // Rotation transform for the label group
          transform={`rotate(${angle},${width / 2},${height / 2})`}
        >
          {/* Label Background (Fill Label) */}
          <text
            fontFamily="Courier New, monospace"
            x="50%"
            y="50%"
            fill={`var(${fillColorVar})`}
            textAnchor="middle"
            fontSize="smaller"
            dominantBaseline="middle"
          >
            {`◀${fillLabel}▶`}
          </text>

          {/* Actual Label Text */}
          <text
            fontFamily="Courier New, monospace"
            x="50%"
            y="50%"
            fill={`var(${labelColorVar})`}
            textAnchor="middle"
            fontSize="smaller"
            dominantBaseline="middle"
          >
            {label}
          </text>
        </g>
      )}
    </Box>
  );
};
