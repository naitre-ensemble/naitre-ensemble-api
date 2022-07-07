CREATE TABLE IF NOT EXISTS prestations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  url VARCHAR(255) NOT NULL,
  image VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  content VARCHAR[] ,
  prestations VARCHAR(255) NOT NULL,
  duration VARCHAR(255) NOT NULL,
  price VARCHAR(255) NOT NULL,
  created_on timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(url, title)
);