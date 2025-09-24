# UnityEats Deployment Setup Guide - Netlify + Render

## 📋 Prerequisites
- GitHub account with your UnityEats repository
- MongoDB Atlas account (free)
- Netlify account (free)
- Render account (free)

---

## 🗄️ Step 1: Set up MongoDB Atlas Database

### 1.1 Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Sign up for a free account
3. Create a new project called "UnityEats"

### 1.2 Create Database Cluster
1. Click "Build a Database"
2. Choose "M0 Sandbox" (FREE tier)
3. Select a cloud provider and region close to your users
4. Create cluster (takes 3-5 minutes)

### 1.3 Configure Database Access
1. Go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Create a user with:
   - Username: `unityeats-user`
   - Password: Generate a strong password (save it!)
   - Database User Privileges: "Read and write to any database"

### 1.4 Configure Network Access
1. Go to "Network Access" in the left sidebar
2. Click "Add IP Address"
3. Choose "Allow Access from Anywhere" (0.0.0.0/0) for development
4. Click "Confirm"

### 1.5 Get Connection String
1. Go to "Database" in the left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string (looks like):
   ```
   mongodb+srv://unityeats-user:<password>@cluster0.xxxxx.mongodb.net/UnityEats?retryWrites=true&w=majority
   ```
5. Replace `<password>` with your actual password

---

## 🖥️ Step 2: Deploy Backend to Render

### 2.1 Connect to Render
1. Go to [Render.com](https://render.com)
2. Sign up with your GitHub account
3. Connect your UnityEats repository

### 2.2 Create Web Service
1. Click "New +" → "Web Service"
2. Connect your repository
3. Configure the service:
   - **Name**: `unityeats-backend`
   - **Environment**: `Node`
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
   - **Plan**: Free

### 2.3 Set Environment Variables
In the Render dashboard, add these environment variables:
```
NODE_ENV=production
PORT=10000
MONGO_URI=mongodb+srv://unityeats-user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/UnityEats?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random
```

### 2.4 Deploy
1. Click "Create Web Service"
2. Render will build and deploy your backend
3. Note the URL (e.g., `https://unityeats-backend.onrender.com`)

---

## 🌐 Step 3: Deploy Frontend to Netlify

### 3.1 Connect to Netlify
1. Go to [Netlify.com](https://netlify.com)
2. Sign up with your GitHub account
3. Click "New site from Git"

### 3.2 Configure Build Settings
1. Connect your UnityEats repository
2. Configure build settings:
   - **Base directory**: `/` (root)
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Node version**: `18`

### 3.3 Set Environment Variables
In Netlify dashboard → Site settings → Environment variables:
```
VITE_API_URL=https://unityeats-backend.onrender.com/api
VITE_APP_NAME=UnityEats
VITE_APP_VERSION=1.0.0
```

### 3.4 Deploy
1. Click "Deploy site"
2. Netlify will build and deploy your frontend
3. You'll get a URL like `https://amazing-name-123456.netlify.app`

---

## 🔧 Step 4: Configure CORS (Important!)

### 4.1 Update Backend CORS Settings
In your `backend/app.js`, make sure CORS is configured for your Netlify domain:

```javascript
const cors = require('cors');

// Configure CORS for production
const corsOptions = {
  origin: [
    'https://your-netlify-url.netlify.app',
    'http://localhost:3000', // For local development
  ],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
```

### 4.2 Redeploy Backend
After updating CORS settings, push to GitHub to trigger automatic redeployment.

---

## ✅ Step 5: Test Your Deployment

### 5.1 Test Backend
Visit: `https://unityeats-backend.onrender.com/api/health`
You should see: `{"status":"ok","message":"UnityEats backend is running."}`

### 5.2 Test Frontend
1. Visit your Netlify URL
2. Try to register a new account
3. Test the food listing functionality

---

## 📊 Step 6: Monitor and Maintain

### 6.1 Render Monitoring
- Check Render dashboard for backend logs
- Monitor resource usage
- Set up alerts if needed

### 6.2 Netlify Monitoring
- Check Netlify dashboard for build logs
- Monitor site analytics
- Set up form notifications if using Netlify Forms

### 6.3 MongoDB Atlas Monitoring
- Monitor database usage in Atlas dashboard
- Set up alerts for storage limits
- Check connection metrics

---

## 🚨 Troubleshooting

### Common Issues:

1. **CORS Errors**: Make sure your backend CORS is configured for your Netlify domain
2. **Environment Variables**: Double-check all environment variables are set correctly
3. **Build Failures**: Check build logs in both Netlify and Render dashboards
4. **Database Connection**: Verify MongoDB Atlas network access and connection string

### Getting Help:
- Render Support: [Render Docs](https://render.com/docs)
- Netlify Support: [Netlify Docs](https://docs.netlify.com)
- MongoDB Atlas: [Atlas Docs](https://docs.atlas.mongodb.com)

---

## 💰 Cost Breakdown

| Service | Free Tier | Paid Plans |
|---------|-----------|------------|
| **Netlify** | 100GB bandwidth, 300 build minutes | $19/month for Pro |
| **Render** | 750 hours/month, 512MB RAM | $7/month per service |
| **MongoDB Atlas** | 512MB storage | $9/month for M10 |

**Total**: $0/month for small projects, ~$35/month for production use.

---

## 🔄 Automatic Deployments

Both platforms support automatic deployments:
- Push to `main` branch → Automatic deployment
- Pull requests → Preview deployments (Netlify)
- Environment variables can be updated in dashboards

---

Your UnityEats app will be live at:
- **Frontend**: `https://your-app.netlify.app`
- **Backend**: `https://your-backend.onrender.com`
- **API**: `https://your-backend.onrender.com/api`
