#!/bin/sh
echo "=== Starting Sweven Games API ==="
echo "NODE_ENV: $NODE_ENV"
echo "PORT: $PORT"
echo "DATABASE_URL: ${DATABASE_URL:0:30}..." 
echo "==================================="
exec node dist/main.js
