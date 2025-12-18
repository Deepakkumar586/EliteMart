#!/usr/bin/env node
/* Simple env checker for development: verifies required VITE_ env vars are set */
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.resolve(process.cwd(), '.env') });

const required = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_DATABASE_URL',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID',
  'VITE_RAZORPAY_KEY',
  'VITE_BACKEND_URL'
];

const missing = required.filter((k) => !process.env[k] || process.env[k].trim() === '');
if (missing.length) {
  console.error('\n⚠️  Missing required env variables:');
  missing.forEach((m) => console.error(` - ${m}`));
  console.error('\nCopy `.env.example` to `.env`, fill values and re-run this script.');
  process.exit(1);
}

console.log('✅ All required env variables are set.');
