const mongoose = require('mongoose');
const Blog = require('./models/Blog');
require('dotenv').config();

// Additional blog posts data
const additionalBlogsData = [
    {
        title: 'Understanding the Node.js Event Loop',
        slug: 'nodejs-event-loop',
        metaDescription: 'Deep dive into the Node.js event loop. Understand how Node.js handles asynchronous operations and achieves high performance.',
        metaKeywords: ['nodejs', 'event-loop', 'asynchronous', 'performance', 'javascript'],
        content: `
            <h1>Understanding the Node.js Event Loop</h1>
            
            <h2>What is the Event Loop?</h2>
            <p>The event loop is the core mechanism that enables Node.js to perform non-blocking I/O operations despite being single-threaded. It's what makes Node.js efficient and scalable.</p>
            
            <h2>How the Event Loop Works</h2>
            <p>The event loop continuously checks the call stack and the task queue. When the call stack is empty, it takes the first event from the queue and pushes it to the call stack for execution.</p>
            
            <h2>Phases of the Event Loop</h2>
            <ul>
                <li><strong>Timers:</strong> Executes callbacks scheduled by setTimeout() and setInterval()</li>
                <li><strong>Pending Callbacks:</strong> Executes I/O callbacks deferred to the next loop iteration</li>
                <li><strong>Idle, Prepare:</strong> Only used internally</li>
                <li><strong>Poll:</strong> Retrieves new I/O events and executes their callbacks</li>
                <li><strong>Check:</strong> Executes callbacks registered by setImmediate()</li>
                <li><strong>Close Callbacks:</strong> Executes some close callbacks</li>
            </ul>
            
            <h2>Practical Examples</h2>
            <pre><code>console.log('Start');

setTimeout(() => {
    console.log('Timeout callback');
}, 0);

Promise.resolve().then(() => {
    console.log('Promise callback');
});

console.log('End');

// Output: Start, End, Promise callback, Timeout callback</code></pre>
            
            <h2>Best Practices</h2>
            <ul>
                <li>Avoid blocking operations in the event loop</li>
                <li>Use worker threads for CPU-intensive tasks</li>
                <li>Understand the difference between microtasks and macrotasks</li>
                <li>Use setImmediate() for I/O callbacks</li>
            </ul>
            
            <h2>Conclusion</h2>
            <p>Understanding the event loop is crucial for writing efficient Node.js applications. It helps you avoid common pitfalls and optimize your code for better performance.</p>
        `,
        excerpt: 'Deep dive into the Node.js event loop. Understand how Node.js handles asynchronous operations and achieves high performance.',
        thumbnail: '/images/event-loop-blog.jpg',
        category: 'basics',
        tags: ['nodejs', 'event-loop', 'asynchronous', 'performance'],
        readingTime: 10,
        views: 890,
        featured: false
    },
    {
        title: 'Node.js Modules: Understanding CommonJS and ES Modules',
        slug: 'nodejs-modules',
        metaDescription: 'Complete guide to Node.js modules. Learn about CommonJS, ES modules, module creation, and best practices for modular development.',
        metaKeywords: ['nodejs', 'modules', 'commonjs', 'es-modules', 'javascript'],
        content: `
            <h1>Node.js Modules: Understanding CommonJS and ES Modules</h1>
            
            <h2>What are Modules?</h2>
            <p>Modules are reusable pieces of code that help organize your application into manageable, maintainable pieces. Node.js has a powerful module system.</p>
            
            <h2>CommonJS Modules</h2>
            <p>CommonJS is the original module system in Node.js:</p>
            
            <pre><code>// math.js
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

module.exports = {
    add,
    subtract
};

// app.js
const { add, subtract } = require('./math');
console.log(add(5, 3)); // 8</code></pre>
            
            <h2>ES Modules</h2>
            <p>ES modules are the modern standard for JavaScript modules:</p>
            
            <pre><code>// math.mjs
export function add(a, b) {
    return a + b;
}

export function subtract(a, b) {
    return a - b;
}

// app.mjs
import { add, subtract } from './math.mjs';
console.log(add(5, 3)); // 8</code></pre>
            
            <h2>Core Modules</h2>
            <p>Node.js comes with built-in core modules:</p>
            <ul>
                <li><strong>fs:</strong> File system operations</li>
                <li><strong>path:</strong> Path manipulation</li>
                <li><strong>http:</strong> HTTP server and client</li>
                <li><strong>events:</strong> Event emitter</li>
                <li><strong>util:</strong> Utility functions</li>
            </ul>
            
            <h2>Creating Your Own Modules</h2>
            <pre><code>// logger.js
class Logger {
    log(message) {
        console.log(\`[\${new Date().toISOString()}] \${message}\`);
    }
    
    error(message) {
        console.error(\`[\${new Date().toISOString()}] ERROR: \${message}\`);
    }
}

module.exports = new Logger();</code></pre>
            
            <h2>Best Practices</h2>
            <ul>
                <li>Keep modules small and focused</li>
                <li>Use descriptive names</li>
                <li>Document your modules</li>
                <li>Avoid circular dependencies</li>
            </ul>
            
            <h2>Conclusion</h2>
            <p>Understanding modules is essential for building scalable Node.js applications. Choose the module system that best fits your project requirements.</p>
        `,
        excerpt: 'Complete guide to Node.js modules. Learn about CommonJS, ES modules, module creation, and best practices for modular development.',
        thumbnail: '/images/modules-blog.jpg',
        category: 'basics',
        tags: ['nodejs', 'modules', 'commonjs', 'es-modules'],
        readingTime: 12,
        views: 750,
        featured: false
    },
    {
        title: 'Working with Streams in Node.js',
        slug: 'nodejs-streams',
        metaDescription: 'Master Node.js streams for efficient data processing. Learn about readable, writable, duplex, and transform streams.',
        metaKeywords: ['nodejs', 'streams', 'data-processing', 'performance', 'javascript'],
        content: `
            <h1>Working with Streams in Node.js</h1>
            
            <h2>What are Streams?</h2>
            <p>Streams are objects that let you read data from a source or write data to a destination in a continuous fashion. They're essential for handling large files and data efficiently.</p>
            
            <h2>Types of Streams</h2>
            <ul>
                <li><strong>Readable:</strong> Streams from which data can be read</li>
                <li><strong>Writable:</strong> Streams to which data can be written</li>
                <li><strong>Duplex:</strong> Streams that are both Readable and Writable</li>
                <li><strong>Transform:</strong> Duplex streams that can modify or transform data</li>
            </ul>
            
            <h2>Readable Streams Example</h2>
            <pre><code>const fs = require('fs');

const readableStream = fs.createReadStream('large-file.txt');

readableStream.on('data', (chunk) => {
    console.log('Received chunk of data');
    console.log(chunk.length);
});

readableStream.on('end', () => {
    console.log('Finished reading');
});</code></pre>
            
            <h2>Writable Streams Example</h2>
            <pre><code>const writableStream = fs.createWriteStream('output.txt');

writableStream.write('Hello, ');
writableStream.write('World!');
writableStream.end();</code></pre>
            
            <h2>Piping Streams</h2>
            <pre><code>const readable = fs.createReadStream('input.txt');
const writable = fs.createWriteStream('output.txt');

readable.pipe(writable);</code></pre>
            
            <h2>Transform Streams</h2>
            <pre><code>const { Transform } = require('stream');

const uppercase = new Transform({
    transform(chunk, encoding, callback) {
        callback(null, chunk.toString().toUpperCase());
    }
});

readable.pipe(uppercase).pipe(writable);</code></pre>
            
            <h2>Stream Events</h2>
            <ul>
                <li><strong>data:</strong> Emitted when data is available to read</li>
                <li><strong>end:</strong> Emitted when there's no more data to read</li>
                <li><strong>error:</strong> Emitted when an error occurs</li>
                <li><strong>finish:</strong> Emitted when all data has been flushed</li>
            </ul>
            
            <h2>Conclusion</h2>
            <p>Streams are a powerful feature of Node.js that enable efficient data processing. Mastering streams will help you build more performant applications.</p>
        `,
        excerpt: 'Master Node.js streams for efficient data processing. Learn about readable, writable, duplex, and transform streams.',
        thumbnail: '/images/streams-blog.jpg',
        category: 'advanced',
        tags: ['nodejs', 'streams', 'data-processing', 'performance'],
        readingTime: 14,
        views: 620,
        featured: false
    },
    {
        title: 'Building Custom Middleware in Express.js',
        slug: 'nodejs-middleware',
        metaDescription: 'Learn to create custom middleware in Express.js. Understand middleware types, error handling, and best practices for middleware development.',
        metaKeywords: ['express', 'middleware', 'nodejs', 'web-development', 'javascript'],
        content: `
            <h1>Building Custom Middleware in Express.js</h1>
            
            <h2>What is Middleware?</h2>
            <p>Middleware functions are functions that have access to the request object (req), the response object (res), and the next function in the application's request-response cycle.</p>
            
            <h2>Types of Middleware</h2>
            <ul>
                <li><strong>Application-level:</strong> Bound to app instance using app.use()</li>
                <li><strong>Router-level:</strong> Bound to router instance using router.use()</li>
                <li><strong>Error-handling:</strong> Takes four arguments (err, req, res, next)</li>
                <li><strong>Built-in:</strong> Express built-in middleware like express.json()</li>
                <li><strong>Third-party:</strong> Third-party middleware like cors, helmet</li>
            </ul>
            
            <h2>Creating Simple Middleware</h2>
            <pre><code>const logger = (req, res, next) => {
    console.log(\`\${req.method} \${req.url} - \${new Date().toISOString()}\`);
    next();
};

app.use(logger);</code></pre>
            
            <h2>Authentication Middleware</h2>
            <pre><code>const authenticate = (req, res, next) => {
    const token = req.header('Authorization');
    
    if (!token) {
        return res.status(401).json({ error: 'Access denied' });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ error: 'Invalid token' });
    }
};</code></pre>
            
            <h2>Error Handling Middleware</h2>
            <pre><code>const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    
    if (err.type === 'ValidationError') {
        return res.status(400).json({ error: err.message });
    }
    
    res.status(500).json({ error: 'Something went wrong' });
};</code></pre>
            
            <h2>Rate Limiting Middleware</h2>
            <pre><code>const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests
    message: 'Too many requests from this IP'
});

app.use(limiter);</code></pre>
            
            <h2>Best Practices</h2>
            <ul>
                <li>Always call next() or send a response</li>
                <li>Handle errors properly</li>
                <li>Keep middleware focused on a single responsibility</li>
                <li>Order middleware correctly</li>
            </ul>
            
            <h2>Conclusion</h2>
            <p>Middleware is a powerful concept in Express.js that allows you to add functionality to your application in a modular way. Understanding how to create and use middleware is essential for building robust Express applications.</p>
        `,
        excerpt: 'Learn to create custom middleware in Express.js. Understand middleware types, error handling, and best practices for middleware development.',
        thumbnail: '/images/middleware-blog.jpg',
        category: 'express',
        tags: ['express', 'middleware', 'nodejs', 'web-development'],
        readingTime: 11,
        views: 890,
        featured: false
    },
    {
        title: 'Testing Node.js Applications: Jest and Mocha',
        slug: 'nodejs-testing',
        metaDescription: 'Complete guide to testing Node.js applications. Learn about unit testing, integration testing, and frameworks like Jest and Mocha.',
        metaKeywords: ['nodejs', 'testing', 'jest', 'mocha', 'unit-testing', 'javascript'],
        content: `
            <h1>Testing Node.js Applications: Jest and Mocha</h1>
            
            <h2>Why Test Your Code?</h2>
            <p>Testing ensures your code works as expected, prevents regressions, and improves code quality. It's an essential part of modern software development.</p>
            
            <h2>Types of Testing</h2>
            <ul>
                <li><strong>Unit Testing:</strong> Test individual functions or components</li>
                <li><strong>Integration Testing:</strong> Test how components work together</li>
                <li><strong>End-to-End Testing:</strong> Test the entire application flow</li>
            </ul>
            
            <h2>Setting Up Jest</h2>
            <pre><code>npm install --save-dev jest

// package.json
{
  "scripts": {
    "test": "jest"
  }
}</code></pre>
            
            <h2>Writing Your First Test</h2>
            <pre><code>// math.js
function add(a, b) {
    return a + b;
}

module.exports = { add };

// math.test.js
const { add } = require('./math');

test('adds 1 + 2 to equal 3', () => {
    expect(add(1, 2)).toBe(3);
});</code></pre>
            
            <h2>Testing Async Code</h2>
            <pre><code>// async.test.js
test('async test', async () => {
    const data = await fetchData();
    expect(data).toBe('peanut butter');
});

test('callback test', (done) => {
    fetchDataCallback((data) => {
        expect(data).toBe('peanut butter');
        done();
    });
});</code></pre>
            
            <h2>Mocking with Jest</h2>
            <pre><code>const axios = require('axios');
jest.mock('axios');

test('fetches user data', async () => {
    axios.get.mockResolvedValue({ data: { name: 'John' } });
    
    const user = await fetchUser(1);
    expect(user.name).toBe('John');
});</code></pre>
            
            <h2>Setting Up Mocha and Chai</h2>
            <pre><code>npm install --save-dev mocha chai

// package.json
{
  "scripts": {
    "test": "mocha"
  }
}</code></pre>
            
            <h2>Mocha Test Example</h2>
            <pre><code>const { expect } = require('chai');
const { add } = require('./math');

describe('Math functions', () => {
    it('should add two numbers', () => {
        expect(add(2, 3)).to.equal(5);
    });
    
    it('should handle negative numbers', () => {
        expect(add(-2, -3)).to.equal(-5);
    });
});</code></pre>
            
            <h2>Testing Express Routes</h2>
            <pre><code>const request = require('supertest');
const app = require('./app');

describe('GET /users', () => {
    it('should return all users', async () => {
        const response = await request(app)
            .get('/users')
            .expect(200);
            
        expect(response.body).to.be.an('array');
    });
});</code></pre>
            
            <h2>Test Coverage</h2>
            <pre><code>// Jest coverage
npx jest --coverage

// Istanbul for Mocha
npm install --save-dev nyc
npx nyc mocha</code></pre>
            
            <h2>Best Practices</h2>
            <ul>
                <li>Write tests before or alongside your code (TDD)</li>
                <li>Keep tests simple and focused</li>
                <li>Test edge cases and error conditions</li>
                <li>Maintain high test coverage</li>
            </ul>
            
            <h2>Conclusion</h2>
            <p>Testing is crucial for building reliable Node.js applications. Choose the testing framework that fits your needs and make testing an integral part of your development process.</p>
        `,
        excerpt: 'Complete guide to testing Node.js applications. Learn about unit testing, integration testing, and frameworks like Jest and Mocha.',
        thumbnail: '/images/testing-blog.jpg',
        category: 'advanced',
        tags: ['nodejs', 'testing', 'jest', 'mocha', 'unit-testing'],
        readingTime: 16,
        views: 980,
        featured: false
    },
    {
        title: 'Node.js Performance Optimization Techniques',
        slug: 'nodejs-performance',
        metaDescription: 'Optimize your Node.js applications for better performance. Learn about clustering, caching, memory management, and profiling.',
        metaKeywords: ['nodejs', 'performance', 'optimization', 'clustering', 'caching', 'javascript'],
        content: `
            <h1>Node.js Performance Optimization Techniques</h1>
            
            <h2>Why Performance Matters</h2>
            <p>Performance optimization is crucial for providing a good user experience and reducing infrastructure costs. Node.js offers several techniques to improve application performance.</p>
            
            <h2>Profiling Your Application</h2>
            <pre><code>// Using Node.js built-in profiler
node --prof app.js
node --prof-process isolate-*.log > processed.txt

// Using clinic.js
npm install -g clinic
clinic doctor -- node app.js</code></pre>
            
            <h2>Clustering for CPU Utilization</h2>
            <pre><code>const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
    console.log(\`Master \${process.pid} is running\`);
    
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    
    cluster.on('exit', (worker, code, signal) => {
        console.log(\`worker \${worker.process.pid} died\`);
        cluster.fork();
    });
} else {
    console.log(\`Worker \${process.pid} started\`);
    // Start your application
}</code></pre>
            
            <h2>Memory Management</h2>
            <ul>
                <li><strong>Avoid memory leaks:</strong> Properly clean up event listeners and timers</li>
                <li><strong>Use streams:</strong> Process large files in chunks</li>
                <li><strong>Monitor memory usage:</strong> Use process.memoryUsage()</li>
            </ul>
            
            <h2>Caching Strategies</h2>
            <pre><code>const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 600 }); // 10 minutes

function getUser(id) {
    const cachedUser = cache.get(id);
    if (cachedUser) {
        return Promise.resolve(cachedUser);
    }
    
    return fetchUserFromDB(id)
        .then(user => {
            cache.set(id, user);
            return user;
        });
}</code></pre>
            
            <h2>Database Optimization</h2>
            <ul>
                <li>Use connection pooling</li>
                <li>Implement proper indexing</li>
                <li>Use database-specific optimizations</li>
                <li>Consider read replicas for read-heavy applications</li>
            </ul>
            
            <h2>Async/Await Optimization</h2>
            <pre><code>// Bad: Sequential execution
const results = [];
for (const item of items) {
    const result = await processItem(item);
    results.push(result);
}

// Good: Parallel execution
const promises = items.map(item => processItem(item));
const results = await Promise.all(promises);</code></pre>
            
            <h2>Compression Middleware</h2>
            <pre><code>const compression = require('compression');
app.use(compression());</code></pre>
            
            <h2>Static Asset Optimization</h2>
            <pre><code>app.use(express.static('public', {
    maxAge: '1d',
    etag: true,
    lastModified: true
}));</code></pre>
            
            <h2>Monitoring and Metrics</h2>
            <pre><code>const prometheus = require('prom-client');

const httpRequestDuration = new prometheus.Histogram({
    name: 'http_request_duration_seconds',
    help: 'Duration of HTTP requests in seconds',
    labelNames: ['method', 'route', 'status']
});</code></pre>
            
            <h2>Conclusion</h2>
            <p>Performance optimization is an ongoing process. Regularly profile your application, identify bottlenecks, and apply appropriate optimization techniques to ensure your Node.js applications run efficiently.</p>
        `,
        excerpt: 'Optimize your Node.js applications for better performance. Learn about clustering, caching, memory management, and profiling.',
        thumbnail: '/images/performance-blog.jpg',
        category: 'advanced',
        tags: ['nodejs', 'performance', 'optimization', 'clustering', 'caching'],
        readingTime: 15,
        views: 1120,
        featured: false
    },
    {
        title: 'Node.js Security Best Practices',
        slug: 'nodejs-security',
        metaDescription: 'Secure your Node.js applications with these essential security practices. Learn about authentication, data validation, and common vulnerabilities.',
        metaKeywords: ['nodejs', 'security', 'authentication', 'validation', 'owasp', 'javascript'],
        content: `
            <h1>Node.js Security Best Practices</h1>
            
            <h2>Why Security Matters</h2>
            <p>Security is crucial for protecting your application and user data. Node.js applications face various security threats that need to be addressed proactively.</p>
            
            <h2>Common Security Vulnerabilities</h2>
            <ul>
                <li><strong>Injection Attacks:</strong> SQL, NoSQL, and command injection</li>
                <li><strong>Cross-Site Scripting (XSS):</strong> Malicious script injection</li>
                <li><strong>Cross-Site Request Forgery (CSRF):</strong> Unauthorized requests</li>
                <li><strong>Authentication Issues:</strong> Weak authentication mechanisms</li>
                <li><strong>Data Exposure:</strong> Sensitive data leakage</li>
            </ul>
            
            <h2>Input Validation and Sanitization</h2>
            <pre><code>const { body, validationResult } = require('express-validator');
const sanitizeHtml = require('sanitize-html');

app.post('/comment', [
    body('content').isLength({ min: 1, max: 500 }),
    body('author').isLength({ min: 2, max: 50 })
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const sanitizedContent = sanitizeHtml(req.body.content);
    // Save sanitized content
});</code></pre>
            
            <h2>Authentication and Authorization</h2>
            <pre><code>const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Password hashing
const saltRounds = 10;
const hashedPassword = await bcrypt.hash(password, saltRounds);

// Password verification
const isValid = await bcrypt.compare(password, hashedPassword);

// JWT token generation
const token = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
);</code></pre>
            
            <h2>Security Headers</h2>
            <pre><code>const helmet = require('helmet');
app.use(helmet());

// Custom security headers
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
});</code></pre>
            
            <h2>Rate Limiting</h2>
            <pre><code>const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 requests
    message: 'Too many authentication attempts',
    skipSuccessfulRequests: true
});

app.use('/api/auth', authLimiter);</code></pre>
            
            <h2>Environment Variables</h2>
            <pre><code>// .env (never commit this file)
NODE_ENV=production
JWT_SECRET=your-super-secret-key
DB_PASSWORD=your-database-password

// server.js
require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET;</code></pre>
            
            <h2>Dependency Security</h2>
            <pre><code>// Check for vulnerabilities
npm audit

// Fix vulnerabilities
npm audit fix

// Use npm-check-updates
npm install -g npm-check-updates
ncu -u</code></pre>
            
            <h2>HTTPS and SSL/TLS</h2>
            <pre><code>const https = require('https');
const fs = require('fs');

const options = {
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
};

https.createServer(options, app).listen(443);</code></pre>
            
            <h2>Logging and Monitoring</h2>
            <pre><code>const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' })
    ]
});</code></pre>
            
            <h2>Conclusion</h2>
            <p>Security is an ongoing process, not a one-time setup. Regularly update your dependencies, monitor for vulnerabilities, and follow security best practices to keep your Node.js applications secure.</p>
        `,
        excerpt: 'Secure your Node.js applications with these essential security practices. Learn about authentication, data validation, and common vulnerabilities.',
        thumbnail: '/images/security-blog.jpg',
        category: 'advanced',
        tags: ['nodejs', 'security', 'authentication', 'validation', 'owasp'],
        readingTime: 18,
        views: 1450,
        featured: false
    },
    {
        title: 'Deploying Node.js Applications to Production',
        slug: 'nodejs-deployment',
        metaDescription: 'Learn how to deploy Node.js applications to production. Covering Docker, cloud platforms, CI/CD, and deployment best practices.',
        metaKeywords: ['nodejs', 'deployment', 'docker', 'production', 'ci-cd', 'devops'],
        content: `
            <h1>Deploying Node.js Applications to Production</h1>
            
            <h2>Preparing for Production</h2>
            <p>Deploying to production requires careful planning and configuration. Let's explore the best practices for deploying Node.js applications.</p>
            
            <h2>Environment Configuration</h2>
            <pre><code>// config/index.js
const config = {
    development: {
        port: 3000,
        database: 'mongodb://localhost:27017/dev'
    },
    production: {
        port: process.env.PORT || 80,
        database: process.env.DATABASE_URL
    }
};

module.exports = config[process.env.NODE_ENV || 'development'];</code></pre>
            
            <h2>Docker Containerization</h2>
            <pre><code># Dockerfile
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

USER node

CMD ["node", "server.js"]</code></pre>
            
            <h2>Docker Compose</h2>
            <pre><code># docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    depends_on:
      - db
  
  db:
    image: mongo:4.4
    volumes:
      - mongo-data:/data/db
    ports:
      - "27017:27017"

volumes:
  mongo-data:</code></pre>
            
            <h2>Process Management with PM2</h2>
            <pre><code># Install PM2
npm install -g pm2

# ecosystem.config.js
module.exports = {
  apps: [{
    name: 'my-app',
    script: 'server.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 80
    }
  }]
};

# Start with PM2
pm2 start ecosystem.config.js --env production</code></pre>
            
            <h2>CI/CD Pipeline with GitHub Actions</h2>
            <pre><code># .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '16'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Run tests
      run: npm test
      
    - name: Deploy to server
      run: |
        # Your deployment commands
        ssh user@server 'cd /app && git pull && npm ci && pm2 restart'</code></pre>
            
            <h2>Cloud Deployment Options</h2>
            
            <h3>Heroku</h3>
            <pre><code># Install Heroku CLI
npm install -g heroku

# Create app
heroku create my-node-app

# Set environment variables
heroku config:set NODE_ENV=production

# Deploy
git push heroku main</code></pre>
            
            <h3>AWS Elastic Beanstalk</h3>
            <pre><code># Install EB CLI
npm install -g awsebcli

# Initialize
eb init my-app

# Create environment
eb create production

# Deploy
eb deploy</code></pre>
            
            <h3>DigitalOcean App Platform</h3>
            <pre><code># app.yaml
name: my-node-app
services:
- name: web
  source_dir: /
  github:
    repo: your-username/your-repo
    branch: main
  run_command: npm start
  environment_slug: node-js
  instance_count: 1
  instance_size_slug: basic-xxs</code></pre>
            
            <h2>Load Balancing and Scaling</h2>
            <pre><code># Nginx configuration
upstream nodejs {
    server 127.0.0.1:3000;
    server 127.0.0.1:3001;
    server 127.0.0.1:3002;
}

server {
    listen 80;
    
    location / {
        proxy_pass http://nodejs;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}</code></pre>
            
            <h2>Monitoring and Logging</h2>
            <pre><code>// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        memory: process.memoryUsage()
    });
});

// Application monitoring
const newrelic = require('newrelic');
// or
const prometheus = require('prom-client');</code></pre>
            
            <h2>Backup and Recovery</h2>
            <ul>
                <li>Regular database backups</li>
                <li>Application state backups</li>
                <li>Disaster recovery plan</li>
                <li>Monitoring backup success</li>
            </ul>
            
            <h2>Conclusion</h2>
            <p>Deploying Node.js applications to production requires careful planning and the right tools. Choose the deployment strategy that fits your needs and always prioritize security, monitoring, and reliability.</p>
        `,
        excerpt: 'Learn how to deploy Node.js applications to production. Covering Docker, cloud platforms, CI/CD, and deployment best practices.',
        thumbnail: '/images/deployment-blog.jpg',
        category: 'advanced',
        tags: ['nodejs', 'deployment', 'docker', 'production', 'ci-cd'],
        readingTime: 20,
        views: 890,
        featured: false
    },
    {
        title: 'Debugging Node.js Applications: Tools and Techniques',
        slug: 'nodejs-debugging',
        metaDescription: 'Master Node.js debugging with these essential tools and techniques. Learn about Chrome DevTools, VS Code debugger, and debugging best practices.',
        metaKeywords: ['nodejs', 'debugging', 'troubleshooting', 'chrome-devtools', 'vscode', 'javascript'],
        content: `
            <h1>Debugging Node.js Applications: Tools and Techniques</h1>
            
            <h2>Why Debugging Skills Matter</h2>
            <p>Debugging is an essential skill for any developer. Effective debugging can save hours of frustration and help you write better, more reliable code.</p>
            
            <h2>Basic Debugging Techniques</h2>
            
            <h3>Console Logging</h3>
            <pre><code>// Basic logging
console.log('Variable value:', variable);
console.error('Error occurred:', error);

// Structured logging
console.log({
    event: 'user_login',
    userId: user.id,
    timestamp: new Date().toISOString()
});

// Conditional logging
if (process.env.DEBUG) {
    console.log('Debug info:', data);
}</code></pre>
            
            <h3>Using the Debugger Statement</h3>
            <pre><code>function processUser(user) {
    debugger; // Execution will pause here
    const processedUser = {
        ...user,
        fullName: \`\${user.firstName} \${user.lastName}\`
    };
    return processedUser;
}</code></pre>
            
            <h2>Chrome DevTools Integration</h2>
            <pre><code># Start Node.js with debugging
node --inspect server.js

# Or with inspect-brk for immediate break
node --inspect-brk server.js

# Open Chrome DevTools
# Navigate to chrome://inspect
# Click "Open dedicated DevTools for Node"</code></pre>
            
            <h2>VS Code Debugging</h2>
            <pre><code>// .vscode/launch.json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Launch Program",
            "program": "\${workspaceFolder}/server.js",
            "env": {
                "NODE_ENV": "development"
            },
            "console": "integratedTerminal"
        }
    ]
}</code></pre>
            
            <h2>Advanced Debugging Tools</h2>
            
            <h3>Node Inspector</h3>
            <pre><code>npm install -g node-inspector

# Start your app with --debug
node --debug server.js

# Start inspector
node-inspector

# Open http://127.0.0.1:8080/debug?port=5858</code></pre>
            
            <h3>Winston for Logging</h3>
            <pre><code>const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' })
    ]
});

// Use in your code
logger.info('User logged in', { userId: user.id });
logger.error('Database connection failed', { error: err.message });</code></pre>
            
            <h2>Memory Leak Detection</h2>
            <pre><code>// Memory usage monitoring
setInterval(() => {
    const usage = process.memoryUsage();
    console.log('Memory Usage:', {
        rss: Math.round(usage.rss / 1024 / 1024 * 100) / 100,
        heapTotal: Math.round(usage.heapTotal / 1024 / 1024 * 100) / 100,
        heapUsed: Math.round(usage.heapUsed / 1024 / 1024 * 100) / 100,
        external: Math.round(usage.external / 1024 / 1024 * 100) / 100
    });
}, 5000);

// Heap snapshot
const v8 = require('v8');
const snapshot = v8.getHeapSnapshot();
require('fs').writeFileSync('heapdump.heapsnapshot', snapshot);</code></pre>
            
            <h2>Performance Profiling</h2>
            <pre><code># CPU profiling
node --prof server.js

# Process profile
node --prof-process isolate-*.log > processed.txt

# Clinic.js for comprehensive profiling
npm install -g clinic
clinic doctor -- node server.js
clinic flame -- node server.js</code></pre>
            
            <h2>Error Handling Strategies</h2>
            <pre><code>// Global error handler
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Express error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        error: 'Something went wrong',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});</code></pre>
            
            <h2>Common Debugging Scenarios</h2>
            
            <h3>Async Function Debugging</h3>
            <pre><code>// Add logging to track async flow
async function fetchUserData(userId) {
    console.log('Starting fetchUserData for:', userId);
    
    try {
        const user = await User.findById(userId);
        console.log('Found user:', user.id);
        
        const posts = await Post.find({ userId });
        console.log('Found posts:', posts.length);
        
        return { user, posts };
    } catch (error) {
        console.error('Error in fetchUserData:', error);
        throw error;
    }
}</code></pre>
            
            <h3>Event Loop Debugging</h3>
            <pre><code>// Track event loop lag
let lastTime = Date.now();
setInterval(() => {
    const now = Date.now();
    const lag = now - lastTime;
    if (lag > 100) {
        console.warn('Event loop lag detected:', lag + 'ms');
    }
    lastTime = now;
}, 50);</code></pre>
            
            <h2>Best Practices</h2>
            <ul>
                <li>Use structured logging with different levels</li>
                <li>Implement comprehensive error handling</li>
                <li>Monitor memory usage and performance</li>
                <li>Use appropriate debugging tools for the situation</li>
                <li>Document debugging procedures for your team</li>
            </ul>
            
            <h2>Conclusion</h2>
            <p>Effective debugging is a skill that improves with practice. Master these tools and techniques to become more efficient at identifying and fixing issues in your Node.js applications.</p>
        `,
        excerpt: 'Master Node.js debugging with these essential tools and techniques. Learn about Chrome DevTools, VS Code debugger, and debugging best practices.',
        thumbnail: '/images/debugging-blog.jpg',
        category: 'advanced',
        tags: ['nodejs', 'debugging', 'troubleshooting', 'chrome-devtools', 'vscode'],
        readingTime: 17,
        views: 760,
        featured: false
    },
    {
        title: 'Node.js Best Practices for Production Applications',
        slug: 'nodejs-best-practices',
        metaDescription: 'Learn essential Node.js best practices for building production-ready applications. Covering code structure, error handling, security, and performance.',
        metaKeywords: ['nodejs', 'best-practices', 'production', 'architecture', 'javascript', 'patterns'],
        content: `
            <h1>Node.js Best Practices for Production Applications</h1>
            
            <h2>Project Structure and Organization</h2>
            <p>A well-organized project structure is essential for maintainability and scalability.</p>
            
            <h3>Recommended Folder Structure</h3>
            <pre><code>project/
  src/
    controllers/
    models/
    routes/
    middleware/
    services/
    utils/
    config/
  tests/
  docs/
  package.json
  server.js
  .env
  .gitignore</code></pre>
            
            <h2>Error Handling Best Practices</h2>
            <pre><code>// Create custom error classes
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = 'fail';
        this.isOperational = true;
        
        Error.captureStackTrace(this, this.constructor);
    }
}

// Centralized error handling middleware
const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    
    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, res);
    } else {
        sendErrorProd(err, res);
    }
};

// Async error wrapper
const catchAsync = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
};</code></pre>
            
            <h2>Security Best Practices</h2>
            <pre><code>// Input validation
const { body, validationResult } = require('express-validator');

const validateUser = [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 8 }).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

// Rate limiting
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP'
});

app.use('/api', limiter);</code></pre>
            
            <h2>Performance Best Practices</h2>
            
            <h3>Connection Pooling</h3>
            <pre><code>// Database connection pooling
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});</code></pre>
            
            <h3>Caching Strategy</h3>
            <pre><code>const Redis = require('redis');
const client = Redis.createClient();

const cache = (duration = 300) => {
    return async (req, res, next) => {
        const key = req.originalUrl;
        const cached = await client.get(key);
        
        if (cached) {
            return res.json(JSON.parse(cached));
        }
        
        res.sendResponse = res.json;
        res.json = (body) => {
            client.setex(key, duration, JSON.stringify(body));
            res.sendResponse(body);
        };
        
        next();
    };
};</code></pre>
            
            <h2>Code Quality Best Practices</h2>
            
            <h3>Use ESLint and Prettier</h3>
            <pre><code>// .eslintrc.js
module.exports = {
    env: {
        node: true,
        es2021: true
    },
    extends: ['eslint:recommended', '@typescript-eslint/recommended'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module'
    },
    rules: {
        'no-console': 'warn',
        'no-unused-vars': 'error',
        'prefer-const': 'error'
    }
};</code></pre>
            
            <h3>TypeScript Integration</h3>
            <pre><code>// tsconfig.json
{
    "compilerOptions": {
        "target": "ES2020",
        "module": "commonjs",
        "strict": true,
        "esModuleInterop": true,
        "skipLibCheck": true,
        "forceConsistentCasingInFileNames": true,
        "outDir": "./dist",
        "rootDir": "./src"
    },
    "include": ["src/**/*"],
    "exclude": ["node_modules", "dist"]
}</code></pre>
            
            <h2>Environment Configuration</h2>
            <pre><code>// config/database.js
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        
        console.log(\`MongoDB Connected: \${conn.connection.host}\`);
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
};

module.exports = connectDB;</code></pre>
            
            <h2>Logging and Monitoring</h2>
            <pre><code>const winston = require('winston');
const { ElasticsearchTransport } = require('winston-elasticsearch');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' }),
        new ElasticsearchTransport({
            level: 'info',
            clientOpts: {
                node: process.env.ELASTICSEARCH_URL
            },
            index: 'logs'
        })
    ]
});</code></pre>
            
            <h2>Testing Best Practices</h2>
            <pre><code>// Test structure
describe('UserService', () => {
    beforeEach(async () => {
        await setupTestDatabase();
    });
    
    afterEach(async () => {
        await cleanupTestDatabase();
    });
    
    describe('createUser', () => {
        it('should create a user with valid data', async () => {
            const userData = {
                email: 'test@example.com',
                password: 'password123'
            };
            
            const user = await UserService.createUser(userData);
            
            expect(user).toBeDefined();
            expect(user.email).toBe(userData.email);
            expect(user.password).not.toBe(userData.password); // Should be hashed
        });
        
        it('should throw error for duplicate email', async () => {
            // Test implementation
        });
    });
});</code></pre>
            
            <h2>API Design Best Practices</h2>
            <pre><code>// Consistent response format
const sendResponse = (res, statusCode, data, message = null) => {
    const response = {
        success: statusCode < 400,
        data,
        message
    };
    
    return res.status(statusCode).json(response);
};

// RESTful route naming
app.get('/api/v1/users');        // Get all users
app.get('/api/v1/users/:id');    // Get specific user
app.post('/api/v1/users');        // Create user
app.patch('/api/v1/users/:id');   // Update user
app.delete('/api/v1/users/:id');  // Delete user</code></pre>
            
            <h2>Documentation Best Practices</h2>
            <pre><code>// JSDoc comments
/**
 * Creates a new user in the database
 * @param {Object} userData - User data object
 * @param {string} userData.email - User email address
 * @param {string} userData.password - User password (will be hashed)
 * @returns {Promise<Object>} Created user object
 * @throws {Error} If email already exists
 */
const createUser = async (userData) => {
    // Implementation
};</code></pre>
            
            <h2>Conclusion</h2>
            <p>Following these best practices will help you build robust, maintainable, and scalable Node.js applications. Remember that best practices evolve over time, so stay updated with the latest recommendations from the Node.js community.</p>
        `,
        excerpt: 'Learn essential Node.js best practices for building production-ready applications. Covering code structure, error handling, security, and performance.',
        thumbnail: '/images/best-practices-blog.jpg',
        category: 'advanced',
        tags: ['nodejs', 'best-practices', 'production', 'architecture'],
        readingTime: 22,
        views: 1320,
        featured: false
    },
    {
        title: 'Asynchronous Programming in Node.js: Promises, Async/Await',
        slug: 'nodejs-async-programming',
        metaDescription: 'Master asynchronous programming in Node.js. Learn about callbacks, promises, async/await, and handling complex async operations.',
        metaKeywords: ['nodejs', 'async', 'promises', 'async-await', 'callbacks', 'javascript'],
        content: `
            <h1>Asynchronous Programming in Node.js: Promises, Async/Await</h1>
            
            <h2>Understanding Asynchronous Programming</h2>
            <p>Asynchronous programming is fundamental to Node.js. It allows Node.js to handle many operations concurrently without blocking the event loop.</p>
            
            <h2>The Evolution of Async in JavaScript</h2>
            <ul>
                <li><strong>Callbacks:</strong> The original approach</li>
                <li><strong>Promises:</strong> Better error handling and composition</li>
                <li><strong>Async/Await:</strong> Syntactic sugar over promises</li>
            </ul>
            
            <h2>Callback Pattern</h2>
            <pre><code>// Callback pattern (old way)
function fetchData(callback) {
    setTimeout(() => {
        callback(null, 'Data fetched');
    }, 1000);
}

fetchData((error, data) => {
    if (error) {
        console.error(error);
        return;
    }
    console.log(data);
});

// Callback hell (pyramid of doom)
getUser((user) => {
    getPosts(user.id, (posts) => {
        getComments(posts[0].id, (comments) => {
            console.log(comments);
        });
    });
});</code></pre>
            
            <h2>Promise Basics</h2>
            <pre><code>// Creating a promise
function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Data fetched');
        }, 1000);
    });
}

// Using promises
fetchData()
    .then(data => console.log(data))
    .catch(error => console.error(error));

// Promise chaining
fetchData()
    .then(data => processData(data))
    .then(processedData => saveData(processedData))
    .catch(error => console.error(error));</code></pre>
            
            <h2>Promise Methods</h2>
            <pre><code>// Promise.all - All promises must resolve
Promise.all([
    fetchUser(),
    fetchPosts(),
    fetchComments()
])
    .then(([user, posts, comments]) => {
        console.log('All data fetched');
    })
    .catch(error => console.error('One failed:', error));

// Promise.race - First promise to settle
Promise.race([
    fetchFromCache(),
    fetchFromServer()
])
    .then(data => console.log('Fastest response:', data));

// Promise.allSettled - All promises settle (resolve or reject)
Promise.allSettled([
    fetchUser(),
    fetchPosts(),
    fetchComments()
])
    .then(results => {
        results.forEach(result => {
            if (result.status === 'fulfilled') {
                console.log('Success:', result.value);
            } else {
                console.log('Failed:', result.reason);
            }
        });
    });</code></pre>
            
            <h2>Async/Await Syntax</h2>
            <pre><code>// Async function declaration
async function fetchAllData() {
    try {
        const user = await fetchUser();
        const posts = await fetchPosts();
        const comments = await fetchComments();
        
        return { user, posts, comments };
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

// Arrow async function
const processData = async (data) => {
    const processed = await transformData(data);
    return processed;
};

// Using async/await
fetchAllData()
    .then(data => console.log(data))
    .catch(error => console.error(error));</code></pre>
            
            <h2>Parallel Execution with Async/Await</h2>
            <pre><code>// Sequential (slow)
async function fetchSequentially() {
    const user = await fetchUser();
    const posts = await fetchPosts();
    const comments = await fetchComments();
    return { user, posts, comments };
}

// Parallel (fast)
async function fetchInParallel() {
    const [user, posts, comments] = await Promise.all([
        fetchUser(),
        fetchPosts(),
        fetchComments()
    ]);
    return { user, posts, comments };
}

// Parallel with error handling
async function fetchWithErrorHandling() {
    const results = await Promise.allSettled([
        fetchUser(),
        fetchPosts(),
        fetchComments()
    ]);
    
    return results.map(result => 
        result.status === 'fulfilled' ? result.value : null
    );
}</code></pre>
            
            <h2>Error Handling Patterns</h2>
            <pre><code>// Try-catch with async/await
async function handleRequest(req, res) {
    try {
        const data = await fetchData(req.params.id);
        res.json(data);
    } catch (error) {
        if (error.code === 'NOT_FOUND') {
            res.status(404).json({ error: 'Resource not found' });
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

// Higher-order error handler
const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};

// Usage in Express
app.get('/users/:id', asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    res.json(user);
}));</code></pre>
            
            <h2>Advanced Patterns</h2>
            
            <h3>Promise Cancellation</h3>
            <pre><code>class CancelablePromise {
    constructor(executor) {
        this.isCanceled = false;
        
        const promise = new Promise((resolve, reject) => {
            executor(
                value => this.isCanceled ? reject({ canceled: true }) : resolve(value),
                error => this.isCanceled ? reject({ canceled: true }) : reject(error)
            );
        });
        
        this.promise = promise;
    }
    
    cancel() {
        this.isCanceled = true;
    }
    
    then(...args) {
        return this.promise.then(...args);
    }
    
    catch(...args) {
        return this.promise.catch(...args);
    }
}</code></pre>
            
            <h3>Async Iterators</h3>
            <pre><code>async function* fetchPages(url) {
    let page = 1;
    let hasMore = true;
    
    while (hasMore) {
        const response = await fetch(\`\${url}?page=\${page}\`);
        const data = await response.json();
        
        yield data;
        
        hasMore = data.hasMore;
        page++;
    }
}

// Using async iterator
for await (const page of fetchPages('/api/data')) {
    console.log('Page:', page);
}</code></pre>
            
            <h3>Timeout with Promise</h3>
            <pre><code>function withTimeout(promise, timeout) {
    return Promise.race([
        promise,
        new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Timeout')), timeout)
        )
    ]);
}

// Usage
const result = await withTimeout(fetchData(), 5000);</code></pre>
            
            <h2>Best Practices</h2>
            <ul>
                <li>Prefer async/await over .then() chains for readability</li>
                <li>Always handle errors in async operations</li>
                <li>Use Promise.all() for parallel independent operations</li>
                <li>Avoid mixing callbacks and promises</li>
                <li>Be careful with unhandled promise rejections</li>
            </ul>
            
            <h2>Common Pitfalls</h2>
            <pre><code>// Pitfall 1: Not awaiting in loops
// Bad
for (const item of items) {
    await processItem(item); // Sequential processing
}

// Good
const promises = items.map(item => processItem(item));
await Promise.all(promises); // Parallel processing

// Pitfall 2: Forgetting await
// Bad
const result = fetchData(); // Returns promise, not data

// Good
const result = await fetchData(); // Returns actual data

// Pitfall 3: Mixing sync and async
// Bad
function processData() {
    const data = fetchData(); // Returns promise
    return data.someProperty; // undefined
}

// Good
async function processData() {
    const data = await fetchData();
    return data.someProperty;
}</code></pre>
            
            <h2>Conclusion</h2>
            <p>Mastering asynchronous programming is essential for Node.js development. Modern async/await syntax makes asynchronous code more readable and maintainable, while still providing the power and flexibility of promises.</p>
        `,
        excerpt: 'Master asynchronous programming in Node.js. Learn about callbacks, promises, async/await, and handling complex async operations.',
        thumbnail: '/images/async-programming-blog.jpg',
        category: 'basics',
        tags: ['nodejs', 'async', 'promises', 'async-await', 'callbacks'],
        readingTime: 19,
        views: 1180,
        featured: false
    },
    {
        title: 'File System Operations in Node.js',
        slug: 'nodejs-file-system',
        metaDescription: 'Learn file system operations in Node.js. Cover reading, writing, file streams, directory operations, and best practices for file handling.',
        metaKeywords: ['nodejs', 'file-system', 'fs', 'file-operations', 'javascript', 'io'],
        content: `
            <h1>File System Operations in Node.js</h1>
            
            <h2>Introduction to File System Module</h2>
            <p>The Node.js File System (fs) module provides an API for interacting with the file system. It supports both synchronous and asynchronous operations.</p>
            
            <h2>Basic File Operations</h2>
            
            <h3>Reading Files</h3>
            <pre><code>const fs = require('fs');
const path = require('path');

// Asynchronous file reading
fs.readFile('example.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    console.log('File content:', data);
});

// Synchronous file reading (use with caution)
try {
    const data = fs.readFileSync('example.txt', 'utf8');
    console.log('File content:', data);
} catch (err) {
    console.error('Error reading file:', err);
}

// Using promises (Node.js 10+)
const fsPromises = require('fs').promises;

async function readFileAsync() {
    try {
        const data = await fsPromises.readFile('example.txt', 'utf8');
        console.log('File content:', data);
    } catch (err) {
        console.error('Error reading file:', err);
    }
}</code></pre>
            
            <h3>Writing Files</h3>
            <pre><code>// Asynchronous writing
fs.writeFile('output.txt', 'Hello, World!', 'utf8', (err) => {
    if (err) {
        console.error('Error writing file:', err);
        return;
    }
    console.log('File written successfully');
});

// Appending to file
fs.appendFile('output.txt', '\\nAppended text', 'utf8', (err) => {
    if (err) console.error('Error appending:', err);
    else console.log('Text appended');
});

// Synchronous writing
try {
    fs.writeFileSync('sync-output.txt', 'Synchronous write');
} catch (err) {
    console.error('Error writing file:', err);
}</code></pre>
            
            <h2>Working with File Streams</h2>
            <pre><code>// Reading large files with streams
const readableStream = fs.createReadStream('large-file.txt');

readableStream.on('data', (chunk) => {
    console.log(\`Received \${chunk.length} bytes of data\`);
});

readableStream.on('end', () => {
    console.log('Finished reading file');
});

readableStream.on('error', (err) => {
    console.error('Error reading file:', err);
});

// Writing with streams
const writableStream = fs.createWriteStream('output.txt');

writableStream.write('First chunk\\n');
writableStream.write('Second chunk\\n');
writableStream.end('Final chunk');

// Piping streams
const readStream = fs.createReadStream('input.txt');
const writeStream = fs.createWriteStream('output.txt');

readStream.pipe(writeStream);</code></pre>
            
            <h2>Directory Operations</h2>
            <pre><code>// Creating directory
fs.mkdir('new-directory', (err) => {
    if (err) console.error('Error creating directory:', err);
    else console.log('Directory created');
});

// Creating directory recursively
fs.mkdir('path/to/nested/directory', { recursive: true }, (err) => {
    if (err) console.error('Error:', err);
    else console.log('Directory created recursively');
});

// Reading directory contents
fs.readdir('.', (err, files) => {
    if (err) console.error('Error reading directory:', err);
    else console.log('Directory contents:', files);
});

// Removing directory
fs.rmdir('empty-directory', (err) => {
    if (err) console.error('Error removing directory:', err);
    else console.log('Directory removed');
});

// Removing directory recursively (Node.js 12+)
fs.rm('directory-to-remove', { recursive: true }, (err) => {
    if (err) console.error('Error removing directory:', err);
    else console.log('Directory removed recursively');
});</code></pre>
            
            <h2>File Information and Metadata</h2>
            <pre><code>// Getting file statistics
fs.stat('example.txt', (err, stats) => {
    if (err) {
        console.error('Error getting file stats:', err);
        return;
    }
    
    console.log('File stats:', {
        isFile: stats.isFile(),
        isDirectory: stats.isDirectory(),
        size: stats.size,
        created: stats.birthtime,
        modified: stats.mtime,
        accessed: stats.atime
    });
});

// Checking if file exists
fs.access('example.txt', fs.constants.F_OK, (err) => {
    if (err) {
        console.log('File does not exist');
    } else {
        console.log('File exists');
    }
});

// Checking file permissions
fs.access('example.txt', fs.constants.R_OK | fs.constants.W_OK, (err) => {
    if (err) {
        console.log('No read/write permission');
    } else {
        console.log('Has read/write permission');
    }
});</code></pre>
            
            <h2>Path Operations</h2>
            <pre><code>const path = require('path');

// Joining paths
const fullPath = path.join('folder', 'subfolder', 'file.txt');
console.log('Full path:', fullPath);

// Getting directory name
const dir = path.dirname('/path/to/file.txt');
console.log('Directory:', dir); // /path/to

// Getting file name
const filename = path.basename('/path/to/file.txt');
console.log('Filename:', filename); // file.txt

// Getting file extension
const ext = path.extname('/path/to/file.txt');
console.log('Extension:', ext); // .txt

// Parsing path
const parsed = path.parse('/path/to/file.txt');
console.log('Parsed path:', {
    root: parsed.root,
    dir: parsed.dir,
    base: parsed.base,
    name: parsed.name,
    ext: parsed.ext
});</code></pre>
            
            <h2>Advanced File Operations</h2>
            
            <h3>Watching Files</h3>
            <pre><code>// Watching file for changes
fs.watchFile('example.txt', (curr, prev) => {
    console.log('File changed!');
    console.log('Previous mtime:', prev.mtime);
    console.log('Current mtime:', curr.mtime);
});

// Watching directory
fs.watch('.', (eventType, filename) => {
    console.log(\`Event type: \${eventType}\`);
    console.log(\`Filename: \${filename}\`);
});</code></pre>
            
            <h3>Working with Temporary Files</h3>
            <pre><code>const os = require('os');
const path = require('path');

// Create temporary file path
const tempDir = os.tmpdir();
const tempFile = path.join(tempDir, 'temp-file.txt');

// Write to temporary file
fs.writeFileSync(tempFile, 'Temporary data');

// Clean up when done
process.on('exit', () => {
    fs.unlinkSync(tempFile);
});</code></pre>
            
            <h3>File Copying</h3>
            <pre><code>// Simple file copy
function copyFile(source, destination, callback) {
    const readStream = fs.createReadStream(source);
    const writeStream = fs.createWriteStream(destination);
    
    readStream.pipe(writeStream)
        .on('finish', callback)
        .on('error', callback);
}

// Using built-in copyFile (Node.js 8.5+)
fs.copyFile('source.txt', 'destination.txt', (err) => {
    if (err) console.error('Error copying file:', err);
    else console.log('File copied successfully');
});</code></pre>
            
            <h2>Best Practices</h2>
            
            <h3>Error Handling</h3>
            <pre><code>// Always handle file operation errors
async function safeFileOperation() {
    try {
        const data = await fsPromises.readFile('config.json', 'utf8');
        const config = JSON.parse(data);
        return config;
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log('Config file not found, using defaults');
            return defaultConfig;
        } else if (error.code === 'EACCES') {
            console.error('Permission denied reading config file');
            throw error;
        } else {
            console.error('Unexpected error:', error);
            throw error;
        }
    }
}</code></pre>
            
            <h3>Resource Management</h3>
            <pre><code>// Always close file handles
function readFileWithHandle(filePath) {
    return new Promise((resolve, reject) => {
        const fd = fs.open(filePath, 'r', (err, fd) => {
            if (err) {
                reject(err);
                return;
            }
            
            fs.readFile(fd, 'utf8', (err, data) => {
                fs.close(fd, (closeErr) => {
                    if (err) reject(err);
                    else if (closeErr) reject(closeErr);
                    else resolve(data);
                });
            });
        });
    });
}</code></pre>
            
            <h2>Performance Considerations</h2>
            <ul>
                <li>Use streams for large files to avoid memory issues</li>
                <li>Prefer asynchronous operations over synchronous ones</li>
                <li>Use appropriate buffer sizes for optimal performance</li>
                <li>Consider using worker threads for CPU-intensive file operations</li>
            </ul>
            
            <h2>Conclusion</h2>
            <p>The Node.js File System module provides comprehensive tools for working with files and directories. Understanding these operations and following best practices will help you build robust applications that handle file operations efficiently and safely.</p>
        `,
        excerpt: 'Learn file system operations in Node.js. Cover reading, writing, file streams, directory operations, and best practices for file handling.',
        thumbnail: '/images/file-system-blog.jpg',
        category: 'basics',
        tags: ['nodejs', 'file-system', 'fs', 'file-operations', 'io'],
        readingTime: 16,
        views: 920,
        featured: false
    },
    {
        title: 'Error Handling in Node.js: Best Practices and Patterns',
        slug: 'nodejs-error-handling',
        metaDescription: 'Master error handling in Node.js applications. Learn about error types, handling patterns, middleware, and building robust error management.',
        metaKeywords: ['nodejs', 'error-handling', 'exceptions', 'robust-code', 'javascript', 'patterns'],
        content: `
            <h1>Error Handling in Node.js: Best Practices and Patterns</h1>
            
            <h2>Understanding Error Types in Node.js</h2>
            <p>Node.js applications can encounter various types of errors. Understanding these error types is crucial for effective error handling.</p>
            
            <h2>Types of Errors</h2>
            <ul>
                <li><strong>Synchronous Errors:</strong> Thrown immediately and can be caught with try-catch</li>
                <li><strong>Asynchronous Errors:</strong> Occur in callbacks, promises, or async operations</li>
                <li><strong>Operational Errors:</strong> Runtime problems that are expected</li>
                <li><strong>Programmer Errors:</strong> Bugs in the code that should be fixed</li>
            </ul>
            
            <h2>Basic Error Handling Patterns</h2>
            
            <h3>Try-Catch for Synchronous Code</h3>
            <pre><code>try {
    const result = JSON.parse(invalidJson);
    console.log(result);
} catch (error) {
    console.error('JSON parsing failed:', error.message);
    // Handle the error appropriately
}

// With async/await
async function processData() {
    try {
        const data = await fetchData();
        const processed = await transformData(data);
        return processed;
    } catch (error) {
        console.error('Processing failed:', error);
        throw new AppError('Data processing failed', 500);
    }
}</code></pre>
            
            <h3>Callback Error Pattern</h3>
            <pre><code>function readFileAsync(filePath, callback) {
    fs.readFile(filePath, 'utf8', (error, data) => {
        if (error) {
            // Always pass error as first argument
            return callback(error);
        }
        
        // Pass null for error if successful
        callback(null, data);
    });
}

// Usage
readFileAsync('file.txt', (error, data) => {
    if (error) {
        console.error('Failed to read file:', error);
        return;
    }
    
    console.log('File content:', data);
});</code></pre>
            
            <h3>Promise Error Handling</h3>
            <pre><code>// Using .catch()
fetchData()
    .then(data => processData(data))
    .then(result => saveResult(result))
    .catch(error => {
        console.error('Operation failed:', error);
        // Handle error
    });

// Using Promise.catch() with specific handling
fetchData()
    .catch(error => {
        if (error.code === 'ENOENT') {
            throw new AppError('File not found', 404);
        } else if (error.code === 'EACCES') {
            throw new AppError('Permission denied', 403);
        } else {
            throw new AppError('Internal server error', 500);
        }
    });</code></pre>
            
            <h2>Custom Error Classes</h2>
            <pre><code>// Base custom error class
class AppError extends Error {
    constructor(message, statusCode, isOperational = true) {
        super(message);
        
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        this.status = \`\${statusCode}\`.startsWith('4') ? 'fail' : 'error';
        
        Error.captureStackTrace(this, this.constructor);
    }
}

// Specific error classes
class ValidationError extends AppError {
    constructor(message, field) {
        super(message, 400);
        this.field = field;
    }
}

class DatabaseError extends AppError {
    constructor(message, originalError) {
        super(message, 500);
        this.originalError = originalError;
    }
}

class AuthenticationError extends AppError {
    constructor(message = 'Authentication failed') {
        super(message, 401);
    }
}

// Usage
function validateUser(userData) {
    if (!userData.email) {
        throw new ValidationError('Email is required', 'email');
    }
    
    if (!userData.password) {
        throw new ValidationError('Password is required', 'password');
    }
}</code></pre>
            
            <h2>Express.js Error Handling</h2>
            
            <h3>Global Error Handler Middleware</h3>
            <pre><code>const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    
    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, res);
    } else {
        sendErrorProd(err, res);
    }
};

const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    });
};

const sendErrorProd = (err, res) => {
    // Operational, trusted error: send message to client
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });
    } else {
        // Programming or other unknown error: don't leak error details
        console.error('ERROR:', err);
        res.status(500).json({
            status: 'error',
            message: 'Something went wrong!'
        });
    }
};

// Apply to Express app
app.use(globalErrorHandler);</code></pre>
            
            <h3>Async Error Wrapper</h3>
            <pre><code>// Higher-order function to catch async errors
const catchAsync = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};

// Usage in routes
app.get('/users/:id', catchAsync(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    
    if (!user) {
        return next(new AppError('No user found with that ID', 404));
    }
    
    res.status(200).json({
        status: 'success',
        data: {
            user
        }
    });
}));</code></pre>
            
            <h2>Database Error Handling</h2>
            <pre><code>// MongoDB error handling
const handleCastErrorDB = (err) => {
    const message = \`Invalid \${err.path}: \${err.value}\`;
    return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
    const value = err.errmsg.match(/(["'])(\\?.)*?\\1/)[0];
    const message = \`Duplicate field value: \${value}. Please use another value!\`;
    return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
    const errors = Object.values(err.errors).map(el => el.message);
    const message = \`Invalid input data. \${errors.join('. ')}\`;
    return new AppError(message, 400);
};</code></pre>
            
            <h2>Uncaught Exception and Unhandled Rejection</h2>
            <pre><code>// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.log('UNCAUGHT EXCEPTION! Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.log('UNHANDLED REJECTION! Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});</code></pre>
            
            <h2>Logging and Monitoring Errors</h2>
            <pre><code>const winston = require('winston');

// Create logger
const logger = winston.createLogger({
    level: 'error',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({ filename: 'logs/error.log' }),
        new winston.transports.Console()
    ]
});

// Error logging middleware
const errorLogger = (err, req, res, next) => {
    logger.error({
        message: err.message,
        stack: err.stack,
        url: req.url,
        method: req.method,
        ip: req.ip,
        userAgent: req.get('User-Agent')
    });
    
    next(err);
};</code></pre>
            
            <h2>Graceful Shutdown</h2>
            <pre><code>// Graceful shutdown handler
const gracefulShutdown = (signal) => {
    console.log(\`\${signal} received. Shutting down gracefully...\`);
    
    // Close database connections
    mongoose.connection.close(() => {
        console.log('MongoDB connection closed');
        process.exit(0);
    });
    
    // Close server
    server.close(() => {
        console.log('HTTP server closed');
        process.exit(0);
    });
    
    // Force shutdown after 10 seconds
    setTimeout(() => {
        console.error('Could not close connections in time, forcefully shutting down');
        process.exit(1);
    }, 10000);
};

// Listen for shutdown signals
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));</code></pre>
            
            <h2>Best Practices</h2>
            
            <h3>1. Always Handle Errors</h3>
            <pre><code>// Bad: No error handling
fs.readFile('file.txt', 'utf8', (err, data) => {
    console.log(data); // Might crash if err exists
});

// Good: Proper error handling
fs.readFile('file.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    console.log(data);
});</code></pre>
            
            <h3>2. Be Specific with Error Types</h3>
            <pre><code>// Bad: Generic error handling
try {
    // some operation
} catch (error) {
    console.log('Something went wrong');
}

// Good: Specific error handling
try {
    // some operation
} catch (error) {
    if (error instanceof ValidationError) {
        // Handle validation error
    } else if (error instanceof DatabaseError) {
        // Handle database error
    } else {
        // Handle other errors
    }
}</code></pre>
            
            <h3>3. Don't Ignore Errors</h3>
            <pre><code>// Bad: Silent errors
try {
    dangerousOperation();
} catch (error) {
    // Error ignored
}

// Good: Log or handle errors
try {
    dangerousOperation();
} catch (error) {
    logger.error('Operation failed:', error);
    // Handle error appropriately
}</code></pre>
            
            <h2>Conclusion</h2>
            <p>Effective error handling is crucial for building robust Node.js applications. By implementing these patterns and best practices, you can create applications that handle errors gracefully and provide better user experiences.</p>
        `,
        excerpt: 'Master error handling in Node.js applications. Learn about error types, handling patterns, middleware, and building robust error management.',
        thumbnail: '/images/error-handling-blog.jpg',
        category: 'advanced',
        tags: ['nodejs', 'error-handling', 'exceptions', 'robust-code'],
        readingTime: 21,
        views: 1560,
        featured: false
    },
    {
        title: 'Building Microservices with Node.js',
        slug: 'nodejs-microservices',
        metaDescription: 'Learn to build microservices architecture with Node.js. Cover service design, communication patterns, deployment, and best practices.',
        metaKeywords: ['nodejs', 'microservices', 'architecture', 'distributed-systems', 'api-gateway', 'docker'],
        content: `
            <h1>Building Microservices with Node.js</h1>
            
            <h2>Understanding Microservices Architecture</h2>
            <p>Microservices architecture breaks down applications into small, independent services that communicate over APIs. Each service focuses on a specific business capability.</p>
            
            <h2>Benefits of Microservices</h2>
            <ul>
                <li><strong>Scalability:</strong> Individual services can be scaled independently</li>
                <li><strong>Flexibility:</strong> Different services can use different technologies</li>
                <li><strong>Resilience:</strong> Failure in one service doesn't bring down the entire system</li>
                <li><strong>Team Autonomy:</strong> Teams can work on services independently</li>
            </ul>
            
            <h2>Designing Microservices</h2>
            
            <h3>Service Boundaries</h3>
            <pre><code>// User Service
class UserService {
    async createUser(userData) {
        const user = new User(userData);
        await user.save();
        
        // Publish event
        await this.eventBus.publish('user.created', {
            userId: user._id,
            email: user.email
        });
        
        return user;
    }
    
    async getUserById(userId) {
        return User.findById(userId);
    }
}

// Order Service
class OrderService {
    async createOrder(orderData) {
        // Validate user exists
        const user = await this.userService.getUserById(orderData.userId);
        if (!user) {
            throw new Error('User not found');
        }
        
        const order = new Order(orderData);
        await order.save();
        
        // Update user stats
        await this.userService.updateOrderCount(orderData.userId);
        
        return order;
    }
}</code></pre>
            
            <h3>API Gateway Pattern</h3>
            <pre><code>// API Gateway using Express
const express = require('express');
const axios = require('axios');
const app = express();

// Route to user service
app.get('/api/users/:id', async (req, res) => {
    try {
        const response = await axios.get(\`http://user-service:3001/users/\${req.params.id}\`);
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({
            error: 'User service unavailable'
        });
    }
});

// Route to order service
app.get('/api/orders/:id', async (req, res) => {
    try {
        const response = await axios.get(\`http://order-service:3002/orders/\${req.params.id}\`);
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({
            error: 'Order service unavailable'
        });
    }
});

// Composite endpoint
app.get('/api/users/:id/orders', async (req, res) => {
    try {
        const [userResponse, ordersResponse] = await Promise.all([
            axios.get(\`http://user-service:3001/users/\${req.params.id}\`),
            axios.get(\`http://order-service:3002/orders?userId=\${req.params.id}\`)
        ]);
        
        res.json({
            user: userResponse.data,
            orders: ordersResponse.data
        });
    } catch (error) {
        res.status(500).json({
            error: 'Failed to fetch user and orders'
        });
    }
});</code></pre>
            
            <h2>Service Communication Patterns</h2>
            
            <h3>Synchronous Communication</h3>
            <pre><code>// HTTP client for service communication
class ServiceClient {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
        this.client = axios.create({
            timeout: 5000,
            retries: 3
        });
    }
    
    async get(endpoint) {
        try {
            const response = await this.client.get(\`\${this.baseUrl}\${endpoint}\`);
            return response.data;
        } catch (error) {
            if (error.code === 'ECONNREFUSED') {
                throw new ServiceUnavailableError('Service is down');
            }
            throw error;
        }
    }
    
    async post(endpoint, data) {
        const response = await this.client.post(\`\${this.baseUrl}\${endpoint}\`, data);
        return response.data;
    }
}

// Usage
const userService = new ServiceClient('http://user-service:3001');
const user = await userService.get('/users/123');</code></pre>
            
            <h3>Asynchronous Communication</h3>
            <pre><code>// Event Bus using Redis
const Redis = require('ioredis');
const EventEmitter = require('events');

class EventBus extends EventEmitter {
    constructor() {
        super();
        this.publisher = new Redis(process.env.REDIS_URL);
        this.subscriber = new Redis(process.env.REDIS_URL);
        
        this.subscriber.subscribe('events');
        this.subscriber.on('message', (channel, message) => {
            const event = JSON.parse(message);
            this.emit(event.type, event.data);
        });
    }
    
    async publish(eventType, data) {
        const event = {
            type: eventType,
            data,
            timestamp: new Date().toISOString(),
            id: generateId()
        };
        
        await this.publisher.publish('events', JSON.stringify(event));
    }
}

// Usage in service
const eventBus = new EventBus();

// Publish event
await eventBus.publish('order.created', {
    orderId: '123',
    userId: '456',
    amount: 99.99
});

// Listen for events
eventBus.on('order.created', async (data) => {
    await sendOrderConfirmationEmail(data.userId, data.orderId);
});</code></pre>
            
            <h2>Data Management</h2>
            
            <h3>Database per Service</h3>
            <pre><code>// Each service has its own database
// User Service Database
const userDb = mongoose.createConnection(process.env.USER_DB_URL);

const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    createdAt: { type: Date, default: Date.now }
});

const User = userDb.model('User', UserSchema);

// Order Service Database
const orderDb = mongoose.createConnection(process.env.ORDER_DB_URL);

const OrderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    items: [OrderItemSchema],
    total: Number,
    status: { type: String, enum: ['pending', 'completed', 'cancelled'] },
    createdAt: { type: Date, default: Date.now }
});

const Order = orderDb.model('Order', OrderSchema);</code></pre>
            
            <h3>Data Synchronization</h3>
            <pre><code>// Event-driven data synchronization
eventBus.on('user.updated', async (userData) => {
    // Update user data in search service
    await searchService.updateUser(userData);
    
    // Update user data in analytics service
    await analyticsService.updateUser(userData);
});

// CQRS pattern
class UserQueryService {
    async getUserById(userId) {
        return UserReadModel.findById(userId);
    }
}

class UserCommandService {
    async updateUser(userId, updateData) {
        const user = await UserWriteModel.findByIdAndUpdate(userId, updateData);
        
        // Update read model
        await UserReadModel.findByIdAndUpdate(userId, updateData);
        
        // Publish event
        await eventBus.publish('user.updated', {
            userId,
            ...updateData
        });
        
        return user;
    }
}</code></pre>
            
            <h2>Service Discovery</h2>
            <pre><code>// Simple service registry
class ServiceRegistry {
    constructor() {
        this.services = new Map();
    }
    
    register(serviceName, serviceUrl) {
        this.services.set(serviceName, {
            url: serviceUrl,
            registeredAt: new Date(),
            health: 'healthy'
        });
    }
    
    discover(serviceName) {
        const service = this.services.get(serviceName);
        if (!service) {
            throw new Error(\`Service \${serviceName} not found\`);
        }
        return service.url;
    }
    
    async healthCheck() {
        for (const [name, service] of this.services) {
            try {
                await axios.get(\`\${service.url}/health\`);
                service.health = 'healthy';
            } catch (error) {
                service.health = 'unhealthy';
            }
        }
    }
}

// Usage
const registry = new ServiceRegistry();
registry.register('user-service', 'http://user-service:3001');
registry.register('order-service', 'http://order-service:3002');</code></pre>
            
            <h2>Containerization and Deployment</h2>
            
            <h3>Docker Configuration</h3>
            <pre><code># Dockerfile for microservice
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

USER node

CMD ["node", "server.js"]</code></pre>
            
            <h3>Docker Compose for Development</h3>
            <pre><code># docker-compose.yml
version: '3.8'

services:
  api-gateway:
    build: ./api-gateway
    ports:
      - "3000:3000"
    depends_on:
      - user-service
      - order-service
      - redis
    environment:
      - REDIS_URL=redis://redis:6379

  user-service:
    build: ./user-service
    ports:
      - "3001:3001"
    environment:
      - DATABASE_URL=mongodb://mongo:27017/users
      - REDIS_URL=redis://redis:6379
    depends_on:
      - mongo
      - redis

  order-service:
    build: ./order-service
    ports:
      - "3002:3002"
    environment:
      - DATABASE_URL=mongodb://mongo:27017/orders
      - REDIS_URL=redis://redis:6379
    depends_on:
      - mongo
      - redis

  redis:
    image: redis:6-alpine
    ports:
      - "6379:6379"

  mongo:
    image: mongo:4.4
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

volumes:
  mongo-data:</code></pre>
            
            <h2>Monitoring and Logging</h2>
            <pre><code>// Distributed tracing
const opentelemetry = require('@opentelemetry/api');
const { NodeSDK } = require('@opentelemetry/sdk-node');
const { JaegerExporter } = require('@opentelemetry/exporter-jaeger');

const sdk = new NodeSDK({
    traceExporter: new JaegerExporter({
        endpoint: 'http://jaeger:14268/api/traces'
    })
});

sdk.start();

// Instrumented service call
async function getUserById(userId) {
    const tracer = opentelemetry.trace.getTracer('user-service');
    const span = tracer.startSpan('getUserById');
    
    try {
        const user = await User.findById(userId);
        span.setAttributes({
            'user.id': userId,
            'user.found': !!user
        });
        return user;
    } catch (error) {
        span.recordException(error);
        throw error;
    } finally {
        span.end();
    }
}</code></pre>
            
            <h2>Best Practices</h2>
            
            <h3>1. Keep Services Small and Focused</h3>
            <ul>
                <li>Each service should have a single responsibility</li>
                <li>Avoid creating services that are too large or too small</li>
                <li>Use domain-driven design to identify service boundaries</li>
            </ul>
            
            <h3>2. Design for Failure</h3>
            <ul>
                <li>Implement circuit breakers</li>
                <li>Use retries with exponential backoff</li>
                <li>Implement graceful degradation</li>
            </ul>
            
            <h3>3. Use Asynchronous Communication</h3>
            <ul>
                <li>Prefer event-driven communication over synchronous</li>
                <li>Use message queues for decoupling services</li>
                <li>Implement idempotent operations</li>
            </ul>
            
            <h2>Conclusion</h2>
            <p>Building microservices with Node.js requires careful planning and design. By following these patterns and best practices, you can create scalable, resilient, and maintainable distributed systems.</p>
        `,
        excerpt: 'Learn to build microservices architecture with Node.js. Cover service design, communication patterns, deployment, and best practices.',
        thumbnail: '/images/microservices-blog.jpg',
        category: 'advanced',
        tags: ['nodejs', 'microservices', 'architecture', 'distributed-systems'],
        readingTime: 25,
        views: 980,
        featured: false
    },
    {
        title: 'Real-time Applications with Node.js and WebSockets',
        slug: 'nodejs-websockets',
        metaDescription: 'Build real-time applications with Node.js and WebSockets. Learn about Socket.IO, real-time communication patterns, and building chat apps.',
        metaKeywords: ['nodejs', 'websockets', 'socket.io', 'real-time', 'chat', 'javascript'],
        content: `
            <h1>Real-time Applications with Node.js and WebSockets</h1>
            
            <h2>Understanding Real-time Communication</h2>
            <p>Real-time applications enable instant communication between clients and servers. WebSockets provide a persistent, bidirectional communication channel perfect for real-time features.</p>
            
            <h2>WebSockets vs HTTP</h2>
            <ul>
                <li><strong>HTTP:</strong> Request-response pattern, stateless</li>
                <li><strong>WebSockets:</strong> Persistent connection, bidirectional, stateful</li>
                <li><strong>Use Cases:</strong> Chat apps, live updates, collaborative tools, gaming</li>
            </ul>
            
            <h2>Setting Up WebSockets with Node.js</h2>
            
            <h3>Basic WebSocket Server</h3>
            <pre><code>const WebSocket = require('ws');

// Create WebSocket server
const wss = new WebSocket.Server({ port: 8080 });

console.log('WebSocket server started on port 8080');

// Handle connections
wss.on('connection', (ws) => {
    console.log('New client connected');
    
    // Send welcome message
    ws.send('Welcome to the WebSocket server!');
    
    // Handle messages from client
    ws.on('message', (message) => {
        console.log('Received:', message.toString());
        
        // Echo message back to client
        ws.send(\`Echo: \${message}\`);
    });
    
    // Handle connection close
    ws.on('close', () => {
        console.log('Client disconnected');
    });
    
    // Handle errors
    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
    });
});</code></pre>
            
            <h3>WebSocket Client</h3>
            <pre><code>// Client-side JavaScript
const ws = new WebSocket('ws://localhost:8080');

ws.onopen = () => {
    console.log('Connected to WebSocket server');
    
    // Send message to server
    ws.send('Hello, server!');
};

ws.onmessage = (event) => {
    console.log('Received from server:', event.data);
};

ws.onclose = () => {
    console.log('Disconnected from WebSocket server');
};

ws.onerror = (error) => {
    console.error('WebSocket error:', error);
};</code></pre>
            
            <h2>Socket.IO - Enhanced WebSocket Library</h2>
            
            <h3>Setting Up Socket.IO</h3>
            <pre><code>const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Handle Socket.IO connections
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);
    
    // Join room
    socket.on('join-room', (roomId) => {
        socket.join(roomId);
        socket.to(roomId).emit('user-joined', socket.id);
    });
    
    // Handle chat messages
    socket.on('chat-message', (data) => {
        const { roomId, message, username } = data;
        
        // Broadcast message to room
        io.to(roomId).emit('new-message', {
            id: socket.id,
            username,
            message,
            timestamp: new Date()
        });
    });
    
    // Handle typing indicators
    socket.on('typing', (data) => {
        const { roomId, isTyping } = data;
        socket.to(roomId).emit('user-typing', {
            userId: socket.id,
            isTyping
        });
    });
    
    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
        
        // Notify other users
        socket.rooms.forEach(room => {
            if (room !== socket.id) {
                socket.to(room).emit('user-left', socket.id);
            }
        });
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(\`Server running on port \${PORT}\`);
});</code></pre>
            
            <h3>Socket.IO Client</h3>
            <pre><code>// Client-side Socket.IO
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

// Connection events
socket.on('connect', () => {
    console.log('Connected to server');
    
    // Join a room
    socket.emit('join-room', 'room-123');
});

// Listen for messages
socket.on('new-message', (data) => {
    console.log('New message:', data);
    displayMessage(data);
});

// Listen for typing indicators
socket.on('user-typing', (data) => {
    updateTypingIndicator(data);
});

// Send chat message
function sendMessage(message) {
    socket.emit('chat-message', {
        roomId: 'room-123',
        message: message,
        username: 'John Doe'
    });
}

// Send typing indicator
function handleTyping(isTyping) {
    socket.emit('typing', {
        roomId: 'room-123',
        isTyping
    });
}</code></pre>
            
            <h2>Building a Real-time Chat Application</h2>
            
            <h3>Server-side Chat Logic</h3>
            <pre><code>class ChatRoom {
    constructor(roomId) {
        this.roomId = roomId;
        this.users = new Map();
        this.messages = [];
    }
    
    addUser(socket, username) {
        this.users.set(socket.id, {
            socket,
            username,
            joinedAt: new Date()
        });
        
        // Notify room about new user
        this.broadcast('user-joined', {
            userId: socket.id,
            username,
            userCount: this.users.size
        });
        
        // Send chat history to new user
        socket.emit('chat-history', this.messages);
    }
    
    removeUser(socket) {
        const user = this.users.get(socket.id);
        if (user) {
            this.users.delete(socket.id);
            
            // Notify room about user leaving
            this.broadcast('user-left', {
                userId: socket.id,
                username: user.username,
                userCount: this.users.size
            });
        }
    }
    
    addMessage(socket, message) {
        const user = this.users.get(socket.id);
        if (!user) return;
        
        const messageData = {
            id: generateId(),
            userId: socket.id,
            username: user.username,
            message: message.trim(),
            timestamp: new Date()
        };
        
        // Store message
        this.messages.push(messageData);
        
        // Limit message history
        if (this.messages.length > 100) {
            this.messages = this.messages.slice(-100);
        }
        
        // Broadcast to room
        this.broadcast('new-message', messageData);
    }
    
    broadcast(event, data) {
        this.users.forEach(user => {
            user.socket.emit(event, data);
        });
    }
}

// Room manager
const rooms = new Map();

io.on('connection', (socket) => {
    socket.on('join-room', (data) => {
        const { roomId, username } = data;
        
        // Get or create room
        let room = rooms.get(roomId);
        if (!room) {
            room = new ChatRoom(roomId);
            rooms.set(roomId, room);
        }
        
        // Add user to room
        socket.join(roomId);
        room.addUser(socket, username);
    });
    
    socket.on('chat-message', (data) => {
        const { roomId, message } = data;
        const room = rooms.get(roomId);
        
        if (room) {
            room.addMessage(socket, message);
        }
    });
    
    socket.on('disconnect', () => {
        // Remove user from all rooms
        rooms.forEach(room => {
            room.removeUser(socket);
        });
    });
});</code></pre>
            
            <h3>Client-side Chat Interface</h3>
            <pre><code>// HTML structure
const chatHTML = \`
    <div class="chat-container">
        <div class="chat-header">
            <h3>Chat Room</h3>
            <span class="user-count">0 users</span>
        </div>
        <div class="chat-messages"></div>
        <div class="typing-indicator"></div>
        <div class="chat-input">
            <input type="text" placeholder="Type a message...">
            <button>Send</button>
        </div>
    </div>
\`;

// Chat class
class ChatClient {
    constructor(roomId, username) {
        this.roomId = roomId;
        this.username = username;
        this.socket = io();
        this.typingTimer = null;
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.connectToRoom();
    }
    
    setupEventListeners() {
        // Connection
        this.socket.on('connect', () => {
            console.log('Connected to chat server');
        });
        
        // Messages
        this.socket.on('new-message', (data) => {
            this.displayMessage(data);
        });
        
        // Chat history
        this.socket.on('chat-history', (messages) => {
            messages.forEach(message => this.displayMessage(message));
        });
        
        // User events
        this.socket.on('user-joined', (data) => {
            this.updateUserCount(data.userCount);
            this.showSystemMessage(\`\${data.username} joined the chat\`);
        });
        
        this.socket.on('user-left', (data) => {
            this.updateUserCount(data.userCount);
            this.showSystemMessage(\`\${data.username} left the chat\`);
        });
        
        // Typing indicators
        this.socket.on('user-typing', (data) => {
            this.updateTypingIndicator(data);
        });
        
        // Input events
        const input = document.querySelector('.chat-input input');
        const button = document.querySelector('.chat-input button');
        
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            } else {
                this.handleTyping();
            }
        });
        
        button.addEventListener('click', () => {
            this.sendMessage();
        });
    }
    
    connectToRoom() {
        this.socket.emit('join-room', {
            roomId: this.roomId,
            username: this.username
        });
    }
    
    sendMessage() {
        const input = document.querySelector('.chat-input input');
        const message = input.value.trim();
        
        if (message) {
            this.socket.emit('chat-message', {
                roomId: this.roomId,
                message
            });
            
            input.value = '';
            this.stopTyping();
        }
    }
    
    handleTyping() {
        if (!this.typingTimer) {
            this.socket.emit('typing', {
                roomId: this.roomId,
                isTyping: true
            });
        }
        
        clearTimeout(this.typingTimer);
        this.typingTimer = setTimeout(() => {
            this.stopTyping();
        }, 1000);
    }
    
    stopTyping() {
        clearTimeout(this.typingTimer);
        this.typingTimer = null;
        
        this.socket.emit('typing', {
            roomId: this.roomId,
            isTyping: false
        });
    }
    
    displayMessage(data) {
        const messagesContainer = document.querySelector('.chat-messages');
        const messageElement = document.createElement('div');
        messageElement.className = 'chat-message';
        messageElement.innerHTML = \`
            <span class="username">\${data.username}:</span>
            <span class="message">\${data.message}</span>
            <span class="timestamp">\${new Date(data.timestamp).toLocaleTimeString()}</span>
        \`;
        
        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    showSystemMessage(message) {
        const messagesContainer = document.querySelector('.chat-messages');
        const messageElement = document.createElement('div');
        messageElement.className = 'system-message';
        messageElement.textContent = message;
        
        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    updateUserCount(count) {
        document.querySelector('.user-count').textContent = \`\${count} users\`;
    }
    
    updateTypingIndicator(data) {
        const indicator = document.querySelector('.typing-indicator');
        
        if (data.isTyping) {
            indicator.textContent = \`\${data.username} is typing...\`;
        } else {
            indicator.textContent = '';
        }
    }
}

// Initialize chat
const chat = new ChatClient('room-123', 'John Doe');</code></pre>
            
            <h2>Advanced Real-time Features</h2>
            
            <h3>Live Notifications</h3>
            <pre><code>// Notification system
class NotificationService {
    constructor(io) {
        this.io = io;
        this.userSockets = new Map();
    }
    
    registerUser(userId, socket) {
        this.userSockets.set(userId, socket);
    }
    
    sendNotification(userId, notification) {
        const socket = this.userSockets.get(userId);
        if (socket) {
            socket.emit('notification', {
                id: generateId(),
                type: notification.type,
                title: notification.title,
                message: notification.message,
                timestamp: new Date()
            });
        }
    }
    
    broadcastNotification(notification, excludeUser = null) {
        this.userSockets.forEach((socket, userId) => {
            if (userId !== excludeUser) {
                socket.emit('notification', notification);
            }
        });
    }
}</code></pre>
            
            <h3>Real-time Collaboration</h3>
            <pre><code>// Collaborative document editing
class DocumentEditor {
    constructor(documentId) {
        this.documentId = documentId;
        this.content = '';
        this.users = new Map();
        this.operations = [];
    }
    
    applyOperation(socket, operation) {
        // Apply operational transformation
        const transformedOp = this.transformOperation(operation);
        
        // Update document
        this.content = this.applyToContent(this.content, transformedOp);
        
        // Store operation
        this.operations.push({
            ...transformedOp,
            userId: socket.id,
            timestamp: new Date()
        });
        
        // Broadcast to other users
        this.broadcast(socket, 'operation-applied', transformedOp);
    }
    
    transformOperation(operation) {
        // Implement operational transformation logic
        // This ensures concurrent edits are handled correctly
        return operation;
    }
    
    broadcast(excludeSocket, event, data) {
        this.users.forEach((user, socketId) => {
            if (socketId !== excludeSocket.id) {
                user.socket.emit(event, data);
            }
        });
    }
}</code></pre>
            
            <h2>Performance and Scaling</h2>
            
            <h3>Redis Adapter for Scaling</h3>
            <pre><code>const redis = require('socket.io-redis');

// Use Redis adapter for scaling across multiple servers
io.adapter(redis({
    host: 'localhost',
    port: 6379
}));</code></pre>
            
            <h3>Load Balancing</h3>
            <pre><code># Nginx configuration for WebSocket load balancing
upstream websocket_servers {
    ip_hash;
    server ws1:3000;
    server ws2:3000;
    server ws3:3000;
}

server {
    listen 80;
    
    location /socket.io/ {
        proxy_pass http://websocket_servers;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}</code></pre>
            
            <h2>Best Practices</h2>
            <ul>
                <li>Use rooms to organize clients</li>
                <li>Implement proper error handling</li>
                <li>Use Redis for scaling across multiple servers</li>
                <li>Implement authentication and authorization</li>
                <li>Monitor connection health and performance</li>
                <li>Handle reconnection gracefully</li>
            </ul>
            
            <h2>Conclusion</h2>
            <p>Real-time applications with Node.js and WebSockets open up possibilities for interactive, engaging user experiences. By mastering these technologies, you can build modern applications that provide instant communication and live updates.</p>
        `,
        excerpt: 'Build real-time applications with Node.js and WebSockets. Learn about Socket.IO, real-time communication patterns, and building chat apps.',
        thumbnail: '/images/websockets-blog.jpg',
        category: 'advanced',
        tags: ['nodejs', 'websockets', 'socket.io', 'real-time', 'chat'],
        readingTime: 23,
        views: 1340,
        featured: false
    }
];

// Seed function for additional blogs
async function seedAdditionalBlogs() {
    try {
        // Clear existing blogs
        await Blog.deleteMany({});
        
        console.log('Cleared existing blog posts');
        
        // Insert additional blog posts
        const insertedBlogs = await Blog.insertMany(additionalBlogsData);
        console.log(`Inserted ${insertedBlogs.length} additional blog posts`);
        
        console.log('Additional blogs seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding additional blogs:', error);
        process.exit(1);
    }
}

// Run the seeder
seedAdditionalBlogs();
