# Deploy Custom API to Railway - Step by Step

✅ **Git Repository Created**: https://github.com/rekoonads/sweven-games-api

Now follow these steps to deploy to Railway:

## Step 1: Login to Railway

Open a terminal and run:
```bash
cd "d:\cloud gaming\backend-services\custom-api"
railway login
```

This will open your browser for authentication. Login with your Railway account.

## Step 2: Create Railway Project

```bash
railway init
```

When prompted:
- Project name: `sweven-games-api`
- Select: "Empty project"

## Step 3: Add PostgreSQL Database

In Railway dashboard (https://railway.app/dashboard):
1. Click on your `sweven-games-api` project
2. Click "+ New" → "Database" → "Add PostgreSQL"
3. Wait for PostgreSQL to provision
4. Click on PostgreSQL service → "Variables" tab
5. Copy the `DATABASE_URL` value

## Step 4: Set Environment Variables

Back in your terminal:

```bash
# Database (from Railway PostgreSQL)
railway variables set DATABASE_URL="postgresql://postgres:PASSWORD@HOST:PORT/railway"

# JWT Configuration
railway variables set JWT_SECRET="your_super_secure_jwt_secret_change_this"
railway variables set JWT_EXPIRATION="7d"

# Clerk Authentication (Production Keys)
railway variables set CLERK_SECRET_KEY="sk_live_..."
railway variables set NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_live_..."

# Cashfree Payment Gateway
railway variables set CASHFREE_CLIENT_ID="your_cashfree_client_id"
railway variables set CASHFREE_CLIENT_SECRET="your_cashfree_client_secret"
railway variables set CASHFREE_API_VERSION="2023-08-01"
railway variables set CASHFREE_ENV="production"

# Optional: CORS Origin
railway variables set CORS_ORIGIN="https://games.swevenventures.com"
```

### Your Production Credentials

Based on your `.env` file:

**Clerk Keys** (from your .env.local in frontend):
```bash
railway variables set CLERK_SECRET_KEY="sk_live_pd_2sXXR7JBwU7Y5v8uDlXcEe2TsGfhpS3XSzWHK1T"
railway variables set NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_live_cGQuY29tJA"
```

**Database** (Prisma Accelerate - if using):
```bash
railway variables set DATABASE_URL="prisma+postgres://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiNzA1NTQyMTEtNGU0Yi00Mjk2LWE0YzAtZGY3ZTIyNjY4NTI1IiwidGVuYW50X2lkIjoiYWVjOTIyMjM2MjdhNzU5NmEyMzc3ZTI1OGFhNjBhZjYzODJkNzQzMjQ3M2YzZjg0OGFjNjJkZmE3NGRkYzA2YSIsImludGVybmFsX3NlY3JldCI6IjQ3YzcyYzlhLTg2ODktNDk2NC04ZDczLWQ0YjE2ZjNhYzg0NyJ9.hNPaMKM4fYN9yqCuK1TxTuJR7g8MtbFv0A2R3hEQbLY"
```

Or use Railway's PostgreSQL (recommended):
```bash
# Copy DATABASE_URL from Railway PostgreSQL plugin
railway variables set DATABASE_URL="<copied from Railway>"
```

**Generate JWT Secret**:
```bash
# Use a strong random secret
railway variables set JWT_SECRET="$(openssl rand -base64 32)"
```

## Step 5: Link GitHub Repository

Option A - Via Railway Dashboard (Recommended):
1. Go to https://railway.app/dashboard
2. Open your `sweven-games-api` project
3. Click on your service → "Settings"
4. Under "Source Repo", click "Connect"
5. Select `rekoonads/sweven-games-api`
6. Set branch to `master`
7. Save changes

Option B - Via CLI:
```bash
railway link
```

## Step 6: Deploy

Railway will automatically deploy when you push to GitHub. To trigger the first deployment:

Via CLI:
```bash
railway up
```

Or push a new commit:
```bash
git commit --allow-empty -m "Trigger Railway deployment"
git push
```

## Step 7: Monitor Deployment

Watch the build logs:
```bash
railway logs
```

Or check the Railway dashboard for deployment progress.

## Step 8: Get Deployment URL

```bash
railway domain
```

Example output: `sweven-games-api-production.up.railway.app`

## Step 9: Add Custom Domain (Optional)

In Railway dashboard:
1. Go to your service → "Settings" → "Domains"
2. Click "Generate Domain" (free Railway domain)
3. Or add custom domain: `api.swevengames.in`
4. Add CNAME record in your DNS:
   ```
   api.swevengames.in CNAME sweven-games-api-production.up.railway.app
   ```

## Step 10: Update Frontend

Update the Vercel environment variable:

```bash
cd "d:\cloud gaming\frontend"
vercel env add NEXT_PUBLIC_API_URL production
# Enter: https://api.swevengames.in
# (or your Railway URL)
```

Then redeploy frontend:
```bash
vercel --prod
```

## Verify Deployment

Test the API:
```bash
# Health check
curl https://api.swevengames.in/health

# Get subscription plans
curl https://api.swevengames.in/subscription/plans
```

## Troubleshooting

### Build Fails
```bash
# View detailed logs
railway logs --deployment

# Check if all env vars are set
railway variables
```

### Database Connection Issues
```bash
# Test Prisma connection
railway run npx prisma db push

# Generate Prisma client
railway run npx prisma generate
```

### Port Issues
Railway automatically sets the `PORT` environment variable. The app uses `process.env.PORT || 3001`.

### CORS Issues
Set the CORS_ORIGIN variable to your frontend domain:
```bash
railway variables set CORS_ORIGIN="https://games.swevenventures.com"
```

## Post-Deployment Checklist

- [ ] API responds at deployment URL
- [ ] Database connected successfully
- [ ] Environment variables all set
- [ ] Custom domain configured
- [ ] Frontend updated with API URL
- [ ] Subscription endpoints working
- [ ] Clerk authentication working
- [ ] Payment flow tested

## Railway CLI Commands

```bash
# View all projects
railway list

# Check variables
railway variables

# View logs
railway logs

# Restart service
railway restart

# Open Railway dashboard
railway open
```

## Support

- Railway Docs: https://docs.railway.app
- Railway Discord: https://discord.gg/railway
- GitHub Repo: https://github.com/rekoonads/sweven-games-api

---

**Status**: ✅ Code pushed to GitHub, ready for Railway deployment
