create table public.visits (
  id bigint generated always as identity primary key,
  visitor_id text not null,
  visited_on date not null default current_date,
  created_at timestamptz default now(),
  unique (visitor_id, visited_on)
);

alter table public.visits enable row level security;

create or replace function public.register_visit(p_visitor_id text)
returns json
language plpgsql
security definer
set search_path = public
as $$
begin
  if p_visitor_id is not null and length(p_visitor_id) between 8 and 64 then
    insert into visits (visitor_id) values (p_visitor_id)
    on conflict (visitor_id, visited_on) do nothing;
  end if;

  return json_build_object(
    'total', (select count(distinct visitor_id) from visits),
    'today', (select count(*) from visits where visited_on = current_date)
  );
end $$;

revoke all on function public.register_visit(text) from public;
grant execute on function public.register_visit(text) to anon;
