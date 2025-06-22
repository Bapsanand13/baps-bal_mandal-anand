// Entry point for Render deployment
import app from './server.js';

// Export the app for serverless environments
export default app;

// For traditional server environments, start the server
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  const startServer = (port) => {
    const server = app.listen(port, () => {
      console.log(`Server running on port ${port} in ${process.env.NODE_ENV || 'development'} mode`);
    }).on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.log(`Port ${port} is busy, trying port ${port + 1}`);
        startServer(port + 1);
      } else {
        console.error('Server error:', err);
      }
    });
  };

  const port = process.env.PORT || 5000;
  startServer(port);
} 