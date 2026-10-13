/* 
 * CS INSTRUMENTS Landing Pages
 * Animations - Scroll-basierte Animationen
 */

/**
 * Initialisiert Scroll-Animationen für Elemente mit der Klasse "reveal"
 */
function initScrollAnimations() {
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                
                // Optional: Observer für dieses Element entfernen nach Animation
                // observer.unobserve(entry.target);
            }
        });
    }, options);

    // Alle Elemente mit der Klasse "reveal" beobachten
    document.querySelectorAll('.reveal').forEach(element => {
        observer.observe(element);
    });
}

/**
 * Header-Scroll-Effekt - fügt "scrolled" Klasse hinzu
 */
function initHeaderScroll() {
    const header = document.querySelector('header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/**
 * Smooth Scroll für Anchor-Links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Ignoriere leere Links und "#"
            if (href === '#' || href === '') return;
            
            const target = document.querySelector(href);
            if (!target) return;
            
            e.preventDefault();
            
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
}

/**
 * Ripple-Effekt für Buttons
 */
function initButtonRipple() {
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

/**
 * Lazy Loading für Bilder
 */
function initLazyLoading() {
    if ('loading' in HTMLImageElement.prototype) {
        // Native lazy loading wird unterstützt
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src || img.src;
        });
    } else {
        // Fallback für ältere Browser
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

/**
 * Performance-Optimierung: Debounce-Funktion
 */
function debounce(func, wait = 100) {
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

/**
 * Initialisierung beim Laden der Seite
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('CS INSTRUMENTS: Initializing animations...');
    
    initScrollAnimations();
    initHeaderScroll();
    initSmoothScroll();
    initButtonRipple();
    initLazyLoading();
    
    console.log('CS INSTRUMENTS: Animations initialized ✓');
});

// Export für Verwendung in anderen Scripten
window.CSInstruments = window.CSInstruments || {};
window.CSInstruments.animations = {
    initScrollAnimations,
    initHeaderScroll,
    initSmoothScroll,
    initButtonRipple,
    initLazyLoading,
    debounce
};
