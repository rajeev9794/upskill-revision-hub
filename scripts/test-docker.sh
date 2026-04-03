#!/bin/bash

# Local Docker testing script
# Build and run the app locally to test before pushing to Azure

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}Building and testing Docker image locally...${NC}\n"

# Build React app
echo -e "${YELLOW}Building React application...${NC}"
npm run build

# Build Docker image
echo -e "\n${YELLOW}Building Docker image...${NC}"
docker build -t upskill:latest .

# Run container
echo -e "\n${YELLOW}Starting container...${NC}"
docker run -d \
  --name upskill-test \
  -p 3000:3000 \
  --health-cmd='node -e "require(\"http\").get(\"http://localhost:3000\", (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"' \
  --health-interval=30s \
  --health-timeout=10s \
  --health-retries=3 \
  upskill:latest

echo -e "${GREEN}✓ Container started${NC}"

# Wait for app to be ready
echo -e "\n${YELLOW}Waiting for app to be ready...${NC}"
sleep 5

# Check health
echo -e "${YELLOW}Checking app health...${NC}"
if docker exec upskill-test curl -f http://localhost:3000 > /dev/null 2>&1; then
  echo -e "${GREEN}✓ App is healthy and responding${NC}"
  echo -e "\n${BLUE}App is running at: http://localhost:3000${NC}"
  echo -e "${BLUE}Press Ctrl+C to stop${NC}\n"
  
  # View logs
  docker logs -f upskill-test
else
  echo -e "${RED}✗ App health check failed${NC}"
  docker logs upskill-test
  docker stop upskill-test
  docker rm upskill-test
  exit 1
fi
