"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ResearchProject } from "@/lib/types/database";
import DataTable from "@/app/admin/components/DataTable";
import ConfirmDialog from "@/app/admin/components/ConfirmDialog";
import Modal from "@/app/components/ui/Modal";
import FormField from "@/app/admin/components/FormField";
import ImageUpload from "@/app/admin/components/ImageUpload";
import Badge from "@/app/components/ui/Badge";
import {
  createResearch,
  updateResearch,
  deleteResearch,
} from "@/app/admin/actions";
import { Plus } from "lucide-react";

interface Props {
  projects: ResearchProject[];
}

const categoryOptions = [
  { value: "CD", label: "Clinical Study Design" },
  { value: "UD", label: "UX/UI Design & Usability" },
  { value: "MI", label: "Medical Industry Policy" },
  { value: "BS", label: "Bio-Signal & AI" },
];

const statusOptions = [
  { value: "progressing", label: "Progressing" },
  { value: "closed", label: "Closed" },
];

const categoryLabels: Record<string, string> = Object.fromEntries(
  categoryOptions.map((o) => [o.value, o.label])
);

export default function ResearchAdminClient({ projects }: Props) {
  const router = useRouter();
  const [editTarget, setEditTarget] = useState<ResearchProject | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<ResearchProject | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    formData.set("image_url", imageUrl);
    if (editTarget) {
      await updateResearch(editTarget.id, formData);
    } else {
      await createResearch(formData);
    }
    setEditTarget(null);
    setIsCreating(false);
    setImageUrl("");
    setLoading(false);
    router.refresh();
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setLoading(true);
    await deleteResearch(deleteTarget.id);
    setDeleteTarget(null);
    setLoading(false);
    router.refresh();
  };

  const openEdit = (p: ResearchProject) => {
    setEditTarget(p);
    setImageUrl(p.image_url || "");
  };

  const openCreate = () => {
    setIsCreating(true);
    setImageUrl("");
  };

  const formTarget = editTarget || isCreating;

  return (
    <>
      <div className="mb-4">
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2 bg-yonsei-blue text-white rounded-lg hover:bg-yonsei-dark transition-colors text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          새 연구 추가
        </button>
      </div>

      <DataTable
        data={projects}
        columns={[
          {
            key: "title",
            label: "Title",
            render: (p) => (
              <p className="max-w-md truncate text-sm">{p.title}</p>
            ),
          },
          {
            key: "category",
            label: "Category",
            render: (p) => (
              <Badge variant="default">
                {categoryLabels[p.category] || p.category}
              </Badge>
            ),
          },
          {
            key: "status",
            label: "Status",
            render: (p) => (
              <Badge
                variant={p.status === "progressing" ? "success" : "muted"}
              >
                {p.status === "progressing" ? "Progressing" : "Closed"}
              </Badge>
            ),
          },
        ]}
        onEdit={openEdit}
        onDelete={(p) => setDeleteTarget(p)}
      />

      <Modal
        isOpen={!!formTarget}
        onClose={() => {
          setEditTarget(null);
          setIsCreating(false);
        }}
        title={editTarget ? "연구 수정" : "새 연구 추가"}
      >
        <form onSubmit={handleSave} className="space-y-4">
          <FormField
            label="제목"
            name="title"
            required
            value={editTarget?.title || ""}
            textarea
          />
          <div className="grid grid-cols-2 gap-4">
            <FormField
              label="카테고리"
              name="category"
              required
              options={categoryOptions}
              value={editTarget?.category || "CD"}
            />
            <FormField
              label="상태"
              name="status"
              required
              options={statusOptions}
              value={editTarget?.status || "progressing"}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              이미지
            </label>
            <ImageUpload
              bucket="research-images"
              currentUrl={editTarget?.image_url}
              onUpload={setImageUrl}
            />
          </div>
          <FormField
            label="설명"
            name="description"
            value={editTarget?.description || ""}
            textarea
          />
          <FormField
            label="기간"
            name="period"
            value={editTarget?.period || ""}
            placeholder="2020.09 ~ 2024.12"
          />
          <FormField
            label="지원 기관"
            name="funding_source"
            value={editTarget?.funding_source || ""}
          />
          <FormField
            label="표시 순서"
            name="display_order"
            type="number"
            value={editTarget?.display_order ?? 0}
          />
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 bg-yonsei-blue text-white rounded-lg hover:bg-yonsei-dark text-sm font-medium disabled:opacity-50"
            >
              {loading ? "저장 중..." : "저장"}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="연구 삭제"
        message={`"${deleteTarget?.title}"을(를) 삭제하시겠습니까?`}
        loading={loading}
      />
    </>
  );
}
