/**
 * AlphaAleph Academy - App.js
 * Contains UI logic, scroll effects, carousel and translations
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
    const navLogoDesktop = document.getElementById('nav-logo-desktop');
    const navBrandText = document.getElementById('nav-brand-text');
    const desktopLinks = document.querySelectorAll('.hidden.md\\:flex .nav-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.remove('bg-transparent');
            header.classList.add('bg-white/95', 'backdrop-blur-md', 'shadow-lg', 'navbar-scrolled');
            if (navBrandText) navBrandText.classList.replace('text-white', 'text-slate-900');
            desktopLinks.forEach(link => {
                link.classList.replace('text-white/90', 'text-slate-700');
            });
        } else {
            header.classList.add('bg-transparent');
            header.classList.remove('bg-white/95', 'backdrop-blur-md', 'shadow-lg', 'navbar-scrolled');
            if (navBrandText) navBrandText.classList.replace('text-slate-900', 'text-white');
            desktopLinks.forEach(link => {
                link.classList.replace('text-slate-700', 'text-white/90');
            });
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
            name: 'María González',
            role: 'Estudiante de Medicina',
            image: '👩‍🎓',
            text: 'Gracias a AcademiaPro logré aprobar todas mis materias del primer año. El acompañamiento fue fundamental para no rendirme.',
            rating: 5
        },
        {
            name: 'Carlos Mendoza',
            role: 'Estudiante de Ingeniería',
            image: '👨‍💻',
            text: 'Las tutorías de matemáticas y física me ayudaron a entender conceptos que creía imposibles. ¡100% recomendado!',
            rating: 5
        },
        {
            name: 'Ana Lucia Torres',
            role: 'Estudiante de Derecho',
            image: '👩‍⚖️',
            text: 'La consultoría académica me ayudó a organizar mi tiempo y mejorar mis técnicas de estudio. Mis notas mejoraron un 40%.',
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
                tStars.innerHTML += `<i data-lucide="star" class="w-6 h-6 text-amber-400 fill-amber-400"></i>`;
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
                    dot.className = 'w-8 h-3 rounded-full bg-violet-600 transition-all';
                } else {
                    dot.className = 'w-3 h-3 rounded-full bg-violet-300 hover:bg-violet-400 transition-all';
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


    // --- 6. TRANSLATIONS (i18n) ---
    const translations = {
        es: {
            'nav.home': 'Inicio',
            'nav.services': 'Servicios',
            'nav.contact': 'Contáctanos',

            'hero.badge': 'Nuevo ciclo escolar 2026',
            'hero.title_start': 'Domina tu futuro con ',
            'hero.title_highlight': 'tutorías expertas',
            'hero.subtitle': 'Desbloquea tu máximo potencial académico. Ofrecemos educación personalizada y de vanguardia en ciencias exactas e idiomas para estudiantes exigentes.',
            'hero.cta_primary': 'Descubre nuestros programas',
            'hero.cta_secondary': 'Agenda una consulta',

            'services.header_start': 'Nuestros ',
            'services.header_highlight': 'Servicios',
            'services.header_subtitle': 'Programas diseñados meticulosamente para garantizar tu éxito académico, adaptados a tus necesidades de aprendizaje.',

            'services.card1_title': 'Tutorías Escolares',
            'services.card1_desc': 'Fortalecemos las bases académicas en todas las materias. Ayudamos a los estudiantes a superar sus retos diarios y mejorar sus calificaciones.',
            'services.card1_feat1': 'Todas las materias',
            'services.card1_feat2': 'Acompañamiento diario',
            'services.card1_feat3': 'Mejora de calificaciones',

            'services.card2_title': 'Tutorías Universitarias',
            'services.card2_desc': 'Apoyo especializado para superar los semestres más exigentes. Cobertura integral en diversas facultades, incluyendo áreas tecnológicas como programación y ciberseguridad.',
            'services.card2_feat1': 'Ciencias exactas',
            'services.card2_feat2': 'Programación',
            'services.card2_feat3': 'Ciberseguridad',

            'services.card3_title': 'Acompañamiento de Tesis',
            'services.card3_desc': 'Te guiamos paso a paso en la estructuración, investigación, desarrollo y sustentación de tu proyecto de grado.',
            'services.card3_feat1': 'Estructuración',
            'services.card3_feat2': 'Metodología e Investigación',
            'services.card3_feat3': 'Preparación de Sustentación',

            'contact.header_start': 'Contáctanos ',
            'contact.header_highlight': 'Hoy Mismo',
            'contact.header_subtitle': 'Estamos listos para diseñar un plan de estudios a tu medida. Escríbenos directamente por WhatsApp y uno de nuestros asesores académicos te contactará pronto.',
            'contact.location_title': 'Ubicación',
            'contact.location_desc': 'Sesiones online y presenciales (dependiendo de la zona)',

            'footer.rights': 'Todos los derechos reservados.'
        },
        en: {
            'nav.home': 'Home',
            'nav.services': 'Services',
            'nav.contact': 'Contact Us',

            'hero.badge': 'New school year 2026',
            'hero.title_start': 'Master your future with ',
            'hero.title_highlight': 'expert tutoring',
            'hero.subtitle': 'Unlock your maximum academic potential. We offer personalized, cutting-edge education in exact sciences and languages for demanding students.',
            'hero.cta_primary': 'Discover our programs',
            'hero.cta_secondary': 'Schedule a consultation',

            'services.header_start': 'Our ',
            'services.header_highlight': 'Services',
            'services.header_subtitle': 'Meticulously designed programs to ensure your academic success, tailored to your learning needs.',

            'services.card1_title': 'School Tutoring',
            'services.card1_desc': 'We strengthen academic foundations in all subjects. We help students overcome their daily challenges and improve their grades.',
            'services.card1_feat1': 'All subjects',
            'services.card1_feat2': 'Daily support',
            'services.card1_feat3': 'Grade improvement',

            'services.card2_title': 'University Tutoring',
            'services.card2_desc': 'Specialized support to pass the most demanding semesters. Comprehensive coverage in various faculties, including tech areas like programming and cybersecurity.',
            'services.card2_feat1': 'Exact sciences',
            'services.card2_feat2': 'Programming',
            'services.card2_feat3': 'Cybersecurity',

            'services.card3_title': 'Thesis Coaching',
            'services.card3_desc': 'We guide you step by step in the structuring, research, development, and defense of your graduation project.',
            'services.card3_feat1': 'Structuring',
            'services.card3_feat2': 'Methodology & Research',
            'services.card3_feat3': 'Defense Preparation',

            'contact.header_start': 'Contact Us ',
            'contact.header_highlight': 'Today',
            'contact.header_subtitle': 'We are ready to design a tailored study plan for you. Message us directly on WhatsApp and one of our academic advisors will contact you soon.',
            'contact.location_title': 'Location',
            'contact.location_desc': 'Online and in-person sessions (depending on the area)',

            'footer.rights': 'All rights reserved.'
        }
    };

    const langBtns = document.querySelectorAll('.lang-toggle');
    const i18nElements = document.querySelectorAll('[data-i18n]');

    const changeLanguage = (lang) => {
        // Update active button classes
        langBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            }
        });

        // Update texts
        i18nElements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang][key]) {
                el.textContent = translations[lang][key];
            }
        });

        // Update document lang
        document.documentElement.lang = lang;
    };

    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            changeLanguage(btn.getAttribute('data-lang'));
        });
    });

});
