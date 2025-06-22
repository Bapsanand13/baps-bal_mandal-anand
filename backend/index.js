// Entry point for deployment platforms
import app from './server.js';

// Export the app for serverless environments (Vercel, etc.)
export default app;

// Start server for traditional hosting (Render, Heroku, etc.)
if (process.env.NODE_ENV === 'production' || process.env.PORT) {
  const port = process.env.PORT || 5000;
  
  app.listen(port, () => {
    console.log(`Server running on port ${port} in production mode`);
  });
}
// Start server in local development
else if (process.env.NODE_ENV === 'development') {
  const port = process.env.PORT || 5000;
  
  app.listen(port, () => {
    console.log(`Server running on port ${port} in development mode`);
  }).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${port} is busy, trying port ${port + 1}`);
      app.listen(port + 1, () => {
        console.log(`Server running on port ${port + 1} in development mode`);
      });
    } else {
      console.error('Server error:', err);
    }
  });
} 