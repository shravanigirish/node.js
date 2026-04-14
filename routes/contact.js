const express = require('express');
const router = express.Router();

// Contact form submission
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email address' });
    }

    // Here you would typically:
    // 1. Save to database
    // 2. Send email notification
    // 3. Send confirmation email to user
    
    console.log('Contact form submission:', { name, email, message });
    
    // Simulate successful submission
    res.status(200).json({ 
      message: 'Thank you for your message! We will get back to you soon.',
      success: true 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
