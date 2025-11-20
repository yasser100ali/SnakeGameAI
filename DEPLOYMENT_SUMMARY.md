# Deployment Summary

## What Changed

Your project has been configured for a **split deployment strategy** to avoid Vercel's memory limits:

### Files Added/Modified:

1. **vercel.json** (NEW)
   - Tells Vercel to only build the frontend
   - Ignores the Python backend
   - Configures environment variables

2. **backend/Procfile** (NEW)
   - Tells Railway how to start your backend server

3. **.railwayignore** (NEW)
   - Tells Railway to ignore frontend files during deployment

4. **frontend/src/pages/Dashboard.tsx** (MODIFIED)
   - Now reads backend URL from environment variable `VITE_BACKEND_URL`
   - Defaults to `http://localhost:5001` for local development

5. **backend/app.py** (MODIFIED)
   - Now reads PORT from environment variable (Railway sets this)
   - Supports dynamic port assignment

## Quick Start: Deploy Now

### Deploy Frontend (Vercel) - Same as Before
1. Push to GitHub → Vercel auto-deploys

### Deploy Backend (Railway) - NEW

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Deploy backend
cd /Users/yasser/Documents/projects/SnakeGameAI
railway up
```

Then update Vercel environment variable with your Railway backend URL.

See `DEPLOYMENT_GUIDE.md` for detailed instructions.

## Why This Works Better

| Issue | Solution |
|-------|----------|
| Build runs out of memory | Backend no longer built on Vercel |
| Python dependencies slow | Railway handles Python build separately |
| Limited resources | Railway provides dedicated Python environment |
| Static hosting focus | Vercel focuses only on serving React app |

## Architecture

```
┌──────────────────────┐
│   Your GitHub Repo   │
└──────────────┬───────┘
               │
       ┌───────┴────────┐
       │                │
       ▼                ▼
  ┌─────────┐      ┌────────────┐
  │ Vercel  │      │  Railway   │
  │Frontend │      │  Backend   │
  │(React)  │      │  (Python)  │
  └────┬────┘      └─────┬──────┘
       │                 │
       └────────┬────────┘
                │
         ┌──────▼──────┐
         │  Browser    │
         └─────────────┘
```

## Testing Locally (Before Deploy)

```bash
# Terminal 1: Backend
cd backend && python app.py

# Terminal 2: Frontend
cd frontend && pnpm dev

# Then open http://localhost:5173
```

Make sure both are running and talking to each other!

