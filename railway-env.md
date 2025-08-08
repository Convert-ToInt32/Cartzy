# Railway Environment Variables Setup

## Required Environment Variables for Railway:

### Database (Auto-configured by Railway)
- `DATABASE_URL` - Automatically set by Railway PostgreSQL service

### NextAuth Configuration
- `NEXTAUTH_URL` - Your Railway app URL (e.g., https://your-app.railway.app)
- `NEXTAUTH_SECRET` - Generate with: `openssl rand -base64 32`

### OAuth Providers (Optional for now)
- `GOOGLE_CLIENT_ID` - Your Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` - Your Google OAuth client secret
- `GITHUB_CLIENT_ID` - Your GitHub OAuth client ID
- `GITHUB_CLIENT_SECRET` - Your GitHub OAuth client secret

## Setup Steps:

1. **In Railway Dashboard:**
   - Go to your project
   - Click on your app service
   - Go to "Variables" tab
   - Add the environment variables above

2. **Generate NEXTAUTH_SECRET:**
   ```bash
   openssl rand -base64 32
   ```

3. **Set NEXTAUTH_URL:**
   - Use your Railway app URL
   - Format: https://your-app-name.railway.app

## Database Connection:
- Railway automatically provides `DATABASE_URL`
- No additional setup needed for database 