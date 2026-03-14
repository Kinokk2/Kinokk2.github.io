/* ==========================================
   PORTFOLIO STARTER - JAVASCRIPT
   Smooth animations and interactions
   ========================================== */

// ==========================================
// CUSTOM CURSOR
// ==========================================
function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    if (!cursor || !cursorFollower) return;
    
    // Check if touch device
    if ('ontouchstart' in window) {
        cursor.style.display = 'none';
        cursorFollower.style.display = 'none';
        document.body.style.cursor = 'default';
        return;
    }
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let followerX = 0;
    let followerY = 0;
    
    // Update mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Smooth cursor animation using requestAnimationFrame
    function animateCursor() {
        // Main cursor follows mouse quickly
        const cursorSpeed = 0.3;
        cursorX += (mouseX - cursorX) * cursorSpeed;
        cursorY += (mouseY - cursorY) * cursorSpeed;
        
        // Follower has more delay
        const followerSpeed = 0.15;
        followerX += (mouseX - followerX) * followerSpeed;
        followerY += (mouseY - followerY) * followerSpeed;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Hover effects - add class to body
    const hoverElements = document.querySelectorAll('a, button, .project-card, input, textarea');
    
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            document.body.classList.add('cursor-hover');
        });
        
        element.addEventListener('mouseleave', () => {
            document.body.classList.remove('cursor-hover');
        });
    });
    
    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursorFollower.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        cursorFollower.style.opacity = '0.5';
    });
}

// ==========================================
// MOBILE MENU TOGGLE
// ==========================================
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    
    if (!menuToggle || !mobileMenu) return;
    
    // Toggle menu
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking a link
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside
    mobileMenu.addEventListener('click', (e) => {
        if (e.target === mobileMenu) {
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ==========================================
// SCROLL ANIMATIONS
// ==========================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.15, // Trigger when 15% of element is visible
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before element enters viewport
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                // Keep observing to allow fade-out if scrolling back up (optional)
            }
        });
    }, observerOptions);
    
    // Observe project showcases
    const projectShowcases = document.querySelectorAll('.project-showcase');
    projectShowcases.forEach(showcase => {
        observer.observe(showcase);
    });
    
    // Observe other elements you want to animate
    const animateElements = document.querySelectorAll('.case-section, .skill-category, .timeline-item');
    animateElements.forEach(element => {
        observer.observe(element);
    });
}

// ==========================================
// SMOOTH SCROLL
// ==========================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Don't prevent default for empty hash
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = target.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ==========================================
// NAVBAR SCROLL EFFECT
// ==========================================
function initNavbarScroll() {
    const nav = document.querySelector('.nav');
    const caseNav = document.querySelector('.case-nav');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        const atBottom = window.innerHeight + currentScroll >= document.documentElement.scrollHeight - 2;

        // Regular nav
        if (nav) {
            if (currentScroll > 100) {
                nav.classList.add('scrolled');
                document.body.classList.add('scrolled'); // For bottom blur
            } else {
                nav.classList.remove('scrolled');
                document.body.classList.remove('scrolled'); // Hide bottom blur
            }
        }

        // Hide blur at bottom of page
        if (atBottom) {
            document.body.classList.add('at-bottom');
        } else {
            document.body.classList.remove('at-bottom');
        }
        
        // Case study nav
        if (caseNav) {
            if (currentScroll > 50) {
                caseNav.classList.add('scrolled');
            } else {
                caseNav.classList.remove('scrolled');
            }
        }
        
        lastScroll = currentScroll;
    });
}

