# TRON MEGATEAM Landing Page

## Project Overview
- **Name**: TRON MEGATEAM Landing Page
- **Goal**: High-level overview and showcase of the TRON MEGATEAM initiative
- **Features**: Responsive landing page with interactive elements, animated statistics, and comprehensive information about the MEGATEAM program

## Live URLs
- **Development**: https://3000-il347ioukqw6n9icsctpi-6532622b.e2b.dev
- **Production**: TBD (To be deployed to Cloudflare Pages)

## 🚀 **NEW: Authentic TRON Color Scheme!**
The landing page now uses the official TRON color palette while maintaining its futuristic cyberpunk aesthetic!

## Key Features

### ✅ Currently Implemented

#### **🌟 Core Sections**
1. **Hero Section** - Cyberpunk-styled introduction with holographic effects and neon animations
2. **Mission Statement** - Futuristic design with glowing text effects and cyber cards
3. **Statistics Dashboard** - Animated counters with neon glow effects and cyber styling
4. **Core Narrative** - Enhanced with gradient text and holographic overlays
5. **Year-1 Objectives** - Cyber-themed cards with interactive hover effects
6. **Governance Structure** - 3D visual elements and animated borders
7. **Platform Features** - Neon-outlined feature cards with glow effects
8. **Launch Roadmap** - Visual infographic timeline with alternating desktop layout
9. **Interactive CTAs** - Enhanced buttons with ripple effects and screen flashes
10. **Responsive Design** - Fully optimized for all devices with cyber aesthetics
11. **📝 Signup Form** - Comprehensive registration form with validation
12. **📊 Google Sheets Integration** - Automatic submission recording to spreadsheet

#### **🚀 Futuristic Enhancements with Authentic TRON Colors**
- **Matrix Rain Effect** - Animated background with falling TRON red characters
- **TRON Typography** - Orbitron, Exo 2, and Rajdhani fonts with TRON red glow effects
- **TRON Holographic Elements** - Color-shifting gradients using official TRON palette
- **TRON Grid Background** - Subtle red grid pattern with animated scan lines
- **Glitch Effects** - Button interactions with TRON-themed cyberpunk animations
- **3D Geometric Shapes** - Floating animated borders in TRON red and silver
- **Particle Systems** - Falling data particles in TRON red, light red, and silver
- **Interactive Lighting** - Dynamic TRON red glow effects and transitions
- **TRON Cyber Cards** - Glass-morphism effects with TRON red borders and hover animations
- **Screen Flash Effects** - Brief red flashes on interactions matching TRON branding

### 🚀 Technical Implementation

#### **Core Technologies**
- **Framework**: Hono with JSX renderer for optimal Cloudflare Pages deployment
- **Styling**: Tailwind CSS with extensive custom cyber-punk theming
- **Typography**: Google Fonts (Orbitron, Exo 2, Rajdhani) for futuristic aesthetics
- **Icons**: Font Awesome with custom glow and animation effects
- **Animations**: AOS library + custom CSS keyframes for advanced effects
- **Canvas**: HTML5 Canvas for Matrix rain effect
- **Responsive**: Mobile-first with cyber aesthetics across all breakpoints

