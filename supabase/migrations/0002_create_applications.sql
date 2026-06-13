-- Installment applications submitted via the apply flow
create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  reference text unique not null,
  status text not null default 'pending',

  -- Product & Branch
  product_id text not null,
  product_name text not null,
  product_price numeric not null,
  term_months integer not null,
  branch_id text not null,
  branch_name text not null,

  -- Personal Information
  last_name text not null,
  first_name text not null,
  middle_name text,
  birthday date not null,
  gender text not null,
  civil_status text not null,
  nationality text not null,
  present_address text not null,
  cellular_no text not null,
  tel_no text,
  email text not null,

  -- Employment & Income
  employment_type text not null,
  employer_name text not null,
  nature_of_business text,
  employer_address text not null,
  employer_contact text not null,
  position text,
  employment_status text,
  years_connected text not null,
  gross_income numeric not null,

  -- Documents
  proof_of_income_type text not null,
  proof_of_income_path text not null,
  proof_of_billing_type text not null,
  proof_of_billing_path text not null,
  id_type text not null,
  id_path text not null,

  created_at timestamptz not null default now()
);

create index if not exists applications_reference_idx on public.applications (reference);
create index if not exists applications_status_idx on public.applications (status);

alter table public.applications enable row level security;

-- Applicants can submit new applications, but cannot read, update, or delete any rows.
create policy "Anyone can submit an application"
  on public.applications for insert
  with check (true);

-- Private storage bucket for applicant-uploaded documents
insert into storage.buckets (id, name, public)
values ('application-documents', 'application-documents', false)
on conflict (id) do nothing;

-- Applicants can upload documents, but cannot list, read, update, or delete them.
create policy "Anyone can upload application documents"
  on storage.objects for insert
  with check (bucket_id = 'application-documents');