// ==========================================
// PARALLAX EFFECT (Optional)
// ==========================================
function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    if (parallaxElements.length === 0) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.parallax || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// ==========================================
// IMAGE LAZY LOADING
// ==========================================
function initLazyLoading() {
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

// ==========================================
// TYPING EFFECT (Optional for hero)
// ==========================================
function initTypingEffect() {
    const typingElement = document.querySelector('[data-typing]');
    
    if (!typingElement) return;
    
    const text = typingElement.dataset.typing;
    const speed = 100;
    let i = 0;
    
    typingElement.textContent = '';
    
    function typeWriter() {
        if (i < text.length) {
            typingElement.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }
    
    typeWriter();
}

// ==========================================
// PROJECT CARD INTERACTIONS
// ==========================================
function initProjectCards() {
    const projectShowcases = document.querySelectorAll('.project-showcase');
    
    projectShowcases.forEach(showcase => {
        const link = showcase.querySelector('.project-showcase-link');
        
        if (link && !link.classList.contains('disabled')) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetUrl = link.getAttribute('href');
                
                // Get the hero color from the project
                let heroColor = '#C49E5F'; // Default
                const projectImage = showcase.querySelector('.project-main-image');
                if (projectImage) {
                    const bgStyle = projectImage.style.background;
                    // Extract first color from gradient
                    const colorMatch = bgStyle.match(/#[0-9A-Fa-f]{6}/);
                    if (colorMatch) {
                        heroColor = colorMatch[0];
                    }
                }
                
                // Create transition overlay if it doesn't exist
                let overlay = document.querySelector('.page-transition-overlay');
                if (!overlay) {
                    overlay = document.createElement('div');
                    overlay.className = 'page-transition-overlay';
                    document.body.appendChild(overlay);
                }
                
                // Set the overlay color
                overlay.style.background = heroColor;
                
                // Add spinning animation to arrow
                const arrow = link.querySelector('.arrow');
                if (arrow) {
                    arrow.style.display = 'inline-block';
                    arrow.style.animation = 'spin 0.5s ease-in-out';
                }
                
                // Trigger slide-in transition
                document.body.classList.add('page-transitioning');
                
                // Navigate after transition
                setTimeout(() => {
                    window.location.href = targetUrl;
                }, 600);
            });
        }
    });
}

// Page transition out on case study pages
window.addEventListener('DOMContentLoaded', () => {
    if (document.body.classList.contains('case-study-page')) {
        const overlay = document.querySelector('.page-transition-overlay');
        if (overlay) {
            // Get hero color from body data attribute
            const heroColor = document.body.getAttribute('data-hero-color') || '#C49E5F';
            overlay.style.background = heroColor;
            
            // Start with overlay covering screen (slide from left)
            overlay.style.transform = 'translateX(-100%)';
            overlay.style.transition = 'none';
            
            // Force reflow
            overlay.offsetHeight;
            
            // Re-enable transition
            overlay.style.transition = 'transform 0.6s cubic-bezier(0.77, 0, 0.175, 1)';
            
            // Slide in then out
            setTimeout(() => {
                overlay.style.transform = 'translateX(0)';
            }, 50);
            
            setTimeout(() => {
                overlay.style.transform = 'translateX(100%)';
            }, 400);
        }
    }
});

// Add spin animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;
document.head.appendChild(style);

// ==========================================
// PROGRESS INDICATOR (For case studies)
// ==========================================
function initProgressIndicator() {
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: var(--accent);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    
    // Only add on case study pages
    if (document.querySelector('.case-hero')) {
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
            
            progressBar.style.width = scrollPercent + '%';
        });
    }
}

// ==========================================
// FORM VALIDATION (If you add a contact form)
// ==========================================
function initFormValidation() {
    const form = document.querySelector('form');
    
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Add your form validation logic here
        const formData = new FormData(form);
        
        // Example: Send to your backend or email service
        console.log('Form submitted:', Object.fromEntries(formData));
        
        // Show success message
        alert('Thank you for your message! I\'ll get back to you soon.');
        form.reset();
    });
}

