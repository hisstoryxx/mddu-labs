"use client";

import { useState, useCallback, useMemo } from "react";
import { Upload, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface ImageUploadProps {
  bucket: string;
  currentUrl?: string | null;
  onUpload: (url: string) => void;
}

export default function ImageUpload({
  bucket,
  currentUrl,
  onUpload,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentUrl || null);
  const [error, setError] = useState<string | null>(null);
  const supabase = useMemo(() => createClient(), []);

  const handleUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setUploading(true);
      setError(null);

      const ext = file.name.split(".").pop()?.toLowerCase();
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(fileName, file, { upsert: true });

      if (uploadError) {
        console.error("Upload error:", uploadError);
        setError(`업로드 실패: ${uploadError.message}`);
        setUploading(false);
        return;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from(bucket).getPublicUrl(fileName);

      setPreview(publicUrl);
      onUpload(publicUrl);
      setUploading(false);
    },
    [bucket, onUpload, supabase]
  );

  return (
    <div className="space-y-2">
      {preview && (
        <div className="relative inline-block">
          <img
            src={preview}
            alt="Preview"
            className="w-32 h-32 object-cover rounded-lg border border-border"
          />
          <button
            onClick={() => {
              setPreview(null);
              onUpload("");
            }}
            className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      <label className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-dashed border-border rounded-lg cursor-pointer hover:bg-gray-100 transition-colors w-fit">
        <Upload className="w-4 h-4 text-text-muted" />
        <span className="text-sm text-text-secondary">
          {uploading ? "업로드 중..." : "이미지 선택"}
        </span>
        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          disabled={uploading}
          className="hidden"
        />
      </label>

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}
