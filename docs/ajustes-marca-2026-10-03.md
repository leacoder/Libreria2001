# Ajustes de marca y composición · 3 de octubre de 2026

Se incorporó el logo aportado por el propietario, sin redibujarlo, en el encabezado, los iconos del navegador y el marcado del negocio. Original guardado en `src/assets/logo-libreria-2001.png`; Astro genera las versiones optimizadas.

Los textos introductorios de contacto y servicios comparten las columnas del contenido inferior. En móvil se apilan. Se sustituyó el plano decorativo por el mapa real con zoom 14, carga diferida nativa y enlace de indicaciones siempre disponible, también sin JavaScript. El número de WhatsApp continúa visible únicamente en Contacto.

## Imagen de portada

Archivo final: `src/assets/papeleria-editorial-marca.png`. Edición con la herramienta integrada `image_gen`; no se utilizó CLI. Se conserva el original `src/assets/papeleria-editorial.png`. El logo del cuaderno es una interpretación impresa integrada en la escena; el encabezado usa el archivo exacto entregado por el propietario. La imagen editorial no representa el local ni acredita stock.

Prompt final utilizado:

```text
Edit image 1, the stationery still-life photo. Image 2 is the exact Libreria 2001 logo to reproduce as a small printed logo on the notebook right page. Preserve the entire image 1 composition, aspect ratio, open notebook, all objects, lighting, shadows, paper grain, blue desk. Add only printing on the right notebook page, following its perspective and paper texture. Place the supplied blue folder logo in the upper middle of the right page, small and tasteful, preserving its lettering and identity, as a printed mark rather than a physical folder. Below it add clearly legible elegant dark slate-blue handwritten text on two lines: 'Tus ideas' and 'empiezan acá'. Below in smaller clean lettering: 'Desde 1992'. Keep ample blank paper margins, premium understated editorial style. All additions stay on the right page. No other modifications, no extra text or objects. Keep the left page blank.
```

Validación: compilación y seis comprobaciones del sitio generado aprobadas; revisión visual de escritorio y móvil, logo cargado y ausencia de desbordamiento horizontal. En escritorio, el texto de contacto coincide con el borde izquierdo del mapa y el texto de servicios con el de la tercera tarjeta.
