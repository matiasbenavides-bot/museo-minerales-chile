/* ============================================================================
   INTRO + REVELADO PROGRESIVO
   Museo de Minerales Descubiertos en Chile

   DOS COSAS, UNA REGLA:
     1. INTRO  — pantalla negra con el nombre del museo, ~2,5 s. Saltable.
     2. REVELAR — cada bloque aparece de a poco al ir bajando.

   REGLA DURA (R1): el contenido NO depende de este archivo para existir.
   El HTML ya trae todo el texto. Si este JS falla, no se ejecuta o el usuario
   pide menos movimiento, TODO se ve igual. Aquí solo se revela, nunca se crea.
   ========================================================================== */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------------- INTRO */
  var intro = document.getElementById('intro');

  function cerrarIntro() {
    if (!intro || intro.classList.contains('is-fuera')) return;
    intro.classList.add('is-fuera');
    document.documentElement.classList.remove('intro-activa');  /* libera el scroll */
    document.documentElement.classList.add('intro-lista');
    try { sessionStorage.setItem('museo-intro-vista', '1'); } catch (e) {}
    setTimeout(function () {
      if (intro && intro.parentNode) intro.parentNode.removeChild(intro);
    }, 800);
  }

  if (intro) {
    var yaVista = false;
    try { yaVista = sessionStorage.getItem('museo-intro-vista') === '1'; } catch (e) {}

    if (reduce || yaVista) {
      /* sin animación: la intro se retira de inmediato */
      intro.parentNode.removeChild(intro);
      document.documentElement.classList.add('intro-lista');
    } else {
      document.documentElement.classList.add('intro-activa');

      /* ~2,5 s y se va sola */
      var t = setTimeout(cerrarIntro, 2500);

      /* saltable: clic, tecla o rueda del mouse */
      function saltar() {
        clearTimeout(t);
        cerrarIntro();
      }
      intro.addEventListener('click', saltar);
      intro.addEventListener('wheel', saltar, { passive: true });
      intro.addEventListener('touchmove', saltar, { passive: true });
      document.addEventListener('keydown', saltar, { once: true });
    }
  }

  /* ------------------------------------------------------------- REVELAR */
  /* El contenido existe desde el HTML. Aquí solo se le pone clase. */
  var objetivos = document.querySelectorAll('[data-rev]');

  if (reduce || !('IntersectionObserver' in window)) {
    /* sin animación: no se oculta nada, nunca */
    for (var i = 0; i < objetivos.length; i++) objetivos[i].classList.add('rev-ya');
    return;
  }

  var obs = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (e) {
      if (!e.isIntersecting) return;
      var el = e.target;

      /* retardo escalonado dentro del mismo grupo (hasta 5 pasos) */
      var grupo = el.parentNode;
      var idx = 0;
      if (grupo && grupo.children) {
        idx = Array.prototype.indexOf.call(grupo.children, el);
      }
      var paso = Math.min(idx, 4) * 70;
      el.style.transitionDelay = paso + 'ms';

      el.classList.add('rev-ya');
      obs.unobserve(el);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

  for (var j = 0; j < objetivos.length; j++) obs.observe(objetivos[j]);

  /* red de seguridad: si algo quedó sin revelar, a los 6 s de estar en pantalla
     se fuerza. Un bloque invisible por un bug es peor que un bloque sin animar. */
  function barrerVisibles() {
    var pendientes = document.querySelectorAll('[data-rev]:not(.rev-ya)');
    var vh = window.innerHeight;
    for (var k = 0; k < pendientes.length; k++) {
      var r = pendientes[k].getBoundingClientRect();
      if (r.top < vh && r.bottom > 0) {
        pendientes[k].classList.add('rev-ya');
        obs.unobserve(pendientes[k]);
      }
    }
  }

  /* red de seguridad 1: barrido al scrollear (throttled) */
  var tick = false;
  window.addEventListener('scroll', function () {
    if (tick) return;
    tick = true;
    requestAnimationFrame(function () { barrerVisibles(); tick = false; });
  }, { passive: true });

  /* red de seguridad 2: al llegar al fondo, no puede quedar nada oculto */
  window.addEventListener('scroll', function () {
    var h = document.documentElement;
    if (h.scrollTop + h.clientHeight >= h.scrollHeight - 40) barrerVisibles();
  }, { passive: true });

  /* red de seguridad 3: barridos periódicos durante los primeros 8 s */
  var n = 0;
  var iv = setInterval(function () { barrerVisibles(); if (++n > 16) clearInterval(iv); }, 500);

  window.REVELAR = {
    activo: !reduce,
    objetivos: objetivos.length,
    revelados: function () {
      return document.querySelectorAll('[data-rev].rev-ya').length;
    }
  };
})();
