/**
 * AlphaAleph Academy - App.js
 * Lógica de UI y validación estricta de formulario
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- SET CURRENT YEAR IN FOOTER ---
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // --- MOBILE MENU LOGIC ---
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const header = document.querySelector('.navbar');

    // Create mobile menu overlay
    const mobileNav = document.createElement('div');
    mobileNav.className = 'mobile-nav';
    mobileNav.innerHTML = `
        <a href="#inicio" class="mobile-link">Inicio</a>
        <a href="#servicios" class="mobile-link">Servicios</a>
        <a href="#contacto" class="mobile-link">Contáctanos</a>
    `;
    document.body.appendChild(mobileNav);

    // Toggle menu
    mobileBtn.addEventListener('click', () => {
        mobileBtn.classList.toggle('open');
        mobileNav.classList.toggle('open');
        document.body.classList.toggle('mobile-menu-active');

        // Prevent scrolling when menu is open
        if (mobileNav.classList.contains('open')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Close menu when a link is clicked
    const mobileLinks = document.querySelectorAll('.mobile-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileBtn.classList.remove('open');
            mobileNav.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // --- TRANSLATIONS (i18n) ---
    const translations = {
        es: {
            // Navigation
            'nav.home': 'Inicio',
            'nav.services': 'Servicios',
            'nav.contact': 'Contáctanos',

            // Hero
            'hero.badge': 'Nuevo ciclo escolar 2026',
            'hero.title_start': 'Domina tu futuro con ',
            'hero.title_highlight': 'tutorías expertas',
            'hero.subtitle': 'Desbloquea tu máximo potencial académico. Ofrecemos educación personalizada y de vanguardia en ciencias exactas e idiomas para estudiantes exigentes.',
            'hero.cta_primary': 'Descubre nuestros programas',
            'hero.cta_secondary': 'Agenda una consulta',

            // Services Header
            'services.header_start': 'Nuestros ',
            'services.header_highlight': 'Servicios',
            'services.header_subtitle': 'Programas diseñados meticulosamente para garantizar tu éxito académico, adaptados a tus necesidades de aprendizaje.',

            // Service 1
            'services.card1_title': 'Tutorías Escolares',
            'services.card1_desc': 'Fortalecemos las bases académicas en todas las materias. Ayudamos a los estudiantes a superar sus retos diarios y mejorar sus calificaciones.',
            'services.card1_feat1': 'Todas las materias',
            'services.card1_feat2': 'Acompañamiento diario',
            'services.card1_feat3': 'Mejora de calificaciones',

            // Service 2
            'services.card2_title': 'Tutorías Universitarias',
            'services.card2_desc': 'Apoyo especializado para superar los semestres más exigentes. Cobertura integral en diversas facultades, incluyendo áreas tecnológicas como programación y ciberseguridad.',
            'services.card2_feat1': 'Ciencias exactas',
            'services.card2_feat2': 'Programación',
            'services.card2_feat3': 'Ciberseguridad',

            // Service 3
            'services.card3_title': 'Acompañamiento de Tesis',
            'services.card3_desc': 'Te guiamos paso a paso en la estructuración, investigación, desarrollo y sustentación de tu proyecto de grado.',
            'services.card3_feat1': 'Estructuración',
            'services.card3_feat2': 'Metodología e Investigación',
            'services.card3_feat3': 'Preparación de Sustentación',

            // Contact
            'contact.header_start': 'Contáctanos ',
            'contact.header_highlight': 'Hoy Mismo',
            'contact.header_subtitle': 'Estamos listos para diseñar un plan de estudios a tu medida. Escríbenos directamente por WhatsApp y uno de nuestros asesores académicos te contactará pronto.',
            'contact.location_title': 'Ubicación',
            'contact.location_desc': 'Sesiones online y presenciales (dependiendo de la zona)',

            // Footer
            'footer.rights': 'Todos los derechos reservados.'
        },
        en: {
            // Navigation
            'nav.home': 'Home',
            'nav.services': 'Services',
            'nav.contact': 'Contact Us',

            // Hero
            'hero.badge': 'New school year 2026',
            'hero.title_start': 'Master your future with ',
            'hero.title_highlight': 'expert tutoring',
            'hero.subtitle': 'Unlock your maximum academic potential. We offer personalized, cutting-edge education in exact sciences and languages for demanding students.',
            'hero.cta_primary': 'Discover our programs',
            'hero.cta_secondary': 'Schedule a consultation',

            // Services Header
            'services.header_start': 'Our ',
            'services.header_highlight': 'Services',
            'services.header_subtitle': 'Meticulously designed programs to ensure your academic success, tailored to your learning needs.',

            // Service 1
            'services.card1_title': 'School Tutoring',
            'services.card1_desc': 'We strengthen academic foundations in all subjects. We help students overcome their daily challenges and improve their grades.',
            'services.card1_feat1': 'All subjects',
            'services.card1_feat2': 'Daily support',
            'services.card1_feat3': 'Grade improvement',

            // Service 2
            'services.card2_title': 'University Tutoring',
            'services.card2_desc': 'Specialized support to pass the most demanding semesters. Comprehensive coverage in various faculties, including tech areas like programming and cybersecurity.',
            'services.card2_feat1': 'Exact sciences',
            'services.card2_feat2': 'Programming',
            'services.card2_feat3': 'Cybersecurity',

            // Service 3
            'services.card3_title': 'Thesis Coaching',
            'services.card3_desc': 'We guide you step by step in the structuring, research, development, and defense of your graduation project.',
            'services.card3_feat1': 'Structuring',
            'services.card3_feat2': 'Methodology & Research',
            'services.card3_feat3': 'Defense Preparation',

            // Contact
            'contact.header_start': 'Contact Us ',
            'contact.header_highlight': 'Today',
            'contact.header_subtitle': 'We are ready to design a tailored study plan for you. Message us directly on WhatsApp and one of our academic advisors will contact you soon.',
            'contact.location_title': 'Location',
            'contact.location_desc': 'Online and in-person sessions (depending on the area)',

            // Footer
            'footer.rights': 'All rights reserved.'
        }
    };

    const langBtns = document.querySelectorAll('.lang-toggle');
    const i18nElements = document.querySelectorAll('[data-i18n]');

    const changeLanguage = (lang) => {
        // Update active button
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

    // --- SCROLL ANIMATIONS (INTERSECTION OBSERVER) ---
    // Agrega efectos sutiles "fly-in" cuando los elementos entran a la pantalla
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply starting styles and observe cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${index * 0.1}s`;
        observer.observe(card);
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '0.5rem var(--container-padding-x)';
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.5)';
        } else {
            header.style.padding = '1rem var(--container-padding-x)';
            header.style.boxShadow = 'none';
        }
    });
});
