import React from "react";

/**
 * NeonSkull — hand-drawn outline skull with X-eyes,
 * glowing in any color via the `color` prop.
 * Pass `glow={false}` to disable the neon drop-shadow filter.
 */
const NeonSkull = ({
  color = "#39FF14",
  size = 80,
  strokeWidth = 2.4,
  glow = true,
  intensity = 1,
  className = "",
  style,
}) => {
  const filter = glow
    ? `drop-shadow(0 0 ${4 * intensity}px ${color})
       drop-shadow(0 0 ${10 * intensity}px ${color})
       drop-shadow(0 0 ${22 * intensity}px ${color})`
    : "none";

  return (
    <svg
      viewBox="0 0 100 110"
      width={size}
      height={size * 1.1}
      className={className}
      style={{ color, filter, ...style }}
      aria-hidden="true"
    >
      {/* cranium + jaw outline */}
      <path
        d="
          M 50 4
          C 23 4, 10 24, 11 47
          C 11.5 60, 16 71, 22 79
          L 24 90
          L 31 92
          L 31 99
          L 38 96
          L 42 102
          L 50 97
          L 58 102
          L 62 96
          L 69 99
          L 69 92
          L 76 90
          L 78 79
          C 84 71, 88.5 60, 89 47
          C 90 24, 77 4, 50 4 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* eye sockets */}
      <ellipse cx="35" cy="48" rx="9.5" ry="11.5" fill="rgba(0,0,0,0.85)" stroke="currentColor" strokeWidth={strokeWidth * 0.8} />
      <ellipse cx="65" cy="48" rx="9.5" ry="11.5" fill="rgba(0,0,0,0.85)" stroke="currentColor" strokeWidth={strokeWidth * 0.8} />
      {/* X eyes */}
      <g stroke="#ffffff" strokeWidth={strokeWidth} strokeLinecap="round">
        <line x1="30" y1="42" x2="40" y2="54" />
        <line x1="40" y1="42" x2="30" y2="54" />
        <line x1="60" y1="42" x2="70" y2="54" />
        <line x1="70" y1="42" x2="60" y2="54" />
      </g>
      {/* nose */}
      <path
        d="M 50 60 L 45 70 L 50 73 L 55 70 Z"
        fill="currentColor"
        opacity="0.55"
      />
      {/* teeth */}
      <g stroke="currentColor" strokeWidth={strokeWidth * 0.7} strokeLinecap="round">
        <line x1="38" y1="84" x2="38" y2="92" />
        <line x1="44" y1="84" x2="44" y2="94" />
        <line x1="50" y1="84" x2="50" y2="94" />
        <line x1="56" y1="84" x2="56" y2="94" />
        <line x1="62" y1="84" x2="62" y2="92" />
      </g>
    </svg>
  );
};

export default NeonSkull;

/* Brand neon palette */
export const NEON = {
  yellow: "#FFF200",
  green:  "#39FF14",
  blue:   "#00D4FF",
  orange: "#FF6A1A",
};

export const NEON_LIST = [NEON.yellow, NEON.green, NEON.blue, NEON.orange];
