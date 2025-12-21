# Anime Eats Academy - Testing Guide

## System Status ✅

The application has been successfully updated with a new **Email/OTP authentication system** that replaces the previous Google OAuth implementation.

### What Changed:
- ✅ Removed Google OAuth dependency
- ✅ Added custom email/password registration
- ✅ Implemented 6-digit OTP verification (5-minute expiry)
- ✅ All data stored client-side in localStorage
- ✅ No external API keys required

---

## Quick Start

### 1. Start the Application
```bash
cd c:\Users\sds29\Downloads\anime-eats-academy-main
npm run dev
```
Application runs at: **http://localhost:8080**

### 2. Build for Production
```bash
npm run build
```
Output: `dist/` folder

### 3. Production Preview
```bash
npm run preview
```

---

## Testing Workflows

### Scenario 1: New User Registration

**Path**: `/register`

1. Click "Create Account" button (if not already on /register)
2. Fill in the form:
   - **Email**: `test@example.com` (use any valid email)
   - **Name**: `Anime Fan`
   - **Password**: `password123` (minimum 6 characters)
   - **Confirm Password**: `password123`
3. Click "Create Account"
4. You should see success message and be redirected to `/login`
5. Email should be pre-filled in login form

**Expected Result**: ✅ Account created, ready for login

---

### Scenario 2: User Login with OTP

**Path**: `/login`

#### Step 1: Email Entry
1. Enter your registered email: `test@example.com`
2. Click "Send OTP" button
3. Check browser console (DevTools - Press F12) for the OTP
   - Look for message: `📧 OTP for test@example.com: 123456`
4. You should see "OTP sent successfully!" message

#### Step 2: OTP Verification
1. Copy the 6-digit OTP from console
2. Paste it in the "Enter OTP" field
3. Watch the countdown timer (5 minutes = 300 seconds)
4. Click "Verify OTP"
5. On success, you'll be redirected to the home page

**Expected Result**: ✅ Logged in successfully, redirected to home page

---

### Scenario 3: Session Persistence

1. After successful login, refresh the page (F5)
2. You should remain logged in
3. Check `localStorage` in DevTools:
   - Open DevTools > Application > LocalStorage
   - Look for `auth_user` key
   - Should contain your user data

**Expected Result**: ✅ Session persists after page refresh

---

### Scenario 4: Logout

1. Click the user avatar in the top-right corner
2. Select "Sign Out"
3. You should be redirected to `/login`
4. Check `localStorage` - `auth_user` should be gone

**Expected Result**: ✅ Successfully logged out, session cleared

---

### Scenario 5: Error Handling

#### Registration Errors:
- **Invalid email**: Try "notanemail"
  - Expected: "Please enter a valid email address"
- **Short password**: Enter "abc"
  - Expected: "Password must be at least 6 characters long"
- **Mismatched passwords**: Enter different passwords
  - Expected: "Passwords do not match"
- **Duplicate email**: Register twice with same email
  - Expected: "Registration failed. This email might already be registered"

#### Login Errors:
- **Non-existent email**: Enter unregistered email
  - Expected: "Email not registered. Please register first"
- **Wrong OTP**: Enter incorrect 6-digit code
  - Expected: "Invalid OTP. Please try again"
- **Expired OTP**: Wait 5+ minutes, then submit OTP
  - Expected: "OTP has expired. Please request a new OTP"

**Expected Result**: ✅ All error messages display correctly

---

## Browser DevTools Inspection

### localStorage Keys

Open DevTools (F12) → Application → LocalStorage → http://localhost:8080

**Key 1: `registered_users`**
```json
{
  "test@example.com": {
    "email": "test@example.com",
    "name": "Anime Fan",
    "password": "password123"
  }
}
```

**Key 2: `auth_user` (appears after login)**
```json
{
  "id": "abc123def456",
  "email": "test@example.com",
  "name": "Anime Fan"
}
```

### Console Messages (F12 → Console)

During login:
```
📧 OTP for test@example.com: 123456
⏱️ Valid for 5 minutes
```

---

## Features to Test

### 1. Anime Theme System
- Click the anime theme selector (looks like a palette)
- Switch between 8 different anime themes:
  - Naruto, Demon Slayer, My Hero Academia, Attack on Titan
  - Jujutsu Kaisen, Dragon Ball, One Piece, Tokyo Ghoul
- Theme should persist after page refresh

