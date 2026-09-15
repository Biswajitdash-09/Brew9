import Link from "next/link";
import { BrandMark } from "./brand-mark";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showTagline?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "light" | "dark";
}

export function Logo({
  className,
  showTagline = false,
  size = "md",
  variant = "light",
}: LogoProps) {
  const iconSizes = {
    sm: 26,
    md: 34,
    lg: 44,
  };

  const textSizes = {
    sm: "text-lg tracking-tight",
    md: "text-2xl tracking-tight",
    lg: "text-3xl tracking-tight",
  };

  const isDark = variant === "dark";

  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex items-center gap-2.5 font-bold tracking-tight transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md px-1 py-0.5",
        isDark ? "text-[#F5EBDD]" : "text-[#3A2418]",
        className
      )}
      aria-label="BREW 9 Home"
    >
      <BrandMark
        size={iconSizes[size]}
        className={cn(
          "transition-transform group-hover:scale-105",
          isDark ? "text-[#F5EBDD]" : "text-[#3A2418]"
        )}
      />
      <div className="flex flex-col">
        <span
          className={cn(
            "font-black uppercase leading-none flex items-center gap-1",
            textSizes[size]
          )}
        >
          BREW{" "}
          <span
            className={cn(
              "font-black px-1.5 py-0.5 rounded text-[0.9em]",
              isDark ? "bg-[#3A2418] text-[#F5EBDD]" : "bg-[#D8C2A8]/70 text-[#3A2418]"
            )}
          >
            9
          </span>
        </span>
        {showTagline && (
          <span
            className={cn(
              "text-[9px] sm:text-[10px] tracking-[0.2em] uppercase font-bold mt-0.5",
              isDark ? "text-[#D8C2A8]" : "text-[#6B5546]"
            )}
          >
            YOUR 9-TO-9 BREW
          </span>
        )}
      </div>
    </Link>
  );
}
