# UpSkill Revision Hub - CI/CD Setup

Your project is now configured with a **production-ready CI/CD pipeline**. Here's how to get started:

## ⚡ Quick Start (3 Steps)

### 1️⃣ Set Up Azure Resources (5 minutes)

```bash
# Make script executable
chmod +x scripts/setup-azure.sh

# Run automated setup
./scripts/setup-azure.sh
```

This creates:

- ✅ Azure Container Registry
- ✅ App Service Plan & App
- ✅ GitHub Actions credentials
- ✅ Monitoring with Application Insights

**Output**: `secrets.json` with all required credentials

---

### 2️⃣ Add GitHub Secrets (2 minutes)

1. Open `secrets.json` (from step 1)
2. Go to GitHub repo → **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add each value from `secrets.json`:
   - `AZURE_SUBSCRIPTION_ID`
   - `AZURE_RESOURCE_GROUP`
   - `AZURE_APP_NAME`
   - `AZURE_REGISTRY_LOGIN_SERVER`
   - `AZURE_REGISTRY_USERNAME`
   - `AZURE_REGISTRY_PASSWORD`
   - `AZURE_CREDENTIALS`

⚠️ **After adding secrets**, delete `secrets.json` (contains sensitive data)

---

### 3️⃣ Push Code & Deploy (Automatic)

```bash
# Commit all files
git add .
git commit -m "Add CI/CD pipeline & Azure infrastructure"
git push origin main
```

**That's it!** GitHub Actions will:

1. ✅ Build React app
2. ✅ Run tests
3. ✅ Create Docker image
4. ✅ Push to Azure Container Registry
5. ✅ Deploy to Azure App Service
6. ✅ Run health checks
7. ✅ Make app live 🚀

**Check progress**: Go to **Actions** tab → Watch workflow run

**App will be live at**: `https://upskill-revision-hub-dev.azurewebsites.net`

---

## 📖 Documentation

### Quick Reference

| File                              | Purpose                     |
| --------------------------------- | --------------------------- |
| `.github/workflows/deploy.yml`    | GitHub Actions automation   |
| `Dockerfile`                      | Container image definition  |
| `infra/main.bicep`                | Azure infrastructure        |
| `docker-compose.yml`              | Local testing               |
| `CICD_IMPLEMENTATION_GUIDE.md`    | Full implementation details |
| `.github/GITHUB_SECRETS_SETUP.md` | Manual secrets setup guide  |

### Test Locally (Optional)

```bash
# Build Docker image and test locally
chmod +x scripts/test-docker.sh
./scripts/test-docker.sh

# Visit http://localhost:3000 to see the app
# Press Ctrl+C to stop
```

---

## 🔄 CI/CD Pipeline Overview

### What Happens on Push

```
1. Code pushed to GitHub
   ↓
2. GitHub Actions triggers automatically
   ├─ Builds React app (npm run build)
   ├─ Runs tests
   ├─ Creates Docker image
   ├─ Pushes to Azure Container Registry
   ↓
3. Deploys to Azure (staging slot)
   ├─ Runs health checks
   ├─ Swaps to production (zero downtime)
   ├─ Auto-rollback if fails
   ↓
4. App is live!
```

**Total time**: ~9 minutes per deployment

---

## 🎯 Key Features

✅ **Automated Deployments** - Push code, app updates automatically  
✅ **Zero Downtime** - Blue-green deployments with slot swaps  
✅ **Auto Rollback** - Fails → previous version restored instantly  
✅ **Comprehensive Testing** - Unit tests + security scans  
✅ **Monitoring Built-in** - Application Insights + Log Analytics  
✅ **Cost Optimized** - ~$21/month for dev environment

---

## 📊 What Was Created

### Files Added

- `.github/workflows/deploy.yml` - GitHub Actions workflow
- `Dockerfile` - Container configuration
- `infra/main.bicep` - Infrastructure as code
- `infra/parameters.json` - Configuration values
- `docker-compose.yml` - Local testing
- `scripts/setup-azure.sh` - Automated Azure setup
- `scripts/test-docker.sh` - Local container test
- `scripts/deploy.sh` - Manual deployment script
- `CICD_IMPLEMENTATION_GUIDE.md` - Full documentation
- `.github/GITHUB_SECRETS_SETUP.md` - Secrets setup guide

### Azure Resources (Will be Created)

- Container Registry (Basic) - $5/mo
- App Service Plan (B1) - $15/mo
- App Service (web host) - included
- Log Analytics - $0 (30-day retention)
- Application Insights - $0 (free tier)

---

## ❓ FAQ

**Q: How do I see deployment logs?**  
A: GitHub Actions tab → Click workflow → Expand "Deploy to Azure" job

**Q: What if deployment fails?**  
A: Automatic rollback restores previous version. Check logs for error.

**Q: Can I manually deploy?**  
A: Yes, run `./scripts/deploy.sh` but automated is recommended.

**Q: How do I update app settings?**  
A: Edit `infra/main.bicep` → `appSettings` section → Redeploy

**Q: Can I use a custom domain?**  
A: Yes, configure in Azure Portal → App Service → Custom domains

**Q: How much will this cost?**  
A: ~$21/month for dev. Free for 12 months with Azure free tier.

---

## 🚀 Next Steps

- [ ] Run `./scripts/setup-azure.sh`
- [ ] Add GitHub Secrets
- [ ] Delete `secrets.json`
- [ ] Push code to GitHub
- [ ] Monitor Actions tab
- [ ] Visit app URL
- [ ] Read `CICD_IMPLEMENTATION_GUIDE.md` for detailed info

---

## 📞 Support

- **Azure Docs**: https://aka.ms/appservice
- **GitHub Actions**: https://docs.github.com/actions
- **Docker**: https://docs.docker.com
- **Bicep**: https://aka.ms/bicep

---

**Ready?** Start with: `chmod +x scripts/setup-azure.sh && ./scripts/setup-azure.sh`

🎉 **Your app will be deployed in minutes!**
