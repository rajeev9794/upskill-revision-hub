# GitHub Pages Deployment Guide

This project is now configured to deploy as a static website on GitHub Pages.

## Setup Instructions

### Step 1: Update the Homepage URL

Edit `package.json` and replace the `homepage` field with your GitHub Pages URL:

```json
"homepage": "https://rajeev9794.github.io/upskill-revision-hub"
```

Replace `YOUR_USERNAME` with your actual GitHub username.

### Step 2: Deploy to GitHub Pages (One Command)

```bash
npm run deploy
```

This command will:

1. Build the React app for production
2. Push the optimized static files to the `gh-pages` branch
3. Deploy to GitHub Pages automatically

### Step 3: Enable GitHub Pages in Repository Settings

1. Go to your GitHub repository
2. Click **Settings** → **Pages**
3. Under "Source", select **Deploy from a branch**
4. Select branch: `gh-pages`
5. Select folder: `/ (root)`
6. Click **Save**

Your site will be live at: `https://YOUR_USERNAME.github.io/upskill-revision-hub`

## How It Works

- **`npm run build`** - Creates an optimized production build in the `build/` folder
- **`npm run deploy`** - Runs `predeploy` (builds) and then deploys the `build/` folder to `gh-pages` branch
- The `gh-pages` branch is automatically created/updated when you deploy

## Automatic Updates

Every time you want to update your site:

```bash
npm run deploy
```

That's it! Your changes will be live in minutes.

## Troubleshooting

### Site not updating?

- Clear your browser cache (Cmd+Shift+R on Mac)
- Wait 1-2 minutes for GitHub Pages to rebuild
- Check that the `gh-pages` branch exists in your repository

### Routing Issues (404 on refresh)

If you use React Router and get 404 errors on page refresh:

1. Add a `public/404.html` file with the same content as `public/index.html`
2. GitHub Pages will serve this for any unrecognized routes

## Notes

- The build folder (`build/`) is what gets deployed - don't commit it to your repo
- The `gh-pages` branch is created automatically and managed by the deploy script
- Your main branch remains unchanged
