"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
}

export default function SectionTitle({
  title,
  subtitle,
  className,
  align = "left",
}: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn(
        "mb-8",
        align === "center" && "text-center",
        className
      )}
    >
      <h2 className="text-3xl lg:text-4xl font-bold text-text-primary font-heading">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-text-secondary text-lg">{subtitle}</p>
      )}
      <div
        className={cn(
          "mt-4 h-1 w-16 bg-accent rounded-full",
          align === "center" && "mx-auto"
        )}
      />
    </motion.div>
  );
}
