// Entry point for Render deployment
import app from './server.js';

// Export the app for serverless environments
export default app;

// For traditional server environments, start the server
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`Server running on port ${port} in ${process.env.NODE_ENV || 'development'} mode`);
  });
} 