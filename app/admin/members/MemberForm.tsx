"use client";

import { useState } from "react";
import type { Member } from "@/lib/types/database";
import FormField from "@/app/admin/components/FormField";
import ImageUpload from "@/app/admin/components/ImageUpload";

interface MemberFormProps {
  member?: Member;
  onSubmit: (formData: FormData) => Promise<void>;
}

const roleOptions = [
  { value: "professor", label: "Professor" },
  { value: "phd", label: "Ph.D" },
  { value: "ms_phd", label: "MS/Ph.D" },
  { value: "ms", label: "MS" },
  { value: "intern", label: "Intern" },
  { value: "alumni", label: "Alumni" },
  { value: "staff", label: "Staff" },
];

export default function MemberForm({ member, onSubmit }: MemberFormProps) {
  const [loading, setLoading] = useState(false);
  const [photoUrl, setPhotoUrl] = useState(member?.photo_url || "");
  const [role, setRole] = useState<string>(member?.role || "ms");

  const isProfessor = role === "professor";
  const isAlumni = role === "alumni";
  const isIntern = role === "intern";
  const isStudent = ["phd", "ms_phd", "ms"].includes(role);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    formData.set("photo_url", photoUrl);
    await onSubmit(formData);
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl border border-border p-6 space-y-4 max-w-2xl"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          label="이름 (한글)"
          name="name"
          required
          value={member?.name}
          placeholder="홍길동"
        />
        <FormField
          label="이름 (영문)"
          name="name_en"
          required
          value={member?.name_en}
          placeholder="Gildong Hong"
        />
      </div>

      <FormField
        label="역할"
        name="role"
        required
        options={roleOptions}
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />

      <div>
        <label className="block text-sm font-medium text-text-primary mb-1">
          프로필 사진
        </label>
        <ImageUpload
          bucket="member-photos"
          currentUrl={member?.photo_url}
          onUpload={setPhotoUrl}
        />
        <input type="hidden" name="photo_url" value={photoUrl} />
      </div>

      <FormField
        label="이메일"
        name="email"
        type="email"
        value={member?.email || ""}
      />

      {/* 교수가 아닌 학생일 때만 표시 */}
      {isStudent && (
        <FormField
          label="과정 라벨"
          name="course_label"
          value={member?.course_label || ""}
          placeholder="MS course, Ph.D course, etc."
        />
      )}

      <FormField
        label="소개"
        name="bio"
        value={member?.bio || ""}
        textarea
      />

      <FormField
        label="연구 관심사 (쉼표로 구분)"
        name="research_interests"
        value={member?.research_interests?.join(", ") || ""}
        placeholder="UX/UI Design, Usability Engineering"
      />

      {/* 교수가 아닐 때만 학력 표시 */}
      {!isProfessor && (
        <FormField
          label="학력 (줄바꿈으로 구분)"
          name="education"
          value={member?.education?.join("\n") || ""}
          textarea
          placeholder="Bachelor in Engineering, University (2020)"
        />
      )}

      {/* 졸업생일 때만 표시 */}
      {isAlumni && (
        <>
          <FormField
            label="논문 제목"
            name="dissertation_title"
            value={member?.dissertation_title || ""}
            textarea
          />
          <FormField
            label="현 소속"
            name="affiliation"
            value={member?.affiliation || ""}
          />
        </>
      )}

      {/* 인턴일 때만 표시 */}
      {isIntern && (
        <FormField
          label="재학 기간"
          name="period"
          value={member?.period || ""}
          placeholder="2020.07.01 ~ 2020.12.31"
        />
      )}

      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="표시 순서"
          name="display_order"
          type="number"
          value={member?.display_order ?? 0}
        />
        <FormField
          label="활성 상태"
          name="is_active"
          options={[
            { value: "true", label: "Active" },
            { value: "false", label: "Inactive" },
          ]}
          value={member?.is_active !== false ? "true" : "false"}
        />
      </div>

      <div className="pt-4">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 bg-yonsei-blue text-white rounded-lg hover:bg-yonsei-dark transition-colors font-medium text-sm disabled:opacity-50"
        >
          {loading ? "저장 중..." : member ? "수정" : "생성"}
        </button>
      </div>
    </form>
  );
}
