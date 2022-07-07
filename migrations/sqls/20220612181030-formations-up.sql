CREATE TABLE IF NOT EXISTS formations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  content JSON DEFAULT '[]',
  created_on timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(title)
);