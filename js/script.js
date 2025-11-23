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

    // Tab Switching Logic (Only if tabs exist)
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

                // Show target grid
                const targetId = btn.getAttribute('data-target');
                document.getElementById(targetId).classList.remove('hidden');
            });
        });
    }

    // Project Data
    // Datos de Proyectos Actualizados con la información de los PDFs
    const projectsData = {
        'investigacion1': {
            title: 'Investigación 1',
            category: 'Asignación',
            desc: 'Investigación sobre conceptos fundamentales (Documento pendiente de carga).' // No se subió este PDF específico
        },
        'taller1': {
            title: 'Taller Práctico 1',
            category: 'Asignación',
            desc: 'Desarrollo de un Sitio Web (HTML) para la Facultad de Economía de la Universidad de Chiriquí. [cite_start]El proyecto estructura los módulos del diplomado de la CAF, incluyendo menús de navegación y descarga de materiales[cite: 195, 197].'
        },
        'ejercicio1': {
            title: 'Ejercicio Práctico 1',
            category: 'Asignación',
            desc: 'Solución Web para la Pyme "SUCESOS y MÁS" utilizando PHP. [cite_start]Incluye diseño de interfaz de dos columnas, navegación interna y un módulo de facturación de servicios de consultoría y hosting[cite: 316, 320, 327].'
        },
        'investigacion3': {
            title: 'Investigación 3',
            category: 'Asignación',
            desc: 'Investigación técnica sobre la integración de Bases de Datos (MariaDB-MySQL) con PHP. [cite_start]Cubre configuración de entornos, puertos y replicación entre SGBDs[cite: 119, 128].'
        },
        'taller3': {
            title: 'Taller Práctico 3',
            category: 'Asignación',
            desc: 'Sistema de Información para "CHINOS CAFE". Implementación de servidor MySQL y sistema POS (Punto de Venta) Web en PHP con gestión de inventario y facturación. [cite_start]Incluye configuración de Firewall y VLANs[cite: 358, 376, 385].'
        },
        'lab1': {
            title: 'Laboratorio Práctico 1',
            category: 'Laboratorio',
            desc: 'Proyecto para el Municipio Distrito Alanje. [cite_start]Configuración de Servidor Apache en Linux (virtualizado), prototipo web y diseño de esquema de Red LAN para los departamentos municipales[cite: 148, 150, 155].'
        },
        'lab2': {
            title: 'Laboratorio Práctico 2',
            category: 'Laboratorio',
            desc: 'Simulación de Ciberseguridad para la empresa estatal JC de Las Lomas. [cite_start]Ejecución y análisis de ataques DDoS y escaneo de puertos (NMAP) en un entorno controlado para implementar estrategias de mitigación[cite: 403, 410, 412].'
        },
        'parcial1': {
            title: 'Examen Parcial 1',
            category: 'Parcial',
            desc: 'Implementación de Servidor Web NGINX en Linux y diseño de diagrama de red conectando sucursales en Chiriquí y Veraguas. [cite_start]Incluye desarrollo web para el Centro Especializado en Lenguas (CEL)[cite: 51, 60, 95].'
        },
        'parcial2': {
            title: 'Examen Parcial 2',
            category: 'Parcial',
            desc: 'Sistema de Mantenimiento Web para la Pyme "NIBARRA". [cite_start]Funcionalidades CRUD para equipos, calendario de mantenimientos, integración de Chatbot y replicación de base de datos entre provincias[cite: 432, 438, 520].'
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

            // Update Download Link
            const downloadLink = document.getElementById('download-link');
            downloadLink.href = `assets/projects/${projectId}/project.zip`;

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
