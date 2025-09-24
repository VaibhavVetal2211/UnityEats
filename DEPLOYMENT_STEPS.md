# 🚀 UnityEats Deployment Steps - Render + Netlify

## ✅ **Prerequisites Completed:**
- ✅ Cloudinary integration working
- ✅ MongoDB Atlas configured
- ✅ CORS updated for production
- ✅ Environment variables ready

---

## 🖥️ **Step 1: Deploy Backend to Render**

### **1.1 Go to Render.com**
1. Visit [Render.com](https://render.com)
2. Sign up/Login with GitHub
3. Click "New +" → "Web Service"

### **1.2 Connect Repository**
1. Select your UnityEats repository
2. Choose "Deploy from a Git repository"

### **1.3 Configure Service**
```
Name: unityeats-backend
Environment: Node
Region: Oregon (US West) or closest to you
Branch: main
Root Directory: backend
Build Command: npm install
Start Command: npm start
Plan: Free
```

### **1.4 Environment Variables**
Add these in Render dashboard:
```
NODE_ENV=production
PORT=10000
MONGO_URI=mongodb+srv://vaibhavvetal1_db_user:VHjmmzM47z8VoeJN@cluster0.dqpimp7.mongodb.net/UnityEats?retryWrites=true&w=majority
JWT_SECRET=a5800a5d67ba061b6fa040198f6b973fa54608fd9907ff57f6d21988bcaccc56
CLOUDINARY_CLOUD_NAME=dps8wrlhj
CLOUDINARY_API_KEY=666953746275416
CLOUDINARY_API_SECRET=g9pD_hpYEpbWjRNA6NFDgiiZ-E0
```

### **1.5 Deploy**
1. Click "Create Web Service"
2. Wait for deployment (5-10 minutes)
3. Note the URL: `https://unityeats-backend.onrender.com`

---

## 🌐 **Step 2: Deploy Frontend to Netlify**

### **2.1 Go to Netlify.com**
1. Visit [Netlify.com](https://netlify.com)
2. Sign up/Login with GitHub
3. Click "New site from Git"

### **2.2 Connect Repository**
1. Select your UnityEats repository
2. Choose "Deploy from a Git repository"

### **2.3 Build Settings**
```
Base directory: / (root)
Build command: npm run build
Publish directory: dist
Node version: 18
```

### **2.4 Environment Variables**
Add these in Netlify dashboard:
```
VITE_API_URL=https://unityeats-backend.onrender.com/api
VITE_APP_NAME=UnityEats
VITE_APP_VERSION=1.0.0
```

### **2.5 Deploy**
1. Click "Deploy site"
2. Wait for deployment (3-5 minutes)
3. Note the URL: `https://amazing-name-123456.netlify.app`

---

## 🔧 **Step 3: Update CORS (After Backend Deploy)**

### **3.1 Get Your Netlify URL**
After frontend deployment, you'll get a URL like:
`https://amazing-name-123456.netlify.app`

### **3.2 Update Backend CORS**
In your Render dashboard, add this environment variable:
```
FRONTEND_URL=https://your-netlify-url.netlify.app
```

### **3.3 Update CORS Code (if needed)**
If you want to be more specific, update the CORS origins in your code:
```javascript
// Add your specific Netlify URL to allowedOrigins
const allowedOrigins = [
  // ... existing origins
  'https://your-specific-netlify-url.netlify.app'
];
```

---

## ✅ **Step 4: Test Deployment**

### **4.1 Test Backend**
Visit: `https://unityeats-backend.onrender.com/api/health`
Should return: `{"status":"ok","message":"UnityEats backend is running."}`

### **4.2 Test Frontend**
1. Visit your Netlify URL
2. Try to register a new account
3. Test image upload functionality
4. Check if images appear in Cloudinary dashboard

### **4.3 Test Full Flow**
1. Create a food listing with image
2. Verify image uploads to Cloudinary
3. Check if images display correctly
4. Test claiming functionality

---

## 📊 **Step 5: Monitor & Maintain**

### **5.1 Render Monitoring**
- Check Render dashboard for logs
- Monitor resource usage
- Set up alerts if needed

### **5.2 Netlify Monitoring**
- Check build logs
- Monitor site analytics
- Verify deployments are automatic

### **5.3 Cloudinary Monitoring**
- Check media library for uploaded images
- Monitor storage usage
- Verify image optimization is working

---

## 🔗 **Your Deployment URLs**

After successful deployment:
- **Frontend**: `https://your-app-name.netlify.app`
- **Backend**: `https://unityeats-backend.onrender.com`
- **API**: `https://unityeats-backend.onrender.com/api`
- **Health Check**: `https://unityeats-backend.onrender.com/api/health`

---

## 🚨 **Troubleshooting**

### **Common Issues:**

#### **1. Build Failures**
- Check build logs in Render/Netlify dashboards
- Verify all dependencies are in package.json
- Check Node version compatibility

#### **2. Environment Variables**
- Double-check all environment variables are set
- Verify no typos in variable names
- Check that values match your local .env file

#### **3. CORS Errors**
- Verify backend URL is correct in frontend env vars
- Check CORS configuration includes your Netlify URL
- Test with browser developer tools

#### **4. Database Connection**
- Verify MongoDB Atlas network access allows all IPs
- Check connection string format
- Test connection from Render logs

#### **5. Image Upload Issues**
- Verify Cloudinary credentials are correct
- Check file size limits
- Verify CORS allows file uploads

---

## 🎯 **Success Criteria**

✅ **Backend deployed** and health check returns 200  
✅ **Frontend deployed** and loads without errors  
✅ **User registration** works end-to-end  
✅ **Image uploads** work and appear in Cloudinary  
✅ **Food listings** can be created and viewed  
✅ **CORS** allows frontend-backend communication  

---

## 💰 **Cost Breakdown**

| Service | Free Tier | Usage |
|---------|-----------|-------|
| **Render** | 750 hours/month | Backend hosting |
| **Netlify** | 100GB bandwidth/month | Frontend hosting |
| **MongoDB Atlas** | 512MB storage | Database |
| **Cloudinary** | 25GB storage/month | Image storage |

**Total Cost**: $0/month for development and small production use

---

## 🎊 **Next Steps After Deployment**

1. **Set up custom domain** (optional)
2. **Configure SSL certificates** (automatic)
3. **Set up monitoring and alerts**
4. **Plan for scaling** as user base grows
5. **Document API endpoints** for future development

---

**🚀 Your UnityEats app will be live and accessible worldwide!**
