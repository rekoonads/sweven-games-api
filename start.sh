#!/bin/sh
set -e

echo "Starting Sweven Games Custom API..."
echo "Running Prisma migrations..."

# Run migrations
npx prisma migrate deploy || echo "Migration failed, continuing anyway..."

echo "Starting the application..."
node dist/main.js
