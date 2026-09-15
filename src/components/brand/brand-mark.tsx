import * as React from "react";
import { cn } from "@/lib/utils";

interface BrandMarkProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
}

export function BrandMark({ size = 32, className, ...props }: BrandMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="BREW 9 Brand Icon"
      className={cn("shrink-0", className)}
      {...props}
    >
      {/* Background rounded squircle tile */}
      <rect width="100" height="100" rx="28" fill="currentColor" fillOpacity="0.08" />
      <rect x="2" y="2" width="96" height="96" rx="26" stroke="currentColor" strokeWidth="3" strokeOpacity="0.2" />

      {/* Main Bold 9 shape */}
      {/* Outer loop of the 9 */}
      <path
        d="M50 16C31.2 16 16 31.2 16 50C16 68.8 31.2 84 50 84C62.5 84 73.3 77.2 79.1 67.2C81.4 63.2 79.6 58 75.3 56.5C71.3 55.1 66.8 57.2 65 60.8C61.4 68 53.6 72 45 70C36.8 68.1 30.2 61.5 28.3 53.3C33.8 57.5 40.6 60 48 60C64.6 60 78 46.6 78 30C78 22.3 75.1 16 50 16ZM50 26C62.2 26 72 35.8 72 48C72 60.2 62.2 70 50 70C37.8 70 28 60.2 28 48C28 35.8 37.8 26 50 26Z"
        fill="currentColor"
      />

      {/* Coffee bean inside the top head of the 9 */}
      <g transform="translate(36, 28) scale(0.28)">
        {/* Left half of coffee bean */}
        <path
          d="M48 6C26 8 8 26 6 48C4 70 20 90 44 94C47 94 49 92 48 89C46 72 44 56 49 40C52 28 50 15 48 6Z"
          fill="currentColor"
        />
        {/* Right half of coffee bean */}
        <path
          d="M56 6C78 8 96 26 98 48C100 70 84 90 60 94C57 94 55 92 56 89C58 72 60 56 55 40C52 28 54 15 56 6Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
}
