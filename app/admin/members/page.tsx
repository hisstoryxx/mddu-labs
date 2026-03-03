import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import MembersAdminClient from "./MembersAdminClient";
import { Plus } from "lucide-react";

export default async function AdminMembersPage() {
  const supabase = await createClient();
  const { data: members } = await supabase
    .from("members")
    .select("*")
    .order("role")
    .order("display_order");

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-text-primary">Members</h1>
        <Link
          href="/admin/members/new"
          className="flex items-center gap-2 px-4 py-2 bg-yonsei-blue text-white rounded-lg hover:bg-yonsei-dark transition-colors text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          새 멤버 추가
        </Link>
      </div>
      <MembersAdminClient members={members || []} />
    </div>
  );
}
