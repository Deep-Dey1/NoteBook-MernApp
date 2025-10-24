# Authentication Setup Guide

## 🔐 Setting Up OAuth Credentials

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Google+ API**
4. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
5. Configure the OAuth consent screen
6. For **Authorized JavaScript origins**, add:
   - `http://localhost:5001` (development)
   - Your production URL
7. For **Authorized redirect URIs**, add:
   - `http://localhost:5001/api/auth/google/callback` (development)
   - `https://yourdomain.com/api/auth/google/callback` (production)
8. Copy the **Client ID** and **Client Secret**
9. Add to `.env`:
   ```
   GOOGLE_CLIENT_ID=your-client-id-here
   GOOGLE_CLIENT_SECRET=your-client-secret-here
   ```

### GitHub OAuth Setup

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click **New OAuth App**
3. Fill in:
   - **Application name**: ThinkBoard
   - **Homepage URL**: `http://localhost:5173` (development)
   - **Authorization callback URL**: `http://localhost:5001/api/auth/github/callback`
4. Click **Register application**
5. Copy the **Client ID**
6. Generate a new **Client Secret**
7. Add to `.env`:
   ```
   GITHUB_CLIENT_ID=your-client-id-here
   GITHUB_CLIENT_SECRET=your-client-secret-here
   ```

### JWT and Session Secrets

Generate strong random strings for production:

```bash
# Generate JWT_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Generate SESSION_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Add to `.env`:
```
JWT_SECRET=your-generated-jwt-secret
SESSION_SECRET=your-generated-session-secret
```

## 🚀 Complete Backend .env File

```env
MONGO_URI=your-mongodb-connection-string

PORT=5001

UPSTASH_REDIS_REST_URL=your-upstash-url
UPSTASH_REDIS_REST_TOKEN=your-upstash-token

NODE_ENV=development

# JWT Secret (generate with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Session Secret
SESSION_SECRET=your-super-secret-session-key-change-this-in-production

# Google OAuth Credentials
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# GitHub OAuth Credentials
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# Client URL for OAuth redirects
CLIENT_URL=http://localhost:5173
```

## 📝 Features Implemented

### Backend
- ✅ User model with email, password, Google ID, GitHub ID
- ✅ JWT-based authentication
- ✅ Email/password registration and login
- ✅ Google OAuth integration
- ✅ GitHub OAuth integration
- ✅ Protected API routes
- ✅ User-specific note filtering
- ✅ Per-user rate limiting

### Frontend
- ✅ Login page with email/password
- ✅ Registration page
- ✅ Google OAuth button
- ✅ GitHub OAuth button
- ✅ Protected routes
- ✅ JWT token management
- ✅ User profile display in Navbar
- ✅ Logout functionality

## 🔒 Security Features

1. **Password Hashing**: Using bcryptjs with salt rounds
2. **JWT Tokens**: 30-day expiration
3. **Protected Routes**: Middleware authentication
4. **User Authorization**: Users can only access their own notes
5. **Rate Limiting**: Per-user rate limiting using Upstash Redis
6. **Secure Sessions**: HttpOnly cookies in production

## 🎯 Usage

### Register a New User
1. Visit `/register`
2. Fill in name, email, and password
3. Or click "Continue with Google/GitHub"

### Login
1. Visit `/login`
2. Enter email and password
3. Or use OAuth buttons

### Notes
- All notes are now private to each user
- Users can only see, create, edit, and delete their own notes
- Rate limiting applies per user (100 requests per minute)

## 🚦 Testing

1. Start backend: `cd backend && npm run dev`
2. Start frontend: `cd frontend && npm run dev`
3. Test registration with email/password
4. Test Google OAuth (requires valid credentials)
5. Test GitHub OAuth (requires valid credentials)
6. Verify note isolation between users
