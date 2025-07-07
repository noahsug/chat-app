# Deployment Guide

## Vercel Deployment (Recommended)

### Prerequisites
- GitHub account with this repository pushed
- Vercel account (free tier available)

### Step-by-Step Deployment

1. **Push to GitHub**
   ```bash
   git remote add origin https://github.com/yourusername/chat-app.git
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Connect your GitHub account
   - Select this repository
   - Click "Import"

3. **Configure Environment Variables**
   - In Vercel dashboard, go to Project Settings → Environment Variables
   - Add the following:
     ```
     DATABASE_URL=postgresql://user:password@host:port/database
     ```
   - Or use Vercel's built-in PostgreSQL addon

4. **Deploy**
   - Vercel will automatically build and deploy
   - Each push to main branch will trigger a new deployment

### Using Vercel PostgreSQL

For production database, you can use Vercel's PostgreSQL addon:

1. In your Vercel project dashboard
2. Go to Storage tab
3. Create a new PostgreSQL database
4. The `DATABASE_URL` will be automatically added to your environment variables

### Production Schema Migration

After deployment, you'll need to sync the database schema:

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Link your project
vercel link

# Run database migration
vercel env pull .env.local
npx prisma db push
```

### Monitoring

- Monitor your app at your Vercel deployment URL
- Check logs in Vercel dashboard for any issues
- Use Vercel Analytics for performance insights

## Alternative Deployment Options

### Docker Deployment

1. **Create Dockerfile** (already included in project)
2. **Build Docker image**
   ```bash
   docker build -t chat-app .
   ```
3. **Run container**
   ```bash
   docker run -p 3000:3000 -e DATABASE_URL="your-db-url" chat-app
   ```

### Self-Hosted

1. **Install dependencies**
   ```bash
   npm ci --only=production
   ```
2. **Build application**
   ```bash
   npm run build
   ```
3. **Start production server**
   ```bash
   npm start
   ```

## Environment Variables

### Required
- `DATABASE_URL` - PostgreSQL connection string for production

### Development vs Production

**Development (.env)**
```env
DATABASE_URL="file:./db.sqlite"
```

**Production**
```env
DATABASE_URL="postgresql://user:password@host:port/database"
```

## Post-Deployment Checklist

- [ ] Application loads correctly
- [ ] Messages can be sent and received
- [ ] Username editing works
- [ ] Real-time polling is functioning
- [ ] Responsive design works on mobile
- [ ] Database is properly connected
- [ ] Error handling is working

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check TypeScript errors: `npm run typecheck`
   - Check ESLint errors: `npm run lint`
   - Ensure all dependencies are installed

2. **Database Connection Issues**
   - Verify `DATABASE_URL` environment variable
   - Ensure database is accessible from deployment environment
   - Check Prisma schema is synced: `npx prisma db push`

3. **Runtime Errors**
   - Check Vercel function logs
   - Verify all environment variables are set
   - Test API endpoints individually

### Performance Optimization

- Enable Vercel Analytics for monitoring
- Consider implementing database connection pooling for high traffic
- Add error boundary components for better user experience
- Implement message pagination for large chat histories

## Scaling Considerations

For high traffic scenarios, consider:

- Database optimization and indexing
- Implementing WebSocket connections instead of polling
- Adding Redis for session management
- Using CDN for static assets
- Implementing rate limiting for API endpoints