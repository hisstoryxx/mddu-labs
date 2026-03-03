import { createClient } from "@/lib/supabase/server";
import PublicationsAdminClient from "./PublicationsAdminClient";

export default async function AdminPublicationsPage() {
  const supabase = await createClient();
  const { data: publications } = await supabase
    .from("publications")
    .select("*")
    .order("year", { ascending: false })
    .order("display_order");

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-6">
        Publications
      </h1>
      <PublicationsAdminClient publications={publications || []} />
    </div>
  );
}
