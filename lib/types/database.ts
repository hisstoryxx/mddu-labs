export type MemberRole =
  | "professor"
  | "phd"
  | "ms_phd"
  | "ms"
  | "intern"
  | "alumni"
  | "staff";

export type PubType =
  | "international_journal"
  | "domestic_journal"
  | "international_conference"
  | "domestic_conference"
  | "patent"
  | "book";

export type ResearchCategory = "CD" | "UD" | "MI" | "BS";
export type ResearchStatus = "progressing" | "closed";

export interface Member {
  id: string;
  name: string;
  name_en: string;
  role: MemberRole;
  photo_url: string | null;
  bio: string | null;
  research_interests: string[];
  email: string | null;
  education: string[];
  period: string | null;
  dissertation_title: string | null;
  affiliation: string | null;
  course_label: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
}

export interface ProfessorDetail {
  id: string;
  member_id: string;
  section_type: string;
  items: Record<string, unknown>;
  display_order: number;
}

export interface Publication {
  id: string;
  title: string;
  authors: string;
  venue: string | null;
  year: number;
  pub_type: PubType;
  doi: string | null;
  url: string | null;
  display_order: number;
  created_at: string;
}

export interface ResearchProject {
  id: string;
  title: string;
  category: ResearchCategory;
  status: ResearchStatus;
  image_url: string | null;
  description: string | null;
  period: string | null;
  funding_source: string | null;
  display_order: number;
  created_at: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  event_date: string | null;
  category: string | null;
  display_order: number;
  created_at: string;
}

export interface SiteSetting {
  key: string;
  value: Record<string, unknown>;
}
