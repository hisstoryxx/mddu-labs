"use client";

import { useRouter } from "next/navigation";
import type { Member } from "@/lib/types/database";
import MemberForm from "../../MemberForm";
import { updateMember } from "@/app/admin/actions";

export default function EditMemberClient({ member }: { member: Member }) {
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    await updateMember(member.id, formData);
    router.push("/admin/members");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-6">
        멤버 수정: {member.name_en}
      </h1>
      <MemberForm member={member} onSubmit={handleSubmit} />
    </div>
  );
}
