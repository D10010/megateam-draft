# 🌐 Custom Domain Setup: www.megateam.network

## 🎯 **Goal**
Point your domain `www.megateam.network` to your TRON MEGATEAM website on Cloudflare Pages.

## 📋 **Current Status**
- ✅ **Website Deployed**: https://tron-megateam.pages.dev (working)
- ✅ **Cloudflare Account**: Configured and authenticated
- ⏳ **Custom Domain**: Need to configure `www.megateam.network`

## 🚀 **Setup Steps (5-10 minutes)**

### **Step 1: Add Domain to Cloudflare Pages** ⏰ *2 minutes*

**Via Cloudflare Dashboard (Recommended):**
1. **Go to Cloudflare Dashboard** → [dash.cloudflare.com](https://dash.cloudflare.com)
2. **Navigate to Pages** → Click "Pages" in the left sidebar
3. **Select Your Project** → Click "tron-megateam"
4. **Go to Custom Domains** → Click "Custom domains" tab
5. **Add Domain** → Click "Set up a custom domain"
6. **Enter Domain**: `www.megateam.network`
7. **Click "Continue"** → Cloudflare will provide DNS instructions

### **Step 2: Configure DNS Settings** ⏰ *3-5 minutes*

You have **two options** depending on where your domain is managed:

#### **Option A: Domain Managed by Cloudflare** ✨ **EASIEST**
If `megateam.network` is already in your Cloudflare account:
1. **Go to DNS** → Select `megateam.network` zone
2. **Add CNAME Record**:
   - **Type**: `CNAME`
   - **Name**: `www`
   - **Target**: `tron-megateam.pages.dev`
   - **Proxy Status**: ✅ **Proxied** (orange cloud)
3. **Save** → Domain will work in 1-2 minutes

#### **Option B: External Domain Provider** (GoDaddy, Namecheap, etc.)
If your domain is managed elsewhere:
1. **Login to Your Domain Provider** (GoDaddy, Namecheap, etc.)
2. **Find DNS Management** / **DNS Settings**
3. **Add CNAME Record**:
   - **Type**: `CNAME`
   - **Host/Name**: `www`
   - **Points to/Target**: `tron-megateam.pages.dev`
   - **TTL**: `Auto` or `3600`
4. **Save Changes** → Takes 5-30 minutes to propagate

### **Step 3: SSL Certificate (Automatic)** ⏰ *1-2 minutes*
- ✅ **Cloudflare automatically provisions SSL** for your custom domain
- ✅ **HTTPS will work immediately** once DNS propagates
- ✅ **HTTP automatically redirects to HTTPS**

## 🔍 **DNS Configuration Examples**

### **Cloudflare DNS (Recommended)**
```
Type    Name    Target                      Proxy Status
CNAME   www     tron-megateam.pages.dev     ✅ Proxied
```

### **External Provider DNS**
```
Type    Host    Points To               TTL
CNAME   www     tron-megateam.pages.dev 3600
```

## ⚡ **Quick Setup (If Domain is with Cloudflare)**

If `megateam.network` is already in your Cloudflare account, I can help set this up via command line:

```bash
# Add CNAME record for www subdomain
# (This would require the domain to be in Cloudflare DNS)
```

## 🔄 **Alternative: Root Domain Setup**

If you want **both** `megateam.network` AND `www.megateam.network` to work:

### **DNS Configuration:**
```
Type    Name    Target                      Proxy Status
CNAME   www     tron-megateam.pages.dev     ✅ Proxied  
CNAME   @       tron-megateam.pages.dev     ✅ Proxied
```

### **Pages Configuration:**
1. Add **both domains** in Cloudflare Pages:
   - `www.megateam.network` 
   - `megateam.network`
2. Set primary domain to `www.megateam.network`

## 🧪 **Testing Your Setup**

Once configured, test these URLs:
- **Primary**: https://www.megateam.network
- **Redirect**: https://megateam.network → should redirect to www
- **Original**: https://tron-megateam.pages.dev (still works)

### **Tools to Check DNS:**
```bash
# Check DNS propagation
nslookup www.megateam.network

# Check if CNAME is working  
dig www.megateam.network CNAME
```

## 🕐 **Timeline**

### **If Domain is with Cloudflare:**
- **Setup**: 2-3 minutes
- **Live**: Immediate (1-2 minutes)
- **SSL**: Automatic

### **If Domain is External:**
- **Setup**: 3-5 minutes  
- **Live**: 5-30 minutes (DNS propagation)
- **SSL**: Automatic once DNS propagates

## 🚨 **Common Issues & Solutions**

### **"Domain not found"**
- ✅ **Check DNS propagation**: Use [whatsmydns.net](https://whatsmydns.net)
- ✅ **Verify CNAME target**: Should be `tron-megateam.pages.dev`
- ✅ **Wait for propagation**: Can take up to 24 hours

### **"SSL Certificate Error"**
- ✅ **Wait 5-10 minutes**: SSL certificates take time to provision
- ✅ **Check Cloudflare SSL settings**: Should be "Full" or "Full (Strict)"

### **"Site not loading"**
- ✅ **Verify Pages deployment**: Check https://tron-megateam.pages.dev works
- ✅ **Check DNS records**: Ensure CNAME points to correct target

## 📊 **Current URLs After Setup**

### **Primary (Your Brand):**
- **https://www.megateam.network** ← **Your main URL**

### **Redirects/Alternatives:**
- **https://megateam.network** → redirects to www
- **https://tron-megateam.pages.dev** → still works as backup

## 🎯 **Next Steps**

### **For Immediate Setup:**
1. **Tell me where your domain is managed** (Cloudflare, GoDaddy, Namecheap, etc.)
2. **I'll provide exact steps** for your DNS provider
3. **Test the domain** once DNS propagates

### **For Full Professional Setup:**
- **Add both www and root domain**
- **Configure redirects** (www preferred)
- **Set up Google Analytics** with new domain
- **Update social media links** to new domain

## 🏆 **Benefits of Custom Domain**

✅ **Professional Branding** → `www.megateam.network` instead of `tron-megateam.pages.dev`
✅ **Better SEO** → Your domain gets the SEO value
✅ **Trust & Credibility** → Users trust your own domain
✅ **Marketing** → Easier to share and remember
✅ **Control** → You own the domain forever

**Ready to set this up? Let me know where your domain `megateam.network` is currently managed!** 🚀