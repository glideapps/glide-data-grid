#!/bin/bash

# Script to publish packages to internal Nexus repository
# Usage: ./publish-to-nexus.sh [registry-url] [username] [password]

set -e

# Default values - replace these with your actual Nexus repository URL if not provided as arguments
DEFAULT_REGISTRY_URL="https://nexus.businessappdelivery-dev.aws.gwl.com/repository/npm-releases/"
DEFAULT_USERNAME="dvngrb"
# Password will be prompted if not provided

# Parse arguments
REGISTRY_URL=${1:-$DEFAULT_REGISTRY_URL}
USERNAME=${2:-$DEFAULT_USERNAME}
PASSWORD=$3

if [ -z "$PASSWORD" ]; then
  echo "Enter your Nexus password: "
  read -s PASSWORD
fi

echo "Publishing packages to Nexus repository at $REGISTRY_URL"

# Install dependencies first to make sure TypeScript is available
echo "Installing dependencies..."
npm ci

# Build all packages using npx to ensure local TypeScript is used
echo "Building all packages..."
npm run build

# Create temporary .npmrc file
TEMP_NPMRC=$(mktemp)

# Create a more complete .npmrc file with proper authentication
cat > "$TEMP_NPMRC" << EOL
registry=${REGISTRY_URL}
//nexus.businessappdelivery-dev.aws.gwl.com/repository/npm-releases/:_authToken=${USERNAME}:${PASSWORD}
//nexus.businessappdelivery-dev.aws.gwl.com/repository/npm-releases/:username=${USERNAME}
//nexus.businessappdelivery-dev.aws.gwl.com/repository/npm-releases/:_password=$(echo -n "${PASSWORD}" | base64)
//nexus.businessappdelivery-dev.aws.gwl.com/repository/npm-releases/:email=devon.garbalosa@empower.com
//nexus.businessappdelivery-dev.aws.gwl.com/repository/npm-releases/:always-auth=true
email=devon.garbalosa@empower.com
EOL

# Function to publish a package
publish_package() {
  local PACKAGE_PATH=$1
  local PACKAGE_NAME=$(node -p "require('$PACKAGE_PATH/package.json').name")
  local PACKAGE_VERSION=$(node -p "require('$PACKAGE_PATH/package.json').version")

  echo "Publishing $PACKAGE_NAME@$PACKAGE_VERSION from $PACKAGE_PATH..."

  # Change to package directory
  cd $PACKAGE_PATH

  # Use the temporary .npmrc file for publishing
  cp "$TEMP_NPMRC" .npmrc

  # Add npm login step before publishing
  echo "Logging in to Nexus repository..."
  npm login --registry $REGISTRY_URL --auth-type=legacy

  # Check if the version is a prerelease version (contains a hyphen)
  if [[ "$PACKAGE_VERSION" == *"-"* ]]; then
    echo "Detected prerelease version. Adding --tag=next parameter..."
    npm publish --registry $REGISTRY_URL --tag next
  else
    npm publish --registry $REGISTRY_URL
  fi

  # Remove temporary .npmrc
  rm -f .npmrc

  # Return to root directory
  cd - > /dev/null

  echo "Successfully published $PACKAGE_NAME to Nexus"
}

# Publish each package in the correct order (dependencies first)
echo "Publishing packages in order..."

# Publish core package
publish_package "$(pwd)/packages/core"

# Publish cells package (depends on core)
publish_package "$(pwd)/packages/cells"

# Publish source package (depends on core)
publish_package "$(pwd)/packages/source"

# Remove temporary .npmrc file
rm -f "$TEMP_NPMRC"

echo "All packages have been published to Nexus successfully!"
