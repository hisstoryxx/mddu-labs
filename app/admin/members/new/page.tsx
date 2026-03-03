"use client";

import { useRouter } from "next/navigation";
import MemberForm from "../MemberForm";
import { createMember } from "@/app/admin/actions";

export default function NewMemberPage() {
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    await createMember(formData);
    router.push("/admin/members");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-6">
        새 멤버 추가
      </h1>
      <MemberForm onSubmit={handleSubmit} />
    </div>
  );
}
