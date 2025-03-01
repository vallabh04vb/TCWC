// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const faqItems = document.querySelectorAll('.faq-item');
const registerBtn = document.querySelector('.register-btn');
const ctaButtons = document.querySelectorAll('.cta-button');

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    // Toggle menu
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking links
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            body.style.overflow = '';
        }
    });

    // Prevent menu from closing when clicking inside
    navLinks.addEventListener('click', function(e) {
        e.stopPropagation();
    });
});

// FAQ Accordion
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        // Close all other open FAQs
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current FAQ
        item.classList.toggle('active');
    });
});

// Sponsors Carousel Animation
const sponsorsCarousel = document.querySelector('.sponsors-carousel');
let isScrolling = false;

function autoScroll() {
    if (isScrolling) return;
    
    isScrolling = true;
    const scrollAmount = sponsorsCarousel.scrollLeft + 200;
    
    sponsorsCarousel.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
    });
    
    // Reset scroll position if reached the end
    if (scrollAmount >= sponsorsCarousel.scrollWidth - sponsorsCarousel.clientWidth) {
        setTimeout(() => {
            sponsorsCarousel.scrollTo({
                left: 0,
                behavior: 'auto'
            });
        }, 1000);
    }
    
    setTimeout(() => {
        isScrolling = false;
    }, 1000);
}

// Auto scroll sponsors every 3 seconds
setInterval(autoScroll, 3000);

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Elements to animate on scroll
const animateElements = document.querySelectorAll('.about-content, .team-member, .spotlight-content, .guideline-item');

animateElements.forEach(element => {
    element.classList.add('fade-in');
    observer.observe(element);
});

// Add animation classes
document.querySelectorAll('.fade-in').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

document.querySelectorAll('.animate').forEach(el => {
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
});

// Registration deadline check
function checkDeadline() {
    const deadline = new Date('2023-03-30T23:59:59');
    const now = new Date();
    
    if (now > deadline) {
        // Update registration buttons
        ctaButtons.forEach(button => {
            if (button.textContent.includes('Register')) {
                button.textContent = 'Registration Closed';
                button.classList.add('disabled');
                button.href = '#';
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    alert('Oops! This link has ghosted you. Registration is now closed.');
                });
            }
        });
    }
}

// Check deadline on page load
window.addEventListener('DOMContentLoaded', checkDeadline);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add animation to CTA buttons
ctaButtons.forEach(button => {
    button.addEventListener('mouseover', () => {
        button.style.transform = 'translateY(-5px)';
        button.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
    });
    
    button.addEventListener('mouseout', () => {
        button.style.transform = '';
        button.style.boxShadow = '';
    });
});
