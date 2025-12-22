#!/usr/bin/env node

import { exec } from "child_process";
import { mkdirSync, existsSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";

const __dirname = new URL(".", import.meta.url).pathname;
const SSL_DIR = join(__dirname, "..", "ssl");

// Create ssl directory if it doesn't exist
if (!existsSync(SSL_DIR)) {
  mkdirSync(SSL_DIR, { recursive: true });
  console.log(`✓ Created ssl directory at ${SSL_DIR}`);
}

const keyPath = join(SSL_DIR, "key.pem");
const certPath = join(SSL_DIR, "cert.pem");

// Check if certificates already exist
if (existsSync(keyPath) && existsSync(certPath)) {
  console.log("✓ SSL certificates already exist");
  process.exit(0);
}

// Generate self-signed certificate
const command = `openssl req -x509 -newkey rsa:2048 -nodes -out "${certPath}" -keyout "${keyPath}" -days 365 -subj "/CN=localhost"`;

console.log("Generating self-signed SSL certificates...");
console.log("This may take a moment...\n");

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error("✗ Error generating SSL certificates:");
    console.error(stderr || error.message);
    console.error("\n📖 Alternative: Use mkcert for trusted certificates");
    console.error("   1. Install mkcert: https://github.com/FiloSottile/mkcert#installation");
    console.error("   2. Run: mkcert -install");
    console.error("   3. Run: mkcert -key-file ssl/key.pem -cert-file ssl/cert.pem localhost");
    process.exit(1);
  }

  console.log("✓ Self-signed SSL certificates generated successfully!");
  console.log(`  Key: ${keyPath}`);
  console.log(`  Cert: ${certPath}`);
  console.log("\n📝 Note: Your browser may show a security warning.");
  console.log("   To avoid this, install mkcert and generate trusted certificates.\n");
});
