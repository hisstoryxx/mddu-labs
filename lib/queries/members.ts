import { createClient } from "@/lib/supabase/server";
import type { Member, ProfessorDetail } from "@/lib/types/database";

export async function getMembers(role?: string): Promise<Member[]> {
  const supabase = await createClient();
  let query = supabase
    .from("members")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  if (role) {
    query = query.eq("role", role);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}

export async function getMemberById(id: string): Promise<Member | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("members")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;
  return data;
}

export async function getProfessorDetails(
  memberId: string
): Promise<ProfessorDetail[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("professor_details")
    .select("*")
    .eq("member_id", memberId)
    .order("display_order", { ascending: true });

  if (error) throw error;
  return data ?? [];
}

export async function getProfessor(): Promise<{
  member: Member;
  details: ProfessorDetail[];
} | null> {
  const supabase = await createClient();
  const { data: member, error } = await supabase
    .from("members")
    .select("*")
    .eq("role", "professor")
    .eq("is_active", true)
    .single();

  if (error || !member) return null;

  const details = await getProfessorDetails(member.id);
  return { member, details };
}
