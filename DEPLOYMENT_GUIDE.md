# Deployment Guide

This project uses a split deployment strategy:
- **Frontend**: Deployed on Vercel
- **Backend**: Deployed on Railway

## Frontend Deployment (Vercel)

The frontend is configured to deploy independently without the backend.

### Setup on Vercel

1. Connect your GitHub repo to Vercel
2. In Vercel project settings, add an environment variable:
   - **Name**: `VITE_BACKEND_URL`
   - **Value**: `https://<your-railway-backend-url>`

3. The `vercel.json` file automatically configures:
   - Build command: `cd frontend && pnpm install && pnpm build`
   - Output directory: `frontend/dist`
   - Framework: Vite

The frontend will redeploy automatically when you push to main branch.

## Backend Deployment (Railway)

### Prerequisites
- Create a Railway account at https://railway.app
- Install Railway CLI: `npm i -g @railway/cli`

### Step 1: Initialize Railway Project

```bash
# From the project root
railway login
railway init
```

When prompted:
- Project name: `snake-game-ai`
- Select Python as the environment

### Step 2: Configure Environment

```bash
# Set up the backend to deploy only
railway env
```

No environment variables are required initially (the backend runs on the PORT that Railway provides).

### Step 3: Deploy Backend

```bash
# Deploy from the project root (Railway will use .railwayignore)
railway up
```

Railway will:
- Detect Python project from `backend/requirements.txt`
- Use `Procfile` to run `python app.py`
- Set the PORT environment variable automatically
- Assign a public URL to your backend

### Step 4: Get Your Backend URL

After deployment:

```bash
railway env
```

This will show your Railway backend URL (looks like `https://snake-game-ai-production.up.railway.app`)

### Step 5: Update Vercel Frontend

1. Go to Vercel Dashboard
2. Select your Snake Game AI project
3. Settings → Environment Variables
4. Update `VITE_BACKEND_URL` with your Railway backend URL:
   ```
   https://snake-game-ai-production.up.railway.app
   ```
5. Redeploy frontend to apply changes

### Step 6: Test Connection

Visit your frontend URL and verify it connects to the backend. Check browser console for any connection errors.

## Troubleshooting

### Backend not responding
- Check Railway dashboard for errors: `railway logs`
- Verify the backend URL is correct in Vercel env variables
- Ensure CORS is enabled in backend (it is by default)

### Frontend build still fails on Vercel
- Clear Vercel cache and redeploy
- Ensure `frontend/.env` or environment variables are set correctly

### Port already in use (local development)
```bash
# Kill process on port 5001
lsof -ti:5001 | xargs kill -9
```

## Local Development

```bash
# Install dependencies
pnpm install

# Start both frontend and backend
pnpm dev

# Or run separately:
pnpm dev:frontend  # http://localhost:5173
pnpm dev:backend   # http://localhost:5001
```

## Redeploying

### Frontend
- Push to main branch on GitHub
- Vercel auto-deploys

### Backend
```bash
railway up
```

Or use `git push` if you've configured Railway with GitHub.

## Cost Considerations

- **Vercel**: Free tier includes generous build minutes
- **Railway**: $5/month free tier credit, then pay-as-you-go ($0.0685/hour for compute)

The Snake Game AI backend uses minimal resources, so it should stay within the free tier.

