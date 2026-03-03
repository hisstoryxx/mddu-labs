import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import EditMemberClient from "./EditMemberClient";

export default async function EditMemberPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: member } = await supabase
    .from("members")
    .select("*")
    .eq("id", id)
    .single();

  if (!member) notFound();

  return <EditMemberClient member={member} />;
}
