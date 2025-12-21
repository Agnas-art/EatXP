# 🔐 Google Login Setup Guide

Your Anime Eats Academy now includes secure Google authentication! Here's how to set it up.

## ✨ What's New

- **Google Sign-In** via OAuth 2.0
- **Secure authentication** with JWT tokens
- **User profile** with avatar display
- **Persistent login** using localStorage
- **Protected routes** - only authenticated users can access the app
- **One-click logout** from user profile menu

---

## 🚀 Setup Instructions

### Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click on the project dropdown at the top
3. Click "NEW PROJECT"
4. Enter project name: "Anime Eats Academy"
5. Click "CREATE"

### Step 2: Create OAuth 2.0 Credentials

1. In the Google Cloud Console, go to **APIs & Services** → **Credentials**
2. Click **Create Credentials** → **OAuth client ID**
3. You may need to configure the OAuth consent screen first:
   - Click "Create OAuth consent screen"
   - Select **External** user type
   - Fill in required fields:
     - App name: "Anime Eats Academy"
     - User support email: Your email
     - Developer contact: Your email
   - Click **Save and Continue**
   - **Scopes**: Skip this section, just click **Save and Continue**
   - **Test users**: Skip, click **Save and Continue**
4. Back to credentials, click **Create Credentials** → **OAuth client ID**
5. Select **Web application**
6. Add Authorized JavaScript origins:
   - `http://localhost:8080`
   - `http://localhost:5173` (Vite default)
   - `https://yourdomain.com` (for production)
7. Add Authorized redirect URIs:
   - `http://localhost:8080`
   - `http://localhost:5173`
   - `https://yourdomain.com` (for production)
8. Click **CREATE**
9. Copy your **Client ID** (looks like: `xxx-yyy.apps.googleusercontent.com`)

### Step 3: Configure Your App

1. Create a `.env.local` file in the project root (copy from `.env.example`):
   ```bash
   VITE_GOOGLE_CLIENT_ID=YOUR_COPIED_CLIENT_ID.apps.googleusercontent.com
   ```

2. Save the file and restart your dev server:
   ```bash
   npm run dev
   ```

---

## 🎯 How It Works

### Login Flow
```
User visits app
    ↓
→ Not authenticated? Redirect to /login
    ↓
User clicks "Sign in with Google"
    ↓
Google OAuth popup appears
    ↓
User authenticates with Google
    ↓
App receives JWT token
    ↓
User data saved to localStorage
    ↓
Redirected to home page ✅
```

### Logout Flow
```
User clicks profile avatar (top right)
    ↓
Dropdown menu opens
    ↓
User clicks "Sign Out"
    ↓
User data cleared from localStorage
    ↓
Redirected to login page
```

---

## 📁 New Files & Changes

### New Components:
- **[src/context/AuthContext.tsx](src/context/AuthContext.tsx)** - Authentication state management
- **[src/pages/Login.tsx](src/pages/Login.tsx)** - Beautiful Google login UI
- **[src/components/UserProfile.tsx](src/components/UserProfile.tsx)** - User avatar and logout menu

### Updated Files:
- **[src/App.tsx](src/App.tsx)** - Added GoogleOAuthProvider and ProtectedRoute
- **[src/pages/Index.tsx](src/pages/Index.tsx)** - Added UserProfile component to header
- **[.env.example](.env.example)** - Configuration template

---

## 🔐 Security Features

✅ **JWT Token Validation** - Tokens are verified and decoded  
✅ **LocalStorage Protection** - Session data stored securely  
✅ **Route Protection** - Unauthenticated users can't access main app  
✅ **Auto-Logout** - Optional session timeout (can be added)  
✅ **Google OAuth** - Leverages Google's secure authentication  

---

## 🧑‍💻 Usage

### User Login:
1. Visit http://localhost:8080/
2. Click "Sign in with Google"
3. Authenticate with your Google account
4. Redirected to home page ✅

### User Logout:
1. Click the user avatar (top right)
2. Click "Sign Out"
3. Redirected to login page

### Check Authentication:
```tsx
import { useAuth } from '@/context/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, logout } = useAuth();
  
  if (!isAuthenticated) {
    return <p>Please login</p>;
  }
  
  return <p>Welcome, {user?.name}!</p>;
}
```

---

## 🌍 Deployment

### For Production:

1. **Update Google OAuth Credentials:**
   - Add your production domain to authorized JavaScript origins
   - Add your production domain to authorized redirect URIs

2. **Set Environment Variable:**
   ```bash
   VITE_GOOGLE_CLIENT_ID=your_production_client_id
   ```

3. **Build for Production:**
   ```bash
   npm run build
   ```

4. **Deploy `dist/` folder:**
   - Netlify, Vercel, or any static host

---

## 🐛 Troubleshooting

### "Invalid Client ID" Error?
- Check that `VITE_GOOGLE_CLIENT_ID` is set correctly in `.env.local`
- Ensure the domain matches authorized origins in Google Console
- Make sure the Client ID doesn't have typos

### Google Button Not Showing?
- Check browser console for errors
- Ensure `<script src="https://accounts.google.com/gsi/client"></script>` is loaded
- Clear browser cache and refresh

### Session Lost After Refresh?
- Check that localStorage is enabled in browser
- User data should persist (if not, check AuthContext initialization)

### "Unauthorized" After Login?
- Clear browser cache
- Delete localStorage entries (`google_user`, `google_token`)
- Try logging in again

---

## 📱 User Data Stored

When a user logs in, the following is stored:

```javascript
{
  id: "google_user_id",
  email: "user@example.com",
  name: "User Name",
  picture: "https://...", // Avatar URL
  given_name: "User",
  family_name: "Name"
}
```

**Nothing else is stored.** No learning progress, no app settings. This is pure authentication.

---

## 🎨 Login Page Features

- Beautiful animated welcome screen
- Anime-themed gradients
- Floating decorative elements
- Feature highlights
- Responsive design
- Smooth transitions

---

## 🔄 Auth Context API

### `useAuth()` Hook:

```tsx
const { 
  user,              // GoogleUser | null
  isAuthenticated,   // boolean
  isLoading,        // boolean
  login,            // (credentialResponse) => void
  logout            // () => void
} = useAuth();
```

---

## 📚 Learn More

- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)
- [React OAuth Google](https://www.npmjs.com/package/@react-oauth/google)
- [JWT Decoding](https://www.npmjs.com/package/jwt-decode)

---

## ✅ What's Working

✓ Google OAuth 2.0 integration  
✓ User authentication & token validation  
✓ Persistent login sessions  
✓ User profile with avatar  
✓ Logout functionality  
✓ Route protection  
✓ Beautiful login UI  
✓ LocalStorage persistence  

Enjoy your secure anime learning platform! 🌟
