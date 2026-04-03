# CI/CD Implementation Guide

## Overview

Your UpSkill Revision Hub now has a complete, production-ready CI/CD pipeline configured. This guide explains what was created and how to use it.

## What Was Created

### 1. GitHub Actions Workflow (`.github/workflows/deploy.yml`)

**Purpose**: Automates building, testing, and deploying your React app to Azure.

**Workflow Stages**:

- **Build** - Compile React app, run tests, security checks
- **Build & Push Docker** - Create Docker image and push to ACR
- **Deploy to Azure** - Deploy to staging slot, run health checks, swap to production
- **Rollback** - Automatic rollback if deployment fails

**Triggers**:

- Automatic on push to `main` or `develop` branches
- Manual trigger available from GitHub Actions page
- Pull requests to `main` (build only, no deploy)

### 2. Dockerfile

**Purpose**: Containerizes your React app for cloud deployment.

**Features**:

- Multi-stage build (reduces image size)
- Node 18 Alpine Linux (small & fast)
- Non-root user (security best practice)
- Health checks built-in
- Production-optimized

**Image Size**: ~150MB (compared to ~400MB without optimization)

### 3. Infrastructure as Code (Bicep)

**Files**:

- `infra/main.bicep` - Azure resource definitions
- `infra/parameters.json` - Configuration values

**Creates**:

- App Service Plan (B1 = ~$15/month)
- App Service (web app host)
- Container Registry (image storage)
- Log Analytics (monitoring)
- Application Insights (performance tracking)
- Blue-green deployment slots (zero-downtime updates)
- Alert rules (CPU monitoring)

### 4. Docker Compose

**File**: `docker-compose.yml`

**Purpose**: Test the containerized app locally before pushing to cloud.

### 5. Helper Scripts

**Available**:

- `scripts/setup-azure.sh` - Automated Azure resource provisioning
- `scripts/test-docker.sh` - Local container testing
- `scripts/deploy.sh` - Manual deployment to Azure

---

## Getting Started

### Phase 1: Set Up Azure Resources (One-time)

#### Option A: Automated (Recommended)

```bash
# Make script executable
chmod +x scripts/setup-azure.sh

# Run setup
./scripts/setup-azure.sh

# This will:
# 1. Create Azure resource group
# 2. Create container registry
# 3. Create service principal for GitHub Actions
# 4. Display all secrets needed
```

#### Option B: Manual

See `.github/GITHUB_SECRETS_SETUP.md` for step-by-step instructions.

### Phase 2: Configure GitHub Secrets

Copy secrets from `secrets.json` (if using automated setup) or follow manual guide:

**GitHub Secrets Needed**:

```
AZURE_SUBSCRIPTION_ID
AZURE_RESOURCE_GROUP
AZURE_APP_NAME
AZURE_REGISTRY_LOGIN_SERVER
AZURE_REGISTRY_USERNAME
AZURE_REGISTRY_PASSWORD
AZURE_CREDENTIALS
```

**How to Add**:

1. Go to GitHub repo → Settings
2. Navigate to **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add each secret with exact name and value

### Phase 3: Test Locally (Optional)

```bash
# Build React app
npm run build

# Test Docker image
chmod +x scripts/test-docker.sh
./scripts/test-docker.sh

# Open browser to http://localhost:3000
# Ctrl+C to stop
```

### Phase 4: Push to GitHub and Deploy

```bash
# Commit CI/CD files
git add .
git commit -m "Add CI/CD pipeline and Azure infrastructure"
git push origin main

# Watch deployment:
# 1. Go to GitHub Actions tab
# 2. Click on the workflow run
# 3. Monitor each job:
#    - Build (1-2 min)
#    - Build & Push Docker (2-3 min)
#    - Deploy to Azure (5-10 min)

# Once complete:
# App will be live at: https://{APP_NAME}.azurewebsites.net
```

---

## Pipeline Workflow Diagram

```
┌─ Push to main ─┐
│                ↓
│         ┌─────────────┐
│         │  Build Job  │ (npm install, npm build, tests)
│         └──────┬──────┘
│                ↓
│         ┌──────────────────┐
│         │ Docker Build Job │ (build image, push to ACR)
│         └──────┬───────────┘
│                ↓
│         ┌──────────────────────────────┐
│         │ Deploy to Azure (If main)   │
│         │ ├─ Deploy to staging slot   │
│         │ ├─ Run health checks        │
│         │ ├─ Swap slots (production)  │
│         │ └─ Rollback on failure      │
│         └──────────────────────────────┘
│
└─────────────────────────────────────────┘
```

---

## Deployment Process Explained

### 1. Build Phase

- Checks out code from GitHub
- Installs Node dependencies
- Compiles React app (`npm run build`)
- Runs tests
- Runs security audit
- Uploads `build/` folder as artifact

### 2. Docker Build & Push

- Downloads build artifact
- Creates Docker image
- Pushes to Azure Container Registry (ACR)
- Tags with commit SHA and `latest`

### 3. Deploy to Azure

- Deploys image to **staging slot** (blue deployment)
- Waits 30 seconds for startup
- Runs health checks (curl to `/` endpoint)
- If successful: **Swaps slots** with production (green deployment)
- Old version stays in alternate slot for instant rollback

