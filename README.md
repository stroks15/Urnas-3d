# NEXTLI Studio 3D

Configurador de urnas para mascotas construido con React, Vite, Three.js y React Three Fiber.

## Desarrollo
```bash
npm install
npm run dev
npm run build
npm run preview
```

## Vercel
Importa `stroks15/Urnas-3d` en Vercel. Framework: Vite; Build: `npm run build`; Output: `dist`. No requiere variables obligatorias. `.env.example` reserva `VITE_ASSET_UPLOAD_ENDPOINT` para un futuro adaptador de almacenamiento.

## Integración NEXTLI
Lee `especie`, `peso`, `nombre` y `returnUrl` desde query string. Al finalizar manda `NEXTLI_URN_DESIGN` por `postMessage` al opener y redirige a `returnUrl` con `nextliDesign` codificado en Base64. La web receptora debe validar estrictamente `event.origin` y el esquema del JSON.

## Recursos
Modelos: `public/models/urnas/`; recursos: `public/assets/`. Figuras SVG y huellas locales: `src/lib/animalsLibrary.js`, `src/lib/pawsLibrary.js`. El procesador de imagen elimina fondos casi blancos localmente.

## Alcance de esta primera versión
Incluye moldes paramétricos, figuras y huellas SVG extruidas, acabados de referencia, dedicatoria y exportación PNG/GLB/STL. La carga OBJ/STL, el gizmo TransformControls, la proyección Decal sobre superficies curvas y la conversión de foto a malla sólida cerrada no están implementados todavía. La foto se usa como textura/placa visual, no como relieve manufacturable.

Antes de fabricar, valida escala en mm, espesores, malla cerrada, normales, tolerancias y capacidad en CAD/slicer. Los materiales son aproximaciones visuales, no simulación certificada.
