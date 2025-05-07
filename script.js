// Initialize EmailJS
(function() {
    emailjs.init("jpaanFboq2tkhTERA"); // Replace with your actual public key
})();

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form submission handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        const submitBtn = this.querySelector('.btn');
        submitBtn.classList.add('loading');
        
        // Get form data
        const formData = {
            user_name: document.getElementById('name').value,
            user_email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        // Validate form data
        if (!formData.user_name || !formData.user_email || !formData.message) {
            showMessage('Please fill in all fields', 'error');
            submitBtn.classList.remove('loading');
            return;
        }

        // Send email using EmailJS
        emailjs.send('service_dlx9ymf', 'template_0rj9wec', formData)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                showMessage('Message sent successfully! I will get back to you soon.', 'success');
                contactForm.reset();
            })
            .catch(function(error) {
                console.error('FAILED...', error);
                showMessage('Failed to send message. Please try again later.', 'error');
            })
            .finally(function() {
                submitBtn.classList.remove('loading');
            });
    });
}

// Function to show form messages
function showMessage(message, type) {
    // Remove any existing message
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Create new message element
    const messageElement = document.createElement('div');
    messageElement.className = `form-message ${type} show`;
    messageElement.textContent = message;

    // Add message to form
    const form = document.getElementById('contact-form');
    form.appendChild(messageElement);

    // Remove message after 5 seconds
    setTimeout(() => {
        messageElement.classList.remove('show');
        setTimeout(() => messageElement.remove(), 300);
    }, 5000);
}

// Navbar background change on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 23, 42, 0.98)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Add hover effect to timeline items
document.querySelectorAll('.timeline-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
}); 