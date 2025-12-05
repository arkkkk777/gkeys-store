// components/ui/click-spark.tsx

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ClickSparkProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  color?: string;
  sparkCount?: number;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const ClickSpark = React.forwardRef<HTMLButtonElement, ClickSparkProps>(
  (
    {
      children,
      color = "#b4ff00",
      sparkCount = 8,
      className,
      onClick,
      ...props
    },
    ref
  ) => {
    const [sparks, setSparks] = React.useState<Array<{ id: number; x: number; y: number }>>([]);
    const buttonRef = React.useRef<HTMLButtonElement>(null);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const newSparks = Array.from({ length: sparkCount }, (_, i) => ({
          id: Date.now() + i,
          x,
          y,
        }));

        setSparks(newSparks);

        setTimeout(() => {
          setSparks((prev) => prev.filter((spark) => !newSparks.find((s) => s.id === spark.id)));
        }, 600);
      }

      onClick?.(e);
    };

    React.useImperativeHandle(ref, () => buttonRef.current as HTMLButtonElement);

    return (
      <button
        ref={buttonRef}
        className={cn("relative overflow-hidden", className)}
        onClick={handleClick}
        {...props}
      >
        {children}
        {sparks.map((spark) => (
          <SparkParticle
            key={spark.id}
            x={spark.x}
            y={spark.y}
            color={color}
          />
        ))}
      </button>
    );
  }
);

ClickSpark.displayName = "ClickSpark";

interface SparkParticleProps {
  x: number;
  y: number;
  color: string;
}

const SparkParticle: React.FC<SparkParticleProps> = ({ x, y, color }) => {
  const angle = Math.random() * Math.PI * 2;
  const distance = 30 + Math.random() * 40;
  const targetX = x + Math.cos(angle) * distance;
  const targetY = y + Math.sin(angle) * distance;

  return (
    <motion.div
      className="absolute pointer-events-none"
      initial={{
        x,
        y,
        opacity: 1,
        scale: 1,
      }}
      animate={{
        x: targetX,
        y: targetY,
        opacity: 0,
        scale: 0,
      }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
      }}
      style={{
        width: "4px",
        height: "4px",
        borderRadius: "50%",
        background: color,
        boxShadow: `0 0 8px ${color}, 0 0 16px ${color}`,
      }}
    />
  );
};

export { ClickSpark };
