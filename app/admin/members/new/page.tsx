"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import MemberForm from "../MemberForm";
import { createMember } from "@/app/admin/actions";

export default function NewMemberPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    setError(null);
    try {
      await createMember(formData);
      router.push("/admin/members");
    } catch (err) {
      setError(err instanceof Error ? err.message : "생성에 실패했습니다.");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-6">
        새 멤버 추가
      </h1>
      {error && (
        <p className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg mb-4">{error}</p>
      )}
      <MemberForm onSubmit={handleSubmit} />
    </div>
  );
}
