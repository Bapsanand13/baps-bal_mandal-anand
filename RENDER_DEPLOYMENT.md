# Render Deployment Guide

## Prerequisites

1. **Render Account**: Sign up at [render.com](https://render.com)
2. **GitHub Repository**: Your code should be on GitHub
3. **MongoDB Atlas**: Database should be set up and accessible

## Deployment Steps

### 1. Connect Repository to Render

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Select the repository: `baps-bal-mandal`

### 2. Configure the Service

**Service Settings:**
- **Name**: `baps-bal-mandal-backend`
- **Environment**: `Node`
- **Region**: Choose closest to your users
- **Branch**: `main` (or your default branch)
- **Root Directory**: Leave empty (will use root)
- **Build Command**: `cd backend && npm install`
- **Start Command**: `cd backend && npm start`

### 3. Set Environment Variables

In the Render dashboard, add these environment variables:

**Required:**
```
NODE_ENV=production
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secure_jwt_secret_key
```

**Optional (for file uploads):**
```
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### 4. Deploy

1. Click "Create Web Service"
2. Render will automatically build and deploy your application
3. Monitor the build logs for any issues

## Configuration Files

### render.yaml (Auto-deployment)
The `render.yaml` file in your repository will automatically configure the service.

### Health Check
Your app includes a health check endpoint at `/health` that Render will use to verify the service is running.

## Common Issues & Solutions

### 1. Build Failures
**Issue**: Build command fails
**Solution**: 
- Check that all dependencies are in `dependencies` not `devDependencies`
- Verify Node.js version compatibility

### 2. Database Connection Issues
**Issue**: Cannot connect to MongoDB
**Solution**:
- Verify MONGO_URI is correct
- Ensure MongoDB Atlas allows connections from Render IPs
- Check network access settings in MongoDB Atlas

### 3. Port Issues
**Issue**: Server won't start
**Solution**:
- Render automatically sets `process.env.PORT`
- The app is configured to use this port automatically

### 4. Environment Variables
**Issue**: Variables not found
**Solution**:
- Set all required environment variables in Render dashboard
- Redeploy after setting variables

## Testing Your Deployment

Once deployed, test these endpoints:

- `https://your-app.onrender.com/` - Basic health check
- `https://your-app.onrender.com/health` - Detailed health check
- `https://your-app.onrender.com/health/db` - Database health check
- `https://your-app.onrender.com/api/auth/register` - Test API endpoint

## Monitoring

- **Logs**: View real-time logs in Render dashboard
- **Metrics**: Monitor CPU, memory, and response times
- **Health Checks**: Automatic health monitoring

## Scaling

- **Free Tier**: 750 hours/month, sleeps after 15 minutes of inactivity
- **Paid Plans**: Always-on, custom domains, SSL certificates

## Custom Domain

1. Go to your service settings
2. Click "Custom Domains"
3. Add your domain
4. Update DNS records as instructed

## SSL Certificate

Render automatically provides SSL certificates for all services.

## Support

If you encounter issues:
1. Check Render documentation
2. Review build and runtime logs
3. Verify environment variables
4. Test endpoints locally first 