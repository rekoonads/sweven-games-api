# Custom API Service - Railway Deployment

Main API service for Sweven Games cloud gaming platform with subscription management, user sessions, and game catalog.

## Technology Stack
- **Framework**: NestJS 9
- **Language**: TypeScript/Node.js
- **Database**: PostgreSQL (via Prisma)
- **Real-time**: Socket.IO
- **Authentication**: Passport JWT

## Railway Deployment Steps

### 1. Install Dependencies
```bash
cd "d:\cloud gaming\backend-services\custom-api"
npm install
```

### 2. Set Up Database
Railway will provision a PostgreSQL database. Connect it to your project.

### 3. Create Railway Project
```bash
railway login
railway init
```

### 4. Link Database
In Railway dashboard:
1. Add PostgreSQL plugin
2. Copy the `DATABASE_URL` connection string

### 5. Set Environment Variables
```bash
railway variables set DATABASE_URL="postgresql://..."
railway variables set JWT_SECRET=your_jwt_secret
railway variables set CLERK_SECRET_KEY=your_clerk_secret
railway variables set CASHFREE_CLIENT_ID=your_cashfree_id
railway variables set CASHFREE_CLIENT_SECRET=your_cashfree_secret
railway variables set CASHFREE_API_VERSION=2023-08-01
railway variables set CASHFREE_ENV=production
```

### 6. Deploy
```bash
railway up
```

The deployment will automatically:
1. Generate Prisma Client
2. Run database migrations
3. Start the NestJS server

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection URL | Yes (from Railway DB plugin) |
| `PORT` | HTTP server port | Auto-set by Railway |
| `JWT_SECRET` | Secret key for JWT tokens | Yes |
| `JWT_EXPIRATION` | Token expiration (default: 7d) | No |
| `CLERK_SECRET_KEY` | Clerk authentication secret | Yes |
| `CLERK_PUBLISHABLE_KEY` | Clerk publishable key | No |
| `CASHFREE_CLIENT_ID` | Cashfree payment gateway ID | Yes |
| `CASHFREE_CLIENT_SECRET` | Cashfree secret key | Yes |
| `CASHFREE_API_VERSION` | Cashfree API version | No (default: 2023-08-01) |
| `CASHFREE_ENV` | Cashfree environment (sandbox/production) | No (default: sandbox) |

## Database Schema

The API includes models for:
- **User**: User accounts with Clerk integration
- **Session**: Gaming sessions with WebRTC state
- **Game**: Game catalog
- **Subscription**: User subscriptions
- **Plan**: Subscription plans

## API Endpoints

See `API_ROUTES.md` for complete API documentation.

Key endpoints:
- `/subscription/*` - Subscription management
- `/session/*` - Gaming session management
- `/games/*` - Game catalog
- `/users/*` - User management

## Custom Domain
After deployment, add custom domain:
- `api.swevengames.in`

## Post-Deployment

1. Run Prisma Studio to verify database:
```bash
railway run npx prisma studio
```

2. Seed initial data if needed:
```bash
railway run npm run prisma:seed
```

3. Update frontend `NEXT_PUBLIC_API_URL` environment variable in Vercel:
```bash
vercel env add NEXT_PUBLIC_API_URL production
# Enter: https://api.swevengames.in
```
