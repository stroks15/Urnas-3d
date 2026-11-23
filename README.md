# NEXTLI Urnas 3D

Personalizador mobile-first construido con Next.js, React Three Fiber, Three.js y Capacitor.

## Desarrollo
`npm install && npm run dev`

## Supabase
Configura `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY` en Vercel. Ejecuta `supabase/schema.sql` en el SQL Editor. La tabla aplica RLS. Activa Authentication → Providers → Anonymous para que el botón de guardado cree una sesión anónima segura y asocie cada diseño a su usuario. No pongas claves service-role en el navegador.

## Android
El workflow crea un proyecto Capacitor efímero y adjunta `Urnas3D-Nextli.apk` de tipo debug a una GitHub Release en cada push. Es una APK de pruebas sin firma de distribución; para producción configura keystore y secretos de firma.

## Alcance actual
El visor contiene 21 bases paramétricas simplificadas (incluye las variantes originales Talavera Pewter, Talavera azul, urna redonda de dos huellas y dos modelos de huesito) (incluida Corazón Talavera Pewter), selector de 25 especies con esculturas procedurales diferenciadas por grupo, seis acabados PBR y aplicación independiente a base o figura, modos animal/huella, 12 variantes de huella, relieve hundido/sobresaliente, selección de zona de grabado (frontal, tapa, trasera y lateral), dedicatoria, giro en pasos de 45° y descarga PNG. La foto se muestra como referencia y todavía no se convierte en malla 3D. La reproducción CAD exacta de las urnas originales, grabados CSG/manifold, exportación STL/GLB y verificación dimensional de fabricación siguen pendientes.
