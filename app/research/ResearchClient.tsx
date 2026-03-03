"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import type { ResearchProject } from "@/lib/types/database";
import PageTransition from "@/app/components/ui/PageTransition";
import SectionTitle from "@/app/components/ui/SectionTitle";
import FilterBar from "@/app/components/ui/FilterBar";
import Card from "@/app/components/ui/Card";
import Badge from "@/app/components/ui/Badge";

interface ResearchClientProps {
  projects: ResearchProject[];
  initialCategory: string;
  initialStatus: string;
}

const categoryFilters = [
  { value: "all", label: "All" },
  { value: "CD", label: "Clinical Study Design" },
  { value: "UD", label: "UX/UI Design & Usability" },
  { value: "MI", label: "Medical Industry Policy" },
  { value: "BS", label: "Bio-Signal & AI" },
];

const statusFilters = [
  { value: "all", label: "All" },
  { value: "progressing", label: "Progressing" },
  { value: "closed", label: "Closed" },
];

const categoryLabels: Record<string, string> = {
  CD: "Clinical Study Design",
  UD: "UX/UI Design & Usability",
  MI: "Medical Industry Policy",
  BS: "Bio-Signal & AI",
};

export default function ResearchClient({
  projects,
  initialCategory,
  initialStatus,
}: ResearchClientProps) {
  const router = useRouter();
  const [category, setCategory] = useState(initialCategory);
  const [status, setStatus] = useState(initialStatus);

  const filtered = projects.filter((p) => {
    if (category !== "all" && p.category !== category) return false;
    if (status !== "all" && p.status !== status) return false;
    return true;
  });

  const handleCategoryChange = (val: string) => {
    setCategory(val);
    const params = new URLSearchParams();
    if (val !== "all") params.set("category", val);
    if (status !== "all") params.set("status", status);
    router.push(`/research?${params.toString()}`, { scroll: false });
  };

  const handleStatusChange = (val: string) => {
    setStatus(val);
    const params = new URLSearchParams();
    if (category !== "all") params.set("category", category);
    if (val !== "all") params.set("status", val);
    router.push(`/research?${params.toString()}`, { scroll: false });
  };

  return (
    <PageTransition>
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <SectionTitle
          title="Research"
          subtitle="연구 프로젝트"
        />

        <div className="space-y-4 mb-10">
          <FilterBar
            filters={categoryFilters}
            active={category}
            onChange={handleCategoryChange}
          />
          <FilterBar
            filters={statusFilters}
            active={status}
            onChange={handleStatusChange}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card>
                {project.image_url && (
                  <div className="relative aspect-[16/10] bg-gray-100">
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="default">
                      {categoryLabels[project.category] || project.category}
                    </Badge>
                    <Badge
                      variant={
                        project.status === "progressing" ? "success" : "muted"
                      }
                    >
                      {project.status === "progressing"
                        ? "Progressing"
                        : "Closed"}
                    </Badge>
                  </div>
                  <h3 className="text-sm font-semibold text-text-primary leading-snug">
                    {project.title}
                  </h3>
                  {project.period && (
                    <p className="text-xs text-text-muted mt-2">
                      {project.period}
                    </p>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-text-muted py-20">
            해당 조건의 연구 프로젝트가 없습니다.
          </p>
        )}
      </div>
    </PageTransition>
  );
}
