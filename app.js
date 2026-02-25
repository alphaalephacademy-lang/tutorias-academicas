/**
 * AlphaAleph Academy - App.js
 * Contains UI logic, scroll effects and carousel
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. SET CURRENT YEAR IN FOOTER ---
    const yearEl = document.getElementById('currentYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // --- 2. MOBILE MENU LOGIC ---
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    let isMenuOpen = false;

    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', () => {
            isMenuOpen = !isMenuOpen;
            if (isMenuOpen) {
                mobileMenu.classList.remove('hidden');
                menuIcon.setAttribute('data-lucide', 'x');
                document.body.style.overflow = 'hidden';
            } else {
                mobileMenu.classList.add('hidden');
                menuIcon.setAttribute('data-lucide', 'menu');
                document.body.style.overflow = '';
            }
            lucide.createIcons(); // Refresh icon
        });

        // Close menu on link click
        const mobileLinks = document.querySelectorAll('.mobile-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                isMenuOpen = false;
                mobileMenu.classList.add('hidden');
                menuIcon.setAttribute('data-lucide', 'menu');
                document.body.style.overflow = '';
                lucide.createIcons();
            });
        });
    }

    // --- 3. NAVBAR SCROLL EFFECT ---
    const header = document.getElementById('navbar');
    const navBrandText = document.getElementById('nav-brand-text');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.remove('bg-transparent');
            header.classList.add('bg-slate-900/95', 'backdrop-blur-md', 'shadow-lg', 'border-b', 'border-white/10');
            if (navBrandText) navBrandText.classList.add('text-white');
        } else {
            header.classList.add('bg-transparent');
            header.classList.remove('bg-slate-900/95', 'backdrop-blur-md', 'shadow-lg', 'border-b', 'border-white/10');
        }
    });

    // --- 4. HERO CAROUSEL LOGIC ---
    const heroSlides = document.querySelectorAll('.hero-slide');
    const heroDots = document.querySelectorAll('#hero-dots button');
    let activeHeroSlide = 0;
    let heroInterval;

    const renderHeroSlide = (index) => {
        if (!heroSlides.length || !heroDots.length) return;

        // Hide all
        heroSlides.forEach((slide, idx) => {
            slide.classList.remove('opacity-100', 'z-20');
            slide.classList.add('opacity-0', 'z-0', 'pointer-events-none');

            // Adjust dot style based on theme of the slide
            const dot = heroDots[idx];
            if (idx === index) {
                slide.classList.remove('opacity-0', 'z-0', 'pointer-events-none');
                slide.classList.add('opacity-100', 'z-20');

                // Color match based on slide
                if (idx === 0) dot.className = 'w-12 h-2 rounded-full bg-emerald-500 transition-all';
                else if (idx === 1) dot.className = 'w-12 h-2 rounded-full bg-violet-500 transition-all';
                else document.className = 'w-12 h-2 rounded-full bg-cyan-500 transition-all'; // idx === 2

            } else {
                dot.className = 'w-4 h-2 rounded-full bg-slate-700 hover:bg-slate-500 transition-all';
            }
        });
    };

    const startHeroCarousel = () => {
        heroInterval = setInterval(() => {
            activeHeroSlide = (activeHeroSlide + 1) % heroSlides.length;
            renderHeroSlide(activeHeroSlide);
        }, 7000); // 7 seconds per slide (long text)
    };

    if (heroDots.length) {
        heroDots.forEach((btn, idx) => {
            btn.addEventListener('click', () => {
                clearInterval(heroInterval);
                activeHeroSlide = idx;
                renderHeroSlide(activeHeroSlide);
                startHeroCarousel(); // restart timer
            });
        });

        // Setup Arrow navigation
        const prevBtn = document.getElementById('hero-prev');
        const nextBtn = document.getElementById('hero-next');

        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => {
                clearInterval(heroInterval);
                activeHeroSlide = (activeHeroSlide - 1 + heroSlides.length) % heroSlides.length;
                renderHeroSlide(activeHeroSlide);
                startHeroCarousel();
            });

            nextBtn.addEventListener('click', () => {
                clearInterval(heroInterval);
                activeHeroSlide = (activeHeroSlide + 1) % heroSlides.length;
                renderHeroSlide(activeHeroSlide);
                startHeroCarousel();
            });
        }

        startHeroCarousel();
    }

    // --- 5. SCROLL ANIMATIONS (INTERSECTION OBSERVER) ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                obs.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.observe-card').forEach((card) => {
        observer.observe(card);
    });


});
