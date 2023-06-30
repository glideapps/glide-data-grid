#!/bin/bash
path=$(pwd)

echo "$(pwd)"

docker run --env PLAYWRIGHT_BASE_URL=http://docker:9009/ --rm --add-host=docker:host-gateway -v "$(pwd)":/work/ -w /work/ -it mcr.microsoft.com/playwright:v1.35.1-focal npm run test:e2e -- -u
npm run test:e2e -- -u
