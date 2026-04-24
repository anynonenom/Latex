INSERT INTO users (id, email, name, password_hash, role)
VALUES
  ('11111111-1111-1111-1111-111111111111', 'alice@company.com', 'Alice Kim', 'hash1', 'developer'),
  ('22222222-2222-2222-2222-222222222222', 'bob@company.com', 'Bob Rivera', 'hash2', 'developer'),
  ('33333333-3333-3333-3333-333333333333', 'manager@company.com', 'Priya Shah', 'hash3', 'manager');

INSERT INTO work_sessions (
  id, user_id, session_type, goal, reality, decision_taken, alternatives_considered, final_reason,
  friction, confidence_level, energy_level, is_blocked
) VALUES (
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
  '11111111-1111-1111-1111-111111111111',
  'feature',
  'Ship API pagination for sessions',
  'Discovered N+1 query and changed fetch strategy',
  'Implemented keyset pagination',
  'Offset pagination and cursor library',
  'Lowest latency under high cardinality',
  'Schema mismatch on staging',
  8, 7, FALSE
);

INSERT INTO time_breakdowns (session_id, coding_time, debugging_time, research_time, blocked_time)
VALUES ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 110, 45, 20, 15);

INSERT INTO decisions (user_id, problem, options, chosen_solution, reasoning, risks)
VALUES (
  '11111111-1111-1111-1111-111111111111',
  'How to paginate manager dashboard session feed',
  'Offset / keyset / materialized view',
  'Keyset pagination',
  'Stable response time and no drift while sessions stream in',
  'Harder backward pagination for arbitrary page jumps'
);

INSERT INTO frictions (user_id, session_id, type, description, time_lost)
VALUES (
  '22222222-2222-2222-2222-222222222222',
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
  'unclear_spec',
  'Blocked waiting for PM clarification on confidence score rubric',
  40
);

INSERT INTO attachments (session_id, attachment_type, url, label)
VALUES
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'pr_link', 'https://github.com/acme/repo/pull/92', 'PR #92'),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'video_link', 'https://loom.com/share/demo-123', 'Session walkthrough');
