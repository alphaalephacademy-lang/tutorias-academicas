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

    // --- 4. SCROLL ANIMATIONS (INTERSECTION OBSERVER) ---
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

    // --- 5. TESTIMONIALS CAROUSEL ---
    const testimonials = [
        {
            name: 'Andrés V.',
            role: 'Ingeniería Física',
            image: '⚛️',
            text: 'Su enfoque desde los primeros principios fue brutal para estructurar mi modelado de sistemas de ondas. Mi tesis pasó sin correcciones.',
            rating: 5
        },
        {
            name: 'Carolina G.',
            role: 'Ingeniería Industrial',
            image: '📊',
            text: 'Logramos diseñar unos KPIs impecables y plantear una integración logística sólida. Su consultoría nos hizo ver el panorama completo.',
            rating: 5
        },
        {
            name: 'Felipe M.',
            role: 'Ciencias Exactas',
            image: '📐',
            text: 'Impecable. Me ayudaron no solo con la rigurosidad matemática, sino también a maquetar el documento en LaTeX a nivel de publicación.',
            rating: 5
        }
    ];

    let activeTestimonial = 0;
    const tContent = document.getElementById('testimonial-content');
    const tStars = document.getElementById('testimonial-stars');
    const tText = document.getElementById('testimonial-text');
    const tImg = document.getElementById('testimonial-img');
    const tName = document.getElementById('testimonial-name');
    const tRole = document.getElementById('testimonial-role');
    const tDotsContainer = document.getElementById('testimonial-dots');

    const renderTestimonial = (index) => {
        if (!tContent) return;
        const t = testimonials[index];

        // Fade out
        tContent.style.opacity = '0';

        setTimeout(() => {
            // Stars
            tStars.innerHTML = '';
            for (let i = 0; i < t.rating; i++) {
                tStars.innerHTML += `<i data-lucide="star" class="w-6 h-6 text-emerald-400 fill-emerald-400"></i>`;
            }

            tText.textContent = t.text;
            tImg.textContent = t.image;
            tName.textContent = t.name;
            tRole.textContent = t.role;

            // Re-render icons for stars
            lucide.createIcons();

            // Update dots
            const dots = tDotsContainer.querySelectorAll('button');
            dots.forEach((dot, idx) => {
                if (idx === index) {
                    dot.className = 'w-8 h-3 rounded-full bg-emerald-500 transition-all';
                } else {
                    dot.className = 'w-3 h-3 rounded-full bg-slate-700 hover:bg-slate-600 transition-all';
                }
            });

            // Fade in
            tContent.style.opacity = '1';
        }, 300);
    };

    if (tDotsContainer) {
        // Create dots
        testimonials.forEach((_, idx) => {
            const btn = document.createElement('button');
            btn.addEventListener('click', () => {
                activeTestimonial = idx;
                renderTestimonial(activeTestimonial);
            });
            tDotsContainer.appendChild(btn);
        });

        // initial render
        renderTestimonial(0);

        // Auto rotate
        setInterval(() => {
            activeTestimonial = (activeTestimonial + 1) % testimonials.length;
            renderTestimonial(activeTestimonial);
        }, 5000);
    }
});
