"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Publication } from "@/lib/types/database";
import DataTable from "@/app/admin/components/DataTable";
import ConfirmDialog from "@/app/admin/components/ConfirmDialog";
import Modal from "@/app/components/ui/Modal";
import FormField from "@/app/admin/components/FormField";
import Badge from "@/app/components/ui/Badge";
import {
  createPublication,
  updatePublication,
  deletePublication,
} from "@/app/admin/actions";
import { Plus } from "lucide-react";

interface Props {
  publications: Publication[];
}

const typeOptions = [
  { value: "international_journal", label: "International Journal" },
  { value: "domestic_journal", label: "Domestic Journal" },
  { value: "international_conference", label: "Int'l Conference" },
  { value: "domestic_conference", label: "Domestic Conference" },
  { value: "patent", label: "Patent" },
  { value: "book", label: "Book" },
];

const typeLabels: Record<string, string> = Object.fromEntries(
  typeOptions.map((o) => [o.value, o.label])
);

export default function PublicationsAdminClient({ publications }: Props) {
  const router = useRouter();
  const [editTarget, setEditTarget] = useState<Publication | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Publication | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData(e.currentTarget);
      if (editTarget) {
        await updatePublication(editTarget.id, formData);
      } else {
        await createPublication(formData);
      }
      setEditTarget(null);
      setIsCreating(false);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "저장에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setLoading(true);
    try {
      await deletePublication(deleteTarget.id);
      setDeleteTarget(null);
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : "삭제에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const formTarget = editTarget || isCreating;

  return (
    <>
      <div className="mb-4">
        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2 px-4 py-2 bg-yonsei-blue text-white rounded-lg hover:bg-yonsei-dark transition-colors text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          새 출판물 추가
        </button>
      </div>

      <DataTable
        data={publications}
        columns={[
          {
            key: "title",
            label: "Title",
            render: (p) => (
              <p className="max-w-md truncate text-sm">{p.title}</p>
            ),
          },
          {
            key: "pub_type",
            label: "Type",
            render: (p) => (
              <Badge variant="default">
                {typeLabels[p.pub_type] || p.pub_type}
              </Badge>
            ),
          },
          { key: "year", label: "Year" },
          {
            key: "authors",
            label: "Authors",
            render: (p) => (
              <p className="max-w-xs truncate text-xs text-text-secondary">
                {p.authors}
              </p>
            ),
          },
        ]}
        onEdit={(p) => setEditTarget(p)}
        onDelete={(p) => setDeleteTarget(p)}
      />

      <Modal
        isOpen={!!formTarget}
        onClose={() => {
          setEditTarget(null);
          setIsCreating(false);
          setError(null);
        }}
        title={editTarget ? "출판물 수정" : "새 출판물 추가"}
      >
        <form key={editTarget?.id || "new"} onSubmit={handleSave} className="space-y-4">
          {error && (
            <p className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
          )}
          <FormField
            label="제목"
            name="title"
            required
            value={editTarget?.title || ""}
            textarea
          />
          <FormField
            label="저자"
            name="authors"
            required
            value={editTarget?.authors || ""}
          />
          <FormField
            label="학술지/학회/특허번호"
            name="venue"
            value={editTarget?.venue || ""}
          />
          <div className="grid grid-cols-2 gap-4">
            <FormField
              label="연도"
              name="year"
              type="number"
              required
              value={editTarget?.year || new Date().getFullYear()}
            />
            <FormField
              label="유형"
              name="pub_type"
              required
              options={typeOptions}
              value={editTarget?.pub_type || "international_journal"}
            />
          </div>
          <FormField label="DOI" name="doi" value={editTarget?.doi || ""} />
          <FormField label="URL" name="url" value={editTarget?.url || ""} />
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
        title="출판물 삭제"
        message={`"${deleteTarget?.title}"을(를) 삭제하시겠습니까?`}
        loading={loading}
      />
    </>
  );
}
