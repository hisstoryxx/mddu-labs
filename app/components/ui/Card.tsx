import { cn } from "@/lib/utils/cn";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export default function Card({
  children,
  className,
  hover = true,
  onClick,
}: CardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "bg-surface-elevated rounded-2xl border border-border overflow-hidden",
        hover &&
          "transition-all duration-300 hover:shadow-lg hover:border-accent/30 hover:-translate-y-0.5",
        className
      )}
    >
      {children}
    </div>
  );
}
