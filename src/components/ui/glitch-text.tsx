// components/ui/glitch-text.tsx

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlitchTextProps extends Omit<React.HTMLAttributes<HTMLHeadingElement>, 'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration' | 'onDragStart' | 'onDrag' | 'onDragEnd'> {
  children: React.ReactNode;
  intensity?: "low" | "medium" | "high";
  duration?: number;
  className?: string;
}

const GlitchText = React.forwardRef<HTMLHeadingElement, GlitchTextProps>(
  (
    {
      children,
      intensity = "medium",
      duration = 0.3,
      className,
      ...props
    },
    ref
  ) => {
    const intensityMap = {
      low: { offset: 2, blur: 0.5 },
      medium: { offset: 4, blur: 1 },
      high: { offset: 6, blur: 1.5 },
    };

    const config = intensityMap[intensity];

    const glitchVariants = {
      normal: {
        textShadow: `0 0 0 transparent`,
        transform: `translate(0, 0)`,
      },
      glitch: {
        textShadow: `
          ${config.offset}px 0 0 rgba(180, 255, 0, 0.5),
          -${config.offset}px 0 0 rgba(255, 0, 255, 0.5),
          0 ${config.offset}px 0 rgba(0, 255, 255, 0.5)
        `,
        transform: `translate(${config.offset * 0.5}px, 0)`,
        filter: `blur(${config.blur}px)`,
      },
    };

    const textContent = typeof children === 'string' ? children : String(children);

    return (
      <motion.h1
        ref={ref}
        className={cn("relative inline-block", className)}
        variants={glitchVariants}
        initial="normal"
        animate="normal"
        whileHover="glitch"
        transition={{
          duration,
          repeat: Infinity,
          repeatType: "reverse" as const,
          repeatDelay: 2,
        }}
        style={{
          willChange: "transform, filter, text-shadow",
        }}
        {...props}
      >
        <span
          className="absolute inset-0"
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 45%, 0 45%)",
            transform: "translate(2px, -2px)",
            color: "#b4ff00",
            opacity: 0.8,
            mixBlendMode: "screen",
            pointerEvents: "none",
            whiteSpace: "nowrap",
          }}
          aria-hidden="true"
        >
          {textContent}
        </span>
        <span
          className="absolute inset-0"
          style={{
            clipPath: "polygon(0 55%, 100% 55%, 100% 100%, 0 100%)",
            transform: "translate(-2px, 2px)",
            color: "#ff00ff",
            opacity: 0.8,
            mixBlendMode: "screen",
            pointerEvents: "none",
            whiteSpace: "nowrap",
          }}
          aria-hidden="true"
        >
          {textContent}
        </span>
        <span className="relative z-10">{children}</span>
      </motion.h1>
    );
  }
);

GlitchText.displayName = "GlitchText";

export { GlitchText };
