/* ============================================================================
   MUSEO DE MINERALES — renderizador
   Lee data/museo.js y construye el DOM. NO contiene texto de especies.

   CONTRATO C2: cada fila de la ficha debe traer `fuente` y `estado`.
                Si falta, se marca el error en pantalla (no se inventa nada).
   CONTRATO C4: el relato se pinta literal, verso por verso. No se toca.
   ========================================================================== */
(function () {
  'use strict';

  var DATA = window.MUSEO;
  if (!DATA || !DATA.especies || !DATA.especies.length) {
    console.error('[museo] data/museo.js no cargó o está vacío');
    return;
  }

  var $  = function (s, ctx) { return (ctx || document).querySelector(s); };
  var $$ = function (s, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(s)); };

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* ---------------------------------------------------------------- pieza */
  var pieza = DATA.especies[0];

  /* acento por especie: pinta las variables CSS del documento */
  if (pieza.acento) {
    document.documentElement.style.setProperty('--acento', pieza.acento);
  }

  /* --------------------------------------------------------------- cifras */
  var verificados = pieza.ficha.filter(function (f) { return f.estado === 'verificado'; }).length;
  var pendientes  = pieza.ficha.filter(function (f) { return f.estado === 'pendiente'; }).length;
  var fuentes = (pieza.directa && pieza.directa.fuentes) ? pieza.directa.fuentes.length : 0;

  var cifras = [
    { n: DATA.especies.length, u: DATA.especies.length === 1 ? 'especie' : 'especies', l: 'En exhibición' },
    { n: verificados,          u: 'de ' + pieza.ficha.length,                      l: 'Datos verificados' },
    { n: pendientes,           u: 'declarados',                                    l: 'Datos pendientes' },
    { n: fuentes,              u: 'citadas',                                       l: 'Fuentes primarias' }
  ];

  var heroCifras = $('#heroCifras');
  if (heroCifras) {
    heroCifras.innerHTML = cifras.map(function (c) {
      return '<div><dt>' + esc(c.l) + '</dt><dd>' + esc(c.n) +
             ' <span>' + esc(c.u) + '</span></dd></div>';
    }).join('');
  }

  /* ----------------------------------------------------------------- sala */
  var salaLista = $('#salaLista');
  if (salaLista) {
    salaLista.innerHTML = DATA.especies.map(function (e, i) {
      return '' +
        '<li class="pieza-card" style="--acento:' + esc(e.acento || '#2fbf71') + '">' +
          '<div class="pieza-card__vitrina">' + cristal(e.acento) + '</div>' +
          '<div>' +
            '<span class="pieza-card__tipo">' + esc(e.linea || 'Especie') + '</span>' +
            '<h3 class="pieza-card__h3">' + esc(titulo(e.nombre)) + '</h3>' +
            '<span class="pieza-card__formula">' + esc(e.formula) + '</span>' +
            '<p class="pieza-card__desc">' + esc(e.encabezado && e.encabezado.descripcion || '') + '</p>' +
            '<div class="pieza-card__meta">' +
              '<span><b>' + esc(e.ficha.length) + '</b> campos documentados</span>' +
              '<span><b>' + esc((e.pendientes || []).length) + '</b> pendientes declarados</span>' +
            '</div>' +
            '<a class="pieza-card__ir" href="#vitrina">Ver la pieza →</a>' +
          '</div>' +
        '</li>';
    }).join('');
  }

  /* -------------------------------------------------------------- vitrina */
  var cab = $('#piezaCabecera');
  if (cab) {
    var d = pieza.encabezado || {};
    cab.innerHTML = '' +
      '<span class="pieza__tipo">' + esc(pieza.linea || 'Localidad tipo Chile') + '</span>' +
      '<h2 class="pieza__h2">' + esc(titulo(pieza.nombre)) + '</h2>' +
      '<p class="pieza__formula">' + esc(pieza.formula) +
        ' <span style="color:var(--t3)">· ' + esc(pieza.nombre_ima) + '</span></p>' +
      '<dl class="pieza__datos">' +
        '<div><dt>Estatus</dt><dd>' + esc(d.estatus || 'Ver ficha') + '</dd></div>' +
        '<div><dt>Descripción</dt><dd>' + esc(d.descripcion || '') + '</dd></div>' +
        '<div style="grid-column:1/-1"><dt>Localidad tipo</dt><dd>' + esc(d.localidad || '') + '</dd></div>' +
      '</dl>';
  }

  /* --------------------------------------------------------- ficha tabla */
  var tabla = $('#tablaFicha');
  var filasHTML = pieza.ficha.map(function (f, i) {
    var faltaContrato = !f.fuente || !f.estado;
    var pend = f.estado === 'pendiente';
    var clase = 'fila' + (pend ? ' is-pendiente' : '') + (faltaContrato ? ' is-error' : '');

    if (faltaContrato) {
      console.error('[museo] CONTRATO C2 roto en el campo "' + f.campo + '": falta fuente o estado');
    }

    var marca = faltaContrato
      ? '<span class="marca-estado marca-estado--pend">sin fuente</span>'
      : '<span class="marca-estado ' + (pend ? 'marca-estado--pend' : 'marca-estado--ok') + '">' +
        esc(f.estado) + '</span>';

    return '' +
      '<div class="' + clase + '" data-estado="' + esc(f.estado) + '">' +
        '<div class="fila__campo">' + esc(f.campo) + '</div>' +
        '<div class="fila__valor">' + esc(f.valor) + '</div>' +
        '<div class="fila__fuente">' + esc(f.fuente || 'SIN FUENTE') + '<br>' + marca + '</div>' +
        (f.nota && f.nota !== '—' ? '<div class="fila__nota">' + esc(f.nota) + '</div>' : '') +
      '</div>';
  }).join('');

  if (tabla) tabla.innerHTML = filasHTML;

  /* contadores del filtro */
  var chips = $$('#filtro .chip');
  if (chips.length) {
    chips[0].querySelector('b').textContent = pieza.ficha.length;
    chips[1].querySelector('b').textContent = verificados;
    chips[2].querySelector('b').textContent = pendientes;

    chips.forEach(function (c) {
      c.addEventListener('click', function () {
        chips.forEach(function (x) { x.classList.remove('is-activo'); });
        c.classList.add('is-activo');
        var f = c.dataset.f;
        $$('#tablaFicha .fila').forEach(function (fila) {
          fila.style.display = (f === 'todos' || fila.dataset.estado === f) ? '' : 'none';
        });
      });
    });
  }

  /* --------------------------------------------------------------- relato */
  var relatoCaja = $('#relatoCaja');
  if (relatoCaja && pieza.relato) {
    relatoCaja.innerHTML = '' +
      '<h3 class="relato__titulo">' + esc(pieza.relato.titulo) + '</h3>' +
      '<div class="relato__versos">' +
        pieza.relato.versos.map(function (v) { return '<p>' + esc(v) + '</p>'; }).join('') +
      '</div>';
  }

  /* ------------------------------------------------------ versión directa */
  var dIntro = $('#directaIntro');
  if (dIntro && pieza.directa) dIntro.textContent = pieza.directa.intro;

  var directaCaja = $('#directaCaja');
  if (directaCaja && pieza.directa) {
    directaCaja.innerHTML = pieza.directa.bloques.map(function (b) {
      return '<div class="directa__bloque">' +
               '<p class="directa__txt">' + esc(b.texto) + '</p>' +
               '<span class="directa__respaldo">' + esc(b.respaldo) + '</span>' +
             '</div>';
    }).join('');
  }

  var citaCaja = $('#citaCaja');
  if (citaCaja && pieza.directa && pieza.directa.cita) {
    citaCaja.innerHTML = '' +
      '<span class="cita__lbl">Cita textual</span>' +
      '<p class="cita__en">' + esc(pieza.directa.cita.en) + '</p>' +
      '<p class="cita__es">' + esc(pieza.directa.cita.es) + '</p>';
  }

  /* -------------------------------------------------------------- fuentes */
  var fuentesCaja = $('#fuentesCaja');
  if (fuentesCaja && pieza.directa) {
    fuentesCaja.innerHTML = (pieza.directa.fuentes || [])
      .map(function (f) { return '<li>' + esc(f) + '</li>'; }).join('');
  }

  /* -------------------------------------------------------- transparencia */
  var transpCaja = $('#transpCaja');
  if (transpCaja) {
    transpCaja.innerHTML = (pieza.transparencia || [])
      .map(function (t) { return '<p>' + esc(t) + '</p>'; }).join('');
  }

  /* ------------------------------------------------------------- helpers */
  function titulo(s) {
    s = String(s || '');
    if (s === s.toUpperCase()) {
      return s.charAt(0) + s.slice(1).toLowerCase();
    }
    return s;
  }

  /* cristal dibujado: forma abstracta, NO un mineral figurativo */
  function cristal(acento) {
    var c = acento || '#2fbf71';
    return '' +
      '<svg viewBox="0 0 100 100" aria-hidden="true">' +
        '<defs><linearGradient id="g' + c.replace('#', '') + '" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="' + c + '" stop-opacity=".95"/>' +
          '<stop offset="100%" stop-color="' + c + '" stop-opacity=".25"/>' +
        '</linearGradient></defs>' +
        '<polygon points="50,6 78,30 70,84 30,84 22,30" fill="url(#g' + c.replace('#', '') + ')"/>' +
        '<polygon points="50,6 62,32 50,78 38,32" fill="' + c + '" opacity=".45"/>' +
        '<polygon points="50,6 78,30 70,84 30,84 22,30" fill="none" stroke="' + c + '" stroke-width="1.4" opacity=".85"/>' +
      '</svg>';
  }

  /* -------------------------------------------------- barra de progreso */
  var prog = $('#prog');
  if (prog) {
    window.addEventListener('scroll', function () {
      var h = document.documentElement;
      var pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      prog.style.width = Math.min(100, Math.max(0, pct)) + '%';
    }, { passive: true });
  }

  /* ------------------------------------------------------- menú móvil */
  var navbtn = $('#navbtn'), nav = $('#nav');
  if (navbtn && nav) {
    navbtn.addEventListener('click', function () {
      var abierto = nav.classList.toggle('is-abierto');
      navbtn.setAttribute('aria-expanded', abierto ? 'true' : 'false');
    });
    $$('#nav a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('is-abierto');
        navbtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* expone para verificación */
  window.MUSEO_RENDER = {
    especies: DATA.especies.length,
    campos: pieza.ficha.length,
    verificados: verificados,
    pendientes: pendientes,
    versos: (pieza.relato ? pieza.relato.versos.length : 0),
    bloques: (pieza.directa ? pieza.directa.bloques.length : 0),
    fuentes: fuentes
  };
})();
