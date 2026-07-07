-- Run this once in the Supabase SQL Editor (Project -> SQL Editor -> New query).

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  tags text[] not null default '{}',
  live_url text,
  repo_url text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.projects enable row level security;

-- Public (anon) visitors can only read projects. All writes go through the
-- admin panel's server-side code, which uses the service role key and
-- bypasses RLS entirely.
create policy "Public can read projects"
  on public.projects
  for select
  to anon
  using (true);

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists projects_set_updated_at on public.projects;
create trigger projects_set_updated_at
before update on public.projects
for each row execute function public.set_updated_at();

-- Seed with the example projects that were previously hardcoded on the site.
insert into public.projects (title, description, tags, live_url, repo_url, sort_order)
values
  (
    'Task Flow',
    'A collaborative task management app with real-time updates, drag-and-drop boards, and team workspaces.',
    array['Next.js', 'TypeScript', 'PostgreSQL'],
    '#',
    '#',
    1
  ),
  (
    'Marketwatch Dashboard',
    'A data visualization dashboard for tracking market trends, built with live charts and customizable widgets.',
    array['React', 'D3.js', 'Node.js'],
    '#',
    '#',
    2
  ),
  (
    'Recipe Finder',
    'A recipe discovery app that suggests meals based on ingredients you already have at home.',
    array['Next.js', 'Tailwind CSS', 'REST API'],
    '#',
    '#',
    3
  );
