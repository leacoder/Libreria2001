# Librería 2001 · Avellaneda, desde 1992

Sitio estático con Astro, orientado a consultas por WhatsApp y visitas al local. Usa el nuevo logo aportado por el propietario y conserva el azul de la marca y las imágenes de productos del sitio anterior.

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
- Imágenes WebP con tamaños adaptables y dimensiones reservadas. Mapa real de Google con carga diferida y una vista amplia de la zona.
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
| `src/assets/papeleria-editorial-marca.png` | Imagen editorial generada para la portada |
| `public/img/` | Imágenes originales, conservadas en sus URLs |

## Google Analytics 4

El ID de medición **`G-VDGRQ1QPV9`** ya está configurado por defecto en `src/layouts/Base.astro`. Está versionado para que tanto la compilación local como el workflow de publicación lo incluyan, sin configurar variables adicionales. Es un identificador público, no una contraseña.

Para reemplazarlo, copiar `.env.example` a `.env`, completar `PUBLIC_GOOGLE_ANALYTICS_ID` y volver a compilar. En GitHub Actions también se puede usar una **variable del repositorio** con ese nombre en Settings → Secrets and variables → Actions → Variables. El valor `off` desactiva Analytics; un valor vacío conserva el ID predeterminado. El ID se consulta en Google Analytics → Administrar → Recogida y modificación de datos → Flujos de datos → flujo Web. [Ayuda de Google](https://support.google.com/analytics/answer/14183469?hl=es).

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

El workflow `.github/workflows/deploy.yml` publica **automáticamente después de cada push o merge a `master`**. Instala, ejecuta `npm run verify` y publica `dist/` únicamente si las comprobaciones pasan. También permite ejecutarlo manualmente desde Actions. También admite `main` si se renombra la rama principal. Los pushes a ramas de trabajo y los pull requests no disparan publicaciones.

1. Una sola vez, cambiar **Settings → Pages → Build and deployment → Source → GitHub Actions**. Usar el workflow de este repositorio; no agregar una plantilla Jekyll. El error «Invalid YAML front matter» en un archivo `.astro` indica que sigue ejecutándose el constructor Jekyll anterior.
2. Revisar e integrar la rama en `master`, incluyendo `.github/workflows/deploy.yml`. Ese push o merge inicia la publicación y los siguientes cambios en `master` también la iniciarán automáticamente.
3. Conservar el dominio personalizado `libreria2001.com.ar` y HTTPS. `public/CNAME` ya incluye ese dominio. La configuración está preparada para su raíz, sin prefijo `/Libreria2001/`.
4. GA4 ya incluye `G-VDGRQ1QPV9`. Usar la variable indicada arriba solamente para reemplazarlo o desactivarlo.
5. Seguir el progreso en **Actions → Publicar web**. Para volver a publicar sin nuevos cambios, usar **Run workflow** y elegir `master`. No reejecutar la tarea fallida de Jekyll: conserva la configuración anterior.
6. Comprobar portada, las cuatro páginas de servicio, imágenes, WhatsApp, teléfono, indicaciones, sitemap y una ruta inexistente. Debe servirse `404.html` con estado HTTP 404.

El workflow sigue la [guía oficial de Astro para GitHub Pages](https://docs.astro.build/en/guides/deploy/github/), con publicación automática desde `master`, ejecución manual opcional y comprobaciones previas. El cambio de origen de Pages se realiza en GitHub, no desde este archivo. No se ejecutó un despliegue remoto durante esta renovación.

### Otro hosting estático

Ejecutar `npm ci` y `npm run verify`, y subir **el contenido de `dist/`**, incluidos `_astro/`, `img/`, `servicios/`, robots, sitemap y verificación. Configurar índices de directorios y la página 404 del proveedor. No aplicar una reescritura global de todas las rutas a `index.html`.

### SEO después de publicar

- Mantener las redirecciones existentes de HTTP y www hacia HTTPS sin www. Si el proveedor permite una regla, redirigir `/index.html` a `/` con 301; mientras tanto el HTML ya declara la raíz como canonical.
- En Search Console, inspeccionar la raíz y una página de servicio; comprobar la canonical elegida y enviar `https://libreria2001.com.ar/sitemap.xml`.
- Comprobar los datos estructurados con la prueba de Google y medir rendimiento en producción. Las comprobaciones locales no certifican indexación ni Core Web Vitals.
- Revisar el Perfil de Empresa de Google: categoría, dirección dentro de la galería, horarios especiales, web y fotos reales.
- Comparar consultas, clics, impresiones y acciones de contacto después de un período suficiente y considerar la estacionalidad escolar. La exportación recibida y su análisis privado permanecen fuera de Git, dentro de `.local/`.

Para revertir una publicación, volver a desplegar la versión anterior mediante el mecanismo de hosting correspondiente. La versión HTML original se conserva en el historial Git, commit `8abbb50`; no ejecutarla con el workflow Astro porque no tiene `package.json`.

Los ajustes de logo, portada y alineación están documentados en [docs/ajustes-marca-2026-10-03.md](docs/ajustes-marca-2026-10-03.md).
