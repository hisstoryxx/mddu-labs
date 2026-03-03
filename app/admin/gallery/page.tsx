import { createClient } from "@/lib/supabase/server";
import GalleryAdminClient from "./GalleryAdminClient";

export default async function AdminGalleryPage() {
  const supabase = await createClient();
  const { data: items } = await supabase
    .from("gallery")
    .select("*")
    .order("event_date", { ascending: false })
    .order("display_order");

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-6">Gallery</h1>
      <GalleryAdminClient items={items || []} />
    </div>
  );
}
