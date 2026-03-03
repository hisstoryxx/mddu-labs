import type { Metadata } from "next";
import { getPublications } from "@/lib/queries/publications";
import PublicationsClient from "./PublicationsClient";

export const metadata: Metadata = {
  title: "Publications",
  description: "MDDU Lab 논문, 학회, 특허, 저서",
};

export default async function PublicationsPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const params = await searchParams;
  const publications = await getPublications();

  return (
    <PublicationsClient
      publications={publications}
      initialType={params.type || "all"}
    />
  );
}
