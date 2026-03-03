"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Member } from "@/lib/types/database";
import DataTable from "@/app/admin/components/DataTable";
import ConfirmDialog from "@/app/admin/components/ConfirmDialog";
import Badge from "@/app/components/ui/Badge";
import { deleteMember } from "@/app/admin/actions";

interface MembersAdminClientProps {
  members: Member[];
}

const roleLabels: Record<string, string> = {
  professor: "Professor",
  phd: "Ph.D",
  ms_phd: "MS/Ph.D",
  ms: "MS",
  intern: "Intern",
  alumni: "Alumni",
  staff: "Staff",
};

export default function MembersAdminClient({
  members,
}: MembersAdminClientProps) {
  const router = useRouter();
  const [deleteTarget, setDeleteTarget] = useState<Member | null>(null);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    await deleteMember(deleteTarget.id);
    setDeleteTarget(null);
    setDeleting(false);
    router.refresh();
  };

  return (
    <>
      <DataTable
        data={members}
        columns={[
          {
            key: "name_en",
            label: "Name",
            render: (m) => (
              <div>
                <p className="font-medium">{m.name_en}</p>
                <p className="text-xs text-text-muted">{m.name}</p>
              </div>
            ),
          },
          {
            key: "role",
            label: "Role",
            render: (m) => (
              <Badge variant="default">{roleLabels[m.role] || m.role}</Badge>
            ),
          },
          {
            key: "email",
            label: "Email",
            render: (m) => (
              <span className="text-xs">{m.email || "-"}</span>
            ),
          },
          {
            key: "is_active",
            label: "Active",
            render: (m) => (
              <Badge variant={m.is_active ? "success" : "muted"}>
                {m.is_active ? "Active" : "Inactive"}
              </Badge>
            ),
          },
        ]}
        onEdit={(m) => router.push(`/admin/members/${m.id}/edit`)}
        onDelete={(m) => setDeleteTarget(m)}
      />

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="멤버 삭제"
        message={`"${deleteTarget?.name_en}"을(를) 삭제하시겠습니까?`}
        loading={deleting}
      />
    </>
  );
}
