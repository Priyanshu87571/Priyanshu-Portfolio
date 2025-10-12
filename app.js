// Portfolio Interactive Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initSmoothScrolling();
    initMobileNavigation();
    initFlashcards();
    initProjectToggles();
    initScrollAnimations();
    initNavbarScroll();
});

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navMenu = document.querySelector('.nav-menu');
                const navToggle = document.querySelector('.nav-toggle');
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });
}

// Mobile navigation toggle
function initMobileNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
}

// Flashcard interactions
function initFlashcards() {
    const flashcards = document.querySelectorAll('.flashcard');
    
    flashcards.forEach(card => {
        let isFlipped = false;
        
        // Click to flip functionality for mobile
        card.addEventListener('click', function() {
            const inner = card.querySelector('.flashcard-inner');
            isFlipped = !isFlipped;
            
            if (isFlipped) {
                inner.style.transform = 'rotateY(180deg)';
            } else {
                inner.style.transform = 'rotateY(0deg)';
            }
        });
        
        // Enhanced hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Project dropdown toggles
function initProjectToggles() {
    const projectToggles = document.querySelectorAll('.project-toggle');
    
    projectToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const projectCard = this.closest('.project-card');
            const projectDetails = projectCard.querySelector('.project-details');
            const isActive = projectDetails.classList.contains('active');
            
            // Close all other project details
            document.querySelectorAll('.project-details').forEach(detail => {
                detail.classList.remove('active');
            });
            
            document.querySelectorAll('.project-toggle').forEach(btn => {
                btn.textContent = 'View Details';
                btn.classList.remove('active');
            });
            
            // Toggle current project
            if (!isActive) {
                projectDetails.classList.add('active');
                this.textContent = 'Hide Details';
                this.classList.add('active');
                
                // Smooth scroll to show full content
                setTimeout(() => {
                    projectCard.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }, 300);
            } else {
                projectDetails.classList.remove('active');
                this.textContent = 'View Details';
                this.classList.remove('active');
            }
        });
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        max-width: 400px;
        padding: 16px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        z-index: 1001;
        transform: translateX(100%);
        transition: transform 0.3s ease-in-out;
        font-size: 14px;
        line-height: 1.4;
    `;
    
    // Set colors based on type
    if (type === 'success') {
        notification.style.backgroundColor = 'rgba(var(--color-success-rgb), 0.1)';
        notification.style.border = '1px solid rgba(var(--color-success-rgb), 0.3)';
        notification.style.color = 'var(--color-success)';
    } else if (type === 'error') {
        notification.style.backgroundColor = 'rgba(var(--color-error-rgb), 0.1)';
        notification.style.border = '1px solid rgba(var(--color-error-rgb), 0.3)';
        notification.style.color = 'var(--color-error)';
    } else {
        notification.style.backgroundColor = 'rgba(var(--color-info-rgb), 0.1)';
        notification.style.border = '1px solid rgba(var(--color-info-rgb), 0.3)';
        notification.style.color = 'var(--color-info)';
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto close after 5 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.project-card, .flashcard, .experience-item, .education-item, .contact-info'
    );
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
}

// Navbar scroll effects
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        
        // Add background blur effect
        if (scrollTop > 50) {
            navbar.style.background = 'rgba(var(--color-slate-900-rgb), 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = 'rgba(var(--color-slate-900-rgb), 0.8)';
            navbar.style.backdropFilter = 'blur(5px)';
        }
    });
}

// Active navigation link highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop && 
            window.pageYOffset < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + currentSection) {
            link.classList.add('active');
        }
    });
}

// Update active nav link on scroll
window.addEventListener('scroll', updateActiveNavLink);

// Parallax effect for hero section
function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    if (!hero || !heroContent) return;

    // Disable parallax on narrow viewports to avoid shifting avatar off-screen
    if (window.innerWidth <= 900) {
        heroContent.style.transform = 'translate3d(0,0,0)';
        return;
    }

    let latestScroll = 0;
    let ticking = false;
    const parallaxSpeed = 0.10; // subtle
    const maxShiftRatio = 0.08; // very small maximum shift

    function onScroll() {
        latestScroll = window.pageYOffset || document.documentElement.scrollTop;
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = latestScroll;
                if (scrolled < window.innerHeight) {
                    const maxShift = window.innerHeight * maxShiftRatio;
                    const shift = Math.min(scrolled * parallaxSpeed, maxShift);
                    heroContent.style.transform = `translate3d(0, ${shift}px, 0)`;
                } else {
                    heroContent.style.transform = 'translate3d(0, 0, 0)';
                }
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('resize', () => {
        // turn off if resized small, or reset transform
        if (window.innerWidth <= 900) {
            heroContent.style.transform = 'translate3d(0,0,0)';
        }
    });

    window.addEventListener('scroll', onScroll, { passive: true });
}

// Initialize parallax effect
initParallaxEffect();

// Smooth scroll to top functionality
function addScrollToTop() {
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--color-primary);
        color: var(--color-btn-primary-text);
        border: none;
        font-size: 20px;
        font-weight: bold;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top functionality
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize scroll to top button
addScrollToTop();

// Add loading animation for page load
function initPageLoadAnimation() {
    // Add loading overlay
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = `
        <div class="loading-spinner">
            <div class="spinner"></div>
            <p>Loading Portfolio...</p>
        </div>
    `;
    
    loadingOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--color-background);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        z-index: 9999;
        transition: opacity 0.5s ease;
    `;
    
    const spinnerStyle = document.createElement('style');
    spinnerStyle.textContent = `
        .spinner {
            width: 40px;
            height: 40px;
            border: 4px solid var(--color-border);
            border-top: 4px solid var(--color-primary);
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-bottom: 20px;
        }
        
        .loading-spinner p {
            color: var(--color-text-secondary);
            font-size: 16px;
        }
    `;
    
    document.head.appendChild(spinnerStyle);
    document.body.appendChild(loadingOverlay);
    
    // Remove loading overlay after page load
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingOverlay.style.opacity = '0';
            setTimeout(() => {
                loadingOverlay.remove();
                spinnerStyle.remove();
            }, 500);
        }, 1000);
    });
}

// Initialize page load animation
initPageLoadAnimation();

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    // ESC key to close mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.querySelector('.nav-menu');
        const navToggle = document.querySelector('.nav-toggle');
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        
        // Close any open project details
        document.querySelectorAll('.project-details.active').forEach(detail => {
            detail.classList.remove('active');
        });
        document.querySelectorAll('.project-toggle.active').forEach(toggle => {
            toggle.textContent = 'View Details';
            toggle.classList.remove('active');
        });
    }
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    updateActiveNavLink();
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);