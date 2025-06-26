import express from 'express';
import cors from 'cors';

const app = express();

// Basic middleware
app.use(cors());
app.use(express.json());

// Simple health check
app.get('/', (req, res) => {
  res.json({
    message: 'BAPS Bal Mandal API Test Server',
    status: 'running',
    timestamp: new Date().toISOString(),
    vercel: !!process.env.VERCEL
  });
});

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Test API endpoint
app.get('/api/test', (req, res) => {
  res.json({
    message: 'API is working',
    data: {
      test: true,
      timestamp: new Date().toISOString()
    }
  });
});

// Error handler
app.use((err, req, res) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: err.message
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not found',
    path: req.originalUrl
  });
});

// Start server only if not on Vercel
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`Test server running on port ${port}`);
  });
}

export default app; 