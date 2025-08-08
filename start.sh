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
node .next/standalone/server.js 