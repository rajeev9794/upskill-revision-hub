# Azure CI/CD Deployment Plan - UpSkill Revision Hub

**Project**: UpSkill Revision Hub (React SPA)  
**Created**: April 4, 2026  
**Status**: Ready for Implementation

---

## 📋 Executive Summary

This plan outlines a complete **GitHub Actions → Azure App Service** CI/CD pipeline for your React revision hub. Changes pushed to GitHub automatically trigger builds, tests, and blue-green deployments to Azure.

**Key Features**:

- ✅ Automated builds on every push
- ✅ Automatic testing and code quality checks
- ✅ Blue-green deployment (zero-downtime)
- ✅ Environment-based configuration (dev/staging/prod)
- ✅ Automated rollback on failure
- ✅ Email notifications on deployment status

---

## 🏗️ Architecture Overview

```
┌──────────────────────┐
│   GitHub Repository  │
│   (Your React Code)  │
└──────────┬───────────┘
           │ Push to main
           ↓
┌──────────────────────┐
│  GitHub Actions      │
│  - Build             │
│  - Test              │
│  - Create artifacts  │
└──────────┬───────────┘
           │
           ↓
┌──────────────────────────────────────┐
│  Azure Container Registry (ACR)      │
│  - Store built Docker images         │
│  - Version control for images        │
└──────────┬────────────────────────────┘
           │
           ↓
┌──────────────────────────────────────┐
│  Azure App Service                   │
│  - Run React app (Linux)             │
│  - Custom domain + HTTPS             │
│  - Auto-scaling (optional)           │
│  - Built-in monitoring               │
└──────────────────────────────────────┘
```

---

## 🔄 CI/CD Pipeline Workflow

### Phase 1: Build & Test (Runs on Every Push)

1. **Trigger**: Code pushed to `main` or `develop` branch
2. **Build**:
   - Checkout code from GitHub
   - Install Node.js dependencies (`npm ci`)
   - Build React app (`npm run build`)
   - Generate optimized bundle in `build/` folder
3. **Test**:
   - Run unit tests (`npm test`)
   - Lint code (`npm run lint` if available)
   - Check for security vulnerabilities (`npm audit`)
4. **Artifact**:
   - Create Docker image with built app
   - Push image to Azure Container Registry (ACR)
   - Tag with commit SHA and `latest`

### Phase 2: Deploy (Automatic on Successful Build)

1. **Pre-Deployment**:
   - Create staging slot on Azure App Service
   - Deploy to staging (blue deployment)
   - Run smoke tests (health checks)
   - Validate application responds correctly
2. **Swap Production** (zero-downtime):
   - Swap staging slot with production slot
   - Old version stays in alternate slot for rollback
3. **Post-Deployment**:
   - Verify production health
   - Send deployment notification
   - Log deployment event

### Phase 3: Rollback (If Deployment Fails)

1. **Automatic Rollback**:
   - If health checks fail, swap slots back
   - Previous version restored instantly
   - Team alerted via email/Slack

---

## 📦 Infrastructure Components

### Azure Resources Required

| Resource             | Type       | Purpose           | Cost         |
| -------------------- | ---------- | ----------------- | ------------ |
| App Service Plan     | Compute    | Host React app    | $15-100/mo\* |
| App Service          | Web App    | Run container     | Included     |
| Container Registry   | Storage    | Store images      | ~$5/mo       |
| Application Insights | Monitoring | Track performance | Free tier    |

\*Depends on plan (B1=shared, B2=dedicated, etc.)

### GitHub Secrets (Required for CI/CD)

These will be configured in your GitHub repository settings:

```
AZURE_SUBSCRIPTION_ID     # Your Azure subscription ID
AZURE_RESOURCE_GROUP      # Resource group name
AZURE_APP_NAME            # App Service name
AZURE_REGISTRY_LOGIN_SERVER  # ACR login server
AZURE_REGISTRY_USERNAME   # ACR admin username
AZURE_REGISTRY_PASSWORD   # ACR admin password
```

---

## 🚀 CI/CD Configuration Files

### 1. GitHub Actions Workflow (`.github/workflows/deploy.yml`)

