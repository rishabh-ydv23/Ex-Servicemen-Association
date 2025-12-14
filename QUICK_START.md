# Quick Start Guide - How to Run the Application

## Prerequisites

1. **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
2. **MongoDB** - Either:
   - Local MongoDB installed, OR
   - MongoDB Atlas account (free cloud option)

---

## Step-by-Step Instructions

### Step 1: Setup Backend

1. **Open PowerShell** and navigate to the backend folder:
   ```powershell
   cd "C:\Users\ASUS\Desktop\Ex-Servicemen Association\backend"
   ```

2. **Install dependencies** (first time only):
   ```powershell
   npm install
   ```

3. **Create `.env` file** (if not already created):
   ```powershell
   # Copy this into a new file named .env in the backend folder
   PORT=5000
   CLIENT_URL=http://localhost:5173
   MONGODB_URI=mongodb://127.0.0.1:27017/ex-servicemen-foundation
   JWT_SECRET=your_secret_key_change_this
   SMTP_HOST=smtp.ethereal.email
   SMTP_PORT=587
   SMTP_USER=
   SMTP_PASS=
   CONTACT_EMAIL=
   ```

4. **Start the backend server**:
   ```powershell
   npm run dev
   ```

   You should see:
   ```
   MongoDB connected
   Server running on port 5000
   ```

   **Keep this terminal window open!**

---

### Step 2: Setup Frontend

1. **Open a NEW PowerShell window** (keep backend running)

2. **Navigate to frontend folder**:
   ```powershell
   cd "C:\Users\ASUS\Desktop\Ex-Servicemen Association\frontend"
   ```

3. **Install dependencies** (first time only):
   ```powershell
   npm install
   ```

4. **Create `.env` file** (if not already created):
   ```powershell
   # Create a file named .env in the frontend folder with:
   VITE_API_URL=http://localhost:5000/api
   ```

5. **Start the frontend server**:
   ```powershell
   npm run dev
   ```

   You should see:
   ```
   VITE v5.x.x  ready in xxx ms
   ➜  Local:   http://localhost:5173/
   ```

---

### Step 3: Bootstrap Admin Account (First Time Only)

1. **Open a NEW PowerShell window** (or use Postman/curl)

2. **Create the admin account**:
   ```powershell
   $body = @{
       email = "admin@example.com"
       password = "Admin@123"
       name = "Administrator"
   } | ConvertTo-Json

   Invoke-RestMethod -Uri "http://localhost:5000/api/auth/bootstrap" -Method POST -Body $body -ContentType "application/json"
   ```

   **Note**: This only works if no admin exists. If you get an error, an admin already exists.

---

### Step 4: Access the Application

1. **Open your web browser** and go to:
   - **Website**: http://localhost:5173
   - **Admin Panel**: http://localhost:5173/admin/login

2. **Admin Login Credentials**:
   - Email: `admin@example.com`
   - Password: `Admin@123`

---

## Quick Command Reference

### Terminal 1 - Backend
```powershell
cd "C:\Users\ASUS\Desktop\Ex-Servicemen Association\backend"
npm run dev
```

### Terminal 2 - Frontend
```powershell
cd "C:\Users\ASUS\Desktop\Ex-Servicemen Association\frontend"
npm run dev
```

---

## Troubleshooting

### ❌ "MongoDB connection error"
**Solution**: 
- Make sure MongoDB is running (if using local)
- Or update `MONGODB_URI` in `backend/.env` with your MongoDB Atlas connection string

### ❌ "Port 5000 already in use"
**Solution**: 
- Change `PORT=5001` in `backend/.env`
- Update `VITE_API_URL=http://localhost:5001/api` in `frontend/.env`

### ❌ "Cannot find module"
**Solution**: 
- Run `npm install` in both backend and frontend folders

### ❌ Frontend can't connect to backend
**Solution**: 
- Make sure backend is running on port 5000
- Check `VITE_API_URL` in `frontend/.env` matches backend URL

### ❌ "Admin already exists" error
**Solution**: 
- This is normal if you've already created an admin
- Just use the existing credentials to login

---

## Database Setup (If Needed)

### Option 1: MongoDB Atlas (Cloud - Recommended)
1. Sign up at https://www.mongodb.com/cloud/atlas
2. Create free cluster (M0)
3. Create database user
4. Whitelist IP (0.0.0.0/0 for development)
5. Copy connection string
6. Update `MONGODB_URI` in `backend/.env`

### Option 2: Local MongoDB
1. Download from https://www.mongodb.com/try/download/community
2. Install MongoDB
3. Start MongoDB service
4. Use default connection: `mongodb://127.0.0.1:27017/ex-servicemen-foundation`

See `DATABASE_SETUP.md` for detailed instructions.

---

## What You'll See

✅ **Backend running**: Terminal shows "Server running on port 5000"  
✅ **Frontend running**: Terminal shows "Local: http://localhost:5173/"  
✅ **Website working**: Browser shows the Ex-Servicemen Foundation homepage  
✅ **Admin panel**: Login at http://localhost:5173/admin/login

---

## Next Steps

1. ✅ Backend and Frontend are running
2. ✅ Admin account is created
3. ✅ Login to admin panel
4. ✅ Start adding notifications, events, and photos!

---

## Need Help?

- Check `SETUP_GUIDE.md` for detailed setup
- Check `DATABASE_SETUP.md` for database configuration
- Check `README.md` for project overview

