@echo off
echo Ex-Servicemen Association - Development Server
echo ==============================================
echo.
echo This will start both the backend and frontend servers.
echo Make sure MongoDB is running before continuing.
echo.
echo Starting backend server in a new window...
start "Backend Server" cmd /k "cd backend && npm run dev"
echo.
echo Starting frontend server in a new window...
start "Frontend Server" cmd /k "cd frontend && npm run dev"
echo.
echo Servers started successfully!
echo.
echo Backend API: http://localhost:5000
echo Frontend App: http://localhost:5173
echo.
echo Press any key to close this window...
pause >nul