import type { Metadata } from "next";
import { getGalleryItems } from "@/lib/queries/gallery";
import GalleryClient from "./GalleryClient";

export const metadata: Metadata = {
  title: "Gallery",
  description: "MDDU Lab 갤러리",
};

export default async function GalleryPage() {
  const items = await getGalleryItems();

  return <GalleryClient items={items} />;
}
