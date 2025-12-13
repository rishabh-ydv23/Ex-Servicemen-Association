# Setup and Run Guide - Windows PowerShell

## Prerequisites
1. **Node.js** installed (v16 or higher)
2. **MongoDB** running locally (or MongoDB Atlas connection string)

---

## Automated Setup (Recommended)

We've created an automated setup script that will handle all the steps below for you:

1. Double-click `setup.bat` in the project root directory

OR

1. Open PowerShell in the project root directory
2. Run: `node setup.js`

This will:
- Create `.env` files with default configurations
- Install all dependencies
- Prepare the project for development

---

## Manual Setup

If you prefer to set up manually, follow the steps below:

## Step 1: Setup Backend

Open PowerShell and run these commands:

```powershell
# Navigate to backend folder
cd "C:\Users\ASUS\Desktop\Ex-Servicemen Association\backend"

# Install dependencies (already done if you ran npm install)
npm install

# Create .env file (copy and paste this in PowerShell)
@"
PORT=5000
CLIENT_URL=http://localhost:5173
MONGODB_URI=mongodb://127.0.0.1:27017/ex-servicemen-foundation
JWT_SECRET=your_super_secret_jwt_key_here
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
CONTACT_EMAIL=your_email@gmail.com
"@ | Out-File -FilePath .env -Encoding utf8

# Start the backend server
npm run dev
```

The backend will run on `http://localhost:5000`

---

## Step 2: Bootstrap Admin Account (First Time Only)

Open a **NEW PowerShell window** (keep backend running) and run:

```powershell
# Using Invoke-RestMethod (PowerShell's built-in tool)
$body = @{
    email = "admin@example.com"
    password = "Admin@123"
    name = "Administrator"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/auth/bootstrap" -Method POST -Body $body -ContentType "application/json"
```

**Or** use a tool like Postman:
- URL: `http://localhost:5000/api/auth/bootstrap`
- Method: POST
- Body (JSON):
```json
{
  "email": "admin@example.com",
  "password": "Admin@123",
  "name": "Administrator"
}
```

---

## Step 3: Setup Frontend

Open a **NEW PowerShell window** and run:

```powershell
# Navigate to frontend folder
cd "C:\Users\ASUS\Desktop\Ex-Servicemen Association\frontend"

# Install dependencies
npm install

# Create .env file
"VITE_API_URL=http://localhost:5000/api" | Out-File -FilePath .env -Encoding utf8

# Start the frontend server
npm run dev
```

The frontend will run on `http://localhost:5173`

---

## Step 4: Access the Application

1. **Public Website**: Open browser → `http://localhost:5173`
2. **Admin Panel**: Open browser → `http://localhost:5173/admin/login`
   - Email: `admin@example.com`
   - Password: `Admin@123`

---

## Quick Command Reference

### Backend (Terminal 1)
```powershell
cd "C:\Users\ASUS\Desktop\Ex-Servicemen Association\backend"
npm run dev
```

### Frontend (Terminal 2)
```powershell
cd "C:\Users\ASUS\Desktop\Ex-Servicemen Association\frontend"
npm run dev
```

### Helper Scripts

We've provided several helper scripts to make development easier:

1. **setup.bat** - Runs the automated setup process
2. **start-dev.bat** - Starts both backend and frontend servers in separate windows
3. **bootstrap-admin.bat** - Creates an admin account if one doesn't exist

Simply double-click any of these files to run them.

---

## Troubleshooting

### MongoDB Not Running
- Install MongoDB: https://www.mongodb.com/try/download/community
- Or use MongoDB Atlas (cloud): Update `MONGODB_URI` in `.env`

### Port Already in Use
- Change `PORT` in `backend/.env` (e.g., 5001)
- Update `VITE_API_URL` in `frontend/.env` accordingly

### CORS Errors
- Make sure `CLIENT_URL` in `backend/.env` matches your frontend URL

### Upload Folder Missing
- Backend will auto-create `backend/uploads` folder when you upload files

---

## Email Configuration (Optional)

For contact form emails, configure SMTP in `backend/.env`:
- **Gmail**: Use App Password (not regular password)
- **Other providers**: Update SMTP_HOST, SMTP_PORT accordingly
- If not configured, contact form will show error but won't crash the app

---

## Production Build

### Build Frontend
```powershell
cd frontend
npm run build
```

### Start Backend (Production)
```powershell
cd backend
npm start
```

