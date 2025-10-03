#!/bin/bash

# Build the project
npx nest build

# Copy Prisma client to dist
cp -r prisma dist/

echo "Build completed successfully!"
