"use client";

import { motion } from "framer-motion";
import type { Member } from "@/lib/types/database";

interface InternListProps {
  interns: Member[];
}

export default function InternList({ interns }: InternListProps) {
  return (
    <div className="space-y-3">
      {interns.map((intern, i) => (
        <motion.div
          key={intern.id}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.03 }}
          className="flex items-center gap-4 p-4 bg-white rounded-xl border border-border"
        >
          <div className="flex-1">
            <p className="font-medium text-text-primary">
              {intern.name_en}
              <span className="text-text-muted text-sm ml-2">
                {intern.name}
              </span>
            </p>
            {intern.period && (
              <p className="text-xs text-text-secondary mt-0.5">
                {intern.period}
              </p>
            )}
          </div>
          {intern.affiliation && (
            <span className="text-xs text-accent bg-accent-light px-2 py-0.5 rounded-full">
              {intern.affiliation}
            </span>
          )}
        </motion.div>
      ))}
    </div>
  );
}