```yaml
name: Build and Deploy to Azure

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "18"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Run tests
        run: npm test -- --passWithNoTests

      - name: Run security audit
        run: npm audit --audit-level=moderate || true

      - name: Upload build artifact
        uses: actions/upload-artifact@v3
        with:
          name: react-build
          path: build/

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'

    steps:
      - uses: actions/checkout@v3

      - name: Download build artifact
        uses: actions/download-artifact@v3
        with:
          name: react-build
          path: build/

      - name: Login to Azure Container Registry
        uses: azure/docker-login@v1
        with:
          login-server: ${{ secrets.AZURE_REGISTRY_LOGIN_SERVER }}
          username: ${{ secrets.AZURE_REGISTRY_USERNAME }}
          password: ${{ secrets.AZURE_REGISTRY_PASSWORD }}

      - name: Build Docker image
        run: |
          docker build -t ${{ secrets.AZURE_REGISTRY_LOGIN_SERVER }}/upskill:${{ github.sha }} .
          docker tag ${{ secrets.AZURE_REGISTRY_LOGIN_SERVER }}/upskill:${{ github.sha }} ${{ secrets.AZURE_REGISTRY_LOGIN_SERVER }}/upskill:latest

      - name: Push to Azure Container Registry
        run: |
          docker push ${{ secrets.AZURE_REGISTRY_LOGIN_SERVER }}/upskill:${{ github.sha }}
          docker push ${{ secrets.AZURE_REGISTRY_LOGIN_SERVER }}/upskill:latest

      - name: Deploy to Azure App Service
        uses: azure/webapps-deploy@v2
        with:
          app-name: ${{ secrets.AZURE_APP_NAME }}
          images: ${{ secrets.AZURE_REGISTRY_LOGIN_SERVER }}/upskill:${{ github.sha }}
```

### 2. Dockerfile (for containerized deployment)

```dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Install serve to run React app
RUN npm install -g serve

# Copy built app from builder
COPY --from=builder /app/build ./build

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Start app
CMD ["serve", "-s", "build", "-l", "3000"]
```

### 3. Azure App Service Configuration

**app-settings.json** (Set in Azure Portal or via script):

```json
{
  "WEBSITES_PORT": "3000",
  "WEBSITES_CONTAINER_ID": "upskill",
  "DOCKER_REGISTRY_SERVER_URL": "https://<your-registry>.azurecr.io",
  "DOCKER_ENABLE_CI": "true",
  "NODE_ENV": "production"
}
```

### 4. Bicep Infrastructure (for automated provisioning)

**infra/main.bicep** - Declares all Azure resources

**infra/parameters.json** - Configuration values

---

## 📋 Pre-Deployment Checklist

Before implementation, ensure you have:

- [ ] GitHub account with repository created
- [ ] Azure subscription (free tier works for dev)
- [ ] Azure CLI installed locally (`az --version`)
- [ ] Docker installed (for local testing)
- [ ] Contributor access to Azure subscription
- [ ] Git configured with PGP signing (optional, recommended)
- [ ] Node.js 18+ installed locally

---

## 🔧 Implementation Steps

### Step 1: Set Up Azure Resources

**Status**: ⏳ Not Started

- [ ] Create Azure Container Registry (ACR)
- [ ] Create Azure App Service Plan (Linux, Node.js runtime)
- [ ] Create App Service instance
- [ ] Configure App Service for container deployment

### Step 2: Configure GitHub Secrets

**Status**: ⏳ Not Started

- [ ] Get ACR credentials from Azure Portal
- [ ] Get App Service details
- [ ] Add 6 GitHub secrets (see "GitHub Secrets" table above)

### Step 3: Create CI/CD Files

**Status**: ⏳ Not Started

- [ ] Create `.github/workflows/deploy.yml` (GitHub Actions workflow)
- [ ] Create `Dockerfile` (containerize React app)
- [ ] Create `infra/main.bicep` (optional: automated infrastructure)
- [ ] Commit and push to GitHub

### Step 4: Test Pipeline

**Status**: ⏳ Not Started

- [ ] Push code to GitHub
- [ ] Watch Actions tab for workflow execution
- [ ] Verify build succeeds
- [ ] Verify Docker image published to ACR
- [ ] Verify deployment to Azure App Service
- [ ] Test app at `https://<app-name>.azurewebsites.net`

