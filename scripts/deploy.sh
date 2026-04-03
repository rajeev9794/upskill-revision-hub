#!/bin/bash

# Deploy to Azure using Bicep
# This script deploys the infrastructure and app to Azure

set -e

# Configuration
RESOURCE_GROUP="upskill-rg"
LOCATION="eastus"
APP_NAME="upskill-revision-hub"
ACR_NAME="upskillregistry"
ACR_RESOURCE_GROUP="upskill-rg"
CONTAINER_IMAGE="upskillregistry.azurecr.io/upskill:latest"

echo "Deploying UpSkill to Azure..."

# Login to Azure
az login

# Deploy Bicep template
echo "Deploying infrastructure..."
az deployment group create \
  --resource-group "$RESOURCE_GROUP" \
  --template-file infra/main.bicep \
  --parameters infra/parameters.json \
  --parameters \
    location="$LOCATION" \
    appName="$APP_NAME" \
    acrName="$ACR_NAME" \
    acrResourceGroup="$ACR_RESOURCE_GROUP" \
    containerImage="$CONTAINER_IMAGE"

echo "Deployment complete!"
echo "App URL: https://$APP_NAME.azurewebsites.net"
