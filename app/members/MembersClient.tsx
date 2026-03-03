"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Member, ProfessorDetail } from "@/lib/types/database";
import PageTransition from "@/app/components/ui/PageTransition";
import SectionTitle from "@/app/components/ui/SectionTitle";
import FilterBar from "@/app/components/ui/FilterBar";
import ProfessorProfile from "@/app/components/members/ProfessorProfile";
import StudentCard from "@/app/components/members/StudentCard";
import AlumniCard from "@/app/components/members/AlumniCard";
import StaffCard from "@/app/components/members/StaffCard";
import InternList from "@/app/components/members/InternList";
import Modal from "@/app/components/ui/Modal";
import { motion } from "framer-motion";

interface MembersClientProps {
  members: Member[];
  professorData: { member: Member; details: ProfessorDetail[] } | null;
  initialRole: string;
}

const roleFilters = [
  { value: "professor", label: "Professor" },
  { value: "students", label: "Students" },
  { value: "alumni", label: "Alumni" },
  { value: "intern", label: "Interns" },
  { value: "staff", label: "Staff" },
];

export default function MembersClient({
  members,
  professorData,
  initialRole,
}: MembersClientProps) {
  const router = useRouter();
  const [activeRole, setActiveRole] = useState(initialRole);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  const handleRoleChange = (role: string) => {
    setActiveRole(role);
    router.push(`/members?role=${role}`, { scroll: false });
  };

  const students = members.filter((m) =>
    ["phd", "ms_phd", "ms"].includes(m.role)
  );
  const alumniMembers = members.filter((m) => m.role === "alumni");
  const interns = members.filter((m) => m.role === "intern");
  const staff = members.filter((m) => m.role === "staff");

  return (
    <PageTransition>
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <SectionTitle title="Members" subtitle="연구실 구성원" />

        <div className="mb-10">
          <FilterBar
            filters={roleFilters}
            active={activeRole}
            onChange={handleRoleChange}
          />
        </div>

        {activeRole === "professor" && professorData && (
          <ProfessorProfile
            member={professorData.member}
            details={professorData.details}
          />
        )}

        {activeRole === "students" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {students.map((member, i) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <StudentCard
                  member={member}
                  onClick={() => setSelectedMember(member)}
                />
              </motion.div>
            ))}
          </div>
        )}

        {activeRole === "alumni" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {alumniMembers.map((member, i) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <AlumniCard member={member} />
              </motion.div>
            ))}
          </div>
        )}

        {activeRole === "intern" && <InternList interns={interns} />}

        {activeRole === "staff" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {staff.map((member) => (
              <StaffCard key={member.id} member={member} />
            ))}
          </div>
        )}
      </div>

      <Modal
        isOpen={!!selectedMember}
        onClose={() => setSelectedMember(null)}
        title={selectedMember?.name_en || ""}
      >
        {selectedMember && (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                {selectedMember.photo_url && (
                  <img
                    src={selectedMember.photo_url}
                    alt={selectedMember.name_en}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div>
                <h3 className="text-xl font-bold">{selectedMember.name}</h3>
                <p className="text-text-secondary">
                  {selectedMember.course_label}
                </p>
              </div>
            </div>
            {selectedMember.education.length > 0 && (
              <div>
                <h4 className="font-semibold text-sm text-text-secondary mb-1">
                  Education
                </h4>
                {selectedMember.education.map((edu, i) => (
                  <p key={i} className="text-sm text-text-primary">
                    {edu}
                  </p>
                ))}
              </div>
            )}
            {selectedMember.research_interests.length > 0 && (
              <div>
                <h4 className="font-semibold text-sm text-text-secondary mb-1">
                  Research Interests
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedMember.research_interests.map((ri, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 bg-accent-light text-accent text-xs rounded-full"
                    >
                      {ri}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {selectedMember.email && (
              <div>
                <h4 className="font-semibold text-sm text-text-secondary mb-1">
                  Contact
                </h4>
                <p className="text-sm">{selectedMember.email}</p>
              </div>
            )}
          </div>
        )}
      </Modal>
    </PageTransition>
  );
}
