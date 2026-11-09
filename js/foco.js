/* ============================================================================
   FOCO DE LA SALA — V1 (2026-11-08)
   ----------------------------------------------------------------------------
   PROPÓSITO
     Hacer que el negro del museo deje de ser plano: un halo de luz del tamaño
     de la sala sigue al cursor. Es el recurso de un museo real (sala a oscuras
     con focos), no un adorno.

   RESPONSABILIDAD
     Única: escribir --foco-x / --foco-y en <html> desde el puntero.
     No conoce especies, no toca datos, no pinta contenido.

   RELACIONES
     - css/main.css  → `body::after` consume las dos variables.
     - Se carga SOLO desde index.html (la sala). Las páginas de pieza no lo
       necesitan: ahí manda el contenido, no la penumbra.

   POR QUÉ NO USA requestAnimationFrame
     Escribir una custom property no relanza layout, solo repaint del gradiente.
     Con rAF la página seguiría repintando a 60 fps con el ratón quieto; así
     solo repinta cuando el puntero se mueve.

   CONTRATOS QUE RESPETA
     C5 · prefers-reduced-motion: si el usuario pide menos movimiento, no se
          activa el foco (ni el listener).
     R1 · Si este archivo no carga o falla, el museo se ve igual: el ::after
          queda con opacity 0 y el negro original.
   ========================================================================== */
(function () {
  'use strict';

  var raiz = document.documentElement;

  /* Sin JS de sobra: si el navegador no soporta custom properties, no se activa. */
  if (!window.CSS || !CSS.supports || !CSS.supports('color', 'var(--x)')) return;

  /* C5: menos movimiento = ninguna luz persiguiendo al cursor. */
  var menosMovimiento = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
  if (menosMovimiento && menosMovimiento.matches) return;

  /* Solo puntero fino (mouse/trackpad). En táctil el halo quedaría congelado
     donde terminó el último toque, que parece un defecto. */
  var punteroFino = !window.matchMedia || window.matchMedia('(pointer: fine)').matches;
  if (!punteroFino) return;

  var pendiente = false;
  var x = 50, y = 30;

  function pintar() {
    pendiente = false;
    raiz.style.setProperty('--foco-x', x.toFixed(1) + 'px');
    raiz.style.setProperty('--foco-y', y.toFixed(1) + 'px');
  }

  function alMover(ev) {
    x = ev.clientX;
    y = ev.clientY;
    if (!pendiente) {
      pendiente = true;
      window.requestAnimationFrame(pintar);
    }
  }

  function encender() {
    raiz.classList.add('foco-vivo');
    window.addEventListener('pointermove', alMover, { passive: true });
    pintar();
  }

  /* Se enciende en el primer movimiento real del puntero: si el usuario no
     mueve el ratón, la sala queda como estaba. */
  window.addEventListener('pointermove', function arranque(ev) {
    window.removeEventListener('pointermove', arranque);
    x = ev.clientX;
    y = ev.clientY;
    encender();
  }, { passive: true });

  /* Si el usuario cambia a «reducir movimiento» en caliente, se apaga. */
  if (menosMovimiento && menosMovimiento.addEventListener) {
    menosMovimiento.addEventListener('change', function (e) {
      if (e.matches) {
        raiz.classList.remove('foco-vivo');
        window.removeEventListener('pointermove', alMover);
      }
    });
  }
})();
