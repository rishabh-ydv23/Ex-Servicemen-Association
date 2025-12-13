# Database Setup Guide - MongoDB

This project uses **MongoDB** as the database. You have two options:

## Option 1: MongoDB Local Installation (Recommended for Development)

### Step 1: Download and Install MongoDB

1. **Download MongoDB Community Server**
   - Go to: https://www.mongodb.com/try/download/community
   - Select:
     - **Version**: Latest (e.g., 7.0 or 8.0)
     - **Platform**: Windows
     - **Package**: MSI
   - Click "Download"

2. **Install MongoDB**
   - Run the downloaded `.msi` file
   - Choose "Complete" installation
   - **Important**: Check "Install MongoDB as a Service" 
   - Check "Install MongoDB Compass" (optional but useful GUI tool)
   - Click "Install"

3. **Verify Installation**
   - Open PowerShell and run:
   ```powershell
   mongod --version
   ```
   - You should see MongoDB version info

### Step 2: Start MongoDB Service

MongoDB should start automatically as a Windows service. To check:

1. **Method 1: Using Services**
   - Press `Win + R`, type `services.msc`, press Enter
   - Look for "MongoDB Server (MongoDB)" service
   - If it shows "Running", you're good! ✅
   - If not, right-click → "Start"

2. **Method 2: Using PowerShell (Run as Administrator)**
   ```powershell
   # Check if MongoDB service is running
   Get-Service -Name MongoDB

   # If not running, start it
   Start-Service -Name MongoDB
   ```

### Step 3: Verify MongoDB is Running

1. **Test Connection**
   ```powershell
   # Open MongoDB shell
   mongosh
   ```
   
   If you see `>` prompt, MongoDB is running! ✅
   
   Type `exit` to leave MongoDB shell

2. **Check Default Connection**
   - MongoDB default connection: `mongodb://127.0.0.1:27017`
   - This is already set in your `backend/.env` file

### Step 4: No Further Action Needed!

Your `backend/.env` file already has:
```
MONGODB_URI=mongodb://127.0.0.1:27017/ex-servicemen-foundation
```

The database will be **automatically created** when you first run the backend server! The database name is `ex-servicemen-foundation`.

---

## Option 2: MongoDB Atlas (Cloud - Free Option)

If you prefer cloud database (no local installation needed):

### Step 1: Create MongoDB Atlas Account

1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up for free account (use Google/GitHub for quick signup)

### Step 2: Create a Free Cluster

1. **Choose Free Tier (M0)**
   - Click "Build a Database"
   - Select **M0 FREE** tier
   - Click "Create"

2. **Select Cloud Provider & Region**
   - Choose any region (e.g., AWS, Mumbai/Asia Pacific for India)
   - Click "Create Cluster" (takes 1-3 minutes)

### Step 3: Create Database User

1. Go to **Database Access** (left sidebar)
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Enter:
   - **Username**: `admin` (or any name)
   - **Password**: Create a strong password (save it!)
5. Click "Add User"

### Step 4: Whitelist Your IP Address

1. Go to **Network Access** (left sidebar)
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for development)
   - Or add specific IP: `0.0.0.0/0`
4. Click "Confirm"

### Step 5: Get Connection String

1. Go to **Databases** (left sidebar)
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### Step 6: Update backend/.env

1. Open `backend/.env` file
2. Replace `MONGODB_URI` with your Atlas connection string:
   ```
   MONGODB_URI=mongodb+srv://admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/ex-servicemen-foundation?retryWrites=true&w=majority
   ```
   - Replace `admin` with your database username
   - Replace `YOUR_PASSWORD` with your database password
   - Replace `cluster0.xxxxx` with your cluster name

---

## Quick Test - Verify Database Connection

After setup (either local or Atlas), test the connection:

### Step 1: Start Backend Server

```powershell
cd "C:\Users\ASUS\Desktop\Ex-Servicemen Association\backend"
npm run dev
```

### Step 2: Check Console Output

You should see:
```
MongoDB connected
Server running on port 5000
```

If you see `MongoDB connected`, database is working! ✅

If you see an error, check:
- MongoDB service is running (local) OR
- Connection string is correct (Atlas)
- Network/firewall isn't blocking

---

## Troubleshooting

### Problem: "MongoDB connection error"

**For Local MongoDB:**
- Check if MongoDB service is running: `Get-Service MongoDB`
- Start service: `Start-Service MongoDB`
- Check if port 27017 is free: `netstat -an | findstr 27017`

**For MongoDB Atlas:**
- Check your IP is whitelisted in Network Access
- Verify username/password in connection string
- Check cluster is not paused (if free tier)

### Problem: "Cannot connect to MongoDB"

1. **Firewall**: Allow MongoDB through Windows Firewall
2. **Port**: Make sure port 27017 (local) or 27017 (Atlas) is accessible
3. **Connection String**: Double-check spelling in `.env` file

### Problem: "Authentication failed"

- Username/password incorrect
- Database user doesn't have proper permissions
- Connection string format is wrong

---

## Recommended: MongoDB Compass (GUI Tool)

**Download**: https://www.mongodb.com/try/download/compass

MongoDB Compass lets you:
- View your databases visually
- See all collections (notifications, events, photos, etc.)
- Query and edit data manually
- Monitor database performance

**Connection String for Compass:**
- Local: `mongodb://127.0.0.1:27017`
- Atlas: Use the connection string from Atlas dashboard

---

## Summary

**Easiest Option**: Use MongoDB Atlas (cloud) - no installation needed!

**Steps:**
1. Sign up at mongodb.com/cloud/atlas
2. Create free cluster (M0)
3. Create database user
4. Whitelist IP (0.0.0.0/0)
5. Copy connection string
6. Update `backend/.env` with connection string
7. Done! ✅

The database will be created automatically when you run the backend for the first time!

