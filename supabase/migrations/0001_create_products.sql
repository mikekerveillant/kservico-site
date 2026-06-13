-- Products catalog table
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  sku text unique not null,
  name text not null,
  slug text unique not null,
  brand text not null,
  category text not null,
  subcategory text,
  price numeric not null,
  original_price numeric,
  description text,
  features text[] not null default '{}',
  images text[] not null default '{}',
  is_featured boolean not null default false,
  is_active boolean not null default true,
  stock_qty integer not null default 0,
  specifications jsonb not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists products_category_idx on public.products (category);
create index if not exists products_brand_idx on public.products (brand);
create index if not exists products_slug_idx on public.products (slug);

alter table public.products enable row level security;

create policy "Public can read active products"
  on public.products for select
  using (is_active = true);
