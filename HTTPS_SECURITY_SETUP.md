# HTTPS Security Setup Guide

## Overview

Your Anime Eats Academy application is now configured for HTTPS (secure communication). This guide covers:
- Local development with HTTPS
- Production deployment
- Mobile device access
- Certificate management

---

## 🔐 Development HTTPS Setup

### Option 1: Quick Start (Vite Auto-generated Certificates)

Run the development server with automatic HTTPS:

```bash
npm run dev:https
```

This uses Vite's built-in HTTPS support with auto-generated certificates.

**⚠️ Browser Warning**: You'll see a security warning since the certificate is self-signed. This is normal for local development.

---

### Option 2: Trusted Certificates with mkcert (Recommended)

For a better development experience without browser warnings:

#### Installation

**Windows:**
```bash
# Using Chocolatey
choco install mkcert

# Or download from: https://github.com/FiloSottile/mkcert/releases
```

**macOS:**
```bash
brew install mkcert
```

**Linux:**
```bash
sudo apt-get install libnss3-tools
# Then download from releases or build from source
```

#### Generate Trusted Certificates

```bash
# Install local CA (one-time setup)
mkcert -install

# Generate certificates for localhost
mkcert -key-file ssl/key.pem -cert-file ssl/cert.pem localhost 127.0.0.1 ::1

# For network access, add your IP address
mkcert -key-file ssl/key.pem -cert-file ssl/cert.pem localhost 127.0.0.1 ::1 192.168.29.225
```

#### Start HTTPS Dev Server

```bash
npm run dev
# Server will use certificates from ssl/key.pem and ssl/cert.pem
```

---

### Option 3: Generate Self-Signed Certificates (Fallback)

If you don't have mkcert installed:

```bash
# Using our script
npm run ssl:generate

# Or manually with OpenSSL
openssl req -x509 -newkey rsa:2048 -nodes -out ssl/cert.pem -keyout ssl/key.pem -days 365 -subj "/CN=localhost"
```

---

## 🌐 Access from Mobile Devices

### HTTPS URL Format

Once HTTPS is running on your dev server:

```
https://192.168.29.225:8080
```

### Mobile Browser Access

1. **Open your mobile browser**
2. **Enter the HTTPS URL**: `https://192.168.29.225:8080`
3. **Accept the certificate warning** (if using self-signed certificates)
   - Tap "Advanced" or "Proceed anyway"
   - This is safe for local development

### Bypass SSL Warning (Testing Only)

If you're testing with self-signed certificates:

**Chrome/Edge**: Click "Advanced" → "Proceed to [IP]"
**Safari (iOS)**: Tap "Details" → "Visit Website"
**Firefox**: Click "Advanced" → "Accept Risk and Continue"

---

## 📦 Production Deployment

### Option 1: Vercel (Recommended)

Vercel provides automatic HTTPS with free certificates:

```bash
npm install -g vercel
vercel
```

### Option 2: AWS/Azure with Let's Encrypt

```bash
# Install Certbot
sudo apt-get install certbot

# Generate free certificate
sudo certbot certonly --standalone -d yourdomain.com
```

### Option 3: Docker with Nginx

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm run build

# Serve with HTTPS
RUN npm install -g serve
EXPOSE 443
CMD ["serve", "-s", "dist", "-l", "443", "--ssl-cert", "/etc/ssl/cert.pem", "--ssl-key", "/etc/ssl/key.pem"]
```

---

## 🚀 Capacitor Mobile App (HTTPS by Default)

Your Capacitor configuration automatically uses HTTPS for the native app:

### Build Android App

```bash
# Sync Capacitor files
npx cap sync

# Open Android Studio
npx cap open android

# Build APK in Android Studio
# - Select "Build" → "Build Bundle(s) / APK(s)" → "Build APK(s)"
```

The native app runs on HTTPS by default through Capacitor's web view.

---

## 🛡️ Security Headers

For production, add security headers to your server:

### Vercel (vercel.json)

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=31536000; includeSubDomains"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        }
      ]
    }
  ]
}
```

### Express Server

```typescript
import express from 'express';
import helmet from 'helmet';

const app = express();
app.use(helmet());
```

---

## 🔍 Verify HTTPS Configuration

### Check if HTTPS is Working

```bash
# From terminal
curl -k https://localhost:8080
curl -k https://192.168.29.225:8080

# From mobile browser - should load without connection errors
# (may show certificate warning, which is normal)
```

### Certificate Information

```bash
# View certificate details
openssl x509 -in ssl/cert.pem -text -noout

# Check expiration
openssl x509 -in ssl/cert.pem -noout -dates
```

---

## 📋 Troubleshooting

### Issue: ERR_CERT_AUTHORITY_INVALID

**Cause**: Using self-signed certificate  
**Solution**: Either:
- Install mkcert and generate trusted certificates
- Accept the security warning in your browser
- This is expected for local development

### Issue: ERR_SSL_VERSION_OR_CIPHER_MISMATCH

**Cause**: SSL/TLS version incompatibility  
**Solution**: 
```bash
# Regenerate certificates
npm run ssl:generate
# Restart dev server
npm run dev
```

### Issue: Cannot Access from Mobile

**Check list:**
- ✅ Mobile on same WiFi network as development computer
- ✅ IP address is correct (192.168.29.225)
- ✅ Port 8080 is accessible (not blocked by firewall)
- ✅ Using HTTPS URL: `https://192.168.29.225:8080`
- ✅ Accepted the certificate warning on mobile browser

**Solution**: 
```bash
# Check if server is running
npm run dev

# Verify network access
curl -k https://192.168.29.225:8080
```

---

## 🔐 Certificate Management

### Auto-renewal (Production)

For Let's Encrypt certificates:

```bash
# Auto-renewal (runs automatically)
sudo certbot renew

# Manual renewal
sudo certbot renew --force-renewal
```

### Update mkcert Certificates

```bash
# Regenerate with new expiration date
rm ssl/key.pem ssl/cert.pem
mkcert -key-file ssl/key.pem -cert-file ssl/cert.pem localhost 127.0.0.1 ::1 192.168.29.225
```

### Ignore SSL (Development Only)

For testing with self-signed certificates:

```bash
# Node/npm
NODE_TLS_REJECT_UNAUTHORIZED=0 npm run dev

# Browser - use HTTPS, accept warning
```

---

## ✅ Security Checklist

- ✅ HTTPS enabled for all connections
- ✅ Certificates generated and configured
- ✅ Mobile device can access via secure HTTPS
- ✅ Security headers configured (production)
- ✅ Certificate expiration monitoring in place
- ✅ Self-signed certificates for dev, valid certs for production

---

## 📚 Resources

- [MDN: HTTPS](https://developer.mozilla.org/en-US/docs/Glossary/https)
- [Vite HTTPS Configuration](https://vitejs.dev/config/server-options.html#server-https)
- [mkcert GitHub](https://github.com/FiloSottile/mkcert)
- [Let's Encrypt](https://letsencrypt.org/)
- [Vercel Deployment](https://vercel.com/docs)

---

## 🚀 Quick Commands

```bash
# Start HTTPS dev server (auto-certificates)
npm run dev:https

# Generate trusted certificates (requires mkcert)
npm run ssl:generate

# Build for production
npm run build

# Test production build locally
npm run preview

# View certificate info
openssl x509 -in ssl/cert.pem -text -noout
```

---

**Next Steps:**
1. Choose your certificate method (mkcert recommended)
2. Run `npm run dev` or `npm run dev:https`
3. Access via `https://192.168.29.225:8080` on mobile
4. Deploy to production with valid certificates

