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
    const deadline = new Date('2025-03-30T23:59:59');
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

// FAQ Data
const faqData = [
    {
        question: "How do I enrol?",
        answer: "You can enroll by filling out the official registration form and selecting the event(s) you wish to participate in. If you are submitting entries for multiple categories, you must fill out a separate form for each."
    },
    {
        question: "What are the event categories?",
        answer: "Participants can compete in one, two, or all three categories:<br>- Fine Arts<br>- Poetry Writing (max. 200 words)<br>- Essay Writing (max. 600 words)"
    },
    {
        question: "What will I receive after the programme?",
        answer: "Participants will receive an e-certificate upon successful submission. Winners will receive exciting prizes at the TCWC Award Ceremony in April 2025. Additionally, students will receive recognition on different platforms and potential internship opportunities."
    },
    {
        question: "When is the enrollment deadline?",
        answer: "The deadline for enrollment and submission is March 30, 2024. Late submissions will not be accepted under any circumstance."
    },
    {
        question: "What do I need to participate?",
        answer: "You need to be a student in Grades 6-12 from a TCWC Partner School, have an original submission (essay, poem, or fine art), and submit your work in PDF format as per the given guidelines."
    },
    {
        question: "Who is eligible to participate?",
        answer: "Students in two categories:<br>- TCWC Champions (Grades 6-8)<br>- TCWC Advocates (Grades 9-12)"
    },
    {
        question: "How do I submit my essay/poetry/artwork?",
        answer: "Upload your essay in PDF format through the official application form on www.thecleanwaterchallenge.com before the deadline (30th March, 2025 - 11:59 PM IST). Ensure that your file is correctly named in the format: YourFullName_Essay.pdf."
    },
    {
        question: "Can I submit multiple entries?",
        answer: "- One entry per event category (Essay, Poetry, Fine Arts) is permitted.<br>- A participant can submit up to 3 entries i.e. one entry each for Essay, Fine Arts and Poetry.<br>- Multiple entries in the same category will lead to disqualification."
    },
    {
        question: "Will the entries be checked for plagiarism?",
        answer: "Yes, all entries will be checked for plagiarism and must be 100% original. Plagiarism, AI-generated content, or generic literary entries will be disqualified."
    },
    {
        question: "Will I receive feedback for my essay?",
        answer: "Due to the high number of entries, individual feedback will not be provided. However, winners and top entries may receive reward & recognition at TCWC Awards Ceremony."
    },
    {
        question: "Who will I be competing against?",
        answer: "You will be competing against students in your respective category: TCWC Champions (Grades 6-8) and TCWC Advocates (Grades 9-12) from TCWC Partner Schools across Mumbai."
    },
    {
        question: "Will I receive a submission/registration confirmation?",
        answer: "No, you will not receive any email confirmation. You will receive a copy of your responses. On successful submission, a message will be displayed on your screen. Please consider that as a submission/registration confirmation."
    },
    {
        question: "Will I be notified if my essay was flagged for plagiarism?",
        answer: "No. Your entry will not proceed towards a shortlist."
    },
    {
        question: "Can I request an extension?",
        answer: "No, the deadline is fixed. Under no circumstance, will an extension be considered."
    },
    {
        question: "Do titles count towards the word count?",
        answer: "No. Only the body text will be counted for the word count."
    },
    {
        question: "What happens after I have submitted my application?",
        answer: "After successful submission of the form, you will see a message on your screen. Within a few weeks, you will receive a Participation Certificate. That does not mean you have not been shortlisted. If you get shortlisted, you will receive an invite to TCWC Award Ceremony."
    },
    {
        question: "Can teams participate?",
        answer: "No. It is an individual event."
    }
];

// Populate FAQs
const faqGrid = document.querySelector('.faq-grid');
faqData.forEach(faq => {
    const faqItem = document.createElement('div');
    faqItem.className = 'faq-item';
    faqItem.innerHTML = `
        <div class="faq-question">
            <h4>${faq.question}</h4>
            <i class="fas fa-chevron-down"></i>
        </div>
        <div class="faq-answer">
            <p>${faq.answer}</p>
        </div>
    `;
    faqGrid.appendChild(faqItem);
});

// FAQ Toggle
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        const icon = question.querySelector('i');
        
        answer.classList.toggle('active');
        icon.classList.toggle('fa-chevron-up');
        icon.classList.toggle('fa-chevron-down');
    });
});

// Remove scroll animations
document.addEventListener('DOMContentLoaded', function() {
    // Disable all animations initially
    const allSections = document.querySelectorAll('section');
    allSections.forEach(section => {
        section.style.opacity = '1';
        section.style.visibility = 'visible';
        section.style.animation = 'none';
    });

    // Remove fade-in classes and observers
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        element.classList.remove('fade-in');
    });

    // Ensure specific sections are visible
    const criticalSections = document.querySelectorAll('.about-section, .bcrf-section, .about-content, .about-text, .about-image');
    criticalSections.forEach(section => {
        if (section) {
            section.style.opacity = '1';
            section.style.visibility = 'visible';
            section.style.animation = 'none';
            section.style.transform = 'none';
        }
    });

    // Remove the intersection observer
    if (typeof observer !== 'undefined') {
        observer.disconnect();
    }
});

// Keep the sponsors carousel functionality
const sponsorsCarousel = document.querySelector('.sponsors-carousel');
if (sponsorsCarousel) {
    sponsorsCarousel.style.opacity = '1';
    sponsorsCarousel.style.visibility = 'visible';
}
