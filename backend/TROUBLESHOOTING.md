# Vercel Deployment Troubleshooting

## Current Issue: 500 Internal Server Error

The server is crashing on Vercel. Let's troubleshoot step by step.

## Step 1: Test with Minimal Server

First, let's test with a minimal server to isolate the issue:

1. **Rename the test configuration**:
   ```bash
   mv vercel-test.json vercel.json
   ```

2. **Deploy the test server**:
   ```bash
   vercel
   ```

3. **Test the endpoints**:
   - `https://your-app.vercel.app/`
   - `https://your-app.vercel.app/health`
   - `https://your-app.vercel.app/api/test`

## Step 2: Check Vercel Logs

If the test server works, the issue is in the main server. Check logs:

```bash
vercel logs
```

## Step 3: Common Issues and Fixes

### Issue 1: Missing Environment Variables
**Symptoms**: Database connection errors, JWT errors
**Fix**: Set all required environment variables in Vercel dashboard

### Issue 2: Import Errors
**Symptoms**: Module not found errors
**Fix**: Check all import paths are correct

### Issue 3: Database Connection
**Symptoms**: MongoDB connection timeouts
**Fix**: 
- Check MONGO_URI is correct
- Ensure MongoDB Atlas allows Vercel IPs
- Add connection timeout settings

### Issue 4: File System Access
**Symptoms**: File read/write errors
**Fix**: Vercel doesn't support file system writes, use cloud storage

## Step 4: Debugging Steps

1. **Check Environment Variables**:
   ```bash
   vercel env ls
   ```

2. **View Function Logs**:
   ```bash
   vercel logs --function=server.js
   ```

3. **Test Locally First**:
   ```bash
   npm start
   ```

4. **Check Package.json**:
   - Ensure all dependencies are in `dependencies` not `devDependencies`
   - Check Node.js version compatibility

## Step 5: Alternative Deployment

If Vercel continues to have issues, consider:

1. **Railway**: Good for Node.js apps
2. **Render**: Free tier available
3. **Heroku**: Classic choice
4. **DigitalOcean App Platform**: Simple deployment

## Quick Fix Commands

```bash
# Deploy test server
mv vercel-test.json vercel.json
vercel

# Deploy main server
mv vercel.json vercel-main.json
mv vercel-test.json vercel.json
vercel

# Check logs
vercel logs

# Set environment variables
vercel env add MONGO_URI
vercel env add JWT_SECRET
vercel env add NODE_ENV
vercel env add FRONTEND_URL
```

## Environment Variables Checklist

- [ ] MONGO_URI (MongoDB connection string)
- [ ] JWT_SECRET (Secret key for tokens)
- [ ] NODE_ENV=production
- [ ] FRONTEND_URL (Your frontend URL)
- [ ] CLOUDINARY_CLOUD_NAME (if using file uploads)
- [ ] CLOUDINARY_API_KEY (if using file uploads)
- [ ] CLOUDINARY_API_SECRET (if using file uploads) 