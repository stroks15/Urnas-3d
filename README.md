# NEXTLI Urnas 3D

Personalizador mobile-first construido con Next.js, React Three Fiber, Three.js y Capacitor.

## Desarrollo
`npm install && npm run dev`

## Supabase
Configura `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY` en Vercel. Ejecuta `supabase/schema.sql` en el SQL Editor. La tabla aplica RLS. Activa Authentication → Providers → Anonymous para que el botón de guardado cree una sesión anónima segura y asocie cada diseño a su usuario. No pongas claves service-role en el navegador.

## Android
El workflow crea un proyecto Capacitor efímero y adjunta `Urnas3D-Nextli.apk` de tipo debug a una GitHub Release en cada push. Es una APK de pruebas sin firma de distribución; para producción configura keystore y secretos de firma.

## Alcance actual
El visor contiene 15 bases paramétricas simplificadas, selector de 25 especies, cinco presets PBR, modos animal/huella, campos de grabado, giro en pasos de 45° y descarga PNG. Las figuras animales son un modelo metálico genérico y la foto subida queda como referencia; no se convierte aún a escultura propia. El catálogo de imágenes del ZIP, grabados CSG por cara, STL/GLB, mallas manifold verificadas y autenticación/guardado integrado siguen siendo trabajo pendiente.
