/* ============================================================================
   VITRINA VIVA — animación futurista del hero
   Partículas conectadas que se apartan del cursor (repulsión suave).

   CONTRATO C5: si el canvas falla o el usuario pide menos movimiento,
   el museo se lee igual. La animación nunca bloquea contenido.
   ========================================================================== */
(function () {
  'use strict';

  var canvas = document.getElementById('vitrinaViva');
  if (!canvas) return;

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reduce.matches) { canvas.style.display = 'none'; return; }

  var ctx = canvas.getContext('2d');
  if (!ctx) { canvas.style.display = 'none'; return; }

  var DPR = Math.min(window.devicePixelRatio || 1, 2);
  var W = 0, H = 0;
  var particles = [];
  var mouse = { x: -9999, y: -9999, activo: false };
  var t = 0;
  var raf = null;

  var acento = '#2fbf71';
  function leerAcento() {
    var v = getComputedStyle(document.documentElement).getPropertyValue('--acento').trim();
    if (v) acento = v;
  }
  leerAcento();

  /* --- color helpers ------------------------------------------------ */
  function hexToRgb(hex) {
    var h = hex.replace('#', '');
    if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    var n = parseInt(h, 16);
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
  }

  function resize() {
    var rect = canvas.parentElement.getBoundingClientRect();
    W = rect.width;
    H = rect.height;
    canvas.width = Math.floor(W * DPR);
    canvas.height = Math.floor(H * DPR);
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    sembrar();
  }

  function sembrar() {
    /* densidad proporcional al área, con tope para no matar el móvil */
    var area = W * H;
    var n = Math.round(Math.min(110, Math.max(34, area / 16000)));
    particles = [];
    for (var i = 0; i < n; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.24,
        vy: (Math.random() - 0.5) * 0.24,
        r: Math.random() * 1.7 + 0.7,
        fase: Math.random() * Math.PI * 2
      });
    }
  }

  var rgb = hexToRgb(acento);
  var rgbMemo = acento;

  function paso() {
    if (rgbMemo !== acento) { rgb = hexToRgb(acento); rgbMemo = acento; }
    t += 0.006;

    ctx.clearRect(0, 0, W, H);

    var i, j, p, q, dx, dy, d, d2;

    /* --- mover + repulsión del cursor --- */
    for (i = 0; i < particles.length; i++) {
      p = particles[i];

      p.x += p.vx + Math.sin(t + p.fase) * 0.12;
      p.y += p.vy + Math.cos(t * 0.8 + p.fase) * 0.12;

      if (mouse.activo) {
        dx = p.x - mouse.x;
        dy = p.y - mouse.y;
        d = Math.sqrt(dx * dx + dy * dy);
        var RAD = 132;
        if (d < RAD && d > 0.1) {
          var fuerza = (1 - d / RAD);
          p.x += (dx / d) * fuerza * fuerza * 2.6;
          p.y += (dy / d) * fuerza * fuerza * 2.6;
        }
      }

      /* envolver bordes */
      if (p.x < -20) p.x = W + 20;
      if (p.x > W + 20) p.x = -20;
      if (p.y < -20) p.y = H + 20;
      if (p.y > H + 20) p.y = -20;
    }

    /* --- conexiones --- */
    var LIM = 128;
    ctx.lineWidth = 0.7;
    for (i = 0; i < particles.length; i++) {
      p = particles[i];
      for (j = i + 1; j < particles.length; j++) {
        q = particles[j];
        dx = p.x - q.x; dy = p.y - q.y;
        d2 = dx * dx + dy * dy;
        if (d2 < LIM * LIM) {
          d = Math.sqrt(d2);
          var a = (1 - d / LIM) * 0.30;
          /* más brillante cerca del cursor */
          if (mouse.activo) {
            var mx = (p.x + q.x) / 2 - mouse.x;
            var my = (p.y + q.y) / 2 - mouse.y;
            var md = Math.sqrt(mx * mx + my * my);
            if (md < 220) a += (1 - md / 220) * 0.42;
          }
          ctx.strokeStyle = 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + a.toFixed(3) + ')';
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.stroke();
        }
      }
    }

    /* --- nodos --- */
    for (i = 0; i < particles.length; i++) {
      p = particles[i];
      var pulso = 0.55 + 0.45 * Math.sin(t * 2 + p.fase);
      ctx.fillStyle = 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + (0.30 + pulso * 0.55).toFixed(3) + ')';
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * (0.85 + pulso * 0.35), 0, Math.PI * 2);
      ctx.fill();
    }

    raf = requestAnimationFrame(paso);
  }

  /* --- eventos ------------------------------------------------------ */
  var contenedor = canvas.parentElement;

  function mover(e) {
    var rect = canvas.getBoundingClientRect();
    var pt = e.touches ? e.touches[0] : e;
    mouse.x = pt.clientX - rect.left;
    mouse.y = pt.clientY - rect.top;
    mouse.activo = true;
  }
  function salir() { mouse.activo = false; mouse.x = -9999; mouse.y = -9999; }

  contenedor.addEventListener('mousemove', mover, { passive: true });
  contenedor.addEventListener('mouseleave', salir, { passive: true });
  contenedor.addEventListener('touchmove', mover, { passive: true });
  contenedor.addEventListener('touchend', salir, { passive: true });

  /* pausar cuando el hero no está visible: no gastar batería */
  var visible = true;
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (ent) {
      visible = ent[0].isIntersecting;
      if (visible && !raf) raf = requestAnimationFrame(paso);
      if (!visible && raf) { cancelAnimationFrame(raf); raf = null; }
    }, { threshold: 0 }).observe(contenedor);
  }

  var rt = null;
  window.addEventListener('resize', function () {
    clearTimeout(rt);
    rt = setTimeout(function () { leerAcento(); resize(); }, 160);
  });

  if (reduce.addEventListener) {
    reduce.addEventListener('change', function (e) {
      if (e.matches) {
        canvas.style.display = 'none';
        if (raf) { cancelAnimationFrame(raf); raf = null; }
      }
    });
  }

  resize();
  raf = requestAnimationFrame(paso);

  window.VITRINA_VIVA = { activa: true, particulas: function () { return particles.length; } };
})();
