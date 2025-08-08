#!/bin/bash

# Wait for database to be ready
echo "Waiting for database to be ready..."
sleep 15

# Run database migrations
echo "Running database migrations..."
echo "DATABASE_URL=$DATABASE_URL"
npx prisma migrate deploy

# Start the application
echo "Starting the application..."
export PORT=${PORT:-8080}
export HOST=0.0.0.0
echo "Listening on $HOST:$PORT"
node .next/standalone/server.js