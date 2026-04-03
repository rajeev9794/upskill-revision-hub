#!/bin/bash

# Azure Setup Automation Script for UpSkill Revision Hub
# This script automates Azure resource creation and GitHub secret configuration

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
RESOURCE_GROUP="upskill-rg"
LOCATION="eastus"
ACR_NAME="upskillregistry"
APP_NAME="upskill-revision-hub"
SUBSCRIPTION_ID=""

echo -e "${BLUE}================================================${NC}"
echo -e "${BLUE}  UpSkill Revision Hub - Azure Setup Script${NC}"
echo -e "${BLUE}================================================${NC}"

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
echo -e "\n${YELLOW}Checking prerequisites...${NC}"

if ! command_exists az; then
    echo -e "${RED}ERROR: Azure CLI is not installed${NC}"
    echo "Install from: https://docs.microsoft.com/en-us/cli/azure/install-azure-cli"
    exit 1
fi

if ! command_exists jq; then
    echo -e "${YELLOW}WARNING: jq is not installed (optional but recommended)${NC}"
    echo "Install from: https://stedolan.github.io/jq/"
fi

echo -e "${GREEN}✓ Prerequisites check passed${NC}"

# Login to Azure
echo -e "\n${YELLOW}Logging into Azure...${NC}"
az login

# Get subscription ID
echo -e "\n${YELLOW}Fetching subscription ID...${NC}"
SUBSCRIPTION_ID=$(az account show --query id -o tsv)
echo -e "${GREEN}✓ Subscription ID: $SUBSCRIPTION_ID${NC}"

# Create resource group
echo -e "\n${YELLOW}Creating resource group...${NC}"
az group create \
    --name "$RESOURCE_GROUP" \
    --location "$LOCATION" \
    --output table

echo -e "${GREEN}✓ Resource group created: $RESOURCE_GROUP${NC}"

# Create Container Registry
echo -e "\n${YELLOW}Creating Azure Container Registry...${NC}"
az acr create \
    --resource-group "$RESOURCE_GROUP" \
    --name "$ACR_NAME" \
    --sku Basic \
    --output table

# Enable admin user on ACR
echo -e "\n${YELLOW}Enabling admin access on ACR...${NC}"
az acr update \
    --name "$ACR_NAME" \
    --admin-enabled true

echo -e "${GREEN}✓ Container Registry created: $ACR_NAME${NC}"

# Get ACR credentials
echo -e "\n${YELLOW}Retrieving ACR credentials...${NC}"
ACR_LOGIN_SERVER=$(az acr list-endpoints --name "$ACR_NAME" -o tsv | head -1)
ACR_USERNAME=$(az acr credential show -n "$ACR_NAME" --query username -o tsv)
ACR_PASSWORD=$(az acr credential show -n "$ACR_NAME" --query "passwords[0].value" -o tsv)

echo -e "${GREEN}✓ ACR credentials obtained${NC}"

# Create service principal for GitHub Actions
echo -e "\n${YELLOW}Creating service principal for GitHub Actions...${NC}"
SP_OUTPUT=$(az ad sp create-for-rbac \
    --name "github-actions-upskill" \
    --role Contributor \
    --scopes /subscriptions/"$SUBSCRIPTION_ID"/resourceGroups/"$RESOURCE_GROUP" \
    --json-auth)

APP_ID=$(echo "$SP_OUTPUT" | grep -o '"clientId": "[^"]*' | head -1 | cut -d'"' -f4)
CLIENT_SECRET=$(echo "$SP_OUTPUT" | grep -o '"clientSecret": "[^"]*' | head -1 | cut -d'"' -f4)
TENANT_ID=$(echo "$SP_OUTPUT" | grep -o '"tenantId": "[^"]*' | head -1 | cut -d'"' -f4)

echo -e "${GREEN}✓ Service principal created${NC}"

# Create Azure credentials JSON
AZURE_CREDENTIALS=$(printf '{
  "clientId": "%s",
  "clientSecret": "%s",
  "subscriptionId": "%s",
  "tenantId": "%s"
}' "$APP_ID" "$CLIENT_SECRET" "$SUBSCRIPTION_ID" "$TENANT_ID")

# Display secrets summary
echo -e "\n${BLUE}================================================${NC}"
echo -e "${BLUE}  GitHub Secrets Configuration${NC}"
echo -e "${BLUE}================================================${NC}"
echo -e "\n${YELLOW}Add these secrets to your GitHub repository:${NC}"
echo -e "${YELLOW}(Settings → Secrets and variables → Actions)${NC}\n"

echo -e "${GREEN}AZURE_SUBSCRIPTION_ID${NC}"
echo "$SUBSCRIPTION_ID"

echo -e "\n${GREEN}AZURE_RESOURCE_GROUP${NC}"
echo "$RESOURCE_GROUP"

echo -e "\n${GREEN}AZURE_APP_NAME${NC}"
echo "$APP_NAME"

echo -e "\n${GREEN}AZURE_REGISTRY_LOGIN_SERVER${NC}"
echo "$ACR_LOGIN_SERVER"

echo -e "\n${GREEN}AZURE_REGISTRY_USERNAME${NC}"
echo "$ACR_USERNAME"

echo -e "\n${GREEN}AZURE_REGISTRY_PASSWORD${NC}"
echo "$ACR_PASSWORD"

echo -e "\n${GREEN}AZURE_CREDENTIALS${NC}"
echo "$AZURE_CREDENTIALS" | jq . 2>/dev/null || echo "$AZURE_CREDENTIALS"

# Save to file
echo -e "\n${YELLOW}Saving secrets to secrets.json...${NC}"
cat > secrets.json << EOF
{
  "AZURE_SUBSCRIPTION_ID": "$SUBSCRIPTION_ID",
  "AZURE_RESOURCE_GROUP": "$RESOURCE_GROUP",
  "AZURE_APP_NAME": "$APP_NAME",
  "AZURE_REGISTRY_LOGIN_SERVER": "$ACR_LOGIN_SERVER",
  "AZURE_REGISTRY_USERNAME": "$ACR_USERNAME",
  "AZURE_REGISTRY_PASSWORD": "$ACR_PASSWORD",
  "AZURE_CREDENTIALS": $AZURE_CREDENTIALS
}
EOF

echo -e "${GREEN}✓ Secrets saved to secrets.json${NC}"

# Display next steps
echo -e "\n${BLUE}================================================${NC}"
echo -e "${BLUE}  Next Steps${NC}"
echo -e "${BLUE}================================================${NC}"

echo -e "\n${YELLOW}1. Add GitHub Secrets:${NC}"
echo "   - Copy the values above"
echo "   - Go to: Settings → Secrets and variables → Actions"
echo "   - Add each secret with the names shown"

echo -e "\n${YELLOW}2. Push code to GitHub:${NC}"
echo "   git add ."
echo "   git commit -m 'Add CI/CD pipeline configuration'"
echo "   git push origin main"

echo -e "\n${YELLOW}3. Monitor deployment:${NC}"
echo "   - Go to GitHub Actions tab"
echo "   - Watch the workflow execute"
echo "   - Check app at: https://$APP_NAME.azurewebsites.net"

echo -e "\n${YELLOW}4. Update Bicep parameters:${NC}"
echo "   - Edit: infra/parameters.json"
echo "   - Update values with Azure resources created above"

echo -e "\n${GREEN}✓ Setup complete!${NC}\n"

# Cleanup
echo -e "${YELLOW}Security note: secrets.json contains sensitive data${NC}"
echo -e "${YELLOW}Delete this file after adding secrets to GitHub:${NC}"
echo "   rm secrets.json"
