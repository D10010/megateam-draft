# 🌐 Squarespace Domain Setup: www.megateam.network

## 🎯 **Goal**
Configure your Squarespace-hosted domain `megateam.network` to point `www.megateam.network` to your TRON MEGATEAM website.

## 📋 **Overview**
- **Current Website**: https://tron-megateam.pages.dev ✅ Working
- **Target Domain**: www.megateam.network
- **DNS Provider**: Squarespace
- **Setup Time**: 5-10 minutes + 15-60 minutes propagation

## 🚀 **Complete Setup Guide**

### **Step 1: Add Domain to Cloudflare Pages** ⏰ *3 minutes*

1. **Go to Cloudflare Dashboard**: [dash.cloudflare.com](https://dash.cloudflare.com)
2. **Navigate to Pages**: Click "Pages" in left sidebar
3. **Select Project**: Click "tron-megateam"
4. **Custom Domains**: Click "Custom domains" tab
5. **Add Domain**: Click "Set up a custom domain"
6. **Enter**: `www.megateam.network`
7. **Continue**: Cloudflare will show DNS instructions

### **Step 2: Configure Squarespace DNS** ⏰ *5 minutes*

#### **Access Squarespace DNS Settings:**
1. **Login to Squarespace**: [squarespace.com](https://squarespace.com)
2. **Go to Domains**: Home menu → Settings → Domains
3. **Select Domain**: Click on `megateam.network`
4. **DNS Settings**: Click "DNS Settings" or "Advanced DNS"

#### **Add CNAME Record:**
1. **Find DNS Records Section**: Look for "Custom Records" or "DNS Records"
2. **Add New Record**: Click "Add Record" or "+"
3. **Configure CNAME**:
   ```
   Type: CNAME
   Host: www
   Points To: tron-megateam.pages.dev
   TTL: Auto (or 3600 seconds)
   ```
4. **Save**: Click "Save" or "Apply Changes"

### **Step 3: Squarespace-Specific Settings** ⏰ *2 minutes*

#### **Important Squarespace Considerations:**
1. **Remove Existing www Record**: If there's already a `www` record pointing to Squarespace, delete it
2. **Keep Root Domain**: Leave the root `@` or `megateam.network` record as-is (if you want to keep any Squarespace site there)
3. **SSL Settings**: No changes needed - Cloudflare handles SSL automatically

#### **Typical Squarespace DNS Layout After Setup:**
```
Type    Host    Points To                    Purpose
CNAME   www     tron-megateam.pages.dev     → Your TRON MEGATEAM site
A       @       198.185.159.144             → Squarespace (if keeping root)
A       @       198.185.159.145             → Squarespace (if keeping root)
```

## 📱 **Squarespace Interface Screenshots Guide**

### **Finding DNS Settings in Squarespace:**

1. **Main Menu Path**: 
   - Settings → Domains → [Your Domain] → DNS Settings

2. **Alternative Path**:
   - Domains → [Your Domain] → Advanced → DNS

3. **What to Look For**:
   - "Custom Records"
   - "DNS Records"  
   - "Advanced DNS"
   - "CNAME Records"

### **Adding the CNAME Record**:

**In Squarespace DNS Interface:**
- **Record Type**: Select "CNAME"
- **Host/Name**: Enter `www`
- **Target/Points To**: Enter `tron-megateam.pages.dev`
- **TTL**: Leave as default or set to 3600

## ⚠️ **Important Squarespace Notes**

### **DNS Propagation Time:**
- **Squarespace**: Usually 15-60 minutes
- **Global Propagation**: Up to 24 hours (typically much faster)

### **Existing Website Considerations:**
- **Root Domain** (`megateam.network`): Can keep pointing to Squarespace if you have content there
- **WWW Subdomain** (`www.megateam.network`): Will point to your TRON MEGATEAM site
- **Email**: Won't be affected if using Squarespace email or external email

### **SSL Certificate:**
- ✅ **Cloudflare Auto-SSL**: Automatically provisions HTTPS for your custom domain
- ✅ **No Squarespace SSL Needed**: Cloudflare handles all SSL/TLS

## 🕐 **Timeline & Testing**

### **Expected Timeline:**
1. **DNS Configuration**: 5 minutes
2. **Initial Propagation**: 15-60 minutes  
3. **SSL Certificate**: 5-15 minutes after DNS
4. **Full Global Propagation**: Up to 24 hours

### **Testing Your Setup:**

#### **Immediate Tests (after 15-30 minutes):**
```bash
# Check if DNS record exists
nslookup www.megateam.network

# Check CNAME specifically  
dig www.megateam.network CNAME
```

#### **Browser Tests:**
1. **Visit**: https://www.megateam.network
2. **Check SSL**: Look for lock icon in browser
3. **Verify Content**: Should show your TRON MEGATEAM site
4. **Test Mobile**: Check responsive design works

## 🔍 **Troubleshooting**

### **Common Issues:**

#### **"Site Not Found" / DNS_PROBE_FINISHED_NXDOMAIN**
- ✅ **Wait Longer**: DNS can take up to 24 hours
- ✅ **Check CNAME**: Verify it points to `tron-megateam.pages.dev`
- ✅ **Clear DNS Cache**: `ipconfig /flushdns` (Windows) or restart router

#### **"SSL Certificate Error"**
- ✅ **Wait 10-15 minutes**: SSL takes time to provision
- ✅ **Try HTTPS**: Make sure you're using `https://www.megateam.network`
- ✅ **Check Cloudflare**: Verify domain was added to Pages project

#### **"Still Shows Squarespace Site"**
- ✅ **Check DNS Propagation**: Use [whatsmydns.net](https://whatsmydns.net)
- ✅ **Clear Browser Cache**: Hard refresh (Ctrl+F5)
- ✅ **Wait for Propagation**: Can take several hours

### **Verification Tools:**
- **DNS Propagation**: [whatsmydns.net](https://whatsmydns.net)
- **SSL Check**: [ssllabs.com/ssltest](https://www.ssllabs.com/ssltest/)
- **Domain Health**: [mxtoolbox.com](https://mxtoolbox.com)

## 📊 **Final URL Structure**

### **After Complete Setup:**
- **Primary Site**: https://www.megateam.network ← **Your TRON MEGATEAM site**
- **Backup URL**: https://tron-megateam.pages.dev ← **Still works**
- **Root Domain**: https://megateam.network ← **Can stay with Squarespace or redirect**

### **Professional Setup Option:**
You can also set up the root domain to redirect to www:
1. Add another CNAME: `@ → www.megateam.network`
2. Or keep root domain for other content (Squarespace site, landing page, etc.)

## ✅ **Success Checklist**

After setup, verify these work:
- [ ] https://www.megateam.network loads your TRON MEGATEAM site
- [ ] SSL certificate shows as valid (lock icon)
- [ ] "Join MEGATEAM" buttons work (open Google Form)
- [ ] Mobile responsive design works
- [ ] Page loads fast globally

## 🎯 **Ready to Setup?**

### **What You Need to Do:**
1. **Add Domain to Cloudflare Pages** (Step 1 above)
2. **Configure Squarespace DNS** (Step 2 above) 
3. **Wait for propagation** (15-60 minutes)
4. **Test your new domain**

### **Need Help?**
Once you've started the setup, let me know if you:
- Can't find the DNS settings in Squarespace
- Need help with any specific step
- Want me to check if the DNS is working

**Your TRON MEGATEAM website will be live at www.megateam.network within an hour!** 🚀

## 🔗 **Quick Reference**

**CNAME Record to Add in Squarespace:**
```
Type: CNAME
Host: www
Target: tron-megateam.pages.dev
```

**Final Result:** 
`www.megateam.network` → Your professional TRON MEGATEAM website! 🎉