### 2. Voice Recognition
- Click the microphone icon (if visible on page)
- Speak to the microphone
- Your speech should be converted to text
- Works in supported browsers (Chrome, Edge recommended)

### 3. User Profile Avatar
- After login, check the avatar in top-right corner
- Should show user's initials (e.g., "AF" for "Anime Fan")
- Click to see dropdown menu with profile and logout options

### 4. Protected Routes
- Try to access `/` (home page) without logging in
- You should be redirected to `/login`
- After login, you can access all protected routes

### 5. Navigation
- Bottom navigation for different app sections
- All features should work with new auth system

---

## Troubleshooting

### Issue: "Cannot find OTP in console"
**Solution**:
- Make sure DevTools is open (F12)
- Console tab should be selected
- OTP is only logged during `sendOTP()` call
- Message format: `📧 OTP for [email]: [6-digit code]`

### Issue: "OTP expired too quickly"
**Solution**:
- OTP valid for exactly 5 minutes (300 seconds)
- Timer counts down from 300 to 0
- Request new OTP if expired

### Issue: "Login not working"
**Solution**:
- Clear localStorage: DevTools > Application > Storage > Clear Site Data
- Register again with new email
- Make sure email is spelled correctly

### Issue: "Theme not changing"
**Solution**:
- Refresh page
- Check localStorage for `theme_preference` key
- Open DevTools console for any errors

### Issue: "App not loading"
**Solution**:
- Check http://localhost:8080 in browser
- Run `npm run dev` to start dev server
- Check for errors in DevTools console (F12)
- Try `npm install` to ensure all dependencies are installed

---

## File Structure (Key Files)

```
src/
├── context/AuthContext.tsx       # Email/OTP authentication logic
├── pages/
│   ├── Login.tsx                # 2-step login form
│   ├── Register.tsx             # Registration form  
│   ├── Index.tsx                # Protected home page
│   └── NotFound.tsx             # 404 page
├── components/
│   ├── UserProfile.tsx          # User avatar & dropdown
│   ├── AnimeThemeSelector.tsx   # Theme picker
│   ├── VoiceControlButton.tsx   # Voice recognition
│   └── ... (other components)
├── App.tsx                      # Routes & providers
├── main.tsx                     # Entry point
└── index.css                    # Global styles & theme variables
```

---

## Performance Notes

### Build Size:
- **Development**: Full features, sourcemaps
- **Production**: Minified, ~534 KB bundle
- **Note**: Chunk size warnings are expected for this feature-rich app

### Loading Time:
- Initial load: ~1-2 seconds
- After cached: <500ms
- Dev server refresh: ~300ms with Hot Module Reload

---

## Security Reminder

⚠️ **This is a demonstration implementation** suitable for:
- ✅ Learning and development
- ✅ Prototyping
- ✅ MVP demonstration
- ✅ Local testing

⚠️ **NOT suitable for production** without:
- ❌ Proper backend authentication server
- ❌ Secure password hashing (bcrypt/Argon2)
- ❌ Real email service for OTP delivery
- ❌ HTTPS with secure cookies
- ❌ Rate limiting and brute-force protection

For production, implement:
1. Backend with Node.js/Django/Spring
2. Proper password hashing
3. Email service integration (SendGrid, AWS SES)
4. JWT or session-based authentication
5. Rate limiting and security headers

---

## Next Steps

### To Deploy:
1. Build: `npm run build`
2. Upload `dist/` folder to hosting (Vercel, Netlify, etc.)
3. Set environment variables on hosting platform
4. Test login flow on live site

### To Extend:
1. Add password reset functionality
2. Implement email confirmation
3. Add 2FA (two-factor authentication)
4. Create admin dashboard
5. Add activity logging
6. Implement OAuth (Google/GitHub) for optional sign-in

### To Transition to Production:
1. Set up backend server
2. Implement proper authentication
3. Move user data to database
4. Add encryption and security headers
5. Implement rate limiting
6. Add audit logging

---

## Support

For issues or questions:
1. Check browser console (F12 → Console tab)
2. Inspect localStorage (F12 → Application tab)
3. Review [EMAIL_OTP_AUTH_SETUP.md](./EMAIL_OTP_AUTH_SETUP.md)
4. Review [FEATURE_OVERVIEW.md](./FEATURE_OVERVIEW.md)

---

## Quick Command Reference

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Format code
npm run format

# Run type checking
npm run typecheck
```

---

✨ **Anime Eats Academy** - Custom Email/OTP Authentication System Ready to Use!
