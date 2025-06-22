# Set environment variables
vercel env add MONGO_URI
vercel env add JWT_SECRET
vercel env add NODE_ENV

## Environment Variables Checklist

- [ ] MONGO_URI (MongoDB connection string)
- [ ] JWT_SECRET (Secret key for tokens)
- [ ] NODE_ENV=production
- [ ] CLOUDINARY_CLOUD_NAME (if using file uploads)
- [ ] CLOUDINARY_API_KEY (if using file uploads)
- [ ] CLOUDINARY_API_SECRET (if using file uploads) 