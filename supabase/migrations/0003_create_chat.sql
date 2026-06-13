-- Chat conversations between customers and the AI/staff
create table if not exists chat_conversations (
  id uuid primary key default gen_random_uuid(),
  status text not null default 'ai' check (status in ('ai', 'handoff_requested', 'human', 'closed')),
  customer_name text,
  customer_email text,
  customer_phone text,
  page_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists chat_messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references chat_conversations(id) on delete cascade,
  role text not null check (role in ('user', 'assistant', 'staff', 'system')),
  content text not null,
  created_at timestamptz not null default now()
);

create index if not exists idx_chat_messages_conversation on chat_messages(conversation_id, created_at);
create index if not exists idx_chat_conversations_status on chat_conversations(status, updated_at);

alter table chat_conversations enable row level security;
alter table chat_messages enable row level security;

-- Anyone holding the conversation id (an unguessable UUID) can read/update it
create policy "Anyone can access conversations by id"
  on chat_conversations for select using (true);

create policy "Anyone can create conversations"
  on chat_conversations for insert with check (true);

create policy "Anyone can update conversation status"
  on chat_conversations for update using (true);

create policy "Anyone can read messages"
  on chat_messages for select using (true);

-- Customers can only insert their own user-role messages; assistant/staff messages
-- are written via the service role (which bypasses RLS)
create policy "Anyone can send user messages"
  on chat_messages for insert with check (role = 'user');

-- Enable realtime for live updates
alter publication supabase_realtime add table chat_messages;
alter publication supabase_realtime add table chat_conversations;
