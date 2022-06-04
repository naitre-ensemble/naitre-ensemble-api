#!/bin/sh

CONTAINER="postgres"
POSTGRES_PASSWORD="postgres"
HOST="localhost"

until PGPASSWORD=$POSTGRES_PASSWORD docker exec $CONTAINER psql -h "$HOST" -U "postgres" -c '\q' >/dev/null 2>&1; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done