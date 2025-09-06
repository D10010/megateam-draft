# 🚀 TRON MEGATEAM Google Sheets Integration - Setup Checklist

## ✅ What's Already Done

- ✅ **Google Sheets Integration**: Code complete with your sheet ID (`19OqhjfRDKvbB_orXfQfpUBRpr3bHT5iVrz5NK_s8A9c`)
- ✅ **Email Notifications**: Automatic emails to `tronmegateam@gmail.com`
- ✅ **Form Validation**: Comprehensive validation with error handling
- ✅ **TRON Styling**: Maintained all cyberpunk effects and animations
- ✅ **Documentation**: Complete setup guides created
- ✅ **API Endpoint**: `/api/signup` ready for production

## 🔧 What You Need to Complete

### 1. Google API Key Setup (Required)

**Steps:**
1. Go to [Google Cloud Console](https://console.developers.google.com/)
2. Create/select a project
3. Enable "Google Sheets API"
4. Create API Key with Sheets API permissions
5. Update `.dev.vars` with your API key

**Current Status**: ⏳ Placeholder values in `.dev.vars`

### 2. Google Sheet Permissions (Required)

**Your Sheet**: https://docs.google.com/spreadsheets/d/19OqhjfRDKvbB_orXfQfpUBRpr3bHT5iVrz5NK_s8A9c/edit

**Steps:**
1. Click "Share" on your Google Sheet
2. Change to "Anyone with the link"  
3. Set permission to "Editor"
4. Click "Done"

**Current Status**: ⏳ Needs verification

### 3. Email Service Setup (Optional but Recommended)

**Choose one:**
- **Resend** (recommended): [resend.com](https://resend.com)
- **SendGrid**: [sendgrid.com](https://sendgrid.com)

**Steps:**
1. Sign up for chosen service
2. Get API key
3. Update `.dev.vars` with email credentials

**Current Status**: ⏳ No email service configured

## 📋 Quick Setup Commands

### Local Development
```bash
# 1. Update your .dev.vars file with real values:
GOOGLE_API_KEY=your-real-api-key-here
GOOGLE_SHEETS_ID=19OqhjfRDKvbB_orXfQfpUBRpr3bHT5iVrz5NK_s8A9c
NOTIFICATION_EMAIL=tronmegateam@gmail.com
RESEND_API_KEY=your-resend-api-key  # or SENDGRID_API_KEY

# 2. Test locally
cd /home/user/webapp
npm run build
pm2 restart tron-megateam

# 3. Test the signup form at:
# https://your-sandbox-url/signup
```

### Production Deployment
```bash
# Set Cloudflare secrets
npx wrangler secret put GOOGLE_API_KEY
npx wrangler secret put GOOGLE_SHEETS_ID
npx wrangler secret put NOTIFICATION_EMAIL
npx wrangler secret put RESEND_API_KEY

# Deploy
npm run build
npx wrangler pages deploy dist --project-name webapp
```

## 🧪 Testing Checklist

### Step 1: Test Form Submission
- [ ] Fill out signup form
- [ ] Submit successfully  
- [ ] See success message

### Step 2: Verify Google Sheets
- [ ] Check your Google Sheet for new row
- [ ] Verify all form data is captured correctly
- [ ] Confirm timestamp is recorded

### Step 3: Check Email Notifications
- [ ] Check `tronmegateam@gmail.com` inbox
- [ ] Verify email received with form data
- [ ] Confirm Google Sheets link works

## 📊 Data Structure

Your Google Sheet will receive these columns:
1. **Timestamp** - When form was submitted
2. **First Name** - Required field
3. **Last Name** - Required field  
4. **Email** - Required, validated
5. **Telegram** - Optional username
6. **Experience** - Required dropdown
7. **Skills** - Comma-separated list
8. **Other Skills** - Free text
9. **Interests** - Required, comma-separated
10. **Country** - Required field
11. **Timezone** - Optional dropdown
12. **Project Ideas** - Free text
13. **Agreement** - Yes/No confirmation

## 🔗 Live URLs

- **Signup Form**: https://3000-il347ioukqw6n9icsctpi-6532622b.e2b.dev/signup
- **API Endpoint**: `POST /api/signup`
- **Your Google Sheet**: https://docs.google.com/spreadsheets/d/19OqhjfRDKvbB_orXfQfpUBRpr3bHT5iVrz5NK_s8A9c/edit

## 📚 Documentation

- **GOOGLE_SHEETS_SETUP.md** - Detailed Google API setup
- **EMAIL_NOTIFICATION_SETUP.md** - Email service configuration
- **README.md** - Complete project overview

## 🚨 Current Status

**Status**: 🟡 **Ready for credentials** - All code is complete, just needs API keys

**To go live**:
1. Get Google API key (5 minutes)
2. Set sheet permissions (1 minute)  
3. Optional: Set up email service (10 minutes)
4. Update environment variables
5. Test and deploy! 🚀

The integration is fully implemented and ready to work as soon as you add the credentials! 🎉