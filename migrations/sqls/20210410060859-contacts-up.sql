CREATE TABLE IF NOT EXISTS contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL,
  created_on timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(email)
);