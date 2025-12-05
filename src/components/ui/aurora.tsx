// components/ui/aurora.tsx

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AuroraProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration' | 'onDragStart' | 'onDrag' | 'onDragEnd'> {
  className?: string;
  color?: string;
  intensity?: number;
}

const Aurora = React.forwardRef<HTMLDivElement, AuroraProps>(
  (
    {
      className,
      color = "#b4ff00",
      intensity = 0.3,
      ...props
    },
    ref
  ) => {
    const auroraVariants = {
      animate: {
        background: [
          `radial-gradient(circle at 20% 50%, ${color}${Math.round(intensity * 255).toString(16).padStart(2, '0')} 0%, transparent 50%)`,
          `radial-gradient(circle at 80% 80%, ${color}${Math.round(intensity * 255).toString(16).padStart(2, '0')} 0%, transparent 50%)`,
          `radial-gradient(circle at 40% 20%, ${color}${Math.round(intensity * 255).toString(16).padStart(2, '0')} 0%, transparent 50%)`,
          `radial-gradient(circle at 20% 50%, ${color}${Math.round(intensity * 255).toString(16).padStart(2, '0')} 0%, transparent 50%)`,
        ],
      },
    };

    return (
      <motion.div
        ref={ref}
        className={cn(
          "absolute inset-0 pointer-events-none overflow-hidden",
          className
        )}
        variants={auroraVariants}
        animate="animate"
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          mixBlendMode: "screen",
          opacity: intensity,
          willChange: "background",
        }}
        {...props}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 30% 40%, ${color}40 0%, transparent 60%)`,
            filter: "blur(60px)",
            transform: "scale(1.5)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 70% 60%, ${color}30 0%, transparent 60%)`,
            filter: "blur(80px)",
            transform: "scale(1.3)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${color}20 0%, transparent 70%)`,
            filter: "blur(100px)",
            transform: "scale(1.2)",
          }}
        />
      </motion.div>
    );
  }
);

Aurora.displayName = "Aurora";

export { Aurora };
