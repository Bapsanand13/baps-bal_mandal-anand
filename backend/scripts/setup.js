#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 BAPS Bal Mandal Backend Setup');
console.log('================================\n');

// Check if .env file exists
const envPath = path.join(__dirname, '..', '.env');
const envExamplePath = path.join(__dirname, '..', 'env.example');

if (fs.existsSync(envPath)) {
  console.log('⚠️  .env file already exists!');
  const answer = await askQuestion('Do you want to overwrite it? (y/N): ');
  if (answer.toLowerCase() !== 'y') {
    console.log('Setup cancelled.');
    process.exit(0);
  }
}

// Generate JWT secret
const jwtSecret = crypto.randomBytes(32).toString('hex');

// Read env.example
if (!fs.existsSync(envExamplePath)) {
  console.error('❌ env.example file not found!');
  process.exit(1);
}

let envContent = fs.readFileSync(envExamplePath, 'utf8');

// Replace placeholder values
envContent = envContent.replace(
  /JWT_SECRET=.*/,
  `JWT_SECRET=${jwtSecret}`
);

// Ask for MongoDB URI
console.log('\n📊 DATABASE SETUP');
console.log('=================');
console.log('1. Go to https://www.mongodb.com/atlas');
console.log('2. Create a free account');
console.log('3. Create a new cluster');
console.log('4. Get your connection string');
console.log('5. Replace <username>, <password>, and <dbname> with your values\n');

const mongoUri = await askQuestion('Enter your MongoDB URI (or press Enter for local): ');
if (mongoUri) {
  envContent = envContent.replace(
    /MONGO_URI=.*/,
    `MONGO_URI=${mongoUri}`
  );
} else {
  envContent = envContent.replace(
    /MONGO_URI=.*/,
    'MONGO_URI=mongodb://localhost:27017/bapsbalmandal'
  );
}

// Ask for Cloudinary (optional)
console.log('\n☁️  CLOUDINARY SETUP (Optional)');
console.log('===============================');
console.log('1. Go to https://cloudinary.com/');
console.log('2. Create a free account');
console.log('3. Get your credentials from Dashboard > Settings > Access Keys\n');

const useCloudinary = await askQuestion('Do you want to set up Cloudinary for image uploads? (y/N): ');
if (useCloudinary.toLowerCase() === 'y') {
  const cloudName = await askQuestion('Enter Cloudinary Cloud Name: ');
  const apiKey = await askQuestion('Enter Cloudinary API Key: ');
  const apiSecret = await askQuestion('Enter Cloudinary API Secret: ');
  
  envContent = envContent.replace(
    /CLOUDINARY_CLOUD_NAME=.*/,
    `CLOUDINARY_CLOUD_NAME=${cloudName}`
  );
  envContent = envContent.replace(
    /CLOUDINARY_API_KEY=.*/,
    `CLOUDINARY_API_KEY=${apiKey}`
  );
  envContent = envContent.replace(
    /CLOUDINARY_API_SECRET=.*/,
    `CLOUDINARY_API_SECRET=${apiSecret}`
  );
}

// Ask for email setup (optional)
console.log('\n📧 EMAIL SETUP (Optional)');
console.log('=========================');
console.log('1. Enable 2FA on your Gmail account');
console.log('2. Generate App Password: https://myaccount.google.com/apppasswords\n');

const useEmail = await askQuestion('Do you want to set up email notifications? (y/N): ');
if (useEmail.toLowerCase() === 'y') {
  const email = await askQuestion('Enter your Gmail address: ');
  const appPassword = await askQuestion('Enter your Gmail App Password: ');
  
  envContent = envContent.replace(
    /SMTP_USER=.*/,
    `SMTP_USER=${email}`
  );
  envContent = envContent.replace(
    /SMTP_PASS=.*/,
    `SMTP_PASS=${appPassword}`
  );
}

// Write .env file
fs.writeFileSync(envPath, envContent);

console.log('\n✅ Setup completed successfully!');
console.log('================================');
console.log('📁 .env file created with your configuration');
console.log('🔐 JWT secret generated automatically');
console.log('\n🚀 Next steps:');
console.log('1. Install dependencies: npm install');
console.log('2. Start the server: npm run dev');
console.log('3. Test the API: http://localhost:5000');
console.log('\n📚 Documentation: README.md');

// Helper function to ask questions
function askQuestion(question) {
  return new Promise((resolve) => {
    process.stdout.write(question);
    process.stdin.once('data', (data) => {
      resolve(data.toString().trim());
    });
  });
} 