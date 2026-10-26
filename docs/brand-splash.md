# Splash de marca — Librería 2001

La integración extiende la identidad existente: papel `#f7f4ed`, azul `#243d59`, secundario `#526d88` y línea `#a0b0bc`. Hereda las familias `var(--sans)` y `var(--serif)`; presenta el logotipo, «Desde 1992.», «AVELLANEDA» y las categorías del negocio. Este documento registra la implementación; no establece nuevos tokens ni una nueva identidad visual.

## Integración y duración

`src/components/BrandSplash.astro` contiene la presentación y sus animaciones; incorpora en línea el controlador de `src/scripts/brand-splash.js`. Reutiliza `src/assets/logo-libreria-2001.png`, procesado por Astro como WebP de 480 px para mostrar el logo a 240 px en escritorio y 210 px en pantallas de hasta 390 px de ancho, con un máximo de 64vw. En ventanas de hasta 380 px de alto, el logo se reduce a 140 px. `src/layouts/Base.astro` precarga esa misma variante y solo incluye el componente en la portada (`Astro.url.pathname === '/'`), fuera de páginas `noindex`.

El controlador reconoce `/`, `/index.html`, `/en/` y `/en/index.html` como rutas de portada; esa lista no crea páginas ni inserta el componente fuera de la condición del layout.

La secuencia visual dura **2200 ms**: la hoja sale hacia arriba desde los 1600 ms durante 600 ms. El cierre de respaldo en JavaScript se ejecuta a los 2250 ms; una expiración CSS independiente oculta el contenedor a partir de los 2700 ms.

## Aparición y accesibilidad

Se muestra en la primera entrada elegible de la sesión de pestaña y vuelve a reproducirse al recargar la portada. La recarga normal y el hard refresh se tratan igual porque el navegador informa ambos como `reload`. Limpiar solo la caché HTTP no borra la sesión; la recarga posterior sí reproduce la intro. La navegación interna conserva el comportamiento de una sola aparición. Se registra mediante `sessionStorage`, con la clave `libreria-brand-intro` y el valor `seen`, escrito antes de mostrarlo. Se omite con movimiento reducido, fragmento de URL salvo recarga, referente del mismo origen salvo recarga, navegación de historial, sesión ya registrada salvo recarga, o almacenamiento bloqueado. El controlador también contempla `data-language-redirect="true"` como condición de omisión, aunque el layout actual no inicia una redirección de idioma.

El HTML parte de `hidden`, `aria-hidden="true"` e `inert`: sin JavaScript permanece oculto. No mueve el foco ni bloquea el desplazamiento; `pointer-events: none` permite interactuar con la página. También se oculta al imprimir.

La primera interacción (`pointerdown`, `touchstart`, `wheel`, `keydown` o `focusin`) lo cierra. También termina en `pagehide`, restauración desde caché de navegación (`pageshow.persisted`), cambio a segundo plano, activación de movimiento reducido o error de imagen. El cierre limpia el temporizador y cancela los listeners mediante `AbortController`; las excepciones terminan con el splash oculto.

## Verificación y alcance

La revisión independiente inicial dio disposición de entrega y pasó `verify` con 22 archivos y 12 pruebas. Tras el ajuste de recarga y tamaño del logo volvió a pasar la verificación completa: 14 pruebas en total, incluidas las 8 actuales del controlador del splash.

Las capturas se tomaron sobre compilaciones reales mediante rutas locales separadas de revisión, con visibilidad forzada y animaciones CSS pausadas para evaluar la composición estática. Además, el agente principal abrió una pestaña fresca en la raíz real del servidor local, puerto 4392, sin ruta de revisión ni inyección: la evaluación inmediata del DOM devolvió `splashVisible: true` y duración configurada de 2200 ms. Después del ajuste solicitado, se verificó también la recarga de la raíz real: la evaluación inmediata devolvió `splashVisible: true`. El estado oculto tras recargar pertenecía a la versión inicial y ya no describe el comportamiento vigente. Estas comprobaciones verifican la activación; no constituyen una medición independiente de la duración transcurrida.

No hubo despliegue a producción, medición de Lighthouse ni evaluación mediante un detector.

## Ajuste de recarga y nueva pestaña

El registro usa sessionStorage por pestaña; duplicar una pestaña o abrirla con un opener puede copiar su estado inicial, por lo que no se garantiza una sesión vacía en esos casos. Si la página se abre en segundo plano, la presentación espera hasta pasar a primer plano y entonces comprueba las condiciones de aparición; salir de la página cancela esa espera. Se mantiene la excepción de movimiento reducido al recargar. Los enlaces a secciones omiten la presentación al navegar; una recarga explícita de la portada vuelve a mostrarla aunque conserve un fragmento de URL. La suite del controlador ahora incluye ocho pruebas, con recarga sobre sesión existente y activación desde segundo plano.

