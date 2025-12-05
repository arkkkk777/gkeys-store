// components/ui/game-item-card.tsx

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Calendar, ShoppingCart } from "lucide-react";

// --- PROPS INTERFACE ---
interface GameItemCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration' | 'onDragStart' | 'onDrag' | 'onDragEnd'> {
  imageUrl: string;
  isBestSeller: boolean;
  isNew?: boolean;
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
    const savings = originalPrice && originalPrice > price ? originalPrice - price : 0;
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
          "relative flex flex-col w-full max-w-sm overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm group",
          className
        )}
        variants={cardVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
        layout
        {...props}
      >
        {/* --- IMAGE & ADD BUTTON CONTAINER --- */}
        <div className="relative overflow-hidden rounded-t-xl">
          <img
            src={imageUrl}
            alt={title}
            className="object-cover w-full h-48 transition-transform duration-300 ease-in-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

          {/* --- BEST SELLER / NEW BADGE --- */}
          {(isBestSeller || isNew) && (
            <motion.div 
              className="absolute top-3 right-3"
              variants={badgeVariants}
              aria-label={isBestSeller ? "Best Seller" : "New Game"}
            >
              <div className={cn(
                "px-2 py-1 text-xs font-bold uppercase rounded-md border",
                isBestSeller 
                  ? "border-[#b4ff00] bg-[#b4ff00]/20 text-[#b4ff00]" 
                  : "border-blue-500 bg-blue-500/20 text-blue-400"
              )}>
                {isBestSeller ? "Best Seller" : "New"}
              </div>
            </motion.div>
          )}

          {/* --- DISCOUNT BADGE --- */}
          {discount > 0 && (
            <motion.div 
              className="absolute top-3 left-3"
              variants={badgeVariants}
            >
              <div className="px-2 py-1 text-xs font-bold uppercase rounded-md bg-red-500 text-white border border-red-600">
                -{discount}%
              </div>
            </motion.div>
          )}

          {/* --- ADD BUTTON (FIXED) --- */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full flex justify-center">
            <motion.button
              type="button"
              onClick={onAdd}
              variants={buttonVariants}
              whileTap="tap"
              className="px-8 py-2 text-sm font-bold uppercase transition-all duration-300 transform translate-y-4 border rounded-lg shadow-lg opacity-0 bg-background/80 text-foreground backdrop-blur-sm border-border/50 group-hover:opacity-100 group-hover:translate-y-0 hover:bg-[#b4ff00] hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b4ff00] focus-visible:ring-offset-2"
              aria-label={`Add ${title} to cart`}
            >
              <ShoppingCart className="inline-block w-4 h-4 mr-2" />
              Add to Cart
            </motion.button>
          </div>
        </div>

        {/* --- CONTENT SECTION (FIXED PADDING) --- */}
        <div className="flex flex-col flex-grow p-4 text-left">
          {/* --- PRICING --- */}
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-foreground">€{price.toFixed(2)}</span>
            {originalPrice && originalPrice > price && (
              <>
                <span className="text-sm line-through text-muted-foreground">€{originalPrice.toFixed(2)}</span>
                {savings > 0 && (
                  <span className="text-sm font-semibold text-[#b4ff00]">SAVE €{savings.toFixed(2)}</span>
                )}
              </>
            )}
          </div>
          
          {/* --- PLATFORM --- */}
          <p className="mt-1 text-sm text-muted-foreground">{platform}</p>
          
          {/* --- GENRE (if provided) --- */}
          {genre && (
            <p className="text-xs text-muted-foreground/80">{genre}</p>
          )}
          
          {/* --- GAME TITLE --- */}
          <h3 className="mt-2 text-base font-semibold leading-tight text-foreground line-clamp-2">{title}</h3>
          
          {/* --- RELEASE DATE --- */}
          {releaseDate && (
            <div className="flex items-center gap-1.5 mt-auto pt-2 text-xs text-muted-foreground">
              <Calendar className="w-3 h-3" />
              <span>{new Date(releaseDate).getFullYear()}</span>
            </div>
          )}
        </div>
      </motion.div>
    );
  }
);

GameItemCard.displayName = "GameItemCard";

export { GameItemCard };
