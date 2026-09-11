// A row of compact label/value tiles: the stat strips that fill terminal
// headers (24h H/L, volume, VWAP, spread…).
import * as React from "react"
import { useSandboxColors } from "#adaptive-view/sandbox/sandbox-manager/sandboxTheme"
import { tnum } from "../../constants"

export const StatStrip: React.FC<{ children: React.ReactNode; cols?: number }> = ({ children, cols }) => {
  const c = useSandboxColors()
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: cols ? `repeat(${cols}, 1fr)` : "repeat(auto-fit, minmax(56px, 1fr))",
        gap: 1,
        background: c.border,
        borderBottom: `1px solid ${c.border}`,
        flexShrink: 0,
      }}
    >
      {children}
    </div>
  )
}

export const Stat: React.FC<{
  label: string
  value: React.ReactNode
  color?: string
  title?: string
}> = ({ label, value, color, title }) => {
  const c = useSandboxColors()
  return (
    <div
      title={title}
      style={{
        background: c.elevated,
        padding: "5px 8px 6px",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        minWidth: 0,
      }}
    >
      <span
        style={{
          fontSize: 9,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: c.textMuted,
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>
      <span
        style={{
          ...tnum,
          fontSize: 11.5,
          color: color ?? c.textSecondary,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {value}
      </span>
    </div>
  )
}



// Proportion bar (allocation, fill progress, depth).
export const MiniBar: React.FC<{
  pct: number;
  color: string;
  height?: number;
  track?: boolean;
}> = ({ pct, color, height = 4, track = true }) => {
  const c = useSandboxColors();
  return (
    <div
      style={{
        height,
        borderRadius: height,
        background: track ? c.surface : 'transparent',
        overflow: 'hidden',
        width: '100%',
      }}
    >
      <div
        style={{
          height: '100%',
          width: '100%',
          background: color,
          borderRadius: height,
          transformOrigin: 'left',
          transform: `scaleX(${Math.max(0, Math.min(100, pct)) / 100})`,
          transition: 'transform 0.3s ease',
          willChange: 'transform',
        }}
      />
    </div>
  );
};

// Day-range bar: low ── marker ── high.
export const RangeBar: React.FC<{
  low: number;
  high: number;
  value: number;
  color: string;
}> = ({ low, high, value, color }) => {
  const c = useSandboxColors();
  const pct =
    high > low ? ((value - low) / (high - low)) * 100 : 50;
  return (
    <div
      style={{
        position: 'relative',
        height: 3,
        borderRadius: 3,
        background: `linear-gradient(90deg, ${c.red}55, ${c.textFaint}, ${c.green}55)`,
        width: '100%',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: -1.5,
          left: `${Math.max(0, Math.min(100, pct))}%`,
          transform: 'translateX(-50%)',
          width: 2,
          height: 6,
          borderRadius: 2,
          background: color,
          boxShadow: `0 0 3px ${color}`,
        }}
      />
    </div>
  );
};

export const Sparkline: React.FC<{
  prices: number[];
  color: string;
  width?: number;
  height?: number;
  fill?: boolean;
}> = ({ prices, color, width = 56, height = 20, fill = false }) => {
  // useId() contains ':' which is invalid inside an SVG url(#…) reference,
  // so strip non-alphanumerics before using it as a gradient id.
  const id = 'spk' + React.useId().replace(/[^a-zA-Z0-9]/g, '');
  if (prices.length < 2) {
    return <div style={{ width, height, flexShrink: 0 }} />;
  }
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const range = max - min || 1;
  const pt = (p: number, i: number) => {
    const x = (i / (prices.length - 1)) * width;
    const y = height - ((p - min) / range) * (height - 3) - 1.5;
    return [x, y] as const;
  };
  const line = prices.map((p, i) => pt(p, i).join(',')).join(' ');
  const area = `0,${height} ${line} ${width},${height}`;
  return (
    <svg width={width} height={height} style={{ flexShrink: 0, display: 'block' }}>
      {fill && (
        <>
          <defs>
            <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.28} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <polygon points={area} fill={`url(#${id})`} />
        </>
      )}
      <polyline
        points={line}
        fill="none"
        stroke={color}
        strokeWidth={1.4}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
};
