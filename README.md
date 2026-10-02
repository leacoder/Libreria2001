# Librería 2001 · Avellaneda, desde 1992

Sitio estático con Astro, orientado a consultas por WhatsApp y visitas al local. Conserva el logo, el azul de la marca y las imágenes de productos del sitio anterior.

## Ver la web en tu computadora

Requiere Node.js 22.12 o superior. La implementación se verificó con Node 24.

```sh
npm ci
npm run dev
```

Abrir **http://127.0.0.1:4321/**. Este servidor actualiza la página al editar los archivos. Dejar la terminal abierta; `Ctrl+C` lo detiene. La dirección es local a esa computadora.

Para revisar exactamente los archivos que se publicarán:

```sh
npm run verify
npm run preview
```

`preview` sirve `dist/`: después de editar hay que volver a compilar y recargar. El sitio se publica como HTML, CSS, imágenes y un pequeño módulo de JavaScript; no necesita un servidor Node en producción.

## Qué se renovó

- Portada editorial con la trayectoria desde 1992, tipografías locales, espacio, contraste y accesos claros al contacto.
- Cuatro páginas de servicios con textos propios, pasos de consulta y preguntas frecuentes.
- Catálogo con los 18 productos anteriores, filtros accesibles y consulta individual por WhatsApp. Las imágenes son orientativas, no inventario en tiempo real.
- Menú móvil que cierra al elegir una sección; galería estable con CSS Grid; ampliación con teclado, Escape y recuperación del foco.
- Eliminación de jQuery, Bootstrap y plugins antiguos. WhatsApp funciona como enlace HTML aunque no haya Analytics o JavaScript.
- Imágenes WebP con tamaños adaptables y dimensiones reservadas. Mapa de Google cargado únicamente a pedido.
- Títulos y descripciones propios, canonical sin www, sitemap, datos estructurados de negocio y servicios, y página 404.
- Se mantienen la raíz, los anclajes históricos, las URLs originales de imágenes, `CNAME` y el archivo de verificación de Google.

La auditoría original está en [docs/auditoria-2026-10-02.md](docs/auditoria-2026-10-02.md). El detalle de la implementación y sus límites está en [docs/renovacion-astro.md](docs/renovacion-astro.md).

## Editar contenido

| Archivo | Contenido |
| --- | --- |
| `src/data/business.ts` | Teléfono, WhatsApp, dirección, enlaces y datos estructurados |
| `src/data/services.ts` | Servicios, textos SEO, consultas frecuentes |
| `src/data/products.ts` | Selección de productos y referencias a imágenes |
| `src/pages/index.astro` | Portada e historia |
| `src/components/ContactSection.astro` | Horarios y contacto visibles; sincronizar con `business.ts` al cambiarlos |
| `src/styles/global.css` | Identidad visual y diseño adaptable |
| `src/assets/papeleria-editorial.png` | Imagen editorial generada para la portada |
| `public/img/` | Imágenes originales, conservadas en sus URLs |

## Google Analytics 4

La web funciona sin Analytics. Para activarlo, obtener el **ID de medición `G-…`** en Google Analytics → Administrar → Recogida y modificación de datos → Flujos de datos → flujo Web. [Ayuda de Google](https://support.google.com/analytics/answer/14183469?hl=es).

Copiar `.env.example` a `.env`, completar `PUBLIC_GOOGLE_ANALYTICS_ID` y volver a compilar. En GitHub Actions, crear una **variable del repositorio** con ese mismo nombre en Settings → Secrets and variables → Actions → Variables. Es un identificador público, no una contraseña.

Solo se carga en el dominio de producción y con un ID configurado. Las vistas previas locales no envían eventos. Los eventos propios son:

| Evento | Acción |
| --- | --- |
| `contact_whatsapp` | Clic de consulta por WhatsApp |
| `contact_phone` | Clic en teléfono |
| `get_directions` | Clic para obtener indicaciones |
| `contact_email` | Clic en correo |

Incluyen ubicación del enlace y nombre del producto cuando corresponde, sin el texto del mensaje. Un clic no acredita una conversación, compra o visita. Tras publicar, verificar la recepción en Tiempo real y elegir los eventos clave en GA4; esta configuración de la cuenta no se hizo desde el repositorio.

## Publicar cuando decidas

La renovación se preparó en `codex/renovacion-astro-seo`. El deploy queda a cargo del propietario.

### GitHub Pages

El workflow `.github/workflows/deploy.yml` es **exclusivamente manual**. No tiene disparadores por push ni por pull request. Instala, ejecuta `npm run verify` y publica `dist/` solo cuando se ejecuta desde Actions.

1. Revisar y aprobar la rama. Para disponer del botón manual en Actions, el workflow debe existir en la rama predeterminada del repositorio.
2. Coordinar la integración de la rama con el cambio de **Settings → Pages → Source → GitHub Actions**. El método anterior de publicar HTML directamente desde la raíz no sirve para estos archivos fuente Astro; no integrar y dejar Pages apuntando a esa raíz.
3. Conservar el dominio personalizado `libreria2001.com.ar` y HTTPS. `public/CNAME` ya incluye ese dominio. La configuración está preparada para su raíz, sin prefijo `/Libreria2001/`.
4. Si ya tenés GA4, agregar la variable indicada arriba antes de compilar.
5. Ir a **Actions → Publicar web (manual) → Run workflow**, elegir la rama aprobada y ejecutarlo.
6. Comprobar portada, las cuatro páginas de servicio, imágenes, WhatsApp, teléfono, indicaciones, sitemap y una ruta inexistente. Debe servirse `404.html` con estado HTTP 404.

El workflow sigue la [guía oficial de Astro para GitHub Pages](https://docs.astro.build/en/guides/deploy/github/), con ejecución manual y comprobaciones previas. No se ejecutó un despliegue remoto durante esta renovación.

### Otro hosting estático

Ejecutar `npm ci` y `npm run verify`, y subir **el contenido de `dist/`**, incluidos `_astro/`, `img/`, `servicios/`, robots, sitemap y verificación. Configurar índices de directorios y la página 404 del proveedor. No aplicar una reescritura global de todas las rutas a `index.html`.

### SEO después de publicar

- Mantener las redirecciones existentes de HTTP y www hacia HTTPS sin www. Si el proveedor permite una regla, redirigir `/index.html` a `/` con 301; mientras tanto el HTML ya declara la raíz como canonical.
- En Search Console, inspeccionar la raíz y una página de servicio; comprobar la canonical elegida y enviar `https://libreria2001.com.ar/sitemap.xml`.
- Comprobar los datos estructurados con la prueba de Google y medir rendimiento en producción. Las comprobaciones locales no certifican indexación ni Core Web Vitals.
- Revisar el Perfil de Empresa de Google: categoría, dirección dentro de la galería, horarios especiales, web y fotos reales.
- Comparar consultas, clics, impresiones y acciones de contacto después de un período suficiente y considerar la estacionalidad escolar. La exportación recibida y su análisis privado permanecen fuera de Git, dentro de `.local/`.

Para revertir una publicación, volver a desplegar la versión anterior mediante el mecanismo de hosting correspondiente. La versión HTML original se conserva en el historial Git, commit `8abbb50`; no ejecutarla con el workflow Astro porque no tiene `package.json`.
