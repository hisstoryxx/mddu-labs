import type { Metadata } from "next";
import { getMembers, getProfessor } from "@/lib/queries/members";
import MembersClient from "./MembersClient";

export const metadata: Metadata = {
  title: "Members",
  description: "MDDU Lab 구성원 소개",
};

export default async function MembersPage({
  searchParams,
}: {
  searchParams: Promise<{ role?: string }>;
}) {
  const params = await searchParams;
  const [allMembers, professorData] = await Promise.all([
    getMembers(),
    getProfessor(),
  ]);

  return (
    <MembersClient
      members={allMembers}
      professorData={professorData}
      initialRole={params.role || "professor"}
    />
  );
}
