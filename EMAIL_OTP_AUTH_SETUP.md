# Email/OTP Authentication System Documentation

## Overview
The Anime Eats Academy application now features a custom **Email/OTP (One-Time Password)** authentication system that eliminates the need for Google OAuth configuration. This system uses client-side localStorage for user management and OTP verification.

## Features

### 1. **User Registration**
- **Location**: `/register`
- **Fields**:
  - Email address (validated with regex pattern)
  - Full name
  - Password (minimum 6 characters)
  - Confirm password (must match)
- **Validation**:
  - Email format validation
  - Password strength enforcement
  - Duplicate email prevention
  - Password confirmation matching
- **Success**: User redirected to login page with email pre-filled
- **Data Storage**: User credentials stored in localStorage under `registered_users` key

### 2. **Login Flow (2-Step Process)**

#### Step 1: Email Submission
1. User enters their registered email address
2. System validates email format
3. On form submission:
   - Generates a random 6-digit OTP
   - Stores OTP with timestamp in localStorage
   - **Logs OTP to browser console** (for testing purposes)
   - Displays "OTP sent successfully" message
   - Transition to Step 2

#### Step 2: OTP Verification
1. User receives OTP (visible in browser console for testing)
2. User enters 6-digit OTP
3. System verifies:
   - OTP matches stored value
   - OTP has not expired (5-minute window)
4. On success:
   - User session created
   - Stored in `auth_user` localStorage key
   - User redirected to home page

### 3. **OTP Expiration**
- **Duration**: 5 minutes (300 seconds)
- **Timer**: Real-time countdown displayed to user (MM:SS format)
- **Behavior**: If OTP expires, user must request a new one

### 4. **Session Management**
- **Storage**: Auth user data stored in localStorage
- **Persistence**: User remains logged in after page refresh
- **Logout**: `logout()` function removes user session and redirects to login

## Architecture

### File Structure
```
src/
├── context/
│   └── AuthContext.tsx          # Auth state & OTP logic
├── pages/
│   ├── Login.tsx               # 2-step login form
│   ├── Register.tsx            # Registration form
│   └── Index.tsx               # Protected home page
├── components/
│   └── UserProfile.tsx         # User avatar dropdown
└── App.tsx                      # Routes & AuthProvider
```

### Key Components

#### AuthContext.tsx
**Purpose**: Global authentication state and OTP management

**Methods**:
- `register(email, name, password)` - Creates new user
  - Returns: `{ success: boolean, message?: string }`
  - Validation: Checks for duplicate emails, password requirements

- `sendOTP(email)` - Generates and sends OTP
  - Generates 6-digit random number
  - Stores with timestamp (5-minute expiry)
  - **Logs OTP to console for testing**
  - Returns: `{ success: boolean, message?: string }`

- `verifyOTP(email, otp)` - Validates OTP and authenticates user
  - Checks OTP correctness
  - Checks expiration (300 seconds)
  - Creates session on success
  - Returns: `{ success: boolean, message?: string }`

- `logout()` - Clears session and user data

- `setUserAge(age)` - Updates user age preference

**State**:
- `user`: Current logged-in user object
- `isAuthenticated`: Boolean flag
- `isLoading`: Initial auth state check
- `registeredUsers`: Map of user credentials
- `otpStorage`: Map of OTPs with timestamps

#### Login.tsx
**Purpose**: Two-step email/OTP login form

**Features**:
- Step 1: Email input with validation
- Step 2: OTP input (6 digits only) with countdown timer
- Back button to return to email step
- Error and success message displays
- Link to registration page for new users
- Automatic timer display (MM:SS format)

#### Register.tsx
**Purpose**: User registration with validation

**Features**:
- Email validation (regex pattern)
- Name field (required)
- Password field (6+ characters)
- Confirm password field (must match)
- Comprehensive error messages
- Pre-fill email on redirect to login
- Link to login page for existing users

## Testing the System

### 1. **Access the Application**
```
http://localhost:8080
```

### 2. **Register a New Account**
- Navigate to `/register`
- Enter any valid email (e.g., `test@example.com`)
- Enter name and password (6+ characters)
- Click "Create Account"
- Redirected to `/login` with email pre-filled

