"use client";

import { cn } from "@/lib/utils/cn";

interface FilterBarProps {
  filters: { value: string; label: string }[];
  active: string;
  onChange: (value: string) => void;
}

export default function FilterBar({
  filters,
  active,
  onChange,
}: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onChange(filter.value)}
          className={cn(
            "px-4 py-2 text-sm font-medium rounded-full transition-all",
            active === filter.value
              ? "bg-yonsei-blue text-white shadow-sm"
              : "bg-gray-100 text-text-secondary hover:bg-gray-200"
          )}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
