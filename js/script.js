document.addEventListener('DOMContentLoaded', () => {
    // Navbar Scroll Effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(15, 15, 15, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.5)';
        } else {
            header.style.background = 'rgba(15, 15, 15, 0.9)';
            header.style.boxShadow = 'none';
        }
    });

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.15,
        rootMargin: "0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // Theme Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggle;

    // Check local storage
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'light') {
        body.setAttribute('data-theme', 'light');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }

    themeToggle.addEventListener('click', () => {
        if (body.getAttribute('data-theme') === 'light') {
            body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'dark');
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        } else {
            body.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    });

    // Tab Switching Logic with Animation Reset
    const tabBtns = document.querySelectorAll('.tab-btn');
    const projectGrids = document.querySelectorAll('.projects-grid');

    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                tabBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');

                // Hide all grids
                projectGrids.forEach(grid => grid.classList.add('hidden'));

                // Show target grid and trigger animations
                const targetId = btn.getAttribute('data-target');
                const targetGrid = document.getElementById(targetId);
                targetGrid.classList.remove('hidden');

                // Reset animations
                const cards = targetGrid.querySelectorAll('.card');
                cards.forEach(card => {
                    card.classList.remove('animate-card');
                    void card.offsetWidth; // Trigger reflow
                    card.classList.add('animate-card');
                });
            });
        });

        // Trigger animation for the initial active tab
        const initialGrid = document.querySelector('.projects-grid:not(.hidden)');
        if (initialGrid) {
            const cards = initialGrid.querySelectorAll('.card');
            cards.forEach(card => card.classList.add('animate-card'));
        }
    }


    // Project Data
    // Datos de Proyectos Actualizados con la información de los PDFs
    const projectsData = {
        'investigacion1': {
            title: 'Investigación 1',
            category: 'Asignación',
            desc: 'Análisis de Estructura y Jerarquía Visual (agrupación, espacio en blanco, tipografía) y técnicas de diseño UX/UI como Card Sorting, Prototipado y Wireframes.',
            fileName: 'Investigacion1_EddieMan.pdf' // Nombre del archivo para descargar
        },
        'taller1': {
            title: 'Taller Práctico 1',
            category: 'Asignación',
            desc: 'Desarrollo de un Sitio Web (HTML) para la Facultad de Economía de la Universidad de Chiriquí. El proyecto estructura los módulos del diplomado de la CAF, incluyendo menús de navegación y descarga de materiales.',
            fileName: 'Taller1.zip' // <--- AQUÍ ESTÁ EL CAMBIO
        },
        'ejercicio1': {
            title: 'Ejercicio Práctico 1',
            category: 'Asignación',
            desc: 'Solución Web para la Pyme "SUCESOS y MÁS". Incluye código fuente (Parte I) y documentación de casos de estudio (Partes II y III).',
            fileName: 'Ejercicio1_Entregables.zip' // <--- Archivo ZIP maestro
        },
        'investigacion3': {
            title: 'Investigación 3',
            category: 'Asignación',
            desc: 'Investigación técnica sobre la integración de Bases de Datos (MariaDB-MySQL) con PHP.',
            // NO AGREGAMOS fileName aquí, así el código sabrá que no hay descarga.
        },
        'taller3': {
            title: 'Taller Práctico 3',
            category: 'Asignación',
            desc: 'Sistema de Información para "CHINOS CAFE". Implementación de servidor MySQL y sistema POS (Punto de Venta) Web en PHP con gestión de inventario y facturación. Incluye configuración de Firewall y VLANs.',
            fileName: 'Taller3_Entregables.zip' // <--- AQUÍ ESTÁ EL CAMBIO
        },
        'lab1': {
            title: 'Laboratorio Práctico 1',
            category: 'Laboratorio',
            desc: 'Proyecto para el Municipio Distrito Alanje. Configuración de Servidor Apache en Linux (virtualizado), prototipo web y diseño de esquema de Red LAN para los departamentos municipales.',
            fileName: 'Laboratorios.zip' // <--- CORREGIDO: Ahora este ZIP está aquí
        },
        'lab2': {
            title: 'Laboratorio Práctico 2',
            category: 'Laboratorio',
            desc: 'Simulación de Ciberseguridad para la empresa estatal JC de Las Lomas. Ejecución y análisis de ataques DDoS y escaneo de puertos (NMAP) en un entorno controlado para implementar estrategias de mitigación.',
            fileName: 'Informe_DDoS_Pruebas.pdf' // <--- AQUÍ ESTÁ EL CAMBIO
        },
        'parcial1': {
            title: 'Examen Parcial 1',
            category: 'Parcial',
            desc: 'Implementación de Servidor Web NGINX en Linux y diseño de diagrama de red conectando sucursales en Chiriquí y Veraguas. Incluye desarrollo web para el Centro Especializado en Lenguas (CEL).',
            fileName: 'SitioCEL.zip' // <--- AQUÍ ESTÁ EL CAMBIO
        },
        'parcial2': {
            title: 'Examen Parcial 2',
            category: 'Parcial',
            desc: 'Sistema de Mantenimiento Web para la Pyme "NIBARRA". Funcionalidades CRUD, Chatbot y replicación de DB.',
            fileName: 'Parcial2_Entregables.zip' // <--- Archivo con el git y el pkt
        },
        'final': {
            title: 'Examen Final',
            category: 'Parcial',
            desc: 'Prototipo integral para "Consultores Chiriquí S.A." gestión de vacantes sin hoja de vida. [cite_start]Incluye simulación de facturación de peajes digitales tipo DGI, Chatbot de guía y arquitectura de servidores con balanceo de carga[cite: 17, 18, 20].'
        }
    };

    // Project Detail Page Logic
    if (window.location.pathname.includes('project-detail.html')) {
        const params = new URLSearchParams(window.location.search);
        const projectId = params.get('id');

        if (projectId && projectsData[projectId]) {
            const data = projectsData[projectId];

            // Update Text Content
            document.getElementById('project-title').textContent = data.title;
            document.getElementById('project-category').textContent = data.category;
            document.getElementById('project-desc').textContent = data.desc;

            // Update Download Link (Lógica Inteligente)
            const downloadLink = document.getElementById('download-link');

            if (data.fileName) {
                // Si hay nombre de archivo, mostramos el botón y configuramos el enlace
                downloadLink.style.display = 'inline-flex'; // Asegura que se vea
                downloadLink.href = `assets/projects/${projectId}/${data.fileName}`;

                // Iconos dinámicos
                if (data.fileName.endsWith('.zip')) {
                    downloadLink.innerHTML = '<i class="fas fa-file-archive"></i> Descargar ZIP';
                } else if (data.fileName.endsWith('.pdf')) {
                    downloadLink.innerHTML = '<i class="fas fa-file-pdf"></i> Descargar PDF';
                } else {
                    downloadLink.innerHTML = '<i class="fas fa-download"></i> Descargar Archivo';
                }
            } else {
                // Si NO hay fileName (como en Investigación 3), ocultamos el botón
                downloadLink.style.display = 'none';
            }

            // Update PDF Viewer
            const pdfContainer = document.getElementById('pdf-container');
            const pdfPath = `assets/projects/${projectId}/document.pdf`;

            pdfContainer.innerHTML = `
                <object data="${pdfPath}" type="application/pdf" width="100%" height="100%">
                    <div style="text-align: center; padding: 2rem; color: #fff;">
                        <p>No se pudo cargar el PDF directamente.</p>
                        <a href="${pdfPath}" class="btn-small" target="_blank">Abrir PDF en nueva pestaña</a>
                    </div>
                </object>
            `;
        } else {
            document.getElementById('project-title').textContent = 'Proyecto no encontrado';
            document.getElementById('project-desc').textContent = 'El proyecto que buscas no existe o el enlace es incorrecto.';
        }
    }
});
