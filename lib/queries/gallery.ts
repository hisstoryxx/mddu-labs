import { createClient } from "@/lib/supabase/server";
import type { GalleryItem } from "@/lib/types/database";

export async function getGalleryItems(
  category?: string
): Promise<GalleryItem[]> {
  const supabase = await createClient();
  let query = supabase
    .from("gallery")
    .select("*")
    .order("event_date", { ascending: false })
    .order("display_order", { ascending: true });

  if (category) {
    query = query.eq("category", category);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}
