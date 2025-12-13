@echo off
echo Ex-Servicemen Association - Bootstrap Admin Account
echo ==================================================
echo.
echo This script will create an admin account if one doesn't already exist.
echo.
echo Sending request to create admin account...
echo.
powershell -Command "& {$body = @{email = 'admin@example.com'; password = 'Admin@123'; name = 'Administrator'} | ConvertTo-Json; Invoke-RestMethod -Uri 'http://localhost:5000/api/auth/bootstrap' -Method POST -Body $body -ContentType 'application/json'}"
echo.
echo If successful, you can now log in to the admin panel with:
echo Email: admin@example.com
echo Password: Admin@123
echo.
echo Press any key to close this window...
pause >nul