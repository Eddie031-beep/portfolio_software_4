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
    const projectsData = {
        'investigacion1': {
            title: 'Investigación 1',
            category: 'Asignación',
            desc: 'Investigación detallada sobre los fundamentos teóricos de la materia. Este documento abarca los conceptos clave y su aplicación en el desarrollo de software.'
        },
        'taller1': {
            title: 'Taller Práctico 1',
            category: 'Asignación',
            desc: 'Primer taller práctico enfocado en la resolución de problemas básicos y la implementación de algoritmos sencillos.'
        },
        'ejercicio1': {
            title: 'Ejercicio Práctico 1',
            category: 'Asignación',
            desc: 'Serie de ejercicios prácticos para reforzar los conocimientos adquiridos en clase.'
        },
        'investigacion3': {
            title: 'Investigación 3',
            category: 'Asignación',
            desc: 'Investigación avanzada sobre temas específicos del curso, profundizando en tecnologías modernas.'
        },
        'taller3': {
            title: 'Taller Práctico 3',
            category: 'Asignación',
            desc: 'Taller práctico de nivel intermedio/avanzado que requiere la integración de múltiples conceptos.'
        },
        'lab1': {
            title: 'Laboratorio Práctico 1',
            category: 'Laboratorio',
            desc: 'Práctica de laboratorio inicial. Incluye experimentos de código y análisis de resultados.'
        },
        'lab2': {
            title: 'Laboratorio Práctico 2',
            category: 'Laboratorio',
            desc: 'Segunda sesión de laboratorio enfocada en estructuras de datos y optimización.'
        },
        'parcial1': {
            title: 'Examen Parcial 1',
            category: 'Parcial',
            desc: 'Primera evaluación parcial del curso. Cubre los temas vistos en el primer módulo.'
        },
        'parcial2': {
            title: 'Examen Parcial 2',
            category: 'Parcial',
            desc: 'Segunda evaluación parcial. Se enfoca en la aplicación práctica de los conocimientos.'
        },
        'final': {
            title: 'Examen Final',
            category: 'Parcial',
            desc: 'Proyecto o examen final que integra todo lo aprendido durante el curso.'
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
