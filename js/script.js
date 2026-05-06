/* ==========================================
   KELVIN KYEREMEH — PORTFOLIO JAVASCRIPT
   ========================================== */


// ==========================================
// CUSTOM CURSOR — disabled, using OS default
// Re-enable by removing the early return and
// uncommenting the cursor HTML elements.
// ==========================================
function initCustomCursor() {}

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

    const closeBtn = document.querySelector('.mobile-menu-close');
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);

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
                document.body.classList.toggle('scrolled', scrollY > 100);
            }

            document.body.classList.toggle('at-bottom', atBottom);
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
    // Two rAF calls ensure the overlay has painted at opacity:1
    // before we add page-fade-in and start the fade-out.
    // NOTE: do NOT wrap in DOMContentLoaded — by the time init()
    // runs, that event has already fired and a nested listener
    // would never execute.
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            document.body.classList.add('page-fade-in');
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
    document.querySelectorAll('.work-card[data-href]').forEach(card => {
        const href = card.dataset.href;
        if (!href) return;
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => navigateTo(href));
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
// HERO PARALLAX — case study pages
// ==========================================
function initHeroParallax() {
    const hero = document.querySelector('.case-hero-fullscreen');
    if (!hero) return;

    const img = hero.querySelector('.hero-bg-image');
    if (!img) return;

    const heroHeight = hero.offsetHeight;
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
            const scrollY = window.pageYOffset;
            if (scrollY <= heroHeight) {
                img.style.transform = `translateY(${scrollY * 0.25}px)`;
            }
            ticking = false;
        });
    }, { passive: true });
}

// ==========================================
// MOUSE GRADIENT BACKGROUND
// ==========================================
function initMouseGradient() {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let rafId = null;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        if (!rafId) {
            rafId = requestAnimationFrame(() => {
                document.documentElement.style.setProperty('--mouse-x', mouseX + 'px');
                document.documentElement.style.setProperty('--mouse-y', mouseY + 'px');
                rafId = null;
            });
        }
    }, { passive: true });
}

// ==========================================
// GET IN TOUCH — STICKY ABOVE FOOTER
// ==========================================
function initGetInTouchSticky() {
    const el = document.querySelector('.get-in-touch');
    const footer = document.querySelector('.footer');
    if (!el || !footer) return;

    const defaultGap = 32; // 2rem in px
    let ticking = false;

    function update() {
        const footerTop = footer.getBoundingClientRect().top;
        if (footerTop < window.innerHeight) {
            // Footer is entering the viewport — push the element above it
            el.style.bottom = (window.innerHeight - footerTop + defaultGap) + 'px';
        } else {
            el.style.bottom = defaultGap + 'px';
        }
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(update);
    }, { passive: true });

    window.addEventListener('resize', update, { passive: true });
    update();
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
// FORCE PDF DOWNLOAD
// ==========================================
function initPDFDownload() {
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
    initPhoneTilt();
    initHeroParallax();
    initGetInTouchSticky();
    initMouseGradient();
    initPDFDownload();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

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
