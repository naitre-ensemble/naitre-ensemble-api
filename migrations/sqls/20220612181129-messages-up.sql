CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  firstname VARCHAR(255) NOT NULL,
  lastname VARCHAR(255) NOT NULL,
  email TEXT NOT NULL,
  phone VARCHAR(255),
  message TEXT NOT NULL,
  created_on timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP
);