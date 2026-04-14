const express = require('express');
const router = express.Router();
const Course = require('../models/Course');

// Get all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get featured courses
router.get('/featured', async (req, res) => {
  try {
    const courses = await Course.find({ featured: true }).sort({ rating: -1 }).limit(3);
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get course by slug
router.get('/:slug', async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug });
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new course (for admin purposes)
router.post('/', async (req, res) => {
  try {
    const course = new Course(req.body);
    const savedCourse = await course.save();
    res.status(201).json(savedCourse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
