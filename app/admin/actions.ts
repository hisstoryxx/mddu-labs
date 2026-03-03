"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

// ============================================
// MEMBERS
// ============================================

export async function createMember(formData: FormData) {
  const supabase = await createClient();

  const data = {
    name: formData.get("name") as string,
    name_en: formData.get("name_en") as string,
    role: formData.get("role") as string,
    photo_url: (formData.get("photo_url") as string) || null,
    bio: (formData.get("bio") as string) || null,
    email: (formData.get("email") as string) || null,
    course_label: (formData.get("course_label") as string) || null,
    dissertation_title: (formData.get("dissertation_title") as string) || null,
    affiliation: (formData.get("affiliation") as string) || null,
    period: (formData.get("period") as string) || null,
    display_order: Number(formData.get("display_order")) || 0,
    is_active: formData.get("is_active") === "true",
    research_interests: (formData.get("research_interests") as string)
      ?.split(",")
      .map((s) => s.trim())
      .filter(Boolean) || [],
    education: (formData.get("education") as string)
      ?.split("\n")
      .map((s) => s.trim())
      .filter(Boolean) || [],
  };

  const { error } = await supabase.from("members").insert(data);
  if (error) throw new Error(error.message);

  revalidatePath("/members");
  revalidatePath("/admin/members");
}

export async function updateMember(id: string, formData: FormData) {
  const supabase = await createClient();

  const data = {
    name: formData.get("name") as string,
    name_en: formData.get("name_en") as string,
    role: formData.get("role") as string,
    photo_url: (formData.get("photo_url") as string) || null,
    bio: (formData.get("bio") as string) || null,
    email: (formData.get("email") as string) || null,
    course_label: (formData.get("course_label") as string) || null,
    dissertation_title: (formData.get("dissertation_title") as string) || null,
    affiliation: (formData.get("affiliation") as string) || null,
    period: (formData.get("period") as string) || null,
    display_order: Number(formData.get("display_order")) || 0,
    is_active: formData.get("is_active") === "true",
    research_interests: (formData.get("research_interests") as string)
      ?.split(",")
      .map((s) => s.trim())
      .filter(Boolean) || [],
    education: (formData.get("education") as string)
      ?.split("\n")
      .map((s) => s.trim())
      .filter(Boolean) || [],
  };

  const { error } = await supabase.from("members").update(data).eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/members");
  revalidatePath("/admin/members");
}

export async function deleteMember(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("members").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/members");
  revalidatePath("/admin/members");
}

// ============================================
// PUBLICATIONS
// ============================================

export async function createPublication(formData: FormData) {
  const supabase = await createClient();

  const data = {
    title: formData.get("title") as string,
    authors: formData.get("authors") as string,
    venue: (formData.get("venue") as string) || null,
    year: Number(formData.get("year")),
    pub_type: formData.get("pub_type") as string,
    doi: (formData.get("doi") as string) || null,
    url: (formData.get("url") as string) || null,
    display_order: Number(formData.get("display_order")) || 0,
  };

  const { error } = await supabase.from("publications").insert(data);
  if (error) throw new Error(error.message);

  revalidatePath("/publications");
  revalidatePath("/admin/publications");
}

export async function updatePublication(id: string, formData: FormData) {
  const supabase = await createClient();

  const data = {
    title: formData.get("title") as string,
    authors: formData.get("authors") as string,
    venue: (formData.get("venue") as string) || null,
    year: Number(formData.get("year")),
    pub_type: formData.get("pub_type") as string,
    doi: (formData.get("doi") as string) || null,
    url: (formData.get("url") as string) || null,
    display_order: Number(formData.get("display_order")) || 0,
  };

  const { error } = await supabase
    .from("publications")
    .update(data)
    .eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/publications");
  revalidatePath("/admin/publications");
}

export async function deletePublication(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("publications").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/publications");
  revalidatePath("/admin/publications");
}

// ============================================
// RESEARCH PROJECTS
// ============================================

export async function createResearch(formData: FormData) {
  const supabase = await createClient();

  const data = {
    title: formData.get("title") as string,
    category: formData.get("category") as string,
    status: formData.get("status") as string,
    image_url: (formData.get("image_url") as string) || null,
    description: (formData.get("description") as string) || null,
    period: (formData.get("period") as string) || null,
    funding_source: (formData.get("funding_source") as string) || null,
    display_order: Number(formData.get("display_order")) || 0,
  };

  const { error } = await supabase.from("research_projects").insert(data);
  if (error) throw new Error(error.message);

  revalidatePath("/research");
  revalidatePath("/admin/research");
}

export async function updateResearch(id: string, formData: FormData) {
  const supabase = await createClient();

  const data = {
    title: formData.get("title") as string,
    category: formData.get("category") as string,
    status: formData.get("status") as string,
    image_url: (formData.get("image_url") as string) || null,
    description: (formData.get("description") as string) || null,
    period: (formData.get("period") as string) || null,
    funding_source: (formData.get("funding_source") as string) || null,
    display_order: Number(formData.get("display_order")) || 0,
  };

  const { error } = await supabase
    .from("research_projects")
    .update(data)
    .eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/research");
  revalidatePath("/admin/research");
}

export async function deleteResearch(id: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("research_projects")
    .delete()
    .eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/research");
  revalidatePath("/admin/research");
}

// ============================================
// GALLERY
// ============================================

export async function createGalleryItem(formData: FormData) {
  const supabase = await createClient();

  const data = {
    title: formData.get("title") as string,
    description: (formData.get("description") as string) || null,
    image_url: formData.get("image_url") as string,
    event_date: (formData.get("event_date") as string) || null,
    category: (formData.get("category") as string) || null,
    display_order: Number(formData.get("display_order")) || 0,
  };

  const { error } = await supabase.from("gallery").insert(data);
  if (error) throw new Error(error.message);

  revalidatePath("/gallery");
  revalidatePath("/admin/gallery");
}

export async function updateGalleryItem(id: string, formData: FormData) {
  const supabase = await createClient();

  const data = {
    title: formData.get("title") as string,
    description: (formData.get("description") as string) || null,
    image_url: formData.get("image_url") as string,
    event_date: (formData.get("event_date") as string) || null,
    category: (formData.get("category") as string) || null,
    display_order: Number(formData.get("display_order")) || 0,
  };

  const { error } = await supabase.from("gallery").update(data).eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/gallery");
  revalidatePath("/admin/gallery");
}

export async function deleteGalleryItem(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("gallery").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/gallery");
  revalidatePath("/admin/gallery");
}
