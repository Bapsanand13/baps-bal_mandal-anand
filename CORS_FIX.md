# 🔧 CORS Issue Fix

## Problem
The frontend (deployed on Vercel) is getting CORS errors when trying to access the backend (deployed on Render).

## Solution

### 1. Backend CORS Configuration (Already Fixed)

The backend CORS configuration has been updated in `backend/server.js` to allow requests from:
- Local development servers
- Vercel frontend domains
- All origins in development mode

### 2. Frontend Environment Variables

Make sure your frontend has the correct API URL set in Vercel environment variables:

```env
VITE_API_BASE_URL=https://baps-bal-mandal-anand-backend.onrender.com/api
```

### 3. Deploy the Updated Backend

The backend needs to be redeployed to Render with the updated CORS configuration:

1. Commit and push your changes to GitHub
2. Render will automatically redeploy the backend
3. Or manually trigger a redeploy in Render dashboard

### 4. Verify the Fix

After deployment, test the API endpoints:

```bash
# Test the health endpoint
curl https://baps-bal-mandal-anand-backend.onrender.com/health

# Test the events endpoint
curl https://baps-bal-mandal-anand-backend.onrender.com/api/events
```

### 5. Alternative: Use a CORS Proxy (Temporary)

If the CORS issue persists, you can temporarily use a CORS proxy:

Update `frontend/src/config/env.js`:
```javascript
const config = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 
    'https://cors-anywhere.herokuapp.com/https://baps-bal-mandal-anand-backend.onrender.com/api',
  // ... rest of config
};
```

### 6. Check Render Logs

If the issue persists, check the Render logs for any errors:
1. Go to your Render dashboard
2. Select your backend service
3. Check the "Logs" tab for any CORS-related errors

## Expected Behavior

After the fix:
- ✅ Frontend can fetch data from backend
- ✅ No CORS errors in browser console
- ✅ API calls work from Vercel to Render

## Troubleshooting

### If CORS still fails:
1. Check if backend is actually running on Render
2. Verify the API URL is correct
3. Check Render logs for errors
4. Try accessing the API directly in browser
5. Consider using a CORS proxy temporarily

### Common Issues:
- Backend not deployed with latest changes
- Wrong API URL in frontend
- Render service down or misconfigured
- Environment variables not set correctly 