import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔧 Ex-Servicemen Service Foundation - Automated Setup Script');
console.log('=====================================================\n');

// Function to create .env file with default values if it doesn't exist
function createEnvFile(filePath, envVars) {
  if (!fs.existsSync(filePath)) {
    console.log(`📝 Creating ${path.basename(filePath)} file...`);
    const envContent = Object.entries(envVars)
      .map(([key, value]) => `${key}=${value}`)
      .join('\n') + '\n';
    
    fs.writeFileSync(filePath, envContent);
    console.log(`✅ Created ${path.basename(filePath)} file\n`);
  } else {
    console.log(`⚠️  ${path.basename(filePath)} already exists, skipping...\n`);
  }
}

// Function to run npm install if node_modules doesn't exist
function installDependencies(dir) {
  const nodeModulesPath = path.join(dir, 'node_modules');
  if (!fs.existsSync(nodeModulesPath)) {
    console.log(`📦 Installing dependencies in ${path.basename(dir)}...`);
    try {
      execSync('npm install', { cwd: dir, stdio: 'inherit' });
      console.log(`✅ Dependencies installed in ${path.basename(dir)}\n`);
    } catch (error) {
      console.error(`❌ Failed to install dependencies in ${path.basename(dir)}`);
      process.exit(1);
    }
  } else {
    console.log(`⚠️  Dependencies already installed in ${path.basename(dir)}, skipping...\n`);
  }
}

// Backend .env configuration
const backendEnvVars = {
  PORT: 5000,
  CLIENT_URL: 'http://localhost:5173',
  MONGODB_URI: 'mongodb://127.0.0.1:27017/ex-servicemen-foundation',
  JWT_SECRET: 'your_super_secret_jwt_key_here_change_me',
  SMTP_HOST: 'smtp.ethereal.email',
  SMTP_PORT: 587,
  SMTP_USER: '',
  SMTP_PASS: '',
  CONTACT_EMAIL: ''
};

// Frontend .env configuration
const frontendEnvVars = {
  VITE_API_URL: 'http://localhost:5000/api'
};

try {
  // Setup backend
  console.log('🚀 Setting up Backend...');
  const backendDir = path.join(__dirname, 'backend');
  createEnvFile(path.join(backendDir, '.env'), backendEnvVars);
  installDependencies(backendDir);

  // Setup frontend
  console.log('🎨 Setting up Frontend...');
  const frontendDir = path.join(__dirname, 'frontend');
  createEnvFile(path.join(frontendDir, '.env'), frontendEnvVars);
  installDependencies(frontendDir);

  console.log('✅ Setup completed successfully!');
  console.log('\n📋 To run the application:');
  console.log('1. Make sure MongoDB is running on your system');
  console.log('2. Open a terminal and run: cd backend && npm run dev');
  console.log('3. Open another terminal and run: cd frontend && npm run dev');
  console.log('4. Visit http://localhost:5173 in your browser');
  console.log('5. For admin panel, visit http://localhost:5173/admin/login');
  console.log('   Use email: admin@example.com and password: Admin@123 (after bootstrapping)');

} catch (error) {
  console.error('❌ Setup failed:', error.message);
  process.exit(1);
}