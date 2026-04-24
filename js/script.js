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

    let mouseX = -100, mouseY = -100;
    let cursorX = -100, cursorY = -100;
    let followerX = -100, followerY = -100;
    let cursorScale = 1, followerScale = 1;
    let rafId = null;

    let started = false;
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        if (!started) {
            cursorX = followerX = mouseX;
            cursorY = followerY = mouseY;
            started = true;
        }
        if (!rafId) rafId = requestAnimationFrame(animateCursor);
    }, { passive: true });

    function lerp(a, b, t) { return a + (b - a) * t; }

    function animateCursor() {
        const dx  = mouseX - cursorX;
        const dy  = mouseY - cursorY;
        const fdx = mouseX - followerX;
        const fdy = mouseY - followerY;

        cursorX   += dx  * 0.35;
        cursorY   += dy  * 0.35;
        followerX += fdx * 0.15;
        followerY += fdy * 0.15;

        cursorScale   = lerp(cursorScale,   isHovering ? 2   : 1,   0.15);
        followerScale = lerp(followerScale, isHovering ? 1.5 : 1,   0.12);

        cursor.style.transform         = `translate(${cursorX - 5}px, ${cursorY - 5}px) scale(${cursorScale})`;
        cursorFollower.style.transform = `translate(${followerX - 20}px, ${followerY - 20}px) scale(${followerScale})`;

        const converged = Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1 &&
                          Math.abs(fdx) < 0.1 && Math.abs(fdy) < 0.1 &&
                          Math.abs(cursorScale - (isHovering ? 2 : 1)) < 0.01 &&
                          Math.abs(followerScale - (isHovering ? 1.5 : 1)) < 0.01;
        if (converged) { rafId = null; return; }
        rafId = requestAnimationFrame(animateCursor);
    }

    let isHovering = false;
    const HOVER_SELECTOR = 'a, button, .project-showcase, input, textarea';
    document.addEventListener('mouseover', (e) => {
        if (!e.target.closest(HOVER_SELECTOR)) return;
        if (isHovering) return;
        isHovering = true;
        cursor.style.opacity = '0.8';
        cursorFollower.style.opacity = '0.3';
        if (!rafId) rafId = requestAnimationFrame(animateCursor);
    }, { passive: true });
    document.addEventListener('mouseout', (e) => {
        if (!e.target.closest(HOVER_SELECTOR)) return;
        if (e.relatedTarget && e.relatedTarget.closest(HOVER_SELECTOR)) return;
        isHovering = false;
        cursor.style.opacity = '1';
        cursorFollower.style.opacity = '0.5';
        if (!rafId) rafId = requestAnimationFrame(animateCursor);
    }, { passive: true });

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
    const els = document.querySelectorAll('.project-showcase, .work-card, .case-section, .fade-up');
    if (!els.length) return;
    let remaining = els.length;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
            if (--remaining === 0) observer.disconnect();
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(el => observer.observe(el));
}

