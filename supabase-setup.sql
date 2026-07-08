-- Supabase setup for Kleyi Elimar mini apps.
-- Run this in Supabase SQL Editor when you are ready to store leads.

create extension if not exists pgcrypto;

create table if not exists public.diagnostico_orden_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  stage text not null,
  first_name text,
  email text,
  score integer,
  level text,
  archetype text,
  buyer_signal text,
  business_type text,
  revenue_range text,
  main_problem text,
  attempted_fix text,
  desired_outcome text,
  team_status text,
  completed_at timestamptz,
  payload jsonb default '{}'::jsonb
);

alter table public.diagnostico_orden_leads enable row level security;

drop policy if exists "Allow anonymous lead inserts" on public.diagnostico_orden_leads;

create policy "Allow anonymous lead inserts"
on public.diagnostico_orden_leads
for insert
to anon
with check (true);

-- Optional, for logged-in dashboard users only. Keep anonymous visitors from reading the table.
drop policy if exists "Allow authenticated read access" on public.diagnostico_orden_leads;

create policy "Allow authenticated read access"
on public.diagnostico_orden_leads
for select
to authenticated
using (true);

create table if not exists public.calculadora_horas_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  first_name text,
  email text,
  level text,
  level_title text,
  main_leak text,
  weekly_hours numeric,
  monthly_hours numeric,
  search_hours numeric,
  followup_hours numeric,
  repeat_hours numeric,
  rework_hours numeric,
  missed_leads numeric,
  hour_value numeric,
  client_value numeric,
  close_rate numeric,
  time_cost numeric,
  opportunity_cost numeric,
  monthly_impact numeric,
  annual_impact numeric,
  completed_at timestamptz,
  payload jsonb default '{}'::jsonb
);

alter table public.calculadora_horas_leads enable row level security;

drop policy if exists "Allow anonymous calculator inserts" on public.calculadora_horas_leads;

create policy "Allow anonymous calculator inserts"
on public.calculadora_horas_leads
for insert
to anon
with check (true);

-- Optional, for logged-in dashboard users only. Keep anonymous visitors from reading the table.
drop policy if exists "Allow authenticated calculator read access" on public.calculadora_horas_leads;

create policy "Allow authenticated calculator read access"
on public.calculadora_horas_leads
for select
to authenticated
using (true);
