document.addEventListener('DOMContentLoaded', () => {
    // ========== THEME TOGGLE ==========
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const htmlElement = document.documentElement;

    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }

    function updateThemeIcon(theme) {
        if (themeIcon) {
            themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }

    // ========== NAVBAR SCROLL EFFECT ==========
    const header = document.getElementById('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // ========== TYPING EFFECT ==========
    const typedTextSpan = document.querySelector('.typed-text');
    if (typedTextSpan) {
        const textArray = [
            'Desarrollo Web',
            'Bases de Datos',
            'Redes & Seguridad',
            'Infraestructura',
            'Arquitectura de Software'
        ];
        const typingDelay = 100;
        const erasingDelay = 50;
        const newTextDelay = 2000;
        let textArrayIndex = 0;
        let charIndex = 0;

        function type() {
            if (charIndex < textArray[textArrayIndex].length) {
                typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
                charIndex++;
                setTimeout(type, typingDelay);
            } else {
                setTimeout(erase, newTextDelay);
            }
        }

        function erase() {
            if (charIndex > 0) {
                typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
                charIndex--;
                setTimeout(erase, erasingDelay);
            } else {
                textArrayIndex++;
                if (textArrayIndex >= textArray.length) textArrayIndex = 0;
                setTimeout(type, typingDelay + 500);
            }
        }

        setTimeout(type, newTextDelay);
    }

    // ========== ANIMATED COUNTERS ==========
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;

    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const increment = target / speed;

        const updateCount = () => {
            const count = +counter.innerText;
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 10);
            } else {
                counter.innerText = target;
            }
        };

        updateCount();
    };

    // Intersection Observer for counters
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    // ========== INTERSECTION OBSERVER FOR ANIMATIONS ==========
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = entry.target.dataset.animation || 'fadeInUp 0.8s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe animated elements
    document.querySelectorAll('.fade-in-up, .service-card, .project-card').forEach(el => {
        el.style.opacity = '0';
        el.dataset.animation = 'fadeInUp 0.8s ease forwards';
        observer.observe(el);
    });

    // ========== TAB SWITCHING (for projects page) ==========
    const tabBtns = document.querySelectorAll('.tab-btn');
    const projectGrids = document.querySelectorAll('.projects-grid');

    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                projectGrids.forEach(grid => grid.classList.add('hidden'));

                const targetId = btn.getAttribute('data-target');
                const targetGrid = document.getElementById(targetId);
                if (targetGrid) {
                    targetGrid.classList.remove('hidden');
                }
            });
        });
    }

    // ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // ========== PROJECT DETAIL PAGE ==========
    const projectsData = {
        'investigacion1': {
            title: 'Investigación 1',
            category: 'Asignación',
            desc: 'Análisis de Estructura y Jerarquía Visual (agrupación, espacio en blanco, tipografía) y técnicas de diseño UX/UI como Card Sorting, Prototipado y Wireframes.',
            fileName: 'Investigacion1_EddieMan.pdf'
        },
        'taller1': {
            title: 'Taller Práctico 1',
            category: 'Asignación',
            desc: 'Desarrollo de un Sitio Web (HTML) para la Facultad de Economía de la Universidad de Chiriquí. El proyecto estructura los módulos del diplomado de la CAF, incluyendo menús de navegación y descarga de materiales.',
            fileName: 'Taller1.zip'
        },
        'ejercicio1': {
            title: 'Ejercicio Práctico 1',
            category: 'Asignación',
            desc: 'Solución Web para la Pyme "SUCESOS y MÁS". Incluye código fuente (Parte I) y documentación de casos de estudio (Partes II y III).',
            fileName: 'Ejercicio1_Entregables.zip'
        },
        'investigacion3': {
            title: 'Investigación 3',
            category: 'Asignación',
            desc: 'Investigación técnica sobre la integración de Bases de Datos (MariaDB-MySQL) con PHP.'
        },
        'taller3': {
            title: 'Taller Práctico 3',
            category: 'Asignación',
            desc: 'Sistema de Información para "CHINOS CAFE". Implementación de servidor MySQL y sistema POS (Punto de Venta) Web en PHP con gestión de inventario y facturación. Incluye configuración de Firewall y VLANs.',
            fileName: 'Taller3_Entregables.zip'
        },
        'lab1': {
            title: 'Laboratorio Práctico 1',
            category: 'Laboratorio',
            desc: 'Proyecto para el Municipio Distrito Alanje. Configuración de Servidor Apache en Linux (virtualizado), prototipo web y diseño de esquema de Red LAN para los departamentos municipales.',
            fileName: 'Laboratorios.zip'
        },
        'lab2': {
            title: 'Laboratorio Práctico 2',
            category: 'Laboratorio',
            desc: 'Simulación de Ciberseguridad para la empresa estatal JC de Las Lomas. Ejecución y análisis de ataques DDoS y escaneo de puertos (NMAP) en un entorno controlado para implementar estrategias de mitigación.',
            fileName: 'Informe_DDoS_Pruebas.pdf'
        },
        'parcial1': {
            title: 'Examen Parcial 1',
            category: 'Parcial',
            desc: 'Implementación de Servidor Web NGINX en Linux y diseño de diagrama de red conectando sucursales en Chiriquí y Veraguas. Incluye desarrollo web para el Centro Especializado en Lenguas (CEL).',
            fileName: 'SitioCEL.zip'
        },
        'parcial2': {
            title: 'Examen Parcial 2',
            category: 'Parcial',
            desc: 'Sistema de Mantenimiento Web para la Pyme "NIBARRA". Funcionalidades CRUD, Chatbot y replicación de DB.',
            fileName: 'Parcial2_Entregables.zip'
        },
        'final': {
            title: 'Examen Final',
            category: 'Parcial',
            desc: 'Prototipo integral para "Consultores Chiriquí S.A." gestión de vacantes sin hoja de vida. Incluye simulación de facturación de peajes digitales tipo DGI, Chatbot de guía y arquitectura de servidores con balanceo de carga.'
        }
    };

    // Project Detail Page Logic
    if (window.location.pathname.includes('project-detail.html')) {
        const params = new URLSearchParams(window.location.search);
        const projectId = params.get('id');

        if (projectId && projectsData[projectId]) {
            const data = projectsData[projectId];

            // Update content
            const titleEl = document.getElementById('project-title');
            const categoryEl = document.getElementById('project-category');
            const descEl = document.getElementById('project-desc');
            const downloadLink = document.getElementById('download-link');
            const pdfContainer = document.getElementById('pdf-container');

            if (titleEl) titleEl.textContent = data.title;
            if (categoryEl) categoryEl.textContent = data.category;
            if (descEl) descEl.textContent = data.desc;

            // Handle download link
            if (downloadLink && data.fileName) {
                downloadLink.style.display = 'inline-flex';
                downloadLink.href = `assets/projects/${projectId}/${data.fileName}`;

                if (data.fileName.endsWith('.zip')) {
                    downloadLink.innerHTML = '<i class="fas fa-file-archive"></i> Descargar ZIP';
                } else if (data.fileName.endsWith('.pdf')) {
                    downloadLink.innerHTML = '<i class="fas fa-file-pdf"></i> Descargar PDF';
                } else {
                    downloadLink.innerHTML = '<i class="fas fa-download"></i> Descargar Archivo';
                }
            } else if (downloadLink) {
                downloadLink.style.display = 'none';
            }

            // Update PDF viewer
            if (pdfContainer) {
                const pdfPath = `assets/projects/${projectId}/document.pdf`;
                pdfContainer.innerHTML = `
                    <object data="${pdfPath}" type="application/pdf" width="100%" height="100%">
                        <div style="text-align: center; padding: 2rem; color: var(--text-primary);">
                            <i class="fas fa-file-pdf" style="font-size: 3rem; color: var(--accent-primary); margin-bottom: 1rem;"></i>
                            <p style="margin-bottom: 1rem;">No se pudo cargar el PDF en el navegador.</p>
                            <a href="${pdfPath}" class="btn btn-primary" download>
                                <i class="fas fa-download"></i> Descargar PDF
                            </a>
                        </div>
                    </object>
                `;
            }
        } else {
            const titleEl = document.getElementById('project-title');
            const descEl = document.getElementById('project-desc');
            if (titleEl) titleEl.textContent = 'Proyecto no encontrado';
            if (descEl) descEl.textContent = 'El proyecto que buscas no existe o el enlace es incorrecto.';
        }
    }

    // ========== BUTTON RIPPLE EFFECT ==========
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const ripple = document.createElement('span');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // ========== HAMBURGER MENU (Mobile) ==========
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = hamburger.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }

    // ========== CURSOR EFFECT (Desktop only) ==========
    if (window.innerWidth > 768) {
        const cursor = document.createElement('div');
        cursor.classList.add('custom-cursor');
        document.body.appendChild(cursor);

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        document.querySelectorAll('a, button').forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
        });
    }

    console.log('🚀 Portfolio loaded successfully!');
});