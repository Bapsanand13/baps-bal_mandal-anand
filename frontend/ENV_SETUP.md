# Environment Variables Setup

## Frontend Environment Variables

To configure the frontend application, create a `.env` file in the `frontend` directory with the following variables:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:5000/api

# For production, use your production API URL:
# VITE_API_BASE_URL=https://your-production-api.com/api
```

## Available Environment Variables

### VITE_API_BASE_URL
- **Description**: The base URL for the backend API
- **Default**: `http://localhost:5000/api`
- **Required**: Yes
- **Example**: 
  - Development: `http://localhost:5000/api`
  - Production: `https://api.bapsbalmandal.com/api`

## How to Use

1. Create a `.env` file in the `frontend` directory
2. Add the required environment variables
3. Restart your development server
4. The application will automatically use the environment variables

## Important Notes

- All environment variables must be prefixed with `VITE_` to be accessible in the frontend
- The `.env` file should not be committed to version control (it's already in `.gitignore`)
- For production deployment, set the environment variables in your hosting platform
- The application will fall back to default values if environment variables are not set

## Example .env file

```env
# Development
VITE_API_BASE_URL=http://localhost:5000/api

# Production (example)
# VITE_API_BASE_URL=https://api.bapsbalmandal.com/api
``` 