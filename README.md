# Ex-Servicemen Association Portal

A full-stack web application for managing an association for ex-servicemen, featuring public website pages and an admin panel.

## Tech Stack

- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Node.js + Express
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (admin-only)
- **File Uploads**: Multer (stored locally in `/uploads`)
- **Email Service**: Nodemailer using SMTP

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local installation or Atlas account)
- Git

## Automated Setup

Run the automated setup script which will install dependencies and configure environment files:

```bash
# From the backend directory
npm run setup
```

Or run the setup script directly:

```bash
node setup.js
```

## Manual Setup

### 1. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following content:
   ```env
   PORT=5000
   CLIENT_URL=http://localhost:5173
   MONGODB_URI=mongodb://127.0.0.1:27017/ex-servicemen-foundation
   JWT_SECRET=your_super_secret_jwt_key_here_change_me
   SMTP_HOST=smtp.ethereal.email
   SMTP_PORT=587
   SMTP_USER=
   SMTP_PASS=
   CONTACT_EMAIL=
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

### 2. Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the frontend directory with the following content:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

4. Start the frontend development server:
   ```bash
   npm run dev
   ```

## Database Setup

### Option 1: Local MongoDB Installation

1. Download and install MongoDB Community Server from [MongoDB Download Center](https://www.mongodb.com/try/download/community)
2. Ensure MongoDB service is running

### Option 2: MongoDB Atlas (Cloud)

1. Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user and whitelist your IP
4. Update the `MONGODB_URI` in `backend/.env` with your Atlas connection string

## First-Time Admin Setup

After starting both servers, create an admin account by sending a POST request to the bootstrap endpoint:

```bash
# Using curl
 curl -X POST http://localhost:5000/api/auth/bootstrap \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@example.com", "password": "Admin@123", "name": "Administrator"}'
```

Or use the following PowerShell command:

```powershell
$body = @{
  email = "admin@example.com"
  password = "Admin@123"
  name = "Administrator"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/auth/bootstrap" -Method POST -Body $body -ContentType "application/json"
```

## Accessing the Application

- **Public Website**: Open browser → `http://localhost:5173`
- **Admin Panel**: Open browser → `http://localhost:5173/admin/login`
  - Email: `admin@example.com`
  - Password: `Admin@123`

## Development

### Backend Structure

- `src/index.js`: Main entry point
- `src/modules/models`: Database models
- `src/modules/routes`: API routes
- `src/modules/config`: Configuration files
- `src/seed.js`: Database seeding script

### Frontend Structure

- `src/App.jsx`: Main application component
- `src/pages`: Page components
- `src/components`: Reusable components
- `src/services`: API service files

## Troubleshooting

1. **MongoDB Connection Issues**:
   - Ensure MongoDB is running locally or Atlas connection string is correct
   - Check that the port 27017 is not blocked by firewall

2. **CORS Errors**:
   - Verify `CLIENT_URL` in backend `.env` matches frontend URL

3. **Port Conflicts**:
   - Change `PORT` in `backend/.env` if 5000 is in use

4. **Missing Dependencies**:
   - Run `npm install` in both frontend and backend directories

## Production Deployment

### Build Frontend

```bash
cd frontend
npm run build
```

### Start Backend (Production)

```bash
cd backend
npm start
```

The built frontend files will be served by the backend automatically.


