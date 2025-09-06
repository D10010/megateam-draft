# Google Sheets Integration Setup Guide

This guide will help you set up Google Sheets integration for the TRON MEGATEAM signup form.

## Quick Setup (Recommended)

### Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "TRON MEGATEAM Signups" or similar
4. Set up the headers in row 1:

| A | B | C | D | E | F | G | H | I | J | K | L | M |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Timestamp | First Name | Last Name | Email | Telegram | Experience | Skills | Other Skills | Interests | Country | Timezone | Project Ideas | Agreement |

### Step 2: Make Sheet Public (for API Key method)

1. Click "Share" button in top right
2. Click "Change to anyone with the link"
3. Set permission to "Editor" (allows form to write data)
4. Click "Done"
5. Copy the Sheet ID from the URL:
   - URL: `https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit`
   - Sheet ID: `1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms`

### Step 3: Get Google API Key

1. Go to [Google Cloud Console](https://console.developers.google.com/)
2. Create a new project or select existing one
3. Enable "Google Sheets API":
   - Go to "APIs & Services" > "Library"
   - Search for "Google Sheets API"
   - Click "Enable"
4. Create API Key:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "API Key"
   - Copy the generated API key

### Step 4: Configure Environment Variables

#### For Local Development:
1. Open `/home/user/webapp/.dev.vars`
2. Replace the placeholder values:
   ```
   GOOGLE_API_KEY=your-actual-api-key-here
   GOOGLE_SHEETS_ID=your-actual-sheet-id-here
   ```

#### For Production (Cloudflare Pages):
```bash
# Set secrets for production
npx wrangler secret put GOOGLE_API_KEY
npx wrangler secret put GOOGLE_SHEETS_ID
```

When prompted, enter your actual values.

## Advanced Setup (Service Account - More Secure)

### Step 1: Create Service Account

1. Go to [Google Cloud Console](https://console.developers.google.com/)
2. Go to "IAM & Admin" > "Service Accounts"
3. Click "Create Service Account"
4. Fill in details and create
5. Create a JSON key for the service account
6. Download the JSON file

### Step 2: Share Sheet with Service Account

1. Open your Google Sheet
2. Click "Share"
3. Add the service account email (from JSON file)
4. Give "Editor" permission

### Step 3: Configure Service Account Variables

```bash
# For production deployment
npx wrangler secret put GOOGLE_SERVICE_ACCOUNT_EMAIL
npx wrangler secret put GOOGLE_PRIVATE_KEY
npx wrangler secret put GOOGLE_SHEETS_ID
```

## Testing the Integration

1. Start your development server:
   ```bash
   cd /home/user/webapp && npm run build
   cd /home/user/webapp && pm2 start ecosystem.config.cjs
   ```

2. Visit `/signup` page
3. Fill out and submit the form
4. Check your Google Sheet for new row

## Troubleshooting

### Common Issues:

1. **403 Forbidden Error**
   - Check if sheet is publicly editable
   - Verify API key has correct permissions
   - Ensure Google Sheets API is enabled

2. **400 Bad Request**
   - Check Sheet ID is correct
   - Verify range (Sheet1!A:M) exists
   - Check if sheet has headers in row 1

3. **Network Error**
   - Verify internet connection
   - Check if Cloudflare Workers can access external APIs
   - Try from different network

### Environment Variable Check:
```javascript
// Add this to your console to debug
console.log('API Key exists:', !!env?.GOOGLE_API_KEY)
console.log('Sheet ID exists:', !!env?.GOOGLE_SHEETS_ID)
```

## Data Structure

The form submits the following fields to Google Sheets:

- **Timestamp**: Submission date/time (ISO format)
- **Personal Info**: First Name, Last Name, Email, Telegram
- **Skills**: Experience level, selected skills, other skills
- **Interests**: Selected interest areas  
- **Location**: Country, Timezone
- **Project Ideas**: Free text field
- **Agreement**: Yes/No for terms acceptance

## Security Notes

- **API Key Method**: Simple but requires public sheet
- **Service Account**: More secure, private sheet access
- **Rate Limits**: Google Sheets API has usage quotas
- **Data Privacy**: Ensure compliance with privacy regulations