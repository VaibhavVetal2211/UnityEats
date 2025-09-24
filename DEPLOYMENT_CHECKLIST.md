# ✅ UnityEats Deployment Checklist - Netlify + Render

## 📋 Pre-Deployment Setup

### Environment Files
- [ ] Copy `backend/env.example` to `backend/.env`
- [ ] Copy `env.example` to `.env`
- [ ] Update environment variables with your actual values

### MongoDB Atlas Setup
- [ ] Create MongoDB Atlas account
- [ ] Create M0 Sandbox cluster (free)
- [ ] Create database user with read/write permissions
- [ ] Configure network access (allow all IPs for now)
- [ ] Get connection string
- [ ] Test connection locally

---

## 🚀 Backend Deployment (Render)

### Render Setup
- [ ] Create Render account
- [ ] Connect GitHub repository
- [ ] Create new Web Service
- [ ] Configure build settings:
  - [ ] Build Command: `cd backend && npm install`
  - [ ] Start Command: `cd backend && npm start`
  - [ ] Plan: Free

### Environment Variables (Render Dashboard)
- [ ] `NODE_ENV=production`
- [ ] `PORT=10000`
- [ ] `MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/UnityEats`
- [ ] `JWT_SECRET=your-super-secret-jwt-key-here`

### Deployment
- [ ] Deploy backend to Render
- [ ] Note the backend URL (e.g., `https://unityeats-backend.onrender.com`)
- [ ] Test health endpoint: `https://your-backend-url.onrender.com/api/health`

---

## 🌐 Frontend Deployment (Netlify)

### Netlify Setup
- [ ] Create Netlify account
- [ ] Connect GitHub repository
- [ ] Configure build settings:
  - [ ] Build Command: `npm run build`
  - [ ] Publish Directory: `dist`
  - [ ] Node Version: 18

### Environment Variables (Netlify Dashboard)
- [ ] `VITE_API_URL=https://your-backend-url.onrender.com/api`
- [ ] `VITE_APP_NAME=UnityEats`
- [ ] `VITE_APP_VERSION=1.0.0`

### Deployment
- [ ] Deploy frontend to Netlify
- [ ] Note the frontend URL (e.g., `https://amazing-name-123456.netlify.app`)

---

## 🔧 Post-Deployment Configuration

### CORS Update
- [ ] Update CORS in backend to include your Netlify URL
- [ ] Redeploy backend to Render

### Custom Domain (Optional)
- [ ] Add custom domain in Netlify
- [ ] Configure DNS records
- [ ] Update CORS with custom domain
- [ ] Redeploy backend

---

## ✅ Testing Checklist

### Backend Tests
- [ ] Health check: `GET /api/health`
- [ ] User registration: `POST /api/auth/register`
- [ ] User login: `POST /api/auth/login`
- [ ] Food listing creation: `POST /api/food`
- [ ] File upload: Test image upload functionality

### Frontend Tests
- [ ] Site loads correctly
- [ ] User can register new account
- [ ] User can login
- [ ] Food listings display correctly
- [ ] Search functionality works
- [ ] Image uploads work
- [ ] All navigation links work

### Integration Tests
- [ ] Frontend can communicate with backend
- [ ] User authentication flow works end-to-end
- [ ] Food listing and claiming works
- [ ] File uploads work from frontend to backend
- [ ] All API endpoints respond correctly

---

## 📊 Monitoring Setup

### Render Monitoring
- [ ] Check backend logs regularly
- [ ] Monitor resource usage
- [ ] Set up uptime monitoring

### Netlify Monitoring
- [ ] Check build logs
- [ ] Monitor site analytics
- [ ] Set up form notifications (if using forms)

### MongoDB Atlas Monitoring
- [ ] Monitor database usage
- [ ] Set up storage alerts
- [ ] Check connection metrics

---

## 🔒 Security Checklist

- [ ] All environment variables are set correctly
- [ ] JWT secret is strong and unique
- [ ] MongoDB connection string is secure
- [ ] CORS is properly configured
- [ ] HTTPS is enabled (automatic on both platforms)
- [ ] No sensitive data in code repository

---

## 📱 Performance Optimization

### Frontend
- [ ] Images are optimized
- [ ] Code splitting is working
- [ ] CDN is serving static assets
- [ ] Build size is reasonable

### Backend
- [ ] Database queries are optimized
- [ ] File upload limits are appropriate
- [ ] Error handling is in place
- [ ] Logging is configured

---

## 🎯 Final URLs

After successful deployment, your app will be available at:

- **Frontend**: `https://your-app-name.netlify.app`
- **Backend**: `https://your-backend-name.onrender.com`
- **API**: `https://your-backend-name.onrender.com/api`

---

## 🆘 Troubleshooting

### Common Issues
- **CORS Errors**: Check CORS configuration in backend
- **Build Failures**: Check build logs in both platforms
- **Database Connection**: Verify MongoDB Atlas settings
- **Environment Variables**: Double-check all variables are set

### Getting Help
- Render Support: [render.com/docs](https://render.com/docs)
- Netlify Support: [docs.netlify.com](https://docs.netlify.com)
- MongoDB Atlas: [docs.atlas.mongodb.com](https://docs.atlas.mongodb.com)

---

## 📈 Next Steps

- [ ] Set up custom domain
- [ ] Configure SSL certificates
- [ ] Set up monitoring and alerts
- [ ] Plan for scaling as user base grows
- [ ] Set up backup strategies
- [ ] Document API endpoints
- [ ] Create user documentation

---

**🎉 Congratulations! Your UnityEats app is now live!**
