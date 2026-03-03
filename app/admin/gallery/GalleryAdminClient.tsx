"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { GalleryItem } from "@/lib/types/database";
import ConfirmDialog from "@/app/admin/components/ConfirmDialog";
import Modal from "@/app/components/ui/Modal";
import FormField from "@/app/admin/components/FormField";
import ImageUpload from "@/app/admin/components/ImageUpload";
import {
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
} from "@/app/admin/actions";
import { Plus, Pencil, Trash2 } from "lucide-react";

interface Props {
  items: GalleryItem[];
}

export default function GalleryAdminClient({ items }: Props) {
  const router = useRouter();
  const [editTarget, setEditTarget] = useState<GalleryItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<GalleryItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    formData.set("image_url", imageUrl);
    if (editTarget) {
      await updateGalleryItem(editTarget.id, formData);
    } else {
      await createGalleryItem(formData);
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
    await deleteGalleryItem(deleteTarget.id);
    setDeleteTarget(null);
    setLoading(false);
    router.refresh();
  };

  const openEdit = (item: GalleryItem) => {
    setEditTarget(item);
    setImageUrl(item.image_url);
  };

  const openCreate = () => {
    setIsCreating(true);
    setImageUrl("");
  };

  const formTarget = editTarget || isCreating;

  return (
    <>
      <div className="mb-6">
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2 bg-yonsei-blue text-white rounded-lg hover:bg-yonsei-dark transition-colors text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          새 갤러리 항목
        </button>
      </div>

      {items.length === 0 ? (
        <p className="text-center text-text-muted py-20">
          갤러리 항목이 없습니다.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="relative group rounded-xl overflow-hidden bg-gray-100 border border-border"
            >
              <img
                src={item.image_url}
                alt={item.title}
                className="w-full aspect-square object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  onClick={() => openEdit(item)}
                  className="p-2 bg-white rounded-lg hover:bg-gray-100"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDeleteTarget(item)}
                  className="p-2 bg-white rounded-lg hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </button>
              </div>
              <div className="p-3">
                <p className="text-sm font-medium truncate">{item.title}</p>
                {item.event_date && (
                  <p className="text-xs text-text-muted">{item.event_date}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        isOpen={!!formTarget}
        onClose={() => {
          setEditTarget(null);
          setIsCreating(false);
        }}
        title={editTarget ? "갤러리 수정" : "새 갤러리 항목"}
      >
        <form onSubmit={handleSave} className="space-y-4">
          <FormField
            label="제목"
            name="title"
            required
            value={editTarget?.title || ""}
          />
          <FormField
            label="설명"
            name="description"
            value={editTarget?.description || ""}
            textarea
          />
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              이미지 *
            </label>
            <ImageUpload
              bucket="gallery-images"
              currentUrl={editTarget?.image_url}
              onUpload={setImageUrl}
            />
          </div>
          <FormField
            label="이벤트 날짜"
            name="event_date"
            type="date"
            value={editTarget?.event_date || ""}
          />
          <FormField
            label="카테고리"
            name="category"
            value={editTarget?.category || ""}
            placeholder="워크숍, 학회, 연구실 활동"
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
              disabled={loading || !imageUrl}
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
        title="갤러리 삭제"
        message={`"${deleteTarget?.title}"을(를) 삭제하시겠습니까?`}
        loading={loading}
      />
    </>
  );
}
