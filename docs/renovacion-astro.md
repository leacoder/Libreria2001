# Renovación con Astro · 2 de octubre de 2026

La implementación responde a la auditoría y al objetivo de generar consultas por WhatsApp y visitas al local. El propietario confirmó fundación en 1992, teléfono 11 7398-1174 y horarios de lunes a viernes de 10 a 18 y sábados de 10 a 13.

## Decisiones

Astro se usa para generar HTML estático y optimizar recursos. Las interacciones son JavaScript nativo: no hay React ni una aplicación que deba cargar para mostrar contenido. El mantenimiento queda separado en componentes y datos.

El acabado visual conserva la marca y el azul original, incorporando fondos cálidos, tipografías Manrope y Newsreader, una portada editorial, detalles de foco y hover, nombres de productos siempre visibles y una presentación destacada de la trayectoria. Las fuentes se sirven localmente; sus licencias se distribuyen en `public/licenses/`.

Las búsquedas locales de la exportación de Search Console respaldan mantener la portada como página principal y desarrollar servicios útiles. Se agregaron páginas de impresiones/fotocopias, copiado de libros contables, artística y librería comercial/escolar. No se agregaron precios, reseñas, puntuaciones, stock o plazos garantizados sin datos que los sustenten.

## Correspondencia con la auditoría

| Hallazgo | Implementación |
| --- | --- |
| Canonical y sitemap con www contradictorio | HTTPS sin www en metadatos, JSON-LD, sitemap y robots |
| Error `gtag is not defined` | Enlaces HTML y medición opcional protegida |
| Teléfono con dígito extra | `tel:+541173981174`, confirmado por el propietario |
| Menú móvil abierto sobre el contenido | Cierre al navegar, Escape, clic exterior y cambio de ancho |
| Galería dependiente de Isotope | CSS Grid, proporciones reservadas y filtros nativos |
| Dependencias antiguas y scripts residuales | Retirados de código fuente y publicación |
| Imágenes sin variantes ni dimensiones | `astro:assets`, WebP, `srcset`, dimensiones y lazy loading; portada prioritaria |
| Falta de foco y operación por teclado | Foco visible, enlace al contenido, controles con nombre y visor `dialog` |
| Maps en la carga inicial | Indicaciones accesibles y botón para cargar el mapa |
| Portada genérica y servicios breves | Presentación desde 1992 y cuatro páginas con información propia |
| Analytics ausente | Integración GA4 preparada, pendiente del ID y validación en producción |

## Verificaciones

- `npm run verify`: tipos Astro, compilación y seis pruebas del sitio generado aprobadas.
- Seis páginas HTML: portada, cuatro servicios y 404. Sitemap de cinco páginas indexables.
- Pruebas de títulos, descripciones, H1, canonical, enlaces internos, anclajes, imágenes, datos de contacto, sitemap, verificación de Google y presupuesto de JavaScript.
- Revisión en navegador: portada y servicio de impresiones, navegación móvil, filtros, carga gradual de 8 a 16 y 18 productos, visor, Escape con retorno del foco, preguntas frecuentes y mapa a pedido.
- Diseño comprobado a 360, 390, 768 y 1280 px; sin desbordamiento horizontal en las vistas revisadas.
- Sin avisos ni errores en la consola durante las interacciones comprobadas. Esta prueba no equivale a verificar todos los navegadores o un teléfono físico.

El módulo propio compilado ocupa **3.578 bytes**, frente a los **362.285 bytes** de 16 scripts locales referenciados antes. Se comparan bytes de código sin compresión; no es una medición de tiempos de carga y excluye Analytics y Maps externos. Astro inserta el módulo pequeño directamente en el HTML.

La portada genera variantes WebP de aproximadamente 29 a 199 KB según resolución. No se descargan todas las variantes a la vez. No se obtuvieron datos de campo de Core Web Vitals ni una puntuación Lighthouse; corresponde medir el hosting definitivo después de publicar.

## Pendiente externo

Publicación a cargo del propietario, ID de GA4 y comprobación de eventos, Perfil de Empresa, indexación posterior y fotografías actuales del local/equipo. Las fotos originales del catálogo se conservan como referencia con consulta de disponibilidad. La indexación y las posiciones de Google no pueden garantizarse desde un cambio de código.

## Imagen editorial

Archivo: `src/assets/papeleria-editorial.png`. Generado con la herramienta integrada `image_gen`, sin CLI ni clave API. Usado como escena de papelería; no representa una fotografía real del local ni acredita stock.

Resumen del prompt de producción: fotografía editorial de papelería y materiales de artística vistos desde arriba; cuaderno abierto de papel crema, lápices, pinceles y acuarelas sobre una superficie azul pizarra; luz natural cálida, sombras suaves, texturas de papel y composición cuidada para una portada premium; sin texto, logos ni marcas de agua. Astro produce a partir del original las variantes WebP y la imagen social.