// ==========================================
// NAVBAR SCROLL
// ==========================================
function initNavbarScroll() {
    const nav = document.querySelector('.nav');
    const caseNav = document.querySelector('.case-nav');
    let ticking = false;
    let scrollHeight = document.documentElement.scrollHeight;

    // Cache scrollHeight — only recalculate on resize
    window.addEventListener('resize', () => { scrollHeight = document.documentElement.scrollHeight; }, { passive: true });

    window.addEventListener('scroll', () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
            const scrollY = window.pageYOffset;
            const atBottom = window.innerHeight + scrollY >= scrollHeight - 2;

            if (nav) {
                nav.classList.toggle('scrolled', scrollY > 100);
                document.body.classList.toggle('scrolled', scrollY > 100);
            }

            document.body.classList.toggle('at-bottom', atBottom);
            if (caseNav) caseNav.classList.toggle('scrolled', scrollY > 50);
            ticking = false;
        });
    }, { passive: true });
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
    document.querySelectorAll('.project-showcase, .work-card').forEach(card => {
        const link = card.querySelector('.project-showcase-link');
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
// CASE STUDY IMAGE 3D TILT — disabled, hover handled via CSS
// ==========================================
function initCaseImageTilt() {}

// ==========================================
// PHONE MOCKUP MOUSE TILT
// ==========================================
function initPhoneTilt() {
    const scene = document.querySelector('.pinterest-3d-scene');
    if (!scene) return;

    const front = scene.querySelector('.phone-mockup--front');
    const back  = scene.querySelector('.phone-mockup--back');

    // Resting positions
    const REST  = { frontX: -60, frontY: 0,   backX: 150, backY: 0,   backOpacity: 0.8 };
    // Hover positions
    const HOVER = { frontX: -60, frontY: -28, backX: 190, backY: -10, backOpacity: 1.0 };

    let rafId = null;
    let hoverProgress = 0, targetHover = 0;
    let tiltFront = { x: 0, y: 0 }, targetTiltFront = { x: 0, y: 0 };
    let tiltBack  = { x: 0, y: 0 }, targetTiltBack  = { x: 0, y: 0 };

    const lerp = (a, b, t) => a + (b - a) * t;

    function applyResting() {
        front.style.transform = `translate(${REST.frontX}px, ${REST.frontY}px) rotateY(8deg) rotateZ(-2deg)`;
        back.style.transform  = `translate(${REST.backX}px, ${REST.backY}px) rotateY(-22deg) rotateZ(4deg)`;
        back.style.opacity    = REST.backOpacity;
    }

    // Set resting state immediately on init
    applyResting();

    function animate() {
        hoverProgress = lerp(hoverProgress, targetHover, 0.1);
        tiltFront.x = lerp(tiltFront.x, targetTiltFront.x, 0.12);
        tiltFront.y = lerp(tiltFront.y, targetTiltFront.y, 0.12);
        tiltBack.x  = lerp(tiltBack.x,  targetTiltBack.x,  0.10);
        tiltBack.y  = lerp(tiltBack.y,  targetTiltBack.y,  0.10);

        const fx = lerp(REST.frontX, HOVER.frontX, hoverProgress);
        const fy = lerp(REST.frontY, HOVER.frontY, hoverProgress);
        const bx = lerp(REST.backX,  HOVER.backX,  hoverProgress);
        const by = lerp(REST.backY,  HOVER.backY,  hoverProgress);
        const op = lerp(REST.backOpacity, HOVER.backOpacity, hoverProgress);

        front.style.transform = `translate(${fx}px, ${fy}px) rotateX(${tiltFront.x}deg) rotateY(${tiltFront.y + 8}deg) rotateZ(-2deg)`;
        back.style.transform  = `translate(${bx}px, ${by}px) rotateX(${tiltBack.x}deg) rotateY(${tiltBack.y - 22}deg) rotateZ(4deg)`;
        back.style.opacity    = op;

        const done = Math.abs(hoverProgress - targetHover) < 0.005 &&
                     Math.abs(tiltFront.x - targetTiltFront.x) < 0.05 &&
                     Math.abs(tiltFront.y - targetTiltFront.y) < 0.05 &&
                     Math.abs(tiltBack.x  - targetTiltBack.x)  < 0.05 &&
                     Math.abs(tiltBack.y  - targetTiltBack.y)  < 0.05;
        rafId = done ? null : requestAnimationFrame(animate);
    }

    function startAnimate() {
        if (!rafId) rafId = requestAnimationFrame(animate);
    }

    function reset() {
        targetHover = 0;
        targetTiltFront = { x: 0, y: 0 };
        targetTiltBack  = { x: 0, y: 0 };
        startAnimate();
    }

    scene.addEventListener('mouseenter', () => {
        targetHover = 1;
        startAnimate();
    });

    let sceneRect = scene.getBoundingClientRect();
    window.addEventListener('resize', () => { sceneRect = scene.getBoundingClientRect(); }, { passive: true });
    window.addEventListener('scroll', () => { sceneRect = scene.getBoundingClientRect(); }, { passive: true });

    scene.addEventListener('mousemove', (e) => {
        if (targetHover === 0) return;
        const dx = (e.clientX - sceneRect.left - sceneRect.width  / 2) / (sceneRect.width  / 2);
        const dy = (e.clientY - sceneRect.top  - sceneRect.height / 2) / (sceneRect.height / 2);
        targetTiltFront.x =  dy * 12.6;
        targetTiltFront.y = -dx * 15.4;
        targetTiltBack.x  =  dy * 8.4;
        targetTiltBack.y  = -dx * 11.2;
        startAnimate();
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
// INIT
// ==========================================
function init() {
    initPageTransitions();
    initCustomCursor();
    initMobileMenu();
    initScrollAnimations();
    initNavbarScroll();
    initProjectCards();
    initCaseImageTilt();
    initPhoneTilt();
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
