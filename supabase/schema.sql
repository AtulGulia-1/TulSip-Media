-- TulSip Media portal schema
create extension if not exists "pgcrypto";

create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid unique not null references auth.users (id) on delete cascade,
  full_name text not null,
  username text unique,
  role text not null check (role in ('owner', 'admin', 'manager', 'client')),
  avatar_url text,
  preferred_language text default 'en',
  inactivity_timeout_minutes int not null default 5 check (inactivity_timeout_minutes between 1 and 240),
  created_at timestamptz not null default now()
);

alter table public.users
  add column if not exists inactivity_timeout_minutes int not null default 5;
alter table public.users
  add column if not exists username text;
create unique index if not exists users_username_unique_idx on public.users (username) where username is not null;

create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  industry text,
  website text,
  primary_contact_auth_user_id uuid references auth.users (id) on delete set null,
  account_manager uuid references public.users (id),
  created_at timestamptz not null default now()
);

alter table public.clients add column if not exists industry text;
alter table public.clients add column if not exists website text;
alter table public.clients add column if not exists account_manager uuid references public.users (id);
alter table public.clients add column if not exists primary_contact_auth_user_id uuid references auth.users (id) on delete set null;

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients (id) on delete cascade,
  platform text not null,
  title text not null,
  status text not null check (status in ('draft', 'scheduled', 'published', 'in_review')),
  media_type text check (media_type in ('image', 'video')),
  media_url text,
  plan_note text,
  scheduled_at timestamptz,
  published_at timestamptz,
  metrics jsonb default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.posts add column if not exists media_type text check (media_type in ('image', 'video'));
alter table public.posts add column if not exists media_url text;
alter table public.posts add column if not exists plan_note text;

create table if not exists public.approvals (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts (id) on delete cascade,
  requested_by uuid not null references public.users (id),
  approved_by uuid references public.users (id),
  status text not null check (status in ('pending', 'approved', 'rejected')),
  due_date date,
  feedback text,
  created_at timestamptz not null default now()
);

