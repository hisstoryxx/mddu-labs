-- MDDU Lab Website - Initial Schema
-- Run this in Supabase SQL Editor

-- Enable UUID generation
create extension if not exists "uuid-ossp";

-- ============================================
-- MEMBERS
-- ============================================
create table public.members (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  name_en text not null,
  role text not null check (role in ('professor', 'phd', 'ms_phd', 'ms', 'intern', 'alumni', 'staff')),
  photo_url text,
  bio text,
  research_interests text[] default '{}',
  email text,
  education text[] default '{}',
  period text,
  dissertation_title text,
  affiliation text,
  course_label text,
  display_order integer default 0,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- ============================================
-- PROFESSOR DETAILS (expandable sections)
-- ============================================
create table public.professor_details (
  id uuid primary key default uuid_generate_v4(),
  member_id uuid references public.members(id) on delete cascade,
  section_type text not null,
  items jsonb not null default '[]',
  display_order integer default 0
);

-- ============================================
-- PUBLICATIONS
-- ============================================
create table public.publications (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  authors text not null,
  venue text,
  year integer not null,
  pub_type text not null check (pub_type in (
    'international_journal', 'domestic_journal',
    'international_conference', 'domestic_conference',
    'patent', 'book'
  )),
  doi text,
  url text,
  display_order integer default 0,
  created_at timestamptz default now()
);

-- ============================================
-- RESEARCH PROJECTS
-- ============================================
create table public.research_projects (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  category text not null check (category in ('CD', 'UD', 'MI', 'BS')),
  status text not null default 'progressing' check (status in ('progressing', 'closed')),
  image_url text,
  description text,
  period text,
  funding_source text,
  display_order integer default 0,
  created_at timestamptz default now()
);

-- ============================================
-- GALLERY
-- ============================================
create table public.gallery (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  image_url text not null,
  event_date date,
  category text,
  display_order integer default 0,
  created_at timestamptz default now()
);

-- ============================================
-- SITE SETTINGS (key-value store)
-- ============================================
create table public.site_settings (
  key text primary key,
  value jsonb not null default '{}'
);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

-- Enable RLS on all tables
alter table public.members enable row level security;
alter table public.professor_details enable row level security;
alter table public.publications enable row level security;
alter table public.research_projects enable row level security;
alter table public.gallery enable row level security;
alter table public.site_settings enable row level security;

-- Public read access
create policy "Public read access" on public.members for select using (true);
create policy "Public read access" on public.professor_details for select using (true);
create policy "Public read access" on public.publications for select using (true);
create policy "Public read access" on public.research_projects for select using (true);
create policy "Public read access" on public.gallery for select using (true);
create policy "Public read access" on public.site_settings for select using (true);

-- Authenticated write access
create policy "Auth insert" on public.members for insert to authenticated with check (true);
create policy "Auth update" on public.members for update to authenticated using (true);
create policy "Auth delete" on public.members for delete to authenticated using (true);

create policy "Auth insert" on public.professor_details for insert to authenticated with check (true);
create policy "Auth update" on public.professor_details for update to authenticated using (true);
create policy "Auth delete" on public.professor_details for delete to authenticated using (true);

create policy "Auth insert" on public.publications for insert to authenticated with check (true);
create policy "Auth update" on public.publications for update to authenticated using (true);
create policy "Auth delete" on public.publications for delete to authenticated using (true);

create policy "Auth insert" on public.research_projects for insert to authenticated with check (true);
create policy "Auth update" on public.research_projects for update to authenticated using (true);
create policy "Auth delete" on public.research_projects for delete to authenticated using (true);

create policy "Auth insert" on public.gallery for insert to authenticated with check (true);
create policy "Auth update" on public.gallery for update to authenticated using (true);
create policy "Auth delete" on public.gallery for delete to authenticated using (true);

create policy "Auth insert" on public.site_settings for insert to authenticated with check (true);
create policy "Auth update" on public.site_settings for update to authenticated using (true);
create policy "Auth delete" on public.site_settings for delete to authenticated using (true);

-- ============================================
-- STORAGE BUCKETS (run in Supabase Dashboard or via API)
-- ============================================
-- insert into storage.buckets (id, name, public) values ('member-photos', 'member-photos', true);
-- insert into storage.buckets (id, name, public) values ('research-images', 'research-images', true);
-- insert into storage.buckets (id, name, public) values ('gallery-images', 'gallery-images', true);
-- insert into storage.buckets (id, name, public) values ('site-assets', 'site-assets', true);

-- ============================================
-- INDEXES
-- ============================================
create index idx_members_role on public.members(role);
create index idx_members_active on public.members(is_active);
create index idx_publications_type on public.publications(pub_type);
create index idx_publications_year on public.publications(year);
create index idx_research_category on public.research_projects(category);
create index idx_research_status on public.research_projects(status);
