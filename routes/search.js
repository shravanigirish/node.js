const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const Blog = require('../models/Blog');

// Search functionality
router.get('/', async (req, res) => {
  try {
    const { q, type = 'all' } = req.query;
    
    if (!q) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    const searchQuery = q.toLowerCase();
    let results = {};

    // Search courses
    if (type === 'all' || type === 'courses') {
      const courses = await Course.find({
        $or: [
          { title: { $regex: searchQuery, $options: 'i' } },
          { description: { $regex: searchQuery, $options: 'i' } },
          { tags: { $in: [new RegExp(searchQuery, 'i')] } }
        ]
      }).limit(10);
      
      results.courses = courses;
    }

    // Search blogs
    if (type === 'all' || type === 'blogs') {
      const blogs = await Blog.find({
        published: true,
        $text: { $search: q }
      }).sort({ score: { $meta: 'textScore' } }).limit(10);
      
      results.blogs = blogs;
    }

    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Auto-complete suggestions
router.get('/suggestions', async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q || q.length < 2) {
      return res.json([]);
    }

    const searchQuery = q.toLowerCase();
    
    // Get course titles
    const courseTitles = await Course.find({
      title: { $regex: searchQuery, $options: 'i' }
    }).select('title').limit(5);

    // Get blog titles
    const blogTitles = await Blog.find({
      published: true,
      title: { $regex: searchQuery, $options: 'i' }
    }).select('title').limit(5);

    const suggestions = [
      ...courseTitles.map(course => ({ text: course.title, type: 'course' })),
      ...blogTitles.map(blog => ({ text: blog.title, type: 'blog' }))
    ];

    res.json(suggestions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
