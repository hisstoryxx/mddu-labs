"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Mail, Phone } from "lucide-react";
import type { Member, ProfessorDetail } from "@/lib/types/database";
import { cn } from "@/lib/utils/cn";
import Card from "@/app/components/ui/Card";

interface ProfessorProfileProps {
  member: Member;
  details: ProfessorDetail[];
}

export default function ProfessorProfile({
  member,
  details,
}: ProfessorProfileProps) {
  const [openSections, setOpenSections] = useState<Set<string>>(new Set());

  const toggleSection = (id: string) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="space-y-6">
      <Card hover={false} className="p-6 lg:p-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-shrink-0">
            <div className="w-40 h-52 rounded-xl overflow-hidden bg-gray-100">
              {member.photo_url && (
                <img
                  src={member.photo_url}
                  alt={member.name_en}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </div>

          <div className="flex-1">
            <h2 className="text-2xl font-bold text-text-primary">
              {member.name}{" "}
              <span className="text-text-secondary font-normal text-lg">
                {member.bio}
              </span>
            </h2>
            <p className="text-text-secondary mt-1">{member.name_en}</p>

            <div className="mt-4 space-y-2">
              <p className="text-sm">
                <span className="font-medium text-text-secondary">
                  Field of Specialty:
                </span>{" "}
                Medical Engineering
              </p>
              {member.email && (
                <p className="text-sm flex items-center gap-2">
                  <Mail className="w-4 h-4 text-text-muted" />
                  {member.email}
                </p>
              )}
              <p className="text-sm flex items-center gap-2">
                <Phone className="w-4 h-4 text-text-muted" />
                02-2019-5442
              </p>
            </div>

            {member.research_interests.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-semibold text-text-secondary mb-2">
                  Research Interests
                </h4>
                <div className="flex flex-wrap gap-2">
                  {member.research_interests.map((ri, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-accent-light text-accent text-xs rounded-full"
                    >
                      {ri}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>

      {details.map((detail) => (
        <Card key={detail.id} hover={false}>
          <button
            onClick={() => toggleSection(detail.id)}
            className="w-full flex items-center justify-between p-5 text-left"
          >
            <h3 className="text-lg font-semibold text-text-primary">
              {detail.section_type}
            </h3>
            <ChevronDown
              className={cn(
                "w-5 h-5 text-text-muted transition-transform",
                openSections.has(detail.id) && "rotate-180"
              )}
            />
          </button>
          <AnimatePresence>
            {openSections.has(detail.id) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="px-5 pb-5 space-y-1.5">
                  {Array.isArray(detail.items) ? (
                    (detail.items as string[]).map((item, i) => (
                      <p key={i} className="text-sm text-text-secondary">
                        {item}
                      </p>
                    ))
                  ) : (
                    Object.entries(
                      detail.items as Record<string, string[]>
                    ).map(([agency, projects]) => (
                      <div key={agency} className="mb-3">
                        <p className="text-sm font-semibold text-yonsei-blue">
                          {agency}
                        </p>
                        {projects.map((proj, i) => (
                          <p
                            key={i}
                            className="text-sm text-text-secondary ml-4"
                          >
                            {proj}
                          </p>
                        ))}
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      ))}
    </div>
  );
}
