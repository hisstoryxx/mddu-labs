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

  // 교수인 경우 professor_details도 가져오기
  let professorDetails = null;
  if (member.role === "professor") {
    const { data } = await supabase
      .from("professor_details")
      .select("*")
      .eq("member_id", id)
      .order("display_order", { ascending: true });
    professorDetails = data;
  }

  return <EditMemberClient member={member} professorDetails={professorDetails} />;
}
