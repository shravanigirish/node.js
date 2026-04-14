# MongoDB Application Deployment Guide

## 🚀 Quick Deployment Options

### Option 1: Vercel (Recommended - Free)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel --prod
```

### Option 2: Heroku (Free Tier)
```bash
# Install Heroku CLI
npm i -g heroku

# Login to Heroku
heroku login

# Create app
heroku create your-app-name

# Deploy
git push heroku main
```

### Option 3: Railway (Free Tier)
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login and deploy
railway login
railway deploy
```

## 📋 Prerequisites

1. **MongoDB Atlas Setup** (Required for production)
   - Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create free cluster
   - Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/dbname`

2. **Update Environment Variables**
   - Replace `MONGODB_URI` in `.env` with your Atlas connection string

## 🔧 Environment Configuration

### Production .env Example:
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/nodejs_seo_website
NODE_ENV=production
```

## 🌐 Deployment Steps

### For Vercel (Easiest):
1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial deployment setup"
   git branch -M main
   git remote add origin https://github.com/yourusername/your-repo.git
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Connect your GitHub repo to [Vercel](https://vercel.com)
   - Vercel will auto-detect Node.js and deploy
   - Add environment variables in Vercel dashboard

### For Heroku:
1. **Create Heroku App**
   ```bash
   heroku create your-nodejs-app
   ```

2. **Set Environment Variables**
   ```bash
   heroku config:set MONGODB_URI="your_mongodb_atlas_string"
   heroku config:set NODE_ENV=production
   ```

3. **Deploy**
   ```bash
   git push heroku main
   ```

## 🐛 Common Issues & Fixes

### Issue: MongoDB Connection Failed
**Fix**: Ensure IP is whitelisted in MongoDB Atlas
- Go to Atlas → Network Access → Add IP (0.0.0.0/0 for all IPs)

### Issue: Port Already in Use
**Fix**: Use environment port
```javascript
const PORT = process.env.PORT || 5000;
```

### Issue: CORS Errors
**Fix**: Your app already has CORS configured
```javascript
app.use(cors({
  origin: ['https://yourdomain.com', 'https://vercel.app']
}));
```

## 📊 Monitoring Your App

### Check Logs:
- **Vercel**: Dashboard → Functions → Logs
- **Heroku**: `heroku logs --tail`
- **Railway**: Dashboard → Logs

### Database Connection:
```javascript
// Add this to server.js for debugging
mongoose.connection.once('open', () => {
  console.log('MongoDB connected successfully');
});
```

## 🎯 Next Steps After Deployment

1. **Test All Endpoints**
   - `GET /` - Homepage
   - `GET /api/courses` - Courses API
   - `GET /api/blogs` - Blogs API

2. **Set Up Custom Domain** (Optional)
   - Vercel: Dashboard → Domains
   - Heroku: `heroku domains:add yourdomain.com`

3. **Enable SSL** (Auto-enabled on most platforms)

## 📱 Testing Your Deployment

```bash
# Test your deployed app
curl https://your-app-url.vercel.app/api/courses
```

## 🆘 Troubleshooting

If your link is not working:
1. Check if server is running: `node server.js`
2. Verify MongoDB connection string
3. Check environment variables in deployment platform
4. Review deployment logs for errors

## 💡 Pro Tips

- Always test locally with production env vars first
- Use MongoDB Atlas for free production database
- Enable auto-deployment from GitHub for updates
- Monitor your app's performance and usage

Need help? Check the logs in your deployment platform dashboard!
