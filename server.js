const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security and performance middleware
app.use(helmet());
app.use(compression());
app.use(cors());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname, 'frontend')));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// API Routes
app.use('/api/courses', require('./routes/courses'));
app.use('/api/blogs', require('./routes/blogs'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/search', require('./routes/search'));

// Serve frontend routes
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'about.html'));
});

app.get('/courses', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'courses.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'contact.html'));
});

app.get('/blog', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'blog-list.html'));
});

app.get('/blog/:slug', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'blog-post.html'));
});

// Sitemap and robots.txt
app.get('/sitemap.xml', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'sitemap.xml'));
});

app.get('/robots.txt', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'robots.txt'));
});

// 404 handler
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'frontend', '404.html'));
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Frontend available at http://localhost:${PORT}`);
});
