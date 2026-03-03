"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import type { Member, ProfessorDetail } from "@/lib/types/database";
import MemberForm from "../../MemberForm";
import ProfessorDetailsEditor from "../../ProfessorDetailsEditor";
import { updateMember, updateProfessorDetails } from "@/app/admin/actions";

interface Props {
  member: Member;
  professorDetails?: ProfessorDetail[] | null;
}

export default function EditMemberClient({ member, professorDetails }: Props) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [detailsSaving, setDetailsSaving] = useState(false);
  const sectionsRef = useRef<
    {
      id?: string;
      section_type: string;
      items: string[] | Record<string, string[]>;
      display_order: number;
    }[]
  >(
    professorDetails?.map((d) => ({
      id: d.id,
      section_type: d.section_type,
      items: d.items as string[] | Record<string, string[]>,
      display_order: d.display_order,
    })) || []
  );

  const handleSubmit = async (formData: FormData) => {
    setError(null);
    try {
      await updateMember(member.id, formData);

      // 교수인 경우 details도 저장
      if (member.role === "professor") {
        setDetailsSaving(true);
        await updateProfessorDetails(member.id, sectionsRef.current);
        setDetailsSaving(false);
      }

      router.push("/admin/members");
    } catch (err) {
      setDetailsSaving(false);
      setError(err instanceof Error ? err.message : "수정에 실패했습니다.");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-6">
        멤버 수정: {member.name_en}
      </h1>
      {error && (
        <p className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg mb-4">{error}</p>
      )}
      <div className="space-y-8">
        <MemberForm member={member} onSubmit={handleSubmit} />

        {member.role === "professor" && professorDetails && (
          <div className="max-w-2xl">
            <ProfessorDetailsEditor
              details={professorDetails}
              onChange={(sections) => {
                sectionsRef.current = sections;
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
