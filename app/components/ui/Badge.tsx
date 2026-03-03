import { cn } from "@/lib/utils/cn";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "success" | "muted";
  className?: string;
}

const variants = {
  default: "bg-yonsei-blue/10 text-yonsei-blue",
  accent: "bg-accent/10 text-accent",
  success: "bg-emerald-50 text-emerald-700",
  muted: "bg-gray-100 text-text-secondary",
};

export default function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
