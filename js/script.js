/* ==========================================
   KELVIN KYEREMEH — PORTFOLIO JAVASCRIPT
   ========================================== */

// ==========================================
// CUSTOM CURSOR
// ==========================================
function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');

    if (!cursor || !cursorFollower) return;

    if ('ontouchstart' in window) {
        cursor.style.display = 'none';
        cursorFollower.style.display = 'none';
        document.body.style.cursor = 'default';
        return;
    }

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.3;
        cursorY += (mouseY - cursorY) * 0.3;
        followerX += (mouseX - followerX) * 0.15;
        followerY += (mouseY - followerY) * 0.15;

        cursor.style.left = `${cursorX}px`;
        cursor.style.top  = `${cursorY}px`;
        cursorFollower.style.left = `${followerX}px`;
        cursorFollower.style.top  = `${followerY}px`;

        requestAnimationFrame(animateCursor);
    }

    animateCursor();

    document.querySelectorAll('a, button, .project-showcase, input, textarea').forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });

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
// MOBILE MENU
// ==========================================
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (!menuToggle || !mobileMenu) return;

    const closeMenu = () => {
        menuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    };

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    mobileMenu.addEventListener('click', (e) => {
        if (e.target === mobileMenu) closeMenu();
    });
}

// ==========================================
// SCROLL ANIMATIONS
// ==========================================
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('in-view');
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.project-showcase, .case-section, .fade-up').forEach(el => {
        observer.observe(el);
    });
}

// ==========================================
// NAVBAR SCROLL
// ==========================================
function initNavbarScroll() {
    const nav = document.querySelector('.nav');
    const caseNav = document.querySelector('.case-nav');

    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        const atBottom = window.innerHeight + scrollY >= document.documentElement.scrollHeight - 2;

        if (nav) {
            nav.classList.toggle('scrolled', scrollY > 100);
            document.body.classList.toggle('scrolled', scrollY > 100);
        }

        document.body.classList.toggle('at-bottom', atBottom);

        if (caseNav) caseNav.classList.toggle('scrolled', scrollY > 50);
    });
}

// ==========================================
// PAGE TRANSITIONS — site-wide fade
// ==========================================
function navigateTo(url) {
    document.body.classList.remove('page-fade-in');
    document.body.classList.add('page-transitioning');
    setTimeout(() => { window.location.href = url; }, 450);
}

function initPageTransitions() {
    window.addEventListener('DOMContentLoaded', () => {
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                document.body.classList.add('page-fade-in');
            });
        });
    });

    document.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (!link || link.classList.contains('disabled')) return;
        const href = link.getAttribute('href');
        if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto') || link.hasAttribute('download')) return;
        e.preventDefault();
        navigateTo(href);
    });
}

// ==========================================
// PROJECT CARD INTERACTIONS
// ==========================================
function initProjectCards() {
    document.querySelectorAll('.project-showcase').forEach(showcase => {
        const link = showcase.querySelector('.project-showcase-link');
        if (!link || link.classList.contains('disabled')) return;
        link.addEventListener('click', () => {
            const arrow = link.querySelector('.arrow');
            if (arrow) {
                arrow.style.display = 'inline-block';
                arrow.style.animation = 'spin 0.5s ease-in-out';
            }
        });
    });
}

// ==========================================
// READING PROGRESS BAR (case studies)
// ==========================================
function initProgressIndicator() {
    if (!document.querySelector('.case-hero-new')) return;

    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const total = document.documentElement.scrollHeight - window.innerHeight;
        progressBar.style.width = `${(scrolled / total) * 100}%`;
    });
}