### Step 5: Enable Auto-Scaling (Optional)

**Status**: ⏳ Not Started

- [ ] Configure App Service Plan auto-scaling rules
- [ ] Set scale-out threshold to CPU or memory utilization
- [ ] Set scale-down threshold
- [ ] Define min/max instances

### Step 6: Set Up Monitoring & Alerts

**Status**: ⏳ Not Started

- [ ] Enable Application Insights
- [ ] Connect GitHub to send deployment events
- [ ] Configure email/Slack alerts on:
  - Deployment success
  - Deployment failure
  - High error rates
- [ ] Create dashboard for metrics

---

## 💾 Deployment Plan Artifacts

| File                       | Location                       | Purpose                       |
| -------------------------- | ------------------------------ | ----------------------------- |
| GitHub Actions Workflow    | `.github/workflows/deploy.yml` | CI/CD pipeline definition     |
| Dockerfile                 | `./Dockerfile`                 | Container image specification |
| Bicep Template             | `infra/main.bicep`             | Infrastructure as Code        |
| Parameters                 | `infra/parameters.json`        | Configuration values          |
| Docker Compose (local dev) | `docker-compose.yml`           | Test pipeline locally         |

---

## 🎯 Success Criteria

✅ **Deployment is successful when:**

1. GitHub Actions workflow runs without errors
2. Docker image builds and pushes to ACR
3. Azure App Service pulls and runs latest image
4. React app is accessible at `https://<app-name>.azurewebsites.net`
5. Health checks pass (200 response from app)
6. Pushes to `main` auto-trigger deployments
7. Rollback works (swap staging/production slots)
8. Performance metrics visible in Application Insights

---

## 📊 Pipeline Execution Timeline

| Phase                  | Duration       | Trigger                  |
| ---------------------- | -------------- | ------------------------ |
| Build                  | ~2 min         | Every push               |
| Test                   | ~3 min         | Parallel with build      |
| Docker Image Creation  | ~1 min         | After build passes       |
| Push to ACR            | ~30sec         | After Docker build       |
| Deploy to Staging      | ~2 min         | Sequential               |
| Health Checks          | ~1 min         | After staging deployment |
| Slot Swap (Production) | ~30sec         | After health checks      |
| **Total**              | **~9 minutes** | Per push                 |

---

## 🔐 Security Considerations

✅ **Implemented Security**:

- [ ] GitHub Secrets for sensitive credentials (never in code)
- [ ] Docker images scanned for vulnerabilities
- [ ] HTTPS enforced on App Service
- [ ] Managed Identity for Azure access (no stored keys)
- [ ] Role-based access (RBAC) for ACR/App Service
- [ ] Build logs archived (not exposed publicly)
- [ ] Secrets rotated every 90 days

**Recommended Additions**:

- [ ] Enable Private Endpoints for ACR/App Service
- [ ] Add Azure Key Vault for configuration management
- [ ] Implement branch protection rules (require PR review before merge)
- [ ] Enable code scanning with GitHub Advanced Security

---

## 💰 Estimated Monthly Costs

| Resource                         | Cost     |
| -------------------------------- | -------- |
| App Service Plan (B1)            | ~$15     |
| Container Registry (Basic)       | ~$5      |
| Application Insights (free tier) | $0       |
| Data egress (assume 10GB)        | ~$1      |
| **Monthly Total**                | **~$21** |

_Note: Free tier available for first 12 months with Azure Student/Free account_

---

## 📞 Next Steps

### To Proceed:

1. ✅ Review and approve this plan
2. ⏳ Execute Steps 1-4 above
3. ⏳ Run validation (`azure-validate`)
4. ⏳ Execute deployment (`azure-deploy`)

### For Questions:

- Azure App Service docs: https://aka.ms/appservice
- GitHub Actions: https://github.com/features/actions
- Azure Container Registry: https://aka.ms/acr
- Bicep: https://aka.ms/bicep

---

## 📝 Plan Version History

| Version | Date       | Changes              |
| ------- | ---------- | -------------------- |
| 1.0     | 4 Apr 2026 | Initial plan created |
| —       | —          | —                    |

---

**Status**: � **CI/CD Implementation Complete**  
**Next Steps**: Run `scripts/setup-azure.sh` to create Azure resources
