// components/ui/game-item-card.tsx

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";

// --- PROPS INTERFACE ---
interface GameItemCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration' | 'onDragStart' | 'onDrag' | 'onDragEnd'> {
  imageUrl: string;
  isBestSeller: boolean;
  isNew?: boolean;
  isPreorder?: boolean;
  title: string;
  price: number;
  originalPrice?: number;
  platform: string;
  genre?: string;
  releaseDate?: string;
  onAdd: () => void;
}

const GameItemCard = React.forwardRef<HTMLDivElement, GameItemCardProps>(
  (
    {
      className,
      imageUrl,
      isBestSeller,
      isNew = false,
      isPreorder = false,
      title,
      price,
      originalPrice,
      platform,
      genre,
      releaseDate,
      onAdd,
      ...props
    },
    ref
  ) => {
    const discount = originalPrice && originalPrice > price
      ? Math.round((1 - price / originalPrice) * 100)
      : 0;

    // --- ANIMATION VARIANTS ---
    const cardVariants = {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
      hover: { scale: 1.03, transition: { duration: 0.2 } },
    };
    
    const buttonVariants = {
      tap: { scale: 0.95 },
    };

    const badgeVariants = {
      initial: { scale: 0 },
      animate: { 
        scale: 1, 
        transition: { 
          delay: 0.3, 
          type: "spring" as const, 
          stiffness: 200 
        } 
      },
    };

    return (
      <motion.div
        ref={ref}
        className={cn(
          "relative flex flex-col w-full max-w-sm min-w-0 overflow-hidden rounded-design-xl border border-design-border bg-design-surface text-design-text shadow-card group transition-transform",
          className
        )}
        variants={cardVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
        layout
        {...props}
      >
        {/* --- IMAGE & OVERLAYS --- */}
        <div className="relative overflow-hidden rounded-t-3xl aspect-square">
          <img
            src={imageUrl}
            alt={title}
            loading="lazy"
            className="object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-105"
          />

          {/* Dark gradient for bottom overlay - starts from 40-50% height */}
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 via-black/60 to-transparent pointer-events-none" />

          {/* --- BADGES (Best Seller, New, Preorder) --- */}
          {(isBestSeller || isNew || isPreorder) && (
            <motion.div
              className="absolute top-2 right-2 design-mobile:top-1.5 design-mobile:right-1.5 z-10 flex flex-col gap-1"
              variants={badgeVariants}
            >
              {isBestSeller && (
                <div
                  className="px-3 py-1 design-mobile:px-2 design-mobile:py-0.5 text-xs design-mobile:text-[10px] font-bold uppercase rounded-full shadow-sm bg-design-primary text-black"
                  aria-label="Best Seller"
                >
                  Best Seller
                </div>
              )}
              {!isBestSeller && isNew && (
                <div
                  className="px-3 py-1 design-mobile:px-2 design-mobile:py-0.5 text-xs design-mobile:text-[10px] font-bold uppercase rounded-full shadow-sm bg-design-accent text-black"
                  aria-label="New Game"
                >
                  New
                </div>
              )}
              {!isBestSeller && !isNew && isPreorder && (
                <div
                  className="px-3 py-1 design-mobile:px-2 design-mobile:py-0.5 text-xs design-mobile:text-[10px] font-bold uppercase rounded-full shadow-sm bg-blue-500 text-white"
                  aria-label="Preorder"
                >
                  Preorder
                </div>
              )}
            </motion.div>
          )}

          {/* --- PRICE OVERLAY --- */}
          <div className="absolute inset-x-0 bottom-0 p-3 design-mobile:p-2 flex flex-col gap-1.5 design-mobile:gap-1 z-10">
            {/* Price row: current price, original price, discount badge */}
            <div className="flex items-baseline gap-2 design-mobile:gap-1.5 flex-wrap">
              <span className="text-2xl design-mobile:text-xl design-tablet:text-lg font-extrabold text-white drop-shadow-lg">€{price.toFixed(2)}</span>
              {originalPrice && originalPrice > price && (
                <>
                  <span className="text-sm design-mobile:text-xs line-through text-white/70 align-baseline">€{originalPrice.toFixed(2)}</span>
                  {discount > 0 && (
                    <span className="px-2.5 design-mobile:px-2 py-1 design-mobile:py-0.5 text-xs design-mobile:text-[10px] font-bold rounded-full bg-design-primary text-black shadow-sm whitespace-nowrap">
                      -{discount}%
                    </span>
                  )}
                </>
              )}
            </div>
            {/* Title row */}
            <h3 className="text-sm design-mobile:text-xs font-semibold text-white line-clamp-2 drop-shadow-md leading-tight">{title}</h3>
          </div>
        </div>
      </motion.div>
    );
  }
);

GameItemCard.displayName = "GameItemCard";

export { GameItemCard };
