// Main JavaScript for Node.js Tutorial Website

// Blog posts data for search functionality
const blogPosts = [
    { title: "Node.js Basics - Getting Started", url: "blog/nodejs-basics.html", category: "basics" },
    { title: "Express.js Tutorial for Beginners", url: "blog/express-tutorial.html", category: "framework" },
    { title: "MongoDB with Node.js Complete Guide", url: "blog/mongodb-nodejs.html", category: "database" },
    { title: "Building REST APIs with Node.js", url: "blog/rest-api-nodejs.html", category: "api" },
    { title: "Node.js Event Loop Explained", url: "blog/event-loop.html", category: "advanced" },
    { title: "Node.js Modules and NPM", url: "blog/nodejs-modules.html", category: "basics" },
    { title: "Async Programming in Node.js", url: "blog/async-programming.html", category: "advanced" },
    { title: "Node.js File System Operations", url: "blog/file-system.html", category: "basics" },
    { title: "Error Handling in Node.js", url: "blog/error-handling.html", category: "advanced" },
    { title: "Node.js Security Best Practices", url: "blog/security.html", category: "security" },
    { title: "Testing Node.js Applications", url: "blog/testing-nodejs.html", category: "testing" },
    { title: "Node.js Performance Optimization", url: "blog/performance.html", category: "advanced" },
    { title: "Debugging Node.js Applications", url: "blog/debugging.html", category: "advanced" },
    { title: "Node.js Deployment Guide", url: "blog/deployment.html", category: "deployment" },
    { title: "Node.js Best Practices", url: "blog/best-practices.html", category: "advanced" },
    { title: "WebSockets with Node.js", url: "blog/websockets.html", category: "advanced" },
    { title: "Node.js Middleware Development", url: "blog/middleware.html", category: "framework" },
    { title: "Node.js Streams Tutorial", url: "blog/streams.html", category: "advanced" },
    { title: "Node.js Microservices Architecture", url: "blog/microservices.html", category: "advanced" },
    { title: "Node.js Authentication Guide", url: "blog/authentication.html", category: "security" }
];

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    
    // Initialize search functionality
    initializeSearch();
});

// Search functionality
function initializeSearch() {
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar button');
    const searchResults = document.getElementById('search-results');
    
    if (!searchInput) return;
    
    // Search on input
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
        
        if (query.length < 2) {
            if (searchResults) {
                searchResults.innerHTML = '';
                searchResults.style.display = 'none';
            }
            return;
        }
        
        performSearch(query);
    });
    
    // Search on button click
    if (searchButton) {
        searchButton.addEventListener('click', function() {
            const query = searchInput.value.toLowerCase().trim();
            if (query.length >= 2) {
                performSearch(query);
            }
        });
    }
    
    // Search on Enter key
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const query = this.value.toLowerCase().trim();
            if (query.length >= 2) {
                performSearch(query);
            }
        }
    });
}

function performSearch(query) {
    const searchResults = document.getElementById('search-results');
    if (!searchResults) return;
    
    const results = blogPosts.filter(post => 
        post.title.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query)
    );
    
    displaySearchResults(results, query);
}

function displaySearchResults(results, query) {
    const searchResults = document.getElementById('search-results');
    if (!searchResults) return;
    
    if (results.length === 0) {
        searchResults.innerHTML = `
            <div class="no-results">
                No results found for "${query}"
            </div>
        `;
        searchResults.style.display = 'block';
        return;
    }
    
    const resultsHTML = results.map(post => `
        <div class="search-result-item">
            <h3><a href="${post.url}">${highlightMatch(post.title, query)}</a></h3>
            <p>Category: ${post.category}</p>
        </div>
    `).join('');
    
    searchResults.innerHTML = `
        <h3>Search Results (${results.length})</h3>
        ${resultsHTML}
    `;
    searchResults.style.display = 'block';
}

function highlightMatch(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<strong>$1</strong>');
}

// Course enrollment modal functionality
function enrollCourse(courseName) {
    const modal = document.getElementById('enrollmentModal');
    const courseNameInput = document.getElementById('courseName');
    
    if (modal && courseNameInput) {
        courseNameInput.value = courseName;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

// Initialize modal functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    
    // Initialize search functionality
    initializeSearch();
    
    // Initialize modal event listeners
    initializeModal();
});

function initializeModal() {
    const modal = document.getElementById('enrollmentModal');
    const closeBtn = document.querySelector('.close');
    const cancelBtn = document.getElementById('cancelEnrollment');
    const enrollmentForm = document.getElementById('enrollmentForm');
    
    console.log('Initializing modal...'); // Debug log
    
    if (!modal) {
        console.error('Modal not found');
        return;
    }
    
    // Close modal when clicking X
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
        console.log('Close button listener attached');
    }
    
    // Close modal when clicking Cancel
    if (cancelBtn) {
        cancelBtn.addEventListener('click', closeModal);
        console.log('Cancel button listener attached');
    }
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // Handle form submission
    if (enrollmentForm) {
        enrollmentForm.addEventListener('submit', handleEnrollmentSubmit);
        console.log('Form submit listener attached');
    } else {
        console.error('Enrollment form not found');
    }
    
    // Also handle submit button click directly as backup
    const submitBtn = document.querySelector('button[form="enrollmentForm"]');
    if (submitBtn) {
        submitBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (enrollmentForm) {
                handleEnrollmentSubmit({ preventDefault: () => {}, target: enrollmentForm });
            }
        });
        console.log('Submit button backup listener attached');
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
}

