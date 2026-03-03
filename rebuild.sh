#!/bin/bash
# Rebuild script for Sanity webhook-triggered rebuilds
# Can be called by a webhook listener on the Digital Ocean Droplet

set -e

echo "Starting rebuild at $(date)"

cd "$(dirname "$0")"

git pull origin main
npm install --production=false
npm run build

echo "Rebuild complete at $(date)"
