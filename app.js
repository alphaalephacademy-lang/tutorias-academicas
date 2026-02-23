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
        if(mobileNav.classList.contains('open')) {
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

    // --- FORM VALIDATION LOGIC ---
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectSelect = document.getElementById('subject');
    const formSuccess = document.getElementById('formSuccess');
    const submitBtn = form.querySelector('.submit-btn');

    // Validation patterns
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validation helper
    const validateField = (input, condition, errorId) => {
        const errorElement = document.getElementById(errorId);
        if (condition) {
            // Invalid
            input.classList.add('invalid');
            errorElement.classList.add('active');
            return false;
        } else {
            // Valid
            input.classList.remove('invalid');
            errorElement.classList.remove('active');
            return true;
        }
    };

    // Real-time validation listeners
    nameInput.addEventListener('input', () => {
        validateField(nameInput, nameInput.value.trim() === '', 'nameError');
    });

    emailInput.addEventListener('input', () => {
        validateField(emailInput, !emailPattern.test(emailInput.value.trim()), 'emailError');
    });

    subjectSelect.addEventListener('change', () => {
        validateField(subjectSelect, subjectSelect.value === '', 'subjectError');
    });

    // Form submit handler
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent page reload

        // Trigger all validations to show errors if submit is clicked too early
        const isNameValid = validateField(nameInput, nameInput.value.trim() === '', 'nameError');
        const isEmailValid = validateField(emailInput, !emailPattern.test(emailInput.value.trim()), 'emailError');
        const isSubjectValid = validateField(subjectSelect, subjectSelect.value === '', 'subjectError');

        if (isNameValid && isEmailValid && isSubjectValid) {
            // Simular envío de datos
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;

            setTimeout(() => {
                // Success
                form.reset();
                formSuccess.classList.remove('hidden');
                submitBtn.textContent = 'Enviar Mensaje';
                submitBtn.disabled = false;

                // Hide success message after 5 seconds
                setTimeout(() => {
                    formSuccess.classList.add('hidden');
                }, 5000);
            }, 1500);
        }
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
