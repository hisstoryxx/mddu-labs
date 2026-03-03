import { createClient } from "@/lib/supabase/server";
import type {
  ResearchProject,
  ResearchCategory,
  ResearchStatus,
} from "@/lib/types/database";

export async function getResearchProjects(
  category?: ResearchCategory,
  status?: ResearchStatus
): Promise<ResearchProject[]> {
  const supabase = await createClient();
  let query = supabase
    .from("research_projects")
    .select("*")
    .order("display_order", { ascending: true });

  if (category) {
    query = query.eq("category", category);
  }
  if (status) {
    query = query.eq("status", status);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}