create table if not exists public.deliverables (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients (id) on delete cascade,
  title text not null,
  media_type text check (media_type in ('image', 'video')),
  media_url text,
  quantity int default 1,
  status text not null check (status in ('pending', 'in_progress', 'delivered')) default 'pending',
  due_date date,
  delivered_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients (id) on delete cascade,
  report_type text not null check (report_type in ('weekly', 'monthly')) default 'weekly',
  period_start date not null,
  period_end date not null,
  reach int default 0,
  leads int default 0,
  spend numeric(12,2) default 0,
  revenue numeric(12,2) default 0,
  meta_insights jsonb default '{}'::jsonb,
  google_insights jsonb default '{}'::jsonb,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.client_requests (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients (id) on delete cascade,
  request_type text not null check (request_type in ('content_request', 'revision', 'support', 'admin_ticket')),
  priority text not null default 'medium' check (priority in ('low', 'medium', 'high')),
  status text not null default 'open' check (status in ('open', 'in_progress', 'resolved', 'closed')),
  subject text not null,
  details text,
  created_by_user_id uuid references public.users (id),
  resolved_by_user_id uuid references public.users (id),
  resolved_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients (id) on delete cascade,
  sender_user_id uuid not null references public.users (id) on delete cascade,
  sender_role text not null check (sender_role in ('owner', 'admin', 'manager', 'client')),
  body text not null,
  attachment_url text,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  order_id text unique not null,
  payment_id text unique not null,
  status text not null check (status in ('created', 'paid', 'failed')) default 'created',
  plan_id text,
  payer_email text,
  created_at timestamptz not null default now()
);

create table if not exists public.password_reset_otps (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid not null references auth.users (id) on delete cascade,
  email text not null,
  otp_hash text not null,
  expires_at timestamptz not null,
  used_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.reports add column if not exists report_type text not null default 'weekly';
alter table public.reports add column if not exists meta_insights jsonb default '{}'::jsonb;
alter table public.reports add column if not exists google_insights jsonb default '{}'::jsonb;

alter table public.users enable row level security;
alter table public.clients enable row level security;
alter table public.posts enable row level security;
alter table public.approvals enable row level security;
alter table public.deliverables enable row level security;
alter table public.reports enable row level security;
alter table public.payments enable row level security;
alter table public.password_reset_otps enable row level security;
alter table public.client_requests enable row level security;
alter table public.messages enable row level security;

drop policy if exists "Users can read own profile" on public.users;
create policy "Users can read own profile"
on public.users for select
using (auth.uid() = auth_user_id);

drop policy if exists "Authenticated users can read clients" on public.clients;
create policy "Authenticated users can read clients"
on public.clients for select
to authenticated
using (true);

drop policy if exists "Authenticated users can read posts" on public.posts;
create policy "Authenticated users can read posts"
on public.posts for select
to authenticated
using (true);

drop policy if exists "Authenticated users can read approvals" on public.approvals;
create policy "Authenticated users can read approvals"
on public.approvals for select
to authenticated
using (true);

drop policy if exists "Authenticated users can read deliverables" on public.deliverables;
create policy "Authenticated users can read deliverables"
on public.deliverables for select
to authenticated
using (true);

drop policy if exists "Authenticated users can read reports" on public.reports;
create policy "Authenticated users can read reports"
on public.reports for select
to authenticated
using (true);

drop policy if exists "Authenticated users can read payments" on public.payments;
create policy "Authenticated users can read payments"
on public.payments for select
to authenticated
using (true);

drop policy if exists "Authenticated users can read requests" on public.client_requests;
create policy "Authenticated users can read requests"
on public.client_requests for select
to authenticated
using (true);

drop policy if exists "Authenticated users can read messages" on public.messages;
create policy "Authenticated users can read messages"
on public.messages for select
to authenticated
using (true);

-- Admin/manager write policies

drop policy if exists "Admin manager can insert clients" on public.clients;
create policy "Admin manager can insert clients"
on public.clients for insert
to authenticated
with check (
  exists (
    select 1 from public.users u where u.auth_user_id = auth.uid() and u.role in ('owner', 'admin', 'manager')
  )
);

drop policy if exists "Admin manager can update clients" on public.clients;
create policy "Admin manager can update clients"
on public.clients for update
to authenticated
using (
  exists (
    select 1 from public.users u where u.auth_user_id = auth.uid() and u.role in ('owner', 'admin', 'manager')
  )
);

drop policy if exists "Admin manager can insert posts" on public.posts;
create policy "Admin manager can insert posts"
on public.posts for insert
to authenticated
with check (
  exists (
    select 1 from public.users u where u.auth_user_id = auth.uid() and u.role in ('owner', 'admin', 'manager')
  )
);

drop policy if exists "Admin manager can update posts" on public.posts;
create policy "Admin manager can update posts"
on public.posts for update
to authenticated
using (
  exists (
    select 1 from public.users u where u.auth_user_id = auth.uid() and u.role in ('owner', 'admin', 'manager')
  )
);

drop policy if exists "Admin manager can insert approvals" on public.approvals;
create policy "Admin manager can insert approvals"
on public.approvals for insert
to authenticated
with check (
  exists (
    select 1 from public.users u where u.auth_user_id = auth.uid() and u.role in ('owner', 'admin', 'manager')
  )
);

drop policy if exists "Admin manager can update approvals" on public.approvals;
create policy "Admin manager can update approvals"
on public.approvals for update
to authenticated
using (
  exists (
    select 1 from public.users u where u.auth_user_id = auth.uid() and u.role in ('owner', 'admin', 'manager')
  )
);

drop policy if exists "Admin manager can insert deliverables" on public.deliverables;
create policy "Admin manager can insert deliverables"
on public.deliverables for insert
to authenticated
with check (
  exists (
    select 1 from public.users u where u.auth_user_id = auth.uid() and u.role in ('owner', 'admin', 'manager')
  )
);

drop policy if exists "Admin manager can update deliverables" on public.deliverables;
create policy "Admin manager can update deliverables"
on public.deliverables for update
to authenticated
using (
  exists (
    select 1 from public.users u where u.auth_user_id = auth.uid() and u.role in ('owner', 'admin', 'manager')
  )
);

drop policy if exists "Admin manager can insert reports" on public.reports;
create policy "Admin manager can insert reports"
on public.reports for insert
to authenticated
with check (
  exists (
    select 1 from public.users u where u.auth_user_id = auth.uid() and u.role in ('owner', 'admin', 'manager')
  )
);

drop policy if exists "Admin manager can update reports" on public.reports;
create policy "Admin manager can update reports"
on public.reports for update
to authenticated
using (
  exists (
    select 1 from public.users u where u.auth_user_id = auth.uid() and u.role in ('owner', 'admin', 'manager')
  )
);

drop policy if exists "Admin manager can insert payments" on public.payments;
create policy "Admin manager can insert payments"
on public.payments for insert
to authenticated
with check (
  exists (
    select 1 from public.users u where u.auth_user_id = auth.uid() and u.role in ('owner', 'admin', 'manager')
  )
);

drop policy if exists "Admin manager can insert requests" on public.client_requests;
create policy "Admin manager can insert requests"
on public.client_requests for insert
to authenticated
with check (
  exists (
    select 1 from public.users u where u.auth_user_id = auth.uid() and u.role in ('owner', 'admin', 'manager')
  )
);

drop policy if exists "Client can insert own requests" on public.client_requests;
create policy "Client can insert own requests"
on public.client_requests for insert
to authenticated
with check (
  exists (
    select 1
    from public.users u
    join public.clients c on c.primary_contact_auth_user_id = u.auth_user_id
    where u.auth_user_id = auth.uid()
      and u.role = 'client'
      and c.id = client_id
  )
);

drop policy if exists "Admin manager can update requests" on public.client_requests;
create policy "Admin manager can update requests"
on public.client_requests for update
to authenticated
using (
  exists (
    select 1 from public.users u where u.auth_user_id = auth.uid() and u.role in ('owner', 'admin', 'manager')
  )
);

drop policy if exists "Authenticated users can insert messages" on public.messages;
create policy "Authenticated users can insert messages"
on public.messages for insert
to authenticated
with check (true);

drop policy if exists "Service role manages password reset otps" on public.password_reset_otps;
create policy "Service role manages password reset otps"
on public.password_reset_otps for all
to authenticated
using (false)
with check (false);

-- Sample data
insert into public.clients (id, name, industry, website)
values
  ('11111111-1111-1111-1111-111111111111', 'TulSip Demo Client', 'Retail', 'https://example.com')
on conflict do nothing;

insert into public.posts (client_id, platform, title, status, media_type, media_url, scheduled_at, metrics)
values
  ('11111111-1111-1111-1111-111111111111', 'Instagram', 'Spring Offer Reel', 'scheduled', 'video', 'https://example.com/reel.mp4', now() + interval '2 day', '{"impressions": 12400, "engagement_rate": 6.2}'),
  ('11111111-1111-1111-1111-111111111111', 'Facebook', 'Weekend Promo Creative', 'in_review', 'image', 'https://example.com/creative.jpg', now() + interval '1 day', '{"impressions": 8400, "engagement_rate": 4.7}')
on conflict do nothing;

insert into public.deliverables (client_id, title, status, due_date)
values
  ('11111111-1111-1111-1111-111111111111', 'April Creative Pack', 'in_progress', current_date + 5),
  ('11111111-1111-1111-1111-111111111111', 'Monthly Strategy Deck', 'pending', current_date + 9)
on conflict do nothing;

insert into public.reports (client_id, report_type, period_start, period_end, reach, leads, spend, revenue, meta_insights, google_insights, notes)
values
  ('11111111-1111-1111-1111-111111111111', 'monthly', '2026-03-01', '2026-03-31', 87200, 428, 52000, 181000, '{"reach": 87200, "ctr": 3.7}', '{"clicks": 5400, "cpc": 14.2}', 'Healthy month-over-month growth in paid social and search.')
on conflict do nothing;

-- Website CMS
create table if not exists public.portfolio_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  result text not null,
  media_url text not null,
  media_type text not null check (media_type in ('image', 'video')) default 'image',
  external_link text,
  sort_order int default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.feedback_submissions (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text not null,
  rating int not null default 5 check (rating between 1 and 5),
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.portfolio_items enable row level security;
alter table public.feedback_submissions enable row level security;

drop policy if exists "Public read published portfolio items" on public.portfolio_items;
create policy "Public read published portfolio items"
on public.portfolio_items for select
to anon, authenticated
using (is_published = true);

drop policy if exists "Admin manage portfolio items" on public.portfolio_items;
create policy "Admin manage portfolio items"
on public.portfolio_items for all
to authenticated
using (
  exists (
    select 1 from public.users u where u.auth_user_id = auth.uid() and u.role in ('owner', 'admin', 'manager')
  )
)
with check (
  exists (
    select 1 from public.users u where u.auth_user_id = auth.uid() and u.role in ('owner', 'admin', 'manager')
  )
);

drop policy if exists "Allow feedback insert" on public.feedback_submissions;
create policy "Allow feedback insert"
on public.feedback_submissions for insert
to anon, authenticated
with check (true);

drop policy if exists "Admin read feedback" on public.feedback_submissions;
create policy "Admin read feedback"
on public.feedback_submissions for select
to authenticated
using (
  exists (
    select 1 from public.users u where u.auth_user_id = auth.uid() and u.role in ('owner', 'admin', 'manager')
  )
);

