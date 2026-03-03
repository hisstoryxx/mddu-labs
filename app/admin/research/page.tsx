import { createClient } from "@/lib/supabase/server";
import ResearchAdminClient from "./ResearchAdminClient";

export default async function AdminResearchPage() {
  const supabase = await createClient();
  const { data: projects } = await supabase
    .from("research_projects")
    .select("*")
    .order("category")
    .order("display_order");

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-6">Research</h1>
      <ResearchAdminClient projects={projects || []} />
    </div>
  );
}
