CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'developer',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE work_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  session_type TEXT NOT NULL,
  goal TEXT NOT NULL,
  reality TEXT NOT NULL,
  decision_taken TEXT NOT NULL,
  alternatives_considered TEXT NOT NULL,
  final_reason TEXT NOT NULL,
  friction TEXT NOT NULL,
  confidence_level SMALLINT NOT NULL CHECK (confidence_level BETWEEN 1 AND 10),
  energy_level SMALLINT NOT NULL CHECK (energy_level BETWEEN 1 AND 10),
  is_blocked BOOLEAN NOT NULL DEFAULT FALSE,
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE time_breakdowns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID UNIQUE NOT NULL REFERENCES work_sessions(id) ON DELETE CASCADE,
  coding_time INTEGER NOT NULL DEFAULT 0 CHECK (coding_time >= 0),
  debugging_time INTEGER NOT NULL DEFAULT 0 CHECK (debugging_time >= 0),
  research_time INTEGER NOT NULL DEFAULT 0 CHECK (research_time >= 0),
  blocked_time INTEGER NOT NULL DEFAULT 0 CHECK (blocked_time >= 0)
);

CREATE TABLE decisions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  problem TEXT NOT NULL,
  options TEXT NOT NULL,
  chosen_solution TEXT NOT NULL,
  reasoning TEXT NOT NULL,
  risks TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE frictions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  session_id UUID REFERENCES work_sessions(id) ON DELETE SET NULL,
  type TEXT NOT NULL,
  description TEXT NOT NULL,
  time_lost INTEGER NOT NULL CHECK (time_lost >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE attachments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES work_sessions(id) ON DELETE CASCADE,
  attachment_type TEXT NOT NULL,
  url TEXT NOT NULL,
  label TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_work_sessions_user_started ON work_sessions(user_id, started_at DESC);
CREATE INDEX idx_decisions_user_created ON decisions(user_id, created_at DESC);
CREATE INDEX idx_frictions_type_created ON frictions(type, created_at DESC);
CREATE INDEX idx_time_breakdowns_blocked ON time_breakdowns(blocked_time DESC);
