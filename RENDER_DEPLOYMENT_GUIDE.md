# UnityEats Frontend Deployment to Render

## Prerequisites
- Your backend is already deployed on Render
- You have access to your Render dashboard
- Your repository is connected to GitHub/GitLab

## Step-by-Step Deployment Guide

### 1. Get Your Backend URL
First, you need to get your backend URL from Render:
1. Go to your Render dashboard
2. Find your backend service (unityeats-backend)
3. Copy the service URL (it should look like: `https://unityeats-backend-xxxxx.onrender.com`)

### 2. Update render.yaml
The render.yaml file has been updated with the frontend service configuration. Make sure to update the backend URL in the environment variables:

```yaml
envVars:
  - key: VITE_API_URL
    value: https://your-actual-backend-url.onrender.com/api
```

### 3. Deploy to Render

#### Option A: Using Render Dashboard (Recommended)
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "Static Site"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `unityeats-frontend`
   - **Branch**: `main` (or your default branch)
   - **Root Directory**: Leave empty (it will use the root)
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
   - **Environment Variables**:
     - `VITE_API_URL`: `https://your-backend-url.onrender.com/api`

#### Option B: Using render.yaml (Blueprints)
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "Blueprint"
3. Connect your GitHub repository
4. Render will automatically detect the render.yaml file
5. Review the configuration and deploy

### 4. Environment Variables Setup
In your Render dashboard, make sure to set these environment variables for your frontend service:

- `VITE_API_URL`: Your backend API URL (e.g., `https://unityeats-backend-xxxxx.onrender.com/api`)

### 5. CORS Configuration
Make sure your backend has CORS configured to allow your frontend domain. In your backend's app.js, ensure you have:

```javascript
app.use(cors({
  origin: [
    'https://your-frontend-url.onrender.com',
    'http://localhost:3000', // for local development
    'http://localhost:8080'  // for local development
  ],
  credentials: true
}));
```

### 6. Testing the Deployment
1. Once deployed, visit your frontend URL
2. Test the following features:
   - User registration/login
   - Food listing creation
   - Food browsing
   - API connectivity

### 7. Custom Domain (Optional)
If you want to use a custom domain:
1. In your Render dashboard, go to your frontend service
2. Click on "Settings" → "Custom Domains"
3. Add your domain and follow the DNS configuration instructions

## Troubleshooting

### Common Issues:

1. **Build Failures**:
   - Check the build logs in Render dashboard
   - Ensure all dependencies are in package.json
   - Verify Node.js version compatibility

2. **API Connection Issues**:
   - Verify the VITE_API_URL environment variable
   - Check CORS configuration in backend
   - Ensure backend is running and accessible

3. **Static File Issues**:
   - Verify the publish directory is set to `dist`
   - Check that the build command generates the dist folder

4. **Environment Variables**:
   - Make sure VITE_API_URL is set correctly
   - Variables starting with VITE_ are available in the frontend

## Monitoring and Maintenance

1. **Logs**: Check the service logs in Render dashboard for any issues
2. **Performance**: Monitor the service performance and upgrade plan if needed
3. **Updates**: Push changes to your repository to trigger automatic deployments

## Cost Considerations

- **Free Tier**: Includes 750 hours/month, auto-sleep after 15 minutes of inactivity
- **Starter Plan**: $7/month for always-on service
- **Professional Plan**: $25/month for better performance and features

## Security Notes

1. Never commit sensitive environment variables to your repository
2. Use Render's environment variable system for sensitive data
3. Keep your dependencies updated for security patches
4. Use HTTPS for all communications

## Next Steps

After successful deployment:
1. Test all functionality thoroughly
2. Set up monitoring and alerts
3. Consider setting up a staging environment
4. Plan for CI/CD improvements
