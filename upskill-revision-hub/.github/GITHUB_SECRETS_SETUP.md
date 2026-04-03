# GitHub Secrets Setup Guide

This document explains how to configure GitHub Secrets required for the CI/CD pipeline.

## Prerequisites

Before setting up secrets, you need:

1. **GitHub Repository** - Your project pushed to GitHub
2. **Azure Subscription** - Active Azure account
3. **Azure CLI** - Installed locally (`az --version`)
4. **Contributor permissions** - To your Azure subscription

## Step-by-Step Setup

### 1. Create Azure Container Registry (ACR)

```bash
# Login to Azure
az login

# Set variables
RESOURCE_GROUP="upskill-rg"
REGISTRY_NAME="upskillregistry"  # Must be globally unique
LOCATION="eastus"

# Create resource group
az group create \
  --name $RESOURCE_GROUP \
  --location $LOCATION

# Create container registry
az acr create \
  --resource-group $RESOURCE_GROUP \
  --name $REGISTRY_NAME \
  --sku Basic

# Enable admin user (or use service principal)
az acr update \
  --name $REGISTRY_NAME \
  --admin-enabled true

# Get credentials
az acr credential show \
  --name $REGISTRY_NAME \
  --query '[username, passwords[0].value]' \
  -o tsv
```

### 2. Get Azure Credentials

```bash
# Get subscription ID
az account show --query id -o tsv

# Create service principal for GitHub Actions
az ad sp create-for-rbac \
  --name "github-actions-upskill" \
  --role contributor \
  --scopes /subscriptions/{SUBSCRIPTION_ID}/resourceGroups/{RESOURCE_GROUP}
```

This will output JSON with credentials:

```json
{
  "appId": "...",
  "password": "...",
  "tenant": "..."
}
```

Convert to format needed for GitHub:

```bash
echo "{
  \"clientId\": \"$appId\",
  \"clientSecret\": \"$password\",
  \"subscriptionId\": \"$subscriptionId\",
  \"tenantId\": \"$tenantId\"
}" | tee azure-credentials.json
```

### 3. Add GitHub Secrets

Go to **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

Add these secrets:

| Secret Name                   | Value                            | How to Get                                                                      |
| ----------------------------- | -------------------------------- | ------------------------------------------------------------------------------- |
| `AZURE_SUBSCRIPTION_ID`       | Your subscription ID             | `az account show --query id -o tsv`                                             |
| `AZURE_RESOURCE_GROUP`        | `upskill-rg`                     | Your chosen resource group name                                                 |
| `AZURE_APP_NAME`              | `upskill-revision-hub`           | Your app name                                                                   |
| `AZURE_REGISTRY_LOGIN_SERVER` | `upskillregistry.azurecr.io`     | `az acr list --query "[0].loginServer" -o tsv`                                  |
| `AZURE_REGISTRY_USERNAME`     | Check ACR credentials            | `az acr credential show -n upskillregistry -q "[username]" -o tsv`              |
| `AZURE_REGISTRY_PASSWORD`     | Check ACR credentials            | `az acr credential show -n upskillregistry --query "passwords[0].value" -o tsv` |
| `AZURE_CREDENTIALS`           | Full JSON from service principal | See step 2                                                                      |
| `SLACK_WEBHOOK_URL`           | (Optional) Slack webhook         | From Slack workspace settings                                                   |

### 4. Verify Secrets Are Set

```bash
# List all secrets (names only)
gh secret list --repo owner/repo
```

## Troubleshooting

### Secret not working in workflow

- Ensure secret name is spelled exactly as referenced in `.github/workflows/deploy.yml`
- Secrets are case-sensitive
- Verify secret value is correct in GitHub UI

### Authentication failures

- Check `AZURE_CREDENTIALS` is valid JSON
- Verify service principal has `Contributor` role
- Test credentials locally: `az login --service-principal -u $appId -p $password --tenant $tenantId`

### Docker push fails

- Verify `AZURE_REGISTRY_USERNAME` and `AZURE_REGISTRY_PASSWORD` are correct
- Check ACR admin is enabled: `az acr update -n upskillregistry --admin-enabled true`

## Next Steps

1. Commit these secrets setup
2. Push code to GitHub
3. Check **Actions** tab to see workflow execution
4. Monitor deployment progress in the **Deploy** job

## Security Best Practices

✅ **DO:**

- Rotate secrets every 90 days
- Use service principals instead of personal credentials
- Limit service principal permissions to minimum needed
- Use separate credentials for dev/staging/prod

❌ **DON'T:**

- Share secrets in code, logs, or documentation
- Use personal Azure credentials
- Commit `.env` files or credentials locally
- Grant overly broad permissions

## Additional Resources

- [GitHub Secrets Docs](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [Azure Service Principal](https://docs.microsoft.com/en-us/cli/azure/create-an-azure-service-principal-azure-cli)
- [ACR Authentication](https://docs.microsoft.com/en-us/azure/container-registry/container-registry-authentication)
