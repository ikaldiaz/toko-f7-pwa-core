
-- Create teams table
create table teams (
  id serial primary key,
  name text
);

-- Create teams and members (many to many join)
create table members (
  team_id bigint references teams,
  user_id uuid references auth.users,
  is_owner boolean
);

-- Enable RLS for teams
alter table teams
  enable row level security;

-- Enable RLS for table members
alter table members
  enable row level security;


-- Create security definer function for team_owner
create or replace function get_teams_owner()
returns setof bigint
language sql
security definer
set search_path = public
stable
as $$
    select team_id
    from members
    where user_id = auth.uid() and is_owner = true
$$;

-- Create Policy for team_owner
create policy "Team owner can update team members if they belong to the team."
  on members
  for all using (
    team_id in (
      select get_teams_owner()
    )
  );


-- Create security definer function team_members
create or replace function get_teams_for_authenticated_user()
returns setof bigint
language sql
security definer
set search_path = public
stable
as $$
    select team_id
    from members
    where user_id = auth.uid()
$$;


-- Create Policy for team_members read table teams
create policy "Team members can fetch team details if they belong to the team."
  on teams
  for select using (
    auth.uid() in (
      select user_id from members
      where team_id = id
    )
  );

-- Create Policy for team_members read table members
create policy "Team member can read team members if they belong to the team."
  on members
  for select using (
    team_id in (
      select get_teams_for_authenticated_user()
    )
  );