const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

// Get all blogs with pagination
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const blogs = await Blog.find({ published: true })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Blog.countDocuments({ published: true });

    res.json({
      blogs,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get featured blogs
router.get('/featured', async (req, res) => {
  try {
    const blogs = await Blog.find({ featured: true, published: true })
      .sort({ views: -1 })
      .limit(5);
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get blog by slug
router.get('/:slug', async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug, published: true })
      .populate('relatedPosts');
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Increment views
    blog.views += 1;
    await blog.save();

    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get related blogs
router.get('/:slug/related', async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug, published: true });
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    const relatedBlogs = await Blog.find({
      _id: { $ne: blog._id },
      published: true,
      $or: [
        { category: blog.category },
        { tags: { $in: blog.tags } }
      ]
    }).limit(5);

    res.json(relatedBlogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new blog (for admin purposes)
router.post('/', async (req, res) => {
  try {
    const blog = new Blog(req.body);
    const savedBlog = await blog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
