const mongoose = require('mongoose');
const Course = require('./models/Course');
const Blog = require('./models/Blog');
require('dotenv').config();

// Sample courses data
const coursesData = [
    {
        title: 'Node.js Fundamentals - Complete Beginner Course',
        description: 'Start your Node.js journey from scratch. Learn the basics of Node.js, including setup, core concepts, and your first server.',
        price: 49.99,
        duration: '8 hours',
        level: 'beginner',
        thumbnail: '/images/nodejs-basics-course.jpg',
        modules: [
            { title: 'Introduction to Node.js', description: 'What is Node.js and why use it?', duration: '45 min' },
            { title: 'Setting Up Development Environment', description: 'Install Node.js and configure your IDE', duration: '30 min' },
            { title: 'Core Node.js Concepts', description: 'Event loop, callbacks, and async programming', duration: '60 min' },
            { title: 'Building Your First Server', description: 'Create a simple HTTP server', duration: '45 min' },
            { title: 'Working with Modules', description: 'CommonJS modules and npm', duration: '40 min' }
        ],
        enrolled: 1250,
        rating: 4.7,
        tags: ['nodejs', 'beginner', 'javascript', 'backend'],
        featured: true
    },
    {
        title: 'Express.js Masterclass - Build Web Applications',
        description: 'Master Express.js framework and build robust web applications. Learn routing, middleware, templating, and more.',
        price: 79.99,
        duration: '12 hours',
        level: 'intermediate',
        thumbnail: '/images/express-course.jpg',
        modules: [
            { title: 'Express.js Introduction', description: 'Getting started with Express', duration: '30 min' },
            { title: 'Routing in Express', description: 'Define and handle routes', duration: '60 min' },
            { title: 'Middleware Development', description: 'Create and use middleware', duration: '45 min' },
            { title: 'Template Engines', description: 'EJS, Pug, and Handlebars', duration: '50 min' },
            { title: 'Building REST APIs', description: 'Create RESTful APIs with Express', duration: '75 min' }
        ],
        enrolled: 890,
        rating: 4.8,
        tags: ['express', 'web-development', 'api', 'intermediate'],
        featured: true
    },
    {
        title: 'MongoDB with Node.js - Database Integration',
        description: 'Learn to integrate MongoDB with Node.js applications. Master Mongoose ODM, data modeling, and database operations.',
        price: 69.99,
        duration: '10 hours',
        level: 'intermediate',
        thumbnail: '/images/mongodb-course.jpg',
        modules: [
            { title: 'MongoDB Basics', description: 'Introduction to NoSQL and MongoDB', duration: '45 min' },
            { title: 'Mongoose ODM', description: 'Working with Mongoose', duration: '60 min' },
            { title: 'Data Modeling', description: 'Design database schemas', duration: '50 min' },
            { title: 'CRUD Operations', description: 'Create, Read, Update, Delete', duration: '55 min' },
            { title: 'Advanced Queries', description: 'Aggregation and complex queries', duration: '70 min' }
        ],
        enrolled: 720,
        rating: 4.6,
        tags: ['mongodb', 'database', 'mongoose', 'nosql'],
        featured: false
    },
    {
        title: 'Advanced Node.js - Performance & Scaling',
        description: 'Take your Node.js skills to the next level. Learn performance optimization, clustering, and scaling techniques.',
        price: 99.99,
        duration: '15 hours',
        level: 'advanced',
        thumbnail: '/images/advanced-nodejs.jpg',
        modules: [
            { title: 'Performance Optimization', description: 'Profile and optimize Node.js apps', duration: '90 min' },
            { title: 'Memory Management', description: 'Handle memory leaks and optimization', duration: '60 min' },
            { title: 'Clustering', description: 'Use cluster module for scaling', duration: '45 min' },
            { title: 'Microservices Architecture', description: 'Build microservices with Node.js', duration: '120 min' },
            { title: 'Containerization', description: 'Docker and Node.js', duration: '75 min' }
        ],
        enrolled: 450,
        rating: 4.9,
        tags: ['advanced', 'performance', 'scaling', 'microservices'],
        featured: true
    },
    {
        title: 'Node.js Testing & Debugging',
        description: 'Master testing and debugging techniques for Node.js applications. Learn unit testing, integration testing, and debugging tools.',
        price: 59.99,
        duration: '8 hours',
        level: 'intermediate',
        thumbnail: '/images/testing-course.jpg',
        modules: [
            { title: 'Testing Fundamentals', description: 'Why testing is important', duration: '30 min' },
            { title: 'Unit Testing with Jest', description: 'Write unit tests', duration: '60 min' },
            { title: 'Integration Testing', description: 'Test integration points', duration: '45 min' },
            { title: 'Debugging Techniques', description: 'Debug Node.js applications', duration: '50 min' },
            { title: 'Test-Driven Development', description: 'TDD practices', duration: '55 min' }
        ],
        enrolled: 380,
        rating: 4.5,
        tags: ['testing', 'debugging', 'jest', 'tdd'],
        featured: false
    }
];

