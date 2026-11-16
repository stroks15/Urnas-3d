# NEXTLI Studio 3D

Configurador de urnas 3D para mascotas. Stack: Vite, React, Three.js y React Three Fiber.

## Desarrollo
`npm install && npm run dev`

## Vercel
Importa este repositorio; Build Command `npm run build`, Output Directory `dist`. Modelos en `public/models/urnas/`, recursos en `public/assets/`.

La aplicación recibe `especie`, `peso`, `nombre` y `returnUrl` por query string. Exporta configuración JSON y vistas PNG/GLB/STL. Valida los archivos exportados en CAD/slicer antes de fabricar.