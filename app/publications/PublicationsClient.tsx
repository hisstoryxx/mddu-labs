"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import type { Publication, PubType } from "@/lib/types/database";
import PageTransition from "@/app/components/ui/PageTransition";
import SectionTitle from "@/app/components/ui/SectionTitle";
import FilterBar from "@/app/components/ui/FilterBar";
import Badge from "@/app/components/ui/Badge";
import { BookOpen, Globe, FileText, Award, BookMarked } from "lucide-react";

interface PublicationsClientProps {
  publications: Publication[];
  initialType: string;
}

const typeFilters = [
  { value: "all", label: "All" },
  { value: "international_journal", label: "International Journals" },
  { value: "domestic_journal", label: "Domestic Journals" },
  { value: "international_conference", label: "Int'l Conferences" },
  { value: "domestic_conference", label: "Domestic Conferences" },
  { value: "patent", label: "Patents" },
  { value: "book", label: "Books" },
];

const typeLabels: Record<string, string> = {
  international_journal: "International Journal",
  domestic_journal: "Domestic Journal",
  international_conference: "Int'l Conference",
  domestic_conference: "Domestic Conference",
  patent: "Patent",
  book: "Book",
};

const typeIcons: Record<string, typeof BookOpen> = {
  international_journal: Globe,
  domestic_journal: BookOpen,
  international_conference: Globe,
  domestic_conference: FileText,
  patent: Award,
  book: BookMarked,
};

export default function PublicationsClient({
  publications,
  initialType,
}: PublicationsClientProps) {
  const router = useRouter();
  const [activeType, setActiveType] = useState(initialType);

  const filtered =
    activeType === "all"
      ? publications
      : publications.filter((p) => p.pub_type === activeType);

  const handleTypeChange = (val: string) => {
    setActiveType(val);
    if (val === "all") {
      router.push("/publications", { scroll: false });
    } else {
      router.push(`/publications?type=${val}`, { scroll: false });
    }
  };

  // Group by year
  const grouped = filtered.reduce<Record<number, Publication[]>>(
    (acc, pub) => {
      if (!acc[pub.year]) acc[pub.year] = [];
      acc[pub.year].push(pub);
      return acc;
    },
    {}
  );
  const years = Object.keys(grouped)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <PageTransition>
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <SectionTitle
          title="Publications"
          subtitle="논문, 학회, 특허, 저서"
        />

        <div className="mb-10">
          <FilterBar
            filters={typeFilters}
            active={activeType}
            onChange={handleTypeChange}
          />
        </div>

        <div className="space-y-10">
          {years.map((year) => (
            <div key={year}>
              <h3 className="text-xl font-bold text-text-primary mb-4 font-heading">
                {year}
              </h3>
              <div className="space-y-3">
                {grouped[year].map((pub, i) => {
                  const Icon =
                    typeIcons[pub.pub_type] || BookOpen;
                  return (
                    <motion.div
                      key={pub.id}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.03 }}
                      className="flex gap-3 p-4 bg-white rounded-xl border border-border hover:border-accent/30 transition-colors"
                    >
                      <Icon className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-text-primary leading-snug">
                          {pub.title}
                        </p>
                        <p className="text-xs text-text-secondary mt-1">
                          {pub.authors}
                        </p>
                        {pub.venue && (
                          <p className="text-xs text-text-muted mt-0.5 italic">
                            {pub.venue}
                          </p>
                        )}
                        <Badge
                          variant="muted"
                          className="mt-2"
                        >
                          {typeLabels[pub.pub_type]}
                        </Badge>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-text-muted py-20">
            해당 유형의 출판물이 없습니다.
          </p>
        )}
      </div>
    </PageTransition>
  );
}