#### **🌐 Futuristic Features with TRON Branding**
- **Matrix Rain Canvas** - Real-time animated background with falling TRON red characters
- **Authentic TRON Palette** - Official TRON red (#FF060A), light red (#FF4444), dark red (#CC0408), silver (#C0C0C0), black (#000000)
- **Advanced Animations** - TRON glow pulse, hologram, glitch, 3D rotations, cyber scans
- **Interactive Particles** - Dynamic data streams in TRON colors and floating geometric elements
- **Glass Morphism** - Blurred backgrounds with TRON red borders and gradients
- **Cursor Trail** - Desktop-only glowing TRON red particle trail following mouse movement
- **Screen Effects** - Red flash overlays and scan lines for authentic TRON feel
- **Hover Interactions** - Complex multi-layer animations using TRON color scheme

### 📊 Data Architecture
- **Static Content**: All content directly from TRON MEGATEAM proposal document
- **Form Data**: Google Sheets integration for signup submissions
- **Storage Services**: Google Sheets API for persistent data storage
- **Assets**: Local CSS and JS files served via Hono's static file serving

#### **Google Sheets Integration**
- **Automatic Recording**: All signup form submissions sent to Google Sheets
- **Target Sheet**: https://docs.google.com/spreadsheets/d/19OqhjfRDKvbB_orXfQfpUBRpr3bHT5iVrz5NK_s8A9c/edit
- **Data Fields**: Timestamp, personal info, skills, interests, location, project ideas  
- **Email Notifications**: Automatic notifications to `tronmegateam@gmail.com`
- **API Method**: Google Sheets API with secure authentication
- **Environment Variables**: Configurable for local development and production
- **Setup Guides**: `GOOGLE_SHEETS_SETUP.md` and `EMAIL_NOTIFICATION_SETUP.md`

### 🎨 Design Elements
- **TRON Red (#FF060A)**: Primary brand color for accents and CTAs
- **Dark Theme**: Black background with gray accents for modern blockchain aesthetic
- **Typography**: Clean, bold fonts with proper hierarchy
- **Animations**: Subtle hover effects, fade-ins, and counter animations
- **Icons**: Rocket theme throughout to emphasize "launching" and "building"

## User Guide

### Navigation
- **Fixed Header**: Persistent navigation with smooth scroll to sections
- **Mobile Menu**: Hamburger menu for mobile devices
- **Section Links**: Direct navigation to Mission, Objectives, Structure, and Roadmap

### Interactive Features
- **Animated Statistics**: Counters that animate when scrolled into view
- **Hover Effects**: Buttons and cards respond to user interaction
- **Smooth Scrolling**: Navigation links smoothly scroll to target sections
- **Responsive Design**: Optimized viewing on all device sizes

### Content Sections
1. **Hero**: Main value proposition and primary CTAs
2. **Statistics**: Key numbers from the MEGATEAM proposal
3. **Mission**: Official mission statement and core principles  
4. **Why TRON**: Explanation of TRON's advantages
5. **Objectives**: Year-1 goals with quantifiable targets
6. **Structure**: Governance model overview
7. **Platform**: Feature descriptions for the MEGATEAM portal
8. **Roadmap**: Visual infographic timeline with phase details
9. **CTA**: Final call-to-action for joining
10. **Signup Form** (`/signup`): Comprehensive registration with Google Sheets integration
11. **Footer**: Social links and copyright information

### API Endpoints
- `POST /api/signup` - Form submission endpoint with validation, Google Sheets integration, and email notifications

## Development

### Tech Stack
- **Runtime**: Cloudflare Workers/Pages
- **Framework**: Hono + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + Custom CSS
- **Package Manager**: npm

### Local Development
```bash
npm run dev:sandbox    # Start development server
npm run build         # Build for production  
npm test             # Test local server
npm run clean-port   # Clean port 3000
```

### Project Structure
```
webapp/
├── src/
│   ├── index.tsx      # Main Hono application with landing page + signup + API
│   └── renderer.tsx   # JSX renderer with head configuration
├── public/static/     # Static assets
│   ├── app.js        # Interactive JavaScript + form handling
│   └── style.css     # Custom CSS animations and styling
├── .dev.vars         # Environment variables for local development (gitignored)
├── GOOGLE_SHEETS_SETUP.md # Complete setup guide for Google Sheets integration
├── EMAIL_NOTIFICATION_SETUP.md # Email notification setup guide
├── ecosystem.config.cjs # PM2 configuration for development
├── wrangler.jsonc    # Cloudflare Pages configuration
└── package.json      # Dependencies and scripts
```

## Deployment
- **Platform**: Cloudflare Pages
- **Status**: ✅ Development Ready / ❌ Production Pending
- **Build Output**: Static files in `dist/` directory
- **Last Updated**: 2025-01-09

## Google Sheets Integration Setup

### Quick Setup Steps
1. **✅ Google Sheet**: Already configured - `19OqhjfRDKvbB_orXfQfpUBRpr3bHT5iVrz5NK_s8A9c`
2. **Make Sheet Public** (Editor permission) for API access
3. **Get Google API Key** from Google Cloud Console
4. **Set up Email Service** (Resend or SendGrid) for notifications
5. **Configure Environment Variables**:
   ```bash
   # Local development (.dev.vars) 
   GOOGLE_API_KEY=your-api-key
   GOOGLE_SHEETS_ID=19OqhjfRDKvbB_orXfQfpUBRpr3bHT5iVrz5NK_s8A9c
   NOTIFICATION_EMAIL=tronmegateam@gmail.com
   RESEND_API_KEY=your-resend-key  # or SENDGRID_API_KEY
   
   # Production (Cloudflare secrets)
   npx wrangler secret put GOOGLE_API_KEY
   npx wrangler secret put GOOGLE_SHEETS_ID
   npx wrangler secret put NOTIFICATION_EMAIL  
   npx wrangler secret put RESEND_API_KEY
   ```
6. **See setup guides**: `GOOGLE_SHEETS_SETUP.md` and `EMAIL_NOTIFICATION_SETUP.md`

### Form Data Captured
- Personal information (name, email, telegram)
- Development experience level and skills
- Areas of interest in TRON ecosystem
- Location (country, timezone)  
- Project ideas and goals
- Terms agreement confirmation

### Email Notifications
- **Automatic emails** sent to `tronmegateam@gmail.com` on each submission
- **Rich HTML format** with all form data
- **Direct link** to Google Sheet for full details
- **Service options**: Resend (recommended) or SendGrid

## Next Steps for Production
1. **✅ Google Sheets**: Already configured with your sheet ID
2. **Set up API credentials** (see GOOGLE_SHEETS_SETUP.md)
3. **Configure email notifications** (see EMAIL_NOTIFICATION_SETUP.md)
4. **Deploy to Cloudflare Pages** with environment variables
5. **Test end-to-end**: Form → Sheet → Email notification
6. Set up custom domain (optional)
7. Add analytics tracking
8. Connect to actual MEGATEAM platform when available

## Credits
- **Proposal**: Prepared by Dylan Gillis (SunnyD)
- **Landing Page Development**: AI-powered implementation
- **Content**: Based on official TRON MEGATEAM proposal document
- **Design**: TRON brand-inspired with custom animations and effects