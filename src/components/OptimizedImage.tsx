"use client";

import Image, { ImageProps } from "next/image";

interface OptimizedImageProps extends Omit<ImageProps, "decoding"> {
  loading?: "lazy" | "eager";
}

export default function OptimizedImage({
  loading = "lazy",
  className = "",
  alt = "",
  ...props
}: OptimizedImageProps) {
  return (
    <Image
      {...props}
      alt={alt}
      loading={loading}
      decoding="async"
      className={className}
    />
  );
}
