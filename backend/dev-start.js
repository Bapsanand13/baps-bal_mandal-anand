#!/usr/bin/env node

import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

// Function to find and kill process using a port
async function killProcessOnPort(port) {
  try {
    // For Windows
    const { stdout } = await execAsync(`netstat -ano | findstr :${port}`);
    const lines = stdout.split('\n');
    
    for (const line of lines) {
      if (line.includes(`:${port}`) && line.includes('LISTENING')) {
        const parts = line.trim().split(/\s+/);
        const pid = parts[parts.length - 1];
        
        if (pid && pid !== '0') {
          console.log(`Killing process ${pid} on port ${port}`);
          await execAsync(`taskkill /PID ${pid} /F`);
        }
      }
    }
  } catch (error) {
    // Process might not exist, which is fine
    console.log(`No process found on port ${port}`);
  }
}

// Start the server
async function startServer() {
  const port = process.env.PORT || 5000;
  
  try {
    // Try to kill any existing process on the port
    await killProcessOnPort(port);
    
    // Wait a moment for the port to be freed
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Start the server
    console.log(`Starting server on port ${port}...`);
    import('./index.js');
    
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer(); 