// ==========================================
// INITIALIZE EVERYTHING
// ==========================================
// ==========================================
// PHONE MOCKUP MOUSE TILT
// ==========================================
function initPhoneTilt() {
    const scene = document.querySelector('.pinterest-3d-scene');
    if (!scene) return;

    const front = scene.querySelector('.phone-mockup--front');
    const back  = scene.querySelector('.phone-mockup--back');

    let rafId = null;
    let targetFront = { x: 0, y: 0 };
    let targetBack  = { x: 0, y: 0 };
    let currentFront = { x: 0, y: 0 };
    let currentBack  = { x: 0, y: 0 };

    function lerp(a, b, t) { return a + (b - a) * t; }

    function animate() {
        currentFront.x = lerp(currentFront.x, targetFront.x, 0.12);
        currentFront.y = lerp(currentFront.y, targetFront.y, 0.12);
        currentBack.x  = lerp(currentBack.x,  targetBack.x,  0.10);
        currentBack.y  = lerp(currentBack.y,  targetBack.y,  0.10);

        front.style.transform = `translate(-90px, -28px) rotateX(${currentFront.x}deg) rotateY(${currentFront.y + 4}deg) rotateZ(-2deg)`;
        back.style.transform  = `translate(200px, 0px)   rotateX(${currentBack.x}deg)  rotateY(${currentBack.y - 18}deg) rotateZ(4deg)`;

        rafId = requestAnimationFrame(animate);
    }

    let leaveTimeout = null;
    let isHovering = false;

    scene.addEventListener('mouseenter', () => {
        isHovering = true;
        clearTimeout(leaveTimeout);
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(animate);
    });

    scene.addEventListener('mousemove', (e) => {
        if (!isHovering) return;
        const rect = scene.getBoundingClientRect();
        // Guard: ignore if pointer is actually outside the element
        if (e.clientX < rect.left || e.clientX > rect.right ||
            e.clientY < rect.top  || e.clientY > rect.bottom) return;

        const dx = (e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2);
        const dy = (e.clientY - rect.top  - rect.height / 2) / (rect.height / 2);

        targetFront.x =  dy * 18;
        targetFront.y = -dx * 22;
        targetBack.x  =  dy * 12;
        targetBack.y  = -dx * 16;
    });

    scene.addEventListener('mouseleave', (e) => {
        // Ignore if the relatedTarget is still inside the scene (e.g. child element)
        if (scene.contains(e.relatedTarget)) return;
        isHovering = false;
        targetFront = { x: 0, y: 0 };
        targetBack  = { x: 0, y: 0 };
        leaveTimeout = setTimeout(() => {
            cancelAnimationFrame(rafId);
            front.style.transform = '';
            back.style.transform  = '';
            currentFront = { x: 0, y: 0 };
            currentBack  = { x: 0, y: 0 };
        }, 600);
    });
}

function init() {
    // Core features
    initCustomCursor(); // Custom cursor enabled!
    initMobileMenu();
    initScrollAnimations();
    initSmoothScroll();
    initNavbarScroll();

    // Optional features
    initProjectCards();
    initProgressIndicator();
    initLazyLoading();
    initPhoneTilt();
    // initParallax(); // Uncomment if you want parallax
    // initTypingEffect(); // Uncomment if you add data-typing attribute
    // initFormValidation(); // Uncomment if you add a contact form
}

// Run when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ==========================================
// PERFORMANCE OPTIMIZATION
// ==========================================

// Debounce function for scroll events
function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Preload images on hover (optional optimization)
function preloadImages() {
    const links = document.querySelectorAll('a[href*=".html"]');
    
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            const href = link.getAttribute('href');
            // You could fetch and cache the next page here
        });
    });
}

// ==========================================
// ACCESSIBILITY IMPROVEMENTS
// ==========================================

// Skip to main content
function addSkipLink() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 0;
        background: var(--accent);
        color: white;
        padding: 8px 16px;
        text-decoration: none;
        z-index: 10000;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '0';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
}

// Call on load
// addSkipLink(); // Uncomment to add skip link

// ==========================================
// CONSOLE MESSAGE (Optional Easter Egg)
// ==========================================
console.log('%c🎨 Nice to see you in the console!', 'font-size: 20px; font-weight: bold; color: #6366f1;');
console.log('%cInterested in how this was built? Let\'s chat!', 'font-size: 14px; color: #a0a0a0;');

// ==========================================
// COPY EMAIL FUNCTION
// ==========================================
function copyEmail(event) {
    event.preventDefault();
    
    const email = 'kelvinkyeremehh@gmail.com';
    
    // Copy to clipboard
    navigator.clipboard.writeText(email).then(() => {
        // Show notification
        const notification = document.getElementById('copyNotification');
        notification.classList.add('show');
        
        // Hide notification after 2 seconds
        setTimeout(() => {
            notification.classList.remove('show');
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy email:', err);
    });
}

// ==========================================
// PAGE STATE RESET
// ==========================================
// ==========================================
// FORCE PDF DOWNLOAD (prevent browser preview)
// ==========================================
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('a[download][href$=".pdf"]').forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            var url = this.getAttribute('href');
            var filename = url.split('/').pop();
            var a = document.createElement('a');
            a.href = url;
            a.download = filename;
            a.style.display = 'none';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        });
    });
});

// ==========================================
// Reset page state when navigating back
window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
        // Page was loaded from cache (back/forward button)
        window.location.reload();
    }
});

// Prevent browser from restoring scroll position
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// Reset to top on page load
window.addEventListener('load', function() {
    setTimeout(function() {
        window.scrollTo(0, 0);
    }, 0);
});
