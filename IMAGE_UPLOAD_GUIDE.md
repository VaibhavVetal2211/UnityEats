# 📸 UnityEats Image Upload System Guide

## 🔄 **How JPG Files Get Uploaded**

### **Step-by-Step Process:**

1. **User selects image** in Donate form (`src/pages/Donate.tsx`)
2. **FormData is created** with the image file
3. **POST request** sent to `/api/food` endpoint
4. **Multer middleware** processes the file upload
5. **File saved** to `backend/uploads/` directory
6. **Database updated** with image path
7. **Frontend displays** image using the stored path

---

## 📁 **File Storage Structure**

```
UnityEats/
├── backend/
│   ├── uploads/                    # Physical file storage
│   │   ├── 1753297205944-ABC card.jpg
│   │   ├── 1753298471999-profile_photo.png
│   │   └── 1753301859514-body1.jpg
│   ├── routes/food.js              # Upload handling
│   ├── models/FoodListing.js       # Database schema
│   └── app.js                      # Static file serving
└── src/
    ├── pages/Donate.tsx            # Upload form
    └── components/food/FoodImage.tsx # Image display
```

---

## ⚙️ **Technical Implementation**

### **Frontend (React + TypeScript)**
```typescript
// File input field
<Input name="image" type="file" accept="image/*" />

// Form submission with FormData
const formData = new FormData(form);
await fetch("/api/food", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${token}`
  },
  body: formData, // Contains JPG file
});
```

### **Backend (Node.js + Multer)**
```javascript
// Multer configuration
const storage = multer.diskStorage({
  destination: '../uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Route handler
router.post('/', auth, upload.single('image'), async (req, res) => {
  if (req.file) {
    data.image = `/uploads/${req.file.filename}`;
  }
  // Save to MongoDB
});
```

### **Database Storage**
```javascript
// MongoDB schema
const foodListingSchema = new mongoose.Schema({
  title: String,
  image: String, // "/uploads/1753297205944-filename.jpg"
  // ... other fields
});
```

---

## 🌐 **Image Display System**

### **Dynamic URL Construction**
```typescript
const getImageUrl = (img: string) => {
  if (!img) return fallbackImage;
  if (img.startsWith('/uploads')) {
    const apiUrl = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';
    return `${apiUrl}${img}`;
  }
  return img;
};
```

### **Fallback System**
- **Primary**: User uploaded image
- **Fallback**: Unsplash stock image
- **Error handling**: Graceful degradation

---

## 🚀 **Deployment Considerations**

### **✅ What Works Well:**
- ✅ File upload functionality
- ✅ Image processing with Multer
- ✅ Database storage
- ✅ Frontend display
- ✅ Environment-based URLs (fixed)

### **⚠️ Production Challenges:**

#### **1. File Persistence (Render Free Tier)**
- **Issue**: Render free tier has ephemeral file system
- **Problem**: Uploaded images disappear when server restarts
- **Solution**: Use cloud storage (AWS S3, Cloudinary, etc.)

#### **2. File Size Limits**
- **Current**: 10MB limit
- **Render**: 512MB total disk space
- **Recommendation**: Implement image compression

#### **3. CDN & Performance**
- **Issue**: Images served directly from server
- **Solution**: Use CDN for faster loading

---

## 💡 **Recommended Improvements**

### **1. Cloud Storage Integration**
```javascript
// Example: Cloudinary integration
const cloudinary = require('cloudinary').v2;

// Replace multer disk storage with cloudinary
router.post('/', auth, upload.single('image'), async (req, res) => {
  if (req.file) {
    const result = await cloudinary.uploader.upload(req.file.path);
    data.image = result.secure_url; // Store cloud URL
  }
});
```

### **2. Image Optimization**
```javascript
// Resize and compress images
const sharp = require('sharp');

const processImage = async (file) => {
  return await sharp(file.buffer)
    .resize(800, 600)
    .jpeg({ quality: 80 })
    .toBuffer();
};
```

### **3. Multiple Image Support**
```javascript
// Allow multiple images per listing
router.post('/', auth, upload.array('images', 5), async (req, res) => {
  const images = req.files.map(file => `/uploads/${file.filename}`);
  data.images = images;
});
```

---

## 🔧 **Quick Fixes for Current Deployment**

### **1. Update Environment Variables**
```bash
# In Netlify dashboard
VITE_API_URL=https://your-backend-url.onrender.com/api
```

### **2. Test Upload Functionality**
```bash
# Test endpoint
curl -X POST https://your-backend-url.onrender.com/api/food \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "title=Test Food" \
  -F "description=Test Description" \
  -F "image=@test-image.jpg"
```

### **3. Monitor File Storage**
- Check Render dashboard for disk usage
- Monitor `/uploads` directory size
- Set up alerts for storage limits

---

## 📊 **Current File Formats Supported**

| Format | Extension | Status |
|--------|-----------|--------|
| JPEG | .jpg, .jpeg | ✅ Supported |
| PNG | .png | ✅ Supported |
| GIF | .gif | ✅ Supported |
| WebP | .webp | ✅ Supported |
| BMP | .bmp | ✅ Supported |

---

## 🛡️ **Security Considerations**

### **Current Security:**
- ✅ File type validation (`accept="image/*"`)
- ✅ Authentication required
- ✅ File size limits (10MB)
- ✅ Unique filename generation

### **Additional Security (Recommended):**
- 🔄 File content validation (not just extension)
- 🔄 Virus scanning
- 🔄 Rate limiting on uploads
- 🔄 User upload quotas

---

## 📈 **Performance Metrics**

### **Current Performance:**
- **Upload Time**: ~2-5 seconds (depends on file size)
- **Display Time**: ~1-2 seconds (depends on network)
- **Storage**: ~50KB-2MB per image
- **Concurrent Uploads**: Limited by server resources

### **Optimization Opportunities:**
- **Image compression**: Reduce file size by 60-80%
- **CDN**: Reduce load times by 50-70%
- **Lazy loading**: Improve page load times
- **Progressive JPEG**: Better user experience

---

## 🎯 **Next Steps for Production**

1. **Implement cloud storage** (AWS S3, Cloudinary)
2. **Add image optimization** (Sharp, ImageMagick)
3. **Set up CDN** (CloudFront, Cloudflare)
4. **Add file validation** (content-type checking)
5. **Implement user quotas** (prevent abuse)
6. **Add image compression** (reduce bandwidth)
7. **Set up monitoring** (upload success rates)

---

**Your current image upload system works well for development and small-scale production. For larger scale, consider implementing cloud storage and image optimization.**