function closeModal() {
    const modal = document.getElementById('enrollmentModal');
    const enrollmentForm = document.getElementById('enrollmentForm');
    
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
        
        // Reset form
        if (enrollmentForm) {
            enrollmentForm.reset();
        }
    }
}

function handleEnrollmentSubmit(event) {
    event.preventDefault();
    console.log('Form submission triggered'); // Debug log
    
    // Get form data directly from form elements
    const form = document.getElementById('enrollmentForm');
    if (!form) {
        console.error('Form not found');
        return;
    }
    
    const enrollmentData = {
        course: document.getElementById('courseName').value,
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        experience: document.getElementById('experience').value,
        goals: document.getElementById('goals').value,
        newsletter: document.getElementById('newsletter').checked
    };
    
    console.log('Enrollment data:', enrollmentData); // Debug log
    
    // Validate required fields
    if (!enrollmentData.fullName || !enrollmentData.email || !enrollmentData.experience) {
        showEnrollmentMessage('Please fill in all required fields (Full Name, Email, and Experience Level).', 'error');
        return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(enrollmentData.email)) {
        showEnrollmentMessage('Please enter a valid email address.', 'error');
        return;
    }
    
    // Simulate enrollment process
    simulateEnrollment(enrollmentData);
}

function simulateEnrollment(data) {
    // Show loading message
    showEnrollmentMessage('Processing your enrollment...', 'info');
    
    // Simulate API call
    setTimeout(() => {
        // Store enrollment data (in real app, this would be sent to server)
        const enrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
        enrollments.push({
            ...data,
            id: Date.now(),
            enrolledAt: new Date().toISOString()
        });
        localStorage.setItem('enrollments', JSON.stringify(enrollments));
        
        // Show success message
        showEnrollmentMessage(
            `Congratulations ${data.fullName}! You have successfully enrolled in ${data.course}. Check your email for next steps.`,
            'success'
        );
        
        // Close modal after delay
        setTimeout(() => {
            closeModal();
        }, 3000);
        
    }, 1500);
}

function showEnrollmentMessage(message, type) {
    const modalBody = document.querySelector('.modal-body');
    if (!modalBody) return;
    
    // Remove any existing message
    const existingMessage = modalBody.querySelector('.enrollment-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `enrollment-message ${type}`;
    
    // Style based on type
    const styles = {
        success: 'background: #d4edda; color: #155724; border: 1px solid #c3e6cb;',
        error: 'background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;',
        info: 'background: #d1ecf1; color: #0c5460; border: 1px solid #bee5eb;'
    };
    
    messageDiv.style.cssText = `
        padding: 1rem;
        margin-bottom: 1rem;
        border-radius: 8px;
        ${styles[type] || styles.info}
    `;
    
    messageDiv.textContent = message;
    
    // Insert at the top of modal body
    modalBody.insertBefore(messageDiv, modalBody.firstChild);
    
    // Auto-remove after 5 seconds for success messages
    if (type === 'success') {
        setTimeout(() => {
            if (messageDiv.parentElement) {
                messageDiv.remove();
            }
        }, 5000);
    }
}

// Contact form submission (UI only)
function submitContactForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Create success modal
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
    `;
    
    modal.innerHTML = `
        <div class="card" style="max-width: 400px; text-align: center;">
            <h3>Thank You!</h3>
            <p>Your message has been received. We'll get back to you soon!</p>
            <button class="btn btn-primary" onclick="this.closest('div').parentElement.remove()">Close</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Reset form
    form.reset();
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
        if (modal.parentElement) {
            modal.remove();
        }
    }, 3000);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Lazy loading for images (if needed)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Add CSS for search results
const searchStyles = document.createElement('style');
searchStyles.textContent = `
    #search-results {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        border: 1px solid #ddd;
        border-top: none;
        max-height: 400px;
        overflow-y: auto;
        z-index: 1000;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
    
    .search-result-item {
        padding: 1rem;
        border-bottom: 1px solid #eee;
    }
    
    .search-result-item:last-child {
        border-bottom: none;
    }
    
    .search-result-item h3 {
        margin: 0 0 0.5rem 0;
        font-size: 1rem;
    }
    
    .search-result-item h3 a {
        color: #007bff;
        text-decoration: none;
    }
    
    .search-result-item h3 a:hover {
        text-decoration: underline;
    }
    
    .search-result-item p {
        margin: 0;
        color: #666;
        font-size: 0.9rem;
    }
    
    .search-result-item strong {
        color: #007bff;
        font-weight: bold;
    }
    
    .no-results {
        padding: 1rem;
        text-align: center;
        color: #666;
    }
    
    #search-results h3 {
        padding: 1rem;
        margin: 0;
        background: #f8f9fa;
        border-bottom: 1px solid #eee;
        font-size: 1rem;
        color: #333;
    }
`;
document.head.appendChild(searchStyles);
