import type { Metadata } from "next";
import { getResearchProjects } from "@/lib/queries/research";
import ResearchClient from "./ResearchClient";

export const metadata: Metadata = {
  title: "Research",
  description: "MDDU Lab 연구 프로젝트",
};

export default async function ResearchPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; status?: string }>;
}) {
  const params = await searchParams;
  const projects = await getResearchProjects();

  return (
    <ResearchClient
      projects={projects}
      initialCategory={params.category || "all"}
      initialStatus={params.status || "all"}
    />
  );
}
