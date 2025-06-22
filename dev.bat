@echo off
echo Starting BAPS Bal Mandal Development Servers...

echo Starting backend server...
start "Backend Server" cmd /k "cd backend && npm run dev"

timeout /t 2 /nobreak >nul

echo Starting frontend server...
start "Frontend Server" cmd /k "cd frontend && npm run dev"

timeout /t 2 /nobreak >nul

echo Starting admin server...
start "Admin Server" cmd /k "cd admin && npm run dev"

echo All development servers started!
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5173
echo Admin: http://localhost:5174

pause 