### 3. **Test Login**
- **Step 1**: Enter registered email
- **Step 2**: 
  - Check browser console (DevTools) for the 6-digit OTP
  - Enter OTP in the form
  - OTP has 5 minutes (300 seconds) to be used
  - Submit to verify

### 4. **Verify Session Persistence**
- After successful login, refresh the page
- User should remain logged in
- Session stored in `auth_user` localStorage key

### 5. **Test Logout**
- Click user avatar in top-right
- Select "Sign Out"
- Redirected to login page
- Session cleared from localStorage

## Data Storage

### localStorage Keys

#### `auth_user`
Contains current authenticated user:
```json
{
  "id": "unique_id_timestamp",
  "email": "user@example.com",
  "name": "User Name",
  "age": "optional_age"
}
```

#### `registered_users`
Contains all registered users (key: email):
```json
{
  "user@example.com": {
    "email": "user@example.com",
    "name": "User Name",
    "password": "hashed_password"
  }
}
```

#### `otp_storage`
Contains current OTP attempts (key: email):
```json
{
  "user@example.com": {
    "otp": "123456",
    "timestamp": 1234567890000
  }
}
```

## Security Notes

⚠️ **Important**: This is a **demonstration/MVP implementation** and should NOT be used in production without significant enhancements:

### Recommendations for Production:
1. **Backend Implementation**:
   - Move all authentication to a secure backend server
   - Use proper hashing (bcrypt) for passwords
   - Implement JWT or session tokens

2. **OTP Delivery**:
   - Send OTP via email using a service like SendGrid
   - Do NOT log OTP to console in production

3. **HTTPS Only**:
   - Enforce HTTPS for all auth traffic
   - Set secure cookie flags

4. **Rate Limiting**:
   - Limit OTP generation attempts
   - Prevent brute force attacks on OTP verification

5. **Password Storage**:
   - Implement proper password hashing (bcrypt, Argon2)
   - Never store plain passwords in localStorage

6. **Session Management**:
   - Use secure, HTTP-only cookies instead of localStorage
   - Implement proper session timeouts

## Configuration

### Environment Variables
Currently, no external API configuration is required. The system runs entirely client-side.

For future production implementation, you would add:
```
VITE_API_URL=https://your-backend-api.com
VITE_EMAIL_SERVICE_API_KEY=your_email_service_key
```

## Troubleshooting

### "Email already registered" Error
- The email exists in `registered_users`
- Use a different email or clear localStorage in DevTools

### OTP Not Received (Testing)
- Check browser console (DevTools)
- OTP is logged there for testing purposes
- Copy the 6-digit number and paste in the form

### OTP Expired
- OTP is valid for 5 minutes
- Watch the countdown timer
- Request a new OTP if expired

### User Not Persisting After Refresh
- Check that `auth_user` exists in localStorage
- If missing, login again
- Check browser localStorage quota

### LoginPage Not Loading
- Verify `/login` route exists in App.tsx
- Ensure Register component is imported

## Related Files

- [ANIME_FEATURES.md](./ANIME_FEATURES.md) - Anime themes and features
- [FEATURE_OVERVIEW.md](./FEATURE_OVERVIEW.md) - General feature overview
- [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) - Quick development reference

## Migration from Google OAuth

This system replaced the previous Google OAuth 2.0 implementation. The main changes:

1. **Removed**:
   - Google OAuth Client ID requirement
   - Google Sign-In button
   - JWT token handling
   - Google profile picture integration

2. **Added**:
   - Email/password registration
   - Custom OTP generation and verification
   - 5-minute OTP expiration logic
   - User avatar based on name initials

## Future Enhancements

- [ ] Email confirmation before account activation
- [ ] Password reset via email
- [ ] Two-factor authentication (2FA)
- [ ] Remember me functionality
- [ ] Account recovery options
- [ ] Admin user management panel
- [ ] User activity logging
- [ ] Session expiration and refresh tokens

## Support

For issues or questions about the authentication system, refer to:
- Browser Console (F12) for OTP display during testing
- Application Errors section in DevTools
- localStorage inspection in DevTools Application tab
