// Main JavaScript for Ayma & Fatima Atelier

// Email server endpoint (update this to your deployed URL)
const EMAIL_SERVER_URL = 'http://localhost:5000'; // Change to your server URL in production

// Send appointment confirmation email
async function sendAppointmentConfirmationEmail(formData) {
    try {
        const data = {
            name: formData.get('name') || '',
            email: formData.get('email') || '',
            phone: formData.get('phone') || '',
            country: formData.get('country') || '',
            'preferred-location': formData.get('preferred-location') || '',
            'event-type': formData.get('event-type') || '',
            'event-date': formData.get('event-date') || '',
            'interested-in': formData.get('interested-in') || '',
            'dress-preference': formData.get('dress-preference') || '',
            'dress-name': formData.get('dress-name') || '',
            message: formData.get('message') || ''
        };

        const response = await fetch(`${EMAIL_SERVER_URL}/api/send-appointment-confirmation`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            console.error('Failed to send confirmation email');
        }
    } catch (error) {
        console.error('Error sending confirmation email:', error);
        // Don't show error to user - form submission was successful
    }
}

// Send contact confirmation email
async function sendContactConfirmationEmail(formData) {
    try {
        const data = {
            name: formData.get('name') || '',
            email: formData.get('email') || '',
            phone: formData.get('phone') || '',
            subject: formData.get('subject') || '',
            message: formData.get('message') || ''
        };

        const response = await fetch(`${EMAIL_SERVER_URL}/api/send-contact-confirmation`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            console.error('Failed to send confirmation email');
        }
    } catch (error) {
        console.error('Error sending confirmation email:', error);
        // Don't show error to user - form submission was successful
    }
}

// Navigation
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar');
    
    // Mobile menu toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
    
    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            if (menuToggle) {
                menuToggle.classList.remove('active');
            }
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 70;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Form handling - Formspree integration
    const appointmentForm = document.getElementById('appointmentForm');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitButton = this.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            const formSuccess = document.getElementById('formSuccess');
            
            // Disable submit button and show loading state
            submitButton.disabled = true;
            submitButton.textContent = 'Submitting...';
            
            try {
                // Get form data
                const formData = new FormData(this);
                
                // Combine country code with phone number
                const countryCode = document.getElementById('country-code')?.value || '';
                const phoneNumber = document.getElementById('phone')?.value || '';
                if (phoneNumber && countryCode) {
                    formData.set('phone', `${countryCode} ${phoneNumber}`);
                }
                
                // Set reply-to email for auto-reply
                const email = document.getElementById('email')?.value || '';
                const replytoField = document.getElementById('replyto-field');
                if (email && replytoField) {
                    replytoField.value = email;
                    formData.set('_replyto', email);
                }
                
                // Submit to Formspree
                const response = await fetch(this.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    // Success - show success message
                    if (formSuccess) {
                        this.style.display = 'none';
                        formSuccess.style.display = 'block';
                        this.reset();
                    }
                } else {
                    // Handle error
                    const data = await response.json();
                    if (data.errors) {
                        alert('There was an error submitting your request. Please try again.');
                    } else {
                        alert('There was an error submitting your request. Please try again.');
                    }
                    submitButton.disabled = false;
                    submitButton.textContent = originalButtonText;
                }
            } catch (error) {
                // Network error or other issue
                console.error('Error:', error);
                alert('There was an error submitting your request. Please check your connection and try again.');
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            }
        });
    }
    
    // Contact Form handling - Formspree integration
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitButton = this.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            const formSuccess = document.getElementById('contactFormSuccess');
            
            // Disable submit button and show loading state
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            
            try {
                // Get form data
                const formData = new FormData(this);
                
                // Set reply-to email for auto-reply
                const email = document.getElementById('contact-email')?.value || '';
                const replytoField = document.getElementById('contact-replyto-field');
                if (email && replytoField) {
                    replytoField.value = email;
                    formData.set('_replyto', email);
                }
                
                // Submit to Formspree
                const response = await fetch(this.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    // Success - show success message
                    if (formSuccess) {
                        this.style.display = 'none';
                        formSuccess.style.display = 'block';
                        this.reset();
                    }
                } else {
                    // Handle error
                    const data = await response.json();
                    if (data.errors) {
                        alert('There was an error sending your message. Please try again.');
                    } else {
                        alert('There was an error sending your message. Please try again.');
                    }
                    submitButton.disabled = false;
                    submitButton.textContent = originalButtonText;
                }
            } catch (error) {
                // Network error or other issue
                console.error('Error:', error);
                alert('There was an error sending your message. Please check your connection and try again.');
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            }
        });
    }
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements with fade-in class
    document.querySelectorAll('.fade-in, .fade-in-delay, .fade-in-delay-2').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

