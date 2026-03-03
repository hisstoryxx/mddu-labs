"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Member } from "@/lib/types/database";
import MemberForm from "../../MemberForm";
import { updateMember } from "@/app/admin/actions";

export default function EditMemberClient({ member }: { member: Member }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    setError(null);
    try {
      await updateMember(member.id, formData);
      router.push("/admin/members");
    } catch (err) {
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
      <MemberForm member={member} onSubmit={handleSubmit} />
    </div>
  );
}
