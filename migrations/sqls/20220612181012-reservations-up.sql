CREATE TABLE IF NOT EXISTS reservations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  contact_id UUID NOT NULL REFERENCES contacts (id) ON DELETE CASCADE,
  prestation_id UUID NOT NULL REFERENCES prestations (id) ON DELETE CASCADE,
  created_on timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP
);