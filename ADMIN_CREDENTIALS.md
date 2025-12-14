# 🔐 Admin Login Credentials

## Default Admin Credentials

**Email:** `admin@example.com`  
**Password:** `Admin@123`

---

## 📍 Where to Login

**Admin Panel URL:** http://localhost:5173/admin/login

---

## 🆕 First Time Setup (Bootstrap Admin)

If you haven't created an admin account yet, you need to bootstrap it first:

### Method 1: Using PowerShell (Recommended)

Open PowerShell and run:

```powershell
$body = @{
    email = "admin@example.com"
    password = "Admin@123"
    name = "Administrator"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/auth/bootstrap" -Method POST -Body $body -ContentType "application/json"
```

**Note:** This only works if no admin exists. If you get an error saying "Admin already exists", that means the admin account is already created and you can use the credentials above.

### Method 2: Using Postman or Browser

1. **URL:** `http://localhost:5000/api/auth/bootstrap`
2. **Method:** POST
3. **Headers:** `Content-Type: application/json`
4. **Body (JSON):**
```json
{
  "email": "admin@example.com",
  "password": "Admin@123",
  "name": "Administrator"
}
```

### Method 3: Using curl

```bash
curl -X POST http://localhost:5000/api/auth/bootstrap \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@example.com", "password": "Admin@123", "name": "Administrator"}'
```

---

## ✅ How to Check if Admin Exists

If you're not sure if an admin account exists:

1. Try logging in at: http://localhost:5173/admin/login
2. Use the credentials above
3. If login fails, run the bootstrap command above

---

## 🔄 Change Admin Password

Currently, there's no built-in password change feature. To change the password:

1. Connect to your MongoDB database
2. Find the `admins` collection
3. Update the password hash for the admin user
4. Or delete the admin and create a new one with different credentials

---

## 📝 Quick Reference

| Item | Value |
|------|-------|
| **Login URL** | http://localhost:5173/admin/login |
| **Email** | admin@example.com |
| **Password** | Admin@123 |
| **Bootstrap URL** | http://localhost:5000/api/auth/bootstrap |
| **Bootstrap Method** | POST |

---

## ⚠️ Important Notes

1. **Bootstrap only works once** - If an admin already exists, you'll get an error
2. **Make sure backend is running** - The bootstrap endpoint requires the backend server to be running on port 5000
3. **MongoDB must be connected** - The admin account is stored in MongoDB
4. **For production** - Change these default credentials before deploying!

---

## 🆘 Troubleshooting

### "Admin already exists" error
✅ **This is normal!** Just use the credentials above to login.

### "Invalid credentials" error
- Make sure you're using: `admin@example.com` / `Admin@123`
- Check that the admin was bootstrapped successfully
- Verify MongoDB is connected and has the admin record

### Can't access bootstrap endpoint
- Make sure backend server is running (`npm run dev` in backend folder)
- Check that backend is running on port 5000
- Verify the URL: `http://localhost:5000/api/auth/bootstrap`

---

## 📚 Related Files

- Bootstrap script: `backend/src/modules/routes/auth.js` (line 20-30)
- Admin login page: `frontend/src/pages/admin/Login.tsx`
- Setup guide: `SETUP_GUIDE.md`
- Quick start: `QUICK_START.md`

