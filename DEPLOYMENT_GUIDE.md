# Guía de Despliegue en GitHub

Sigue estos pasos para subir tu portafolio a GitHub y compartirlo con tu profesor.

## 1. Mover el Proyecto a "Mis Documentos"
Como medida de seguridad, he preparado el proyecto en una carpeta temporal. Debes moverlo a tu carpeta de Documentos.

1. Abre la carpeta donde está el proyecto actualmente: `C:\Users\eddie\.gemini\antigravity\scratch\portfolio_software_4`
2. Corta la carpeta `portfolio_software_4`.
3. Ve a `Documentos`.
4. Pega la carpeta allí.

## 2. Crear un Repositorio en GitHub
1. Inicia sesión en tu cuenta de [GitHub](https://github.com).
2. Haz clic en el botón **+** en la esquina superior derecha y selecciona **New repository**.
3. Nombre del repositorio: `mi-portafolio` (o el nombre que prefieras).
4. Asegúrate de que esté marcado como **Public**.
5. **NO** marques "Initialize this repository with a README".
6. Haz clic en **Create repository**.

## 3. Subir el Código
Abre una terminal (PowerShell o CMD) en la carpeta de tu proyecto en Documentos y ejecuta los siguientes comandos uno por uno:

```powershell
# 1. Asegúrate de estar en la carpeta correcta
cd "C:\Users\eddie\Documents\portfolio_software_4"

# 2. Añadir todos los archivos
git add .

# 3. Guardar los cambios
git commit -m "Primer commit: Portafolio inicial"

# 4. Renombrar la rama principal a 'main'
git branch -M main

# 5. Conectar con GitHub (REEMPLAZA 'TU_USUARIO' CON TU NOMBRE DE USUARIO DE GITHUB)
git remote add origin https://github.com/TU_USUARIO/mi-portafolio.git

# 6. Subir los archivos
git push -u origin main
```

## 4. Activar GitHub Pages
Para que tu profesor pueda ver la página web:

1. En tu repositorio de GitHub, ve a la pestaña **Settings**.
2. En el menú de la izquierda, haz clic en **Pages**.
3. En "Source", selecciona **Deploy from a branch**.
4. En "Branch", selecciona **main** y la carpeta **/(root)**.
5. Haz clic en **Save**.

Espera unos minutos y aparecerá un enlace en la parte superior de esa página (ej: `https://tu-usuario.github.io/mi-portafolio/`). ¡Ese es el enlace que debes enviar a tu profesor!
