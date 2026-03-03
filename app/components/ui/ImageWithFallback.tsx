"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils/cn";
import { User } from "lucide-react";

interface ImageWithFallbackProps {
  src: string | null;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  fill?: boolean;
}

export default function ImageWithFallback({
  src,
  alt,
  width,
  height,
  className,
  fill,
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false);

  if (!src || error) {
    return (
      <div
        className={cn(
          "bg-gray-100 flex items-center justify-center",
          className
        )}
        style={!fill ? { width, height } : undefined}
      >
        <User className="w-8 h-8 text-gray-400" />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      fill={fill}
      className={cn("object-cover", className)}
      onError={() => setError(true)}
      unoptimized={src.startsWith("/images/")}
    />
  );
}
