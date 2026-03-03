import { createClient } from "@/lib/supabase/server";
import type { SiteSetting } from "@/lib/types/database";

export async function getSetting(key: string): Promise<SiteSetting | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("site_settings")
    .select("*")
    .eq("key", key)
    .single();

  if (error) return null;
  return data;
}

export async function getSplineUrl(): Promise<string> {
  const setting = await getSetting("spline_scene_url");
  return (
    (setting?.value?.url as string) ||
    process.env.NEXT_PUBLIC_SPLINE_SCENE_URL ||
    ""
  );
}
