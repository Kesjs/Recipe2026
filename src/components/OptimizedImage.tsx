"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";

interface OptimizedImageProps extends Omit<ImageProps, "decoding"> {
  loading?: "lazy" | "eager";
  blurAmount?: number;
  transitionDuration?: number;
}

export default function OptimizedImage({
  loading = "lazy",
  blurAmount = 10,
  transitionDuration = 300,
  className = "",
  alt = "",
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Skeleton loader - visible until image loads */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-zinc-200 animate-pulse" />
      )}

      <Image
        {...props}
        alt={alt}
        loading={loading}
        decoding="async"
        className={`transition-all duration-${transitionDuration} ${
          isLoaded ? "blur-0" : `blur-[${blurAmount}px]`
        }`}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
}