### 4. Blue-Green Deployment Benefits

- ✅ Zero downtime during updates
- ✅ Instant rollback if something fails
- ✅ Test in production environment before switching traffic
- ✅ Easy to compare old vs new versions

---

## Monitoring & Troubleshooting

### View Deployment Status

**GitHub Actions**:

1. Go to repo → **Actions** tab
2. Click on workflow run
3. Expand each job to see logs

**Azure Portal**:

1. Go to **App Service** → Your app
2. Check **Activity log** for recent deployments
3. View **Deployment slots** to see active/inactive versions

### View Application Logs

**In Azure Portal**:

1. App Service → **Log stream**
2. Real-time application output

**Via Azure CLI**:

```bash
# Stream logs
az webapp log tail --name upskill-revision-hub --resource-group upskill-rg
```

### Common Issues

| Issue                     | Solution                                     |
| ------------------------- | -------------------------------------------- |
| Build fails               | Check GitHub Actions logs for npm errors     |
| Docker push fails         | Verify ACR credentials in GitHub secrets     |
| App won't start           | Check Application Insights or container logs |
| Health check timeout      | Ensure `npm run build` works locally first   |
| Deployment takes too long | B1 plan is slow; consider upgrading to S1    |

### Health Checks

The pipeline checks if your app is responding at:

```
https://{APP_NAME}.azurewebsites.net/
```

The app returns `200 OK` if healthy. If this fails, deployment auto-rollbacks.

---

## Performance Tips

### Optimize Build Time

```bash
# Use npm ci instead of npm install (faster, reproducible)
npm ci

# Use npm shallow install for faster builds
npm ci --prefer-offline --no-audit
```

### Reduce Image Size

- Current: ~150MB (base Node 18 Alpine)
- Dockerfile already uses multi-stage build
- Consider removing dev dependencies from production

### Reduce Deployment Time

1. **Enable App Service caching** - Docker layers cached in ACR
2. **Use faster tier** - B2 has more CPU for faster builds
3. **Scale horizontally** - Multiple instances behind load balancer

---

## Cost Optimization

### Current Costs (Monthly)

- App Service Plan (B1): ~$15
- Container Registry (Basic): ~$5
- App Insights (free tier): $0
- Data egress (10GB): ~$1
- **Total**: ~$21/month

### Ways to Reduce

- **B1 is free for first year** with Azure free account
- **Container Registry** - Basic tier is cheapest
- **Application Insights** - Free tier adequate for dev
- **Storage** - No extra storage needed for this app

### Ways to Scale (if needed)

- Upgrade to **S1** plan ($65/month) for more CPU
- Enable **auto-scaling** rules based on CPU/memory
- Use **Consumption plan** for pay-per-use (if switching to Functions)

---

## Security Best Practices

✅ **Implemented**:

- Secrets stored in GitHub Secrets (never in code)
- HTTPS enforced on App Service
- Non-root Docker user
- Health checks prevent bad deployments
- Automatic rollback on failure
- Azure Application Insights for monitoring

**Recommended Additions**:

- [ ] Enable GitHub branch protection rules
- [ ] Require code review before merge to `main`
- [ ] Add Azure Key Vault for sensitive config
- [ ] Enable Azure Defender for scan runtime threats
- [ ] Rotate secrets every 90 days
- [ ] Enable Azure Policy for compliance

---

## Next Steps

1. ✅ Review this entire guide
2. ✅ Run `scripts/setup-azure.sh` to create Azure resources
3. ✅ Add GitHub secrets from setup output
4. ✅ Test locally with `scripts/test-docker.sh`
5. ✅ Push code to GitHub
6. ✅ Monitor GitHub Actions for deployment
7. ✅ Verify app at `https://{APP_NAME}.azurewebsites.net`
8. ✅ Set up monitoring in Azure Portal
9. ✅ Configure Slack notifications (optional)
10. ✅ Document any custom environment variables

---

## FAQ

**Q: Can I deploy to staging instead of production?**  
A: Yes, modify `.github/workflows/deploy.yml` to skip the slot swap step.

**Q: How do I rollback to previous version?**  
A: Automatic rollback is built-in. Manual rollback: swap slots in Azure Portal.

**Q: Can I deploy on pull request?**  
A: Yes, modify workflow to deploy on `pull_request` events (recommended for staging).

**Q: What if deployment fails?**  
A: Automatic rollback to previous version. Check GitHub Actions logs and Application Insights.

**Q: How do I add environment variables?**  
A: Edit `infra/main.bicep` → `appSettings` section or use Azure Portal.

**Q: Can I use a custom domain?**  
A: Yes, configure in Azure Portal under App Service → Custom domains.

---

## Support & Documentation

- [Azure App Service Docs](https://aka.ms/appservice)
- [GitHub Actions Docs](https://docs.github.com/actions)
- [Docker Docs](https://docs.docker.com)
- [Bicep Documentation](https://aka.ms/bicep)
- [Azure Container Registry](https://aka.ms/acr)

---

**Questions?** Create an issue in your GitHub repo or contact Azure support.

**Ready to deploy?** Run `./scripts/setup-azure.sh` to get started!
