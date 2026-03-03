import { createClient } from "@/lib/supabase/server";
import type { Publication, PubType } from "@/lib/types/database";

export async function getPublications(
  pubType?: PubType,
  year?: number
): Promise<Publication[]> {
  const supabase = await createClient();
  let query = supabase
    .from("publications")
    .select("*")
    .order("year", { ascending: false })
    .order("display_order", { ascending: true });

  if (pubType) {
    query = query.eq("pub_type", pubType);
  }
  if (year) {
    query = query.eq("year", year);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}

export async function getPublicationYears(): Promise<number[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("publications")
    .select("year")
    .order("year", { ascending: false });

  if (error) throw error;
  const years = [...new Set((data ?? []).map((d) => d.year))];
  return years;
}
