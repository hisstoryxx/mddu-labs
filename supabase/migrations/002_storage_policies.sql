-- Storage RLS Policies
-- Run this in Supabase SQL Editor

-- Allow public read access to all buckets
create policy "Public read access"
  on storage.objects for select
  using (bucket_id in ('member-photos', 'research-images', 'gallery-images', 'site-assets'));

-- Allow authenticated users to upload files
create policy "Auth upload"
  on storage.objects for insert
  to authenticated
  with check (bucket_id in ('member-photos', 'research-images', 'gallery-images', 'site-assets'));

-- Allow authenticated users to update files
create policy "Auth update"
  on storage.objects for update
  to authenticated
  using (bucket_id in ('member-photos', 'research-images', 'gallery-images', 'site-assets'));

-- Allow authenticated users to delete files
create policy "Auth delete"
  on storage.objects for delete
  to authenticated
  using (bucket_id in ('member-photos', 'research-images', 'gallery-images', 'site-assets'));