// Sample blog posts data
const blogsData = [
    {
        title: 'Node.js Basics: Getting Started with Server-Side JavaScript',
        slug: 'nodejs-basics',
        metaDescription: 'Learn Node.js fundamentals with this comprehensive guide. Discover how to install Node.js, understand the event loop, and build your first server.',
        metaKeywords: ['nodejs', 'javascript', 'backend', 'server-side', 'tutorial'],
        content: `
            <h1>Node.js Basics: Getting Started with Server-Side JavaScript</h1>
            
            <h2>What is Node.js?</h2>
            <p>Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. It allows you to run JavaScript on the server-side, opening up new possibilities for web development.</p>
            
            <h2>Why Use Node.js?</h2>
            <ul>
                <li><strong>Fast Performance:</strong> Built on V8 engine, Node.js offers excellent performance</li>
                <li><strong>Single Language:</strong> Use JavaScript for both frontend and backend</li>
                <li><strong>NPM Ecosystem:</strong> Access to millions of packages</li>
                <li><strong>Scalability:</strong> Perfect for building scalable applications</li>
            </ul>
            
            <h2>Installing Node.js</h2>
            <p>To get started with Node.js, you need to install it on your system. Visit the official Node.js website and download the LTS (Long Term Support) version for your operating system.</p>
            
            <pre><code># Check Node.js installation
node --version
npm --version</code></pre>
            
            <h2>Your First Node.js Program</h2>
            <p>Let's create a simple "Hello World" program to verify your installation:</p>
            
            <pre><code>// hello.js
console.log('Hello, Node.js!');

// Run the program
node hello.js</code></pre>
            
            <h2>Understanding the Event Loop</h2>
            <p>The event loop is the core mechanism that makes Node.js efficient. It allows Node.js to handle many concurrent connections with a single thread.</p>
            
            <h2>Creating Your First Server</h2>
            <p>Here's how to create a simple HTTP server:</p>
            
            <pre><code>const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello, World!');
});

server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});</code></pre>
            
            <h2>Next Steps</h2>
            <p>Now that you understand the basics, you can explore more advanced topics like:</p>
            <ul>
                <li>Express.js framework</li>
                <li>Database integration</li>
                <li>Authentication and security</li>
                <li>Testing and debugging</li>
            </ul>
            
            <h2>Conclusion</h2>
            <p>Node.js opens up exciting possibilities for JavaScript developers. With its fast performance and extensive ecosystem, it's an excellent choice for building modern web applications.</p>
        `,
        excerpt: 'Learn Node.js fundamentals with this comprehensive guide. Discover how to install Node.js, understand the event loop, and build your first server.',
        thumbnail: '/images/nodejs-basics-blog.jpg',
        category: 'basics',
        tags: ['nodejs', 'javascript', 'backend', 'tutorial'],
        readingTime: 8,
        views: 1520,
        featured: true
    },
    {
        title: 'Express.js Tutorial: Building Web Applications with Node.js',
        slug: 'express-tutorial',
        metaDescription: 'Complete Express.js tutorial for beginners. Learn to build web applications, handle routing, middleware, and create REST APIs with Express.',
        metaKeywords: ['express', 'express.js', 'nodejs', 'web-development', 'api', 'tutorial'],
        content: `
            <h1>Express.js Tutorial: Building Web Applications with Node.js</h1>
            
            <h2>What is Express.js?</h2>
            <p>Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.</p>
            
            <h2>Setting Up Express.js</h2>
            <p>First, create a new project and install Express:</p>
            
            <pre><code>mkdir my-express-app
cd my-express-app
npm init -y
npm install express</code></pre>
            
            <h2>Basic Express Server</h2>
            <pre><code>const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello, Express!');
});

app.listen(port, () => {
    console.log(\`Server running on http://localhost:\${port}\`);
});</code></pre>
            
            <h2>Routing in Express</h2>
            <p>Routing refers to how an application's endpoints (URIs) respond to client requests:</p>
            
            <pre><code>// GET route
app.get('/users', (req, res) => {
    res.json({ users: [] });
});

// POST route
app.post('/users', (req, res) => {
    // Create new user
    res.status(201).send('User created');
});

// PUT route
app.put('/users/:id', (req, res) => {
    // Update user
    res.send(\`User \${req.params.id} updated\`);
});</code></pre>
            
            <h2>Middleware</h2>
            <p>Middleware functions are functions that have access to the request object (req), the response object (res), and the next function in the application's request-response cycle.</p>
            
            <pre><code>// Custom middleware
const logger = (req, res, next) => {
    console.log(\`\${req.method} \${req.url}\`);
    next();
};

app.use(logger);

// Built-in middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));</code></pre>
            
            <h2>Template Engines</h2>
            <p>Express supports various template engines. Here's how to use EJS:</p>
            
            <pre><code>npm install ejs

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});</code></pre>
            
            <h2>Building a REST API</h2>
            <p>Express is excellent for building REST APIs:</p>
            
            <pre><code>const users = [];

// GET all users
app.get('/api/users', (req, res) => {
    res.json(users);
});

// GET user by ID
app.get('/api/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('User not found');
    res.json(user);
});

// POST new user
app.post('/api/users', (req, res) => {
    const user = {
        id: users.length + 1,
        name: req.body.name,
        email: req.body.email
    };
    users.push(user);
    res.status(201).json(user);
});</code></pre>
            
            <h2>Error Handling</h2>
            <pre><code>// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// 404 handler
app.use((req, res) => {
    res.status(404).send('Not Found');
});</code></pre>
            
            <h2>Conclusion</h2>
            <p>Express.js provides a solid foundation for building web applications and APIs with Node.js. Its minimal approach and extensive middleware ecosystem make it a popular choice among developers.</p>
        `,
        excerpt: 'Complete Express.js tutorial for beginners. Learn to build web applications, handle routing, middleware, and create REST APIs.',
        thumbnail: '/images/express-tutorial-blog.jpg',
        category: 'express',
        tags: ['express', 'web-development', 'api', 'nodejs'],
        readingTime: 12,
        views: 1280,
        featured: true
    },
    {
        title: 'MongoDB Guide: Database Integration with Node.js',
        slug: 'mongodb-guide',
        metaDescription: 'Learn how to integrate MongoDB with Node.js applications. Master Mongoose ODM, data modeling, and database operations.',
        metaKeywords: ['mongodb', 'nodejs', 'database', 'mongoose', 'nosql', 'tutorial'],
        content: `
            <h1>MongoDB Guide: Database Integration with Node.js</h1>
            
            <h2>What is MongoDB?</h2>
            <p>MongoDB is a NoSQL, document-oriented database that provides high performance, high availability, and easy scalability.</p>
            
            <h2>Why MongoDB with Node.js?</h2>
            <ul>
                <li><strong>JSON-like Documents:</strong> Natural fit for JavaScript applications</li>
                <li><strong>Flexible Schema:</strong> Easy to evolve your data model</li>
                <li><strong>Scalability:</strong> Horizontal scaling capabilities</li>
                <li><strong>Rich Query Language:</strong> Powerful querying capabilities</li>
            </ul>
            
            <h2>Setting Up MongoDB</h2>
            <p>First, install the MongoDB Node.js driver:</p>
            
            <pre><code>npm install mongodb</code></pre>
            
            <h2>Basic MongoDB Operations</h2>
            <pre><code>const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        const database = client.db('myapp');
        const users = database.collection('users');
        
        // Insert document
        const result = await users.insertOne({
            name: 'John Doe',
            email: 'john@example.com',
            age: 30
        });
        
        // Find documents
        const user = await users.findOne({ name: 'John Doe' });
        console.log(user);
        
    } finally {
        await client.close();
    }
}</code></pre>
            
            <h2>Using Mongoose ODM</h2>
            <p>Mongoose provides a straightforward schema-based solution to model your application data:</p>
            
            <pre><code>npm install mongoose

const mongoose = require('mongoose');

// Define schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, min: 0 },
    createdAt: { type: Date, default: Date.now }
});

// Create model
const User = mongoose.model('User', userSchema);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myapp');

// Create user
const user = new User({
    name: 'Jane Doe',
    email: 'jane@example.com',
    age: 25
});

await user.save();</code></pre>
            
            <h2>Data Modeling Best Practices</h2>
            
            <h3>Embedding vs Referencing</h3>
            <pre><code>// Embedding (one-to-one)
const userSchema = new mongoose.Schema({
    name: String,
    address: {
        street: String,
        city: String,
        country: String
    }
});

// Referencing (one-to-many)
const authorSchema = new mongoose.Schema({
    name: String,
    books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }]
});</code></pre>
            
            <h2>Advanced Queries with Mongoose</h2>
            <pre><code>// Find with conditions
const users = await User.find({ age: { $gte: 18 } })
    .sort({ name: 1 })
    .limit(10);

// Aggregation pipeline
const stats = await User.aggregate([
    { $match: { age: { $gte: 18 } } },
    { $group: { _id: null, count: { $sum: 1 }, avgAge: { $avg: '$age' } } }
]);

// Population
const author = await Author.findById(authorId).populate('books');</code></pre>
            
            <h2>Indexing for Performance</h2>
            <pre><code>// Single field index
userSchema.index({ email: 1 });

// Compound index
userSchema.index({ name: 1, age: -1 });

// Text index
userSchema.index({ name: 'text', bio: 'text' });</code></pre>
            
            <h2>Validation</h2>
            <pre><code>const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minlength: [2, 'Name must be at least 2 characters'],
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: 'Invalid email format'
        }
    }
});</code></pre>
            
            <h2>Conclusion</h2>
            <p>MongoDB and Node.js make an excellent combination for building modern applications. With Mongoose, you get the benefits of schema validation, type casting, and business logic hooks while maintaining the flexibility of a NoSQL database.</p>
        `,
        excerpt: 'Learn how to integrate MongoDB with Node.js applications. Master Mongoose ODM, data modeling, and database operations.',
        thumbnail: '/images/mongodb-guide-blog.jpg',
        category: 'database',
        tags: ['mongodb', 'database', 'mongoose', 'nosql'],
        readingTime: 15,
        views: 980,
        featured: false
    },
    {
        title: 'REST API Development with Node.js and Express',
        slug: 'rest-api',
        metaDescription: 'Build robust REST APIs with Node.js and Express. Learn REST principles, API design best practices, and implement CRUD operations.',
        metaKeywords: ['rest', 'api', 'nodejs', 'express', 'crud', 'web-development'],
        content: `
            <h1>REST API Development with Node.js and Express</h1>
            
            <h2>What is a REST API?</h2>
            <p>REST (Representational State Transfer) is an architectural style for designing networked applications. A REST API uses HTTP requests to GET, PUT, POST, and DELETE data.</p>
            
            <h2>REST Principles</h2>
            <ul>
                <li><strong>Stateless:</strong> Each request contains all information needed</li>
                <li><strong>Client-Server:</strong> Separation of concerns</li>
                <li><strong>Cacheable:</strong> Responses should indicate if they can be cached</li>
                <li><strong>Uniform Interface:</strong> Standardized methods and conventions</li>
            </ul>
            
            <h2>Setting Up the Project</h2>
            <pre><code>npm init -y
npm install express mongoose dotenv cors helmet
npm install -D nodemon</code></pre>
            
            <h2>Basic API Structure</h2>
            <pre><code>const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGODB_URI);

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/posts', require('./routes/posts'));

// Error handling
app.use((err, req, res, next) => {
    res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(\`Server running on port \${PORT}\`));</code></pre>
            
            <h2>Implementing CRUD Operations</h2>
            
            <h3>Model Definition</h3>
            <pre><code>const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: Number,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);</code></pre>
            
            <h3>Controller with CRUD Operations</h3>
            <pre><code>const User = require('../models/User');

// GET all users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// GET user by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// CREATE user
exports.createUser = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// UPDATE user
exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// DELETE user
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};</code></pre>
            
            <h3>Routes Definition</h3>
            <pre><code>const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;</code></pre>
            
            <h2>API Design Best Practices</h2>
            
            <h3>Use Proper HTTP Methods</h3>
            <ul>
                <li>GET: Retrieve resources</li>
                <li>POST: Create new resources</li>
                <li>PUT: Update existing resources</li>
                <li>DELETE: Remove resources</li>
                <li>PATCH: Partial updates</li>
            </ul>
            
            <h3>Status Codes</h3>
            <pre><code>// Success codes
200 OK          // Successful GET, PUT
201 Created     // Successful POST
204 No Content  // Successful DELETE

// Client error codes
400 Bad Request      // Invalid input
401 Unauthorized     // Authentication required
403 Forbidden        // Insufficient permissions
404 Not Found        // Resource not found
409 Conflict         // Resource conflict

// Server error codes
500 Internal Server Error // Generic server error</code></pre>
            
            <h3>Input Validation</h3>
            <pre><code>const { body, validationResult } = require('express-validator');

const validateUser = [
    body('name').isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('age').isInt({ min: 0 }).withMessage('Age must be a positive number')
];

router.post('/', validateUser, userController.createUser);</code></pre>
            
            <h3>Pagination</h3>
            <pre><code>exports.getUsers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const users = await User.find()
            .skip(skip)
            .limit(limit);

        const total = await User.countDocuments();

        res.json({
            users,
            pagination: {
                current: page,
                pages: Math.ceil(total / limit),
                total
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};</code></pre>
            
            <h2>Testing Your API</h2>
            <pre><code>// Using curl
curl -X GET http://localhost:3000/api/users
curl -X POST http://localhost:3000/api/users \\
     -H "Content-Type: application/json" \\
     -d '{"name":"John Doe","email":"john@example.com","age":30}'</code></pre>
            
            <h2>Conclusion</h2>
            <p>Building REST APIs with Node.js and Express provides a solid foundation for modern web applications. By following REST principles and implementing proper error handling, validation, and security measures, you can create robust and scalable APIs.</p>
        `,
        excerpt: 'Build robust REST APIs with Node.js and Express. Learn REST principles, API design best practices, and implement CRUD operations.',
        thumbnail: '/images/rest-api-blog.jpg',
        category: 'advanced',
        tags: ['rest', 'api', 'express', 'crud'],
        readingTime: 18,
        views: 1120,
        featured: false
    }
];

// Seed function
async function seedDatabase() {
    try {
        // Clear existing data
        await Course.deleteMany({});
        await Blog.deleteMany({});
        
        console.log('Cleared existing data');
        
        // Insert courses
        const insertedCourses = await Course.insertMany(coursesData);
        console.log(`Inserted ${insertedCourses.length} courses`);
        
        // Insert blogs
        const insertedBlogs = await Blog.insertMany(blogsData);
        console.log(`Inserted ${insertedBlogs.length} blog posts`);
        
        console.log('Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

// Run the seeder
seedDatabase();
