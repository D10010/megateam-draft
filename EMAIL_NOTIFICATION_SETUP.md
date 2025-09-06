# Email Notification Setup Guide

This guide shows you how to set up email notifications for TRON MEGATEAM form submissions.

## Overview

When someone submits the signup form, the system will:
1. ✅ Save data to Google Sheets
2. ✅ Send notification email to `tronmegateam@gmail.com`

## Email Service Options

### Option 1: Resend (Recommended for Cloudflare Workers)

**Why Resend?**
- Built for serverless environments
- Simple API
- Good free tier (3,000 emails/month)
- Excellent deliverability

**Setup Steps:**
1. **Sign up**: Go to [resend.com](https://resend.com)
2. **Verify domain** (optional but recommended):
   - Add your domain in Resend dashboard
   - Add DNS records as instructed
   - Or use `onboarding@resend.dev` for testing
3. **Create API key**:
   - Go to API Keys section
   - Create new API key with "Sending access"
   - Copy the key (starts with `re_`)

**Environment Variables:**
```bash
# Add to .dev.vars for local development
RESEND_API_KEY=re_your_actual_api_key_here

# For production deployment
npx wrangler secret put RESEND_API_KEY
```

### Option 2: SendGrid

**Setup Steps:**
1. **Sign up**: Go to [sendgrid.com](https://sendgrid.com)
2. **Verify sender identity**:
   - Single Sender Verification (easiest)
   - Or Domain Authentication (more professional)
3. **Create API key**:
   - Go to Settings > API Keys
   - Create API key with "Mail Send" permissions
   - Copy the key (starts with `SG.`)

**Environment Variables:**
```bash
# Add to .dev.vars for local development
SENDGRID_API_KEY=SG.your_actual_api_key_here

# For production deployment  
npx wrangler secret put SENDGRID_API_KEY
```

### Option 3: Gmail SMTP (Not recommended for production)

Gmail SMTP requires more complex setup and may have deliverability issues in serverless environments.

## Email Template

The notification email includes:

### 📧 Subject: 🚀 New TRON MEGATEAM Signup!

### 📋 Content:
- **Personal Information**: Name, email, telegram, country, timezone
- **Development Profile**: Experience level, skills, interests  
- **Project Ideas**: User's submitted project goals
- **Agreement Status**: Terms acceptance confirmation
- **Direct Link**: Link to view full details in Google Sheet
- **Timestamp**: When the submission was received

## Configuration Steps

### 1. Choose Email Service
Pick Resend (recommended) or SendGrid and complete their setup.

### 2. Update Environment Variables

**Local Development** (`.dev.vars`):
```bash
# Email notification settings
NOTIFICATION_EMAIL=tronmegateam@gmail.com
RESEND_API_KEY=re_your_actual_key_here
# OR
SENDGRID_API_KEY=SG.your_actual_key_here
```

**Production Deployment**:
```bash
# Set production secrets
npx wrangler secret put NOTIFICATION_EMAIL
npx wrangler secret put RESEND_API_KEY
# OR
npx wrangler secret put SENDGRID_API_KEY
```

### 3. Test Email Notifications

1. **Start development server**:
   ```bash
   npm run build
   pm2 restart tron-megateam
   ```

2. **Submit test form** via the signup page
3. **Check email** at `tronmegateam@gmail.com`
4. **Verify Google Sheet** receives the data

## Email Customization

### Modify Email Content
Edit the `generateEmailContent()` function in `src/index.tsx`:

```typescript
function generateEmailContent(formData: any) {
  // Customize the HTML content here
  return `
    <h2>Your Custom Subject</h2>
    <!-- Your custom email template -->
  `
}
```

### Change Sender Information
Update the sender details in the email service functions:

```typescript
// Resend
from: 'TRON MEGATEAM <noreply@yourdomain.com>',

// SendGrid  
from: { 
  email: 'noreply@yourdomain.com',
  name: 'TRON MEGATEAM'
}
```

## Troubleshooting

### Common Issues

1. **Email Not Sending**
   - Check API key is correct
   - Verify environment variables are loaded
   - Check service logs for errors

2. **Emails Going to Spam**
   - Set up domain authentication
   - Use verified sender address
   - Avoid spam trigger words

3. **API Key Errors**
   - Ensure API key has correct permissions
   - Check if key is expired or revoked
   - Verify the key format (Resend: `re_`, SendGrid: `SG.`)

4. **Domain Verification Issues**
   - Complete domain verification in email service dashboard
   - Use verified domain in `from` address
   - Allow 24-48 hours for DNS propagation

### Debug Email Sending

Add logging to check email status:
```typescript
const emailSuccess = await sendNotificationEmail(formData, c.env)
console.log('Email notification sent:', emailSuccess)
```

## Security Notes

- **Never expose API keys** in client-side code
- **Use environment variables** for all sensitive data
- **Rotate API keys** regularly
- **Monitor usage** to prevent quota exhaustion
- **Set up proper SPF/DKIM** records for domain authentication

## Rate Limits

- **Resend**: 3,000 emails/month (free tier)
- **SendGrid**: 100 emails/day (free tier)
- **Consider upgrading** if you expect high signup volume

## Next Steps

1. Choose your email service (Resend recommended)
2. Complete service setup and domain verification
3. Update environment variables with real API keys
4. Test the complete flow (form → sheet → email)
5. Deploy to production with proper secrets management

The email notification system is ready to go once you complete the service setup! 📧✨