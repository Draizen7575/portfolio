// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    const body = document.body;

    // Function to toggle menu
    const toggleMenu = () => {
        // Toggle Nav
        nav.classList.toggle('active');
        burger.classList.toggle('active');
        body.classList.toggle('no-scroll');
        
        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    };

    // Add click event to burger
    if (burger) {
        burger.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent event bubbling
            toggleMenu();
        });
    }

    // Close mobile menu when clicking outside or on a link
    const closeMenu = () => {
        if (nav.classList.contains('active')) {
            nav.classList.remove('active');
            burger.classList.remove('active');
            body.classList.remove('no-scroll');
            navLinks.forEach(link => {
                link.style.animation = '';
            });
        }
    };

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (nav.classList.contains('active') && 
            !e.target.closest('.nav-links') && 
            !e.target.closest('.burger')) {
            closeMenu();
        }
    });

    // Close menu when clicking on a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                closeMenu();
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Add animation to elements when they come into view
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe sections and elements
document.querySelectorAll('section, .skill-card, .project-card').forEach(element => {
    observer.observe(element);
});

// Form Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', data);
        
        // Show success message
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

// Add scroll-based animations
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Prevent horizontal scroll on mobile
window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
        document.body.style.overflowX = 'hidden';
    } else {
        document.body.style.overflowX = 'auto';
    }
}); 