#!/usr/bin/env node

/**
 * Generate Secure API Key
 * 
 * Generates a cryptographically secure random API key for authentication.
 * Use this key in your .env file and Railway environment variables.
 * 
 * Usage:
 *   node scripts/generate-api-key.js
 *   npm run keygen (if script added to package.json)
 */

import { randomBytes } from 'crypto';

console.log('\n🔐 Generating Secure API Key...\n');

// Generate 32 random bytes and encode as base64url (URL-safe base64)
const apiKey = randomBytes(32).toString('base64url');

console.log('Generated API Key:');
console.log('─'.repeat(60));
console.log(apiKey);
console.log('─'.repeat(60));

console.log('\n📝 Next Steps:\n');
console.log('1. Copy the API key above');
console.log('2. Add to .env file:');
console.log(`   API_KEY=${apiKey}`);
console.log(`   VITE_API_KEY=${apiKey}`);
console.log('\n3. For Railway deployment:');
console.log(`   railway variables set API_KEY="${apiKey}"`);
console.log(`   railway variables set VITE_API_KEY="${apiKey}"`);
console.log('\n⚠️  SECURITY WARNINGS:');
console.log('   • Never commit this key to Git');
console.log('   • Store securely in password manager');
console.log('   • Use different keys for dev/staging/prod');
console.log('   • Rotate keys every 90 days');
console.log('');

// Output in different formats for convenience
console.log('Copy-paste formats:');
console.log('\n.env format:');
console.log(`API_KEY=${apiKey}`);
console.log(`VITE_API_KEY=${apiKey}`);

console.log('\nRailway CLI format:');
console.log(`railway variables set API_KEY="${apiKey}"`);
console.log(`railway variables set VITE_API_KEY="${apiKey}"`);

console.log('\ncURL header format:');
console.log(`-H "x-api-key: ${apiKey}"`);

console.log('\n✅ Done!\n');
