# Ajustes de marca y composición · 3 de octubre de 2026

Se incorporó el logo aportado por el propietario, sin redibujarlo, en el encabezado, los iconos del navegador y el marcado del negocio. Original guardado en `src/assets/logo-libreria-2001.png`; Astro genera las versiones optimizadas.

Se reemplazó ese archivo por la versión azul mate, menos brillante, entregada posteriormente por el propietario. Se conserva el PNG exacto, incluida su transparencia. La compilación regenera las variantes WebP del encabezado, favicon, icono táctil y logo de los datos estructurados. Verificación del reemplazo: `npm run verify` aprobado (sin diagnósticos y seis pruebas correctas) y logo cargado sin desbordamiento horizontal en vistas móvil y escritorio.

Los textos introductorios de contacto y servicios comparten las columnas del contenido inferior. En móvil se apilan. Se sustituyó el plano decorativo por el mapa real, con carga diferida nativa y enlace de indicaciones siempre disponible, también sin JavaScript. El 4 de octubre se ajustó el zoom inicial de 14 a 16, siguiendo la captura del propietario, para mostrar las calles cercanas y la Plaza Adolfo Alsina. Este valor se aplica a la portada y a las páginas de servicios. El número de WhatsApp continúa visible únicamente en Contacto.

## Dirección visual azul mate y marfil

- Paleta común de azul profundo, detalles azul grisáceo, marfil y azul pálido. El verde se reserva para WhatsApp. Se mantienen las tipografías Manrope y Newsreader.
- Portada con más espacio entre título, descripción y acciones. El sello «Desde 1992» es más pequeño y queda dentro de la foto; el pie de imagen ocupa su propio espacio y puede ajustarse a varias líneas.
- Tarjetas de productos completas, con borde suave, márgenes iguales, fondo fotográfico marfil y enlaces de consulta alineados. Se conservan las fotos originales; CSS integra sus fondos blancos en la superficie de presentación.
- Menor separación vertical entre secciones. En celular, las tarjetas de servicios colocan icono y título en una misma fila; el catálogo usa una columna en pantallas menores de 360 px y dos hasta 650 px.
- Subrayados y transiciones breves en enlaces, botones y filtros. La elevación de tarjetas y el zoom suave se aplican con puntero compatible y respetan la preferencia de movimiento reducido. Se conserva espacio al final de la página para el botón flotante.

Validación del retoque: `npm run verify` aprobado, sin errores ni advertencias y con las seis pruebas correctas. Revisión de portada y catálogo a 1280, 870, 390 y 320 px, sin desbordamiento horizontal; filtros, menú móvil, ampliación de productos y cierre con Escape verificados. Revisión adicional de la página de impresiones a 320 px. Vista previa local en el puerto 4322.

## Imagen de portada

Archivo final: `src/assets/papeleria-editorial-marca.png`. Edición con la herramienta integrada `image_gen`; no se utilizó CLI. Se conserva el original `src/assets/papeleria-editorial.png`. El logo del cuaderno es una interpretación impresa integrada en la escena; el encabezado usa el archivo exacto entregado por el propietario. La imagen editorial no representa el local ni acredita stock.

Prompt final utilizado:

```text
Edit image 1, the stationery still-life photo. Image 2 is the exact Libreria 2001 logo to reproduce as a small printed logo on the notebook right page. Preserve the entire image 1 composition, aspect ratio, open notebook, all objects, lighting, shadows, paper grain, blue desk. Add only printing on the right notebook page, following its perspective and paper texture. Place the supplied blue folder logo in the upper middle of the right page, small and tasteful, preserving its lettering and identity, as a printed mark rather than a physical folder. Below it add clearly legible elegant dark slate-blue handwritten text on two lines: 'Tus ideas' and 'empiezan acá'. Below in smaller clean lettering: 'Desde 1992'. Keep ample blank paper margins, premium understated editorial style. All additions stay on the right page. No other modifications, no extra text or objects. Keep the left page blank.
```

Validación: compilación y seis comprobaciones del sitio generado aprobadas; revisión visual de escritorio y móvil, logo cargado y ausencia de desbordamiento horizontal. En escritorio, el texto de contacto coincide con el borde izquierdo del mapa y el texto de servicios con el de la tercera tarjeta.
