# MongoDB Setup Guide

This guide will help you set up MongoDB for the Ex-Servicemen Association Portal.

## Option 1: Install MongoDB Community Edition (Local Installation)

### Windows Installation

1. **Download MongoDB Community Server:**
   - Visit [MongoDB Download Center](https://www.mongodb.com/try/download/community)
   - Select "Windows x64" from the platform dropdown
   - Download the MSI installer

2. **Install MongoDB:**
   - Run the downloaded MSI file
   - Follow the installation wizard with default settings
   - Choose "Complete" setup type
   - Select "Run service as Network Service user" (default)
   - Choose "Install MongoDB Compass" (optional but recommended)

3. **Verify Installation:**
   - Open Command Prompt or PowerShell
   - Run: `mongod --version`
   - You should see the MongoDB version information

4. **Start MongoDB Service:**
   - The MongoDB service should start automatically after installation
   - To verify: Run `mongo` in Command Prompt
   - You should see the MongoDB shell prompt

### macOS Installation

1. **Using Homebrew (Recommended):**
   ```bash
   brew tap mongodb/brew
   brew install mongodb-community@7.0
   ```

2. **Start MongoDB:**
   ```bash
   brew services start mongodb-community@7.0
   ```

### Linux Installation (Ubuntu)

1. **Import MongoDB public GPG key:**
   ```bash
   wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -
   ```

2. **Create list file for MongoDB:**
   ```bash
   echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
   ```

3. **Reload local package database:**
   ```bash
   sudo apt-get update
   ```

4. **Install MongoDB packages:**
   ```bash
   sudo apt-get install -y mongodb-org
   ```

5. **Start MongoDB:**
   ```bash
   sudo systemctl start mongod
   ```

## Option 2: Use MongoDB Atlas (Cloud Database)

1. **Sign Up:**
   - Visit [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for a free account

2. **Create a Cluster:**
   - Select "Shared" tier (free forever)
   - Choose a cloud provider and region near you
   - Leave other settings as default
   - Click "Create Cluster"

3. **Configure Database User:**
   - Go to "Database Access" in the left sidebar
   - Click "Add New Database User"
   - Enter username and password
   - Select "Read and write to any database"
   - Click "Add User"

4. **Configure Network Access:**
   - Go to "Network Access" in the left sidebar
   - Click "Add IP Address"
   - For development, you can select "Allow Access from Anywhere" (0.0.0.0/0)
   - For production, add your specific IP address

5. **Get Connection String:**
   - Go back to "Clusters"
   - Click "Connect" on your cluster
   - Select "Connect your application"
   - Copy the connection string
   - Replace `<username>` and `<password>` with your database user credentials

## Environment Configuration

Update your `backend/.env` file with the appropriate MongoDB URI:

### For Local Installation:
```
MONGODB_URI=mongodb://127.0.0.1:27017/ex-servicemen-foundation
```

### For MongoDB Atlas:
```
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.example.mongodb.net/exservicemen?retryWrites=true&w=majority
```

## Testing the Connection

1. **Start the backend server:**
   ```bash
   cd backend
   npm run dev
   ```

2. **Check the console output:**
   - You should see "MongoDB connected" message
   - If there's an error, double-check your connection string

## Troubleshooting

### Common Issues:

1. **Connection Refused:**
   - Ensure MongoDB service is running
   - Check if the port (27017) is not blocked by firewall

2. **Authentication Failed:**
   - Verify username and password
   - Check if the user has proper permissions

3. **Network Issues (Atlas):**
   - Ensure IP whitelist is configured correctly
   - Check your internet connection

### Useful Commands:

- Check MongoDB service status (Windows):
  ```cmd
  net start | findstr Mongo
  ```

- Start MongoDB service (Windows):
  ```cmd
  net start MongoDB
  ```

- Stop MongoDB service (Windows):
  ```cmd
  net stop MongoDB
  ```

- Check MongoDB service status (macOS/Linux):
  ```bash
  sudo systemctl status mongod
  ```

- Start MongoDB service (Linux):
  ```bash
  sudo systemctl start mongod
  ```

- Stop MongoDB service (Linux):
  ```bash
  sudo systemctl stop mongod
  ```