"use client";

import { useState } from "react";
import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

interface RatingInputProps {
  value: number;
  onChange: (value: number) => void;
  count?: number;
  className?: string;
}

export default function RatingInput({
  value,
  onChange,
  count = 5,
  className,
}: RatingInputProps) {
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const handleMouseOver = (index: number) => {
    setHoverValue(index);
  };

  const handleMouseLeave = () => {
    setHoverValue(null);
  };

  const handleClick = (index: number) => {
    onChange(index);
  };

  return (
    <div
      className={cn("flex items-center", className)}
      onMouseLeave={handleMouseLeave}
    >
      {[...Array(count)].map((_, index) => {
        const ratingValue = index + 1;

        return (
          <Star
            key={index}
            className={cn(
              "h-6 w-6 cursor-pointer transition-colors",
              (
                hoverValue !== null
                  ? ratingValue <= hoverValue
                  : ratingValue <= value
              )
                ? "text-yellow-400 fill-yellow-400"
                : "text-muted-foreground",
              "mr-1"
            )}
            onMouseOver={() => handleMouseOver(ratingValue)}
            onClick={() => handleClick(ratingValue)}
          />
        );
      })}
      <span className="ml-2 text-sm text-muted-foreground">
        {value > 0 ? `${value} of ${count} stars` : "Select rating"}
      </span>
    </div>
  );
}