// ==========================================
// PHONE MOCKUP MOUSE TILT
// ==========================================
function initPhoneTilt() {
    const scene = document.querySelector('.pinterest-3d-scene');
    if (!scene) return;

    const front = scene.querySelector('.phone-mockup--front');
    const back  = scene.querySelector('.phone-mockup--back');

    let rafId = null;
    let isHovering = false;
    let targetFront  = { x: 0, y: 0 };
    let targetBack   = { x: 0, y: 0 };
    let currentFront = { x: 0, y: 0 };
    let currentBack  = { x: 0, y: 0 };

    const lerp = (a, b, t) => a + (b - a) * t;

    function animate() {
        currentFront.x = lerp(currentFront.x, targetFront.x, 0.12);
        currentFront.y = lerp(currentFront.y, targetFront.y, 0.12);
        currentBack.x  = lerp(currentBack.x,  targetBack.x,  0.10);
        currentBack.y  = lerp(currentBack.y,  targetBack.y,  0.10);

        front.style.transform = `translate(-60px, -20px) rotateX(${currentFront.x}deg) rotateY(${currentFront.y + 8}deg) rotateZ(-2deg)`;
        back.style.transform  = `translate(150px, -10px) rotateX(${currentBack.x}deg) rotateY(${currentBack.y - 22}deg) rotateZ(4deg)`;

        rafId = requestAnimationFrame(animate);
    }

    function reset() {
        isHovering = false;
        targetFront = currentFront = { x: 0, y: 0 };
        targetBack  = currentBack  = { x: 0, y: 0 };
        cancelAnimationFrame(rafId);
        front.style.transform = '';
        back.style.transform  = '';
    }

    scene.addEventListener('mouseenter', () => {
        isHovering = true;
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(animate);
    });

    scene.addEventListener('mousemove', (e) => {
        if (!isHovering) return;
        const rect = scene.getBoundingClientRect();
        const dx = (e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2);
        const dy = (e.clientY - rect.top  - rect.height / 2) / (rect.height / 2);
        targetFront.x =  dy * 18;
        targetFront.y = -dx * 22;
        targetBack.x  =  dy * 12;
        targetBack.y  = -dx * 16;
    });

    scene.addEventListener('mouseleave', (e) => {
        if (scene.contains(e.relatedTarget)) return;
        reset();
    });

    document.addEventListener('mouseleave', reset);
    window.addEventListener('blur', reset);
}

// ==========================================
// COPY EMAIL
// ==========================================
function copyEmail(event) {
    event.preventDefault();
    navigator.clipboard.writeText('kelvinkyeremehh@gmail.com').then(() => {
        const notification = document.getElementById('copyNotification');
        if (!notification) return;
        notification.classList.add('show');
        setTimeout(() => notification.classList.remove('show'), 2000);
    }).catch(err => console.error('Failed to copy email:', err));
}

// ==========================================
// CASE STUDY IMAGE 3D TILT
// ==========================================
function initCaseImageTilt() {
    const images = document.querySelectorAll('.case-full-image');
    if (!images.length) return;

    images.forEach(el => {
        let rafId = null;
        let currentX = 3, currentY = -4;
        let targetX = 3, targetY = -4;
        const BASE_X = 3, BASE_Y = -4;

        function lerp(a, b, t) { return a + (b - a) * t; }

        function tick() {
            currentX = lerp(currentX, targetX, 0.1);
            currentY = lerp(currentY, targetY, 0.1);
            el.style.transform = `perspective(1400px) rotateX(${currentX}deg) rotateY(${currentY}deg)`;
            rafId = requestAnimationFrame(tick);
        }

        el.addEventListener('mouseenter', () => {
            rafId = requestAnimationFrame(tick);
        });

        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dx = (e.clientX - cx) / (rect.width / 2);
            const dy = (e.clientY - cy) / (rect.height / 2);
            targetX = BASE_X - dy * 6;
            targetY = BASE_Y + dx * 8;
        });

        function resetTilt() {
            targetX = BASE_X;
            targetY = BASE_Y;
            setTimeout(() => {
                cancelAnimationFrame(rafId);
                el.style.transform = `perspective(1400px) rotateX(${BASE_X}deg) rotateY(${BASE_Y}deg)`;
            }, 400);
        }

        el.addEventListener('mouseleave', resetTilt);
    });
}

// ==========================================
// INIT
// ==========================================
function init() {
    initPageTransitions();
    initCustomCursor();
    initMobileMenu();
    initScrollAnimations();
    initNavbarScroll();
    initProjectCards();
    initProgressIndicator();
    initPhoneTilt();
    initCaseImageTilt();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ==========================================
// FORCE PDF DOWNLOAD
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[download][href$=".pdf"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const a = document.createElement('a');
            a.href = link.getAttribute('href');
            a.download = a.href.split('/').pop();
            a.style.display = 'none';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        });
    });
});

// ==========================================
// BROWSER BACK/FORWARD — prevent stale cache
// ==========================================
window.addEventListener('pageshow', (e) => {
    if (e.persisted) window.location.reload();
});

if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

window.addEventListener('load', () => {
    setTimeout(() => window.scrollTo(0, 0), 0);
});

// ==========================================
// CONSOLE EASTER EGG
// ==========================================
console.log('%c🎨 Nice to see you in the console!', 'font-size: 20px; font-weight: bold; color: #6366f1;');
console.log('%cInterested in how this was built? Let\'s chat!', 'font-size: 14px; color: #a0a0a0;');
