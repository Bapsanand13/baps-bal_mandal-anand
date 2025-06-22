# Vercel Deployment Guide

## Quick Fix for 500 Error

The 500 error is likely due to missing environment variables. Follow these steps:

### 1. Set Environment Variables in Vercel

Go to your Vercel dashboard and add these environment variables:

```bash
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=production
```

### 2. Deploy from Backend Directory

```bash
cd backend
vercel
```

### 3. Test the Deployment

Visit these URLs to test:
- `https://your-app.vercel.app/` - Basic health check
- `https://your-app.vercel.app/health` - Simple health check
- `https://your-app.vercel.app/health/db` - Database health check

## Common Issues

### Missing Environment Variables
- Set all required environment variables in Vercel dashboard
- Redeploy after setting variables

### Database Connection Issues
- Check if MongoDB Atlas allows connections from Vercel
- Verify MONGO_URI is correct
- Test database connection locally first

## Debugging

1. **Check Vercel Logs**:
   ```bash
   vercel logs
   ```

2. **Test Health Endpoints**:
   - `/` - Basic info
   - `/health` - Simple health check
   - `/health/db` - Database health check

3. **Environment Variables**:
   - Verify all variables are set in Vercel dashboard
   - Check variable names match exactly

## Required Environment Variables

- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `NODE_ENV` - Set to "production" 