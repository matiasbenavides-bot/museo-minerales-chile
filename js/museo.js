/* ============================================================================
   MUSEO DE MINERALES — renderizador
   Lee data/museo.js y construye el DOM. NO contiene texto de especies.

   DOS VISTAS EN EL MISMO ARCHIVO:
     · portada (index.html)        → ficha BÁSICA (campos con basico:true, 12)
     · archivo (<especie>.html con data-vista="archivo") → los 36 campos
       + versión directa + fuentes + transparencia

   CONTRATO C2: cada fila de la ficha debe traer `fuente` y `estado`.
                Si falta, se marca el error en pantalla (no se inventa nada).
   CONTRATO C4: el relato se pinta literal, verso por verso. No se toca.
   CONTRATO C6: ningún campo se borra; lo no básico se va al archivo.
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

  var VISTA = document.body.getAttribute('data-vista') || 'portada';

  /* ---------------------------------------------------------------- pieza
     La pagina de una especie se identifica por el nombre del archivo:
       atacamita.html  ->  id "atacamita"
       copiapite.html  ->  id "copiapite"
     Antes era DATA.especies[0] fijo, lo que servia con una sola especie y
     habria mostrado SIEMPRE la primera al agregar la segunda. */
  var SLUG = (location.pathname.split('/').pop() || '')
    .replace(/\.html?$/i, '')
    .toLowerCase();
  var pieza = DATA.especies.filter(function (e) { return e.id === SLUG; })[0]
           || DATA.especies[0];

  if (pieza.acento) {
    document.documentElement.style.setProperty('--acento', pieza.acento);
  }

  /* ------------------------------------------------------------- conteos */
  var verificados = pieza.ficha.filter(function (f) { return f.estado === 'verificado'; }).length;
  var pendientes  = pieza.ficha.filter(function (f) { return f.estado === 'pendiente'; }).length;
  var basicos     = pieza.ficha.filter(function (f) { return f.basico; });
  var fuentes     = (pieza.directa && pieza.directa.fuentes) ? pieza.directa.fuentes.length : 0;

  /* Las cifras de portada (Datos verificados / Datos pendientes) se retiraron
     por DEC-007 (2026-11-02): el estado se lee en cada dato, no en un contador. */

  /* ----------------------------------------------------------------- sala */
  var salaLista = $('#salaLista');
  if (salaLista) {
    salaLista.innerHTML = DATA.especies.map(function (e) {
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
              '<span><b>' + esc((e.directa && e.directa.fuentes ? e.directa.fuentes.length : 0)) + '</b> fuentes citadas</span>' +
            '</div>' +
            /* La card entera es el camino a la pieza (DEC-008), pero el enlace
               real sigue siendo este: sin JS y con teclado funciona igual.
               V4: el nombre va DENTRO del texto del enlace (no en un span
               aparte) para que el lector de pantalla diga «Abrir el archivo
               de Atacamita» y no una frase partida. */
            '<a class="pieza-card__ir" href="' + esc(e.id) + '.html">Abrir el archivo de ' +
              esc(titulo(e.nombre)) + ' →</a>' +
          '</div>' +
        '</li>';
    }).join('');
  }

  /* ------------------------------------------- V4 (2026-11-08): nav de sala
     La barra superior ofrecía SOLO «La Atacamita» aunque hubiera varias
     especies: se recorría el museo por una sola puerta. Ahora la lista de
     piezas se construye desde data/museo.js, así que la 3.ª especie entra
     sin tocar el HTML. Se marca `aria-current` en la pieza de esta página. */
  var navPiezas = $('#navPiezas') || $('#navPiezasPie');
  if (navPiezas) {
    navPiezas.innerHTML = DATA.especies.map(function (e) {
      var attrs = 'href="' + esc(e.id) + '.html" data-pieza="' + esc(e.id) + '"' +
        (e.acento ? ' style="--acento:' + esc(e.acento) + '"' : '') +
        (e.id === pieza.id && VISTA === 'archivo' ? ' aria-current="page"' : '');
      return '<li><a ' + attrs + '>' + esc(titulo(e.nombre)) + '</a></li>';
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
        '<div class="pieza__datos--ancho"><dt>Localidad tipo</dt><dd>' + esc(d.localidad || '') + '</dd></div>' +
      '</dl>';
  }

  /* --------------------------------------------------------- filas ficha */
  function filaHTML(f) {
    var faltaContrato = !f.fuente || !f.estado;
    var pend = f.estado === 'pendiente';
    var clase = 'fila' + (pend ? ' is-pendiente' : '') + (faltaContrato ? ' is-error' : '');

    if (faltaContrato) {
      console.error('[museo] CONTRATO C2 roto en el campo "' + f.campo + '": falta fuente o estado');
    }

    /* DEC-013 (2026-11-08) — el distintivo «verificado» estorba.
       El dueño: «ese icono de verificado estorba, si ya sale la fuente oficial».
       Tiene razón: el sello aparece pegado a su propia fuente, así que repite lo
       que el dato ya dice, 48 veces por página.
       Se retira SOLO el de los verificados. Lo PENDIENTE conserva su marca ámbar
       (contrato C3): esconder lo que no tiene respaldo sería mentir, y hoy no hay
       ningún pendiente, así que la marca sólo aparecerá cuando signifique algo. */
    var marca = faltaContrato
      ? '<span class="marca-estado marca-estado--pend">sin fuente</span>'
      : (pend ? '<span class="marca-estado marca-estado--pend">' + esc(f.estado) + '</span>' : '');

    return '' +
      '<div class="' + clase + '" data-estado="' + esc(f.estado) + '">' +
        '<div class="fila__campo">' + esc(f.campo) + '</div>' +
        '<div class="fila__valor">' + esc(f.valor) + '</div>' +
        '<div class="fila__fuente">' + esc(f.fuente || 'SIN FUENTE') + '<br>' + marca + '</div>' +
        (f.nota && f.nota !== '—' ? '<div class="fila__nota">' + esc(f.nota) + '</div>' : '') +
      '</div>';
  }

  /* PORTADA → solo los campos básicos */
  var tablaBasica = $('#tablaBasica');
  if (tablaBasica) tablaBasica.innerHTML = basicos.map(filaHTML).join('');

  /* ARCHIVO → los 36 campos */
  var tablaFicha = $('#tablaFicha');
  if (tablaFicha) tablaFicha.innerHTML = pieza.ficha.map(filaHTML).join('');

  /* revelado progresivo de las filas: se marcan DESPUÉS de pintarlas */
  $$('#tablaBasica .fila, #tablaFicha .fila').forEach(function (f) {
    f.setAttribute('data-rev', 'suave');
  });

  /* contadores + filtro (solo existen en el archivo).
     DEC-007: los contadores Verificados/Pendientes se retiraron de la vista;
     queda un unico chip con el total. Se escribe por data-f en vez de por
     indice para que anadir o quitar chips no rompa el render. */
  var chips = $$('#filtro .chip');
  if (chips.length) {
    chips.forEach(function (c) {
      var b = c.querySelector('b');
      if (b) b.textContent = pieza.ficha.length;
    });

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
        pieza.relato.versos.map(function (v) {
          return '<p data-rev="verso">' + esc(v) + '</p>';
        }).join('') +
      '</div>';
  }

  /* ------------------------------------------------------ versión directa */
  var dIntro = $('#directaIntro');
  if (dIntro && pieza.directa) dIntro.textContent = pieza.directa.intro;

  var directaCaja = $('#directaCaja');
  if (directaCaja && pieza.directa) {
    directaCaja.innerHTML = pieza.directa.bloques.map(function (b) {
      return '<div class="directa__bloque" data-rev="suave">' +
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
      .map(function (f) { return '<li data-rev="suave">' + esc(f) + '</li>'; }).join('');
  }

  /* -------------------------------------------------------- transparencia */
  var transpCaja = $('#transpCaja');
  if (transpCaja) {
    transpCaja.innerHTML = (pieza.transparencia || [])
      .map(function (t) { return '<p data-rev="suave">' + esc(t) + '</p>'; }).join('');
  }

  /* ------------------------------------------------------------- helpers */
  function titulo(s) {
    s = String(s || '');
    if (s === s.toUpperCase()) return s.charAt(0) + s.slice(1).toLowerCase();
    return s;
  }

  /* cristal dibujado: forma abstracta, NO un mineral figurativo */
  function cristal(acento) {
    var c = acento || '#2fbf71';
    var id = 'g' + c.replace('#', '');
    return '' +
      '<svg viewBox="0 0 100 100" aria-hidden="true">' +
        '<defs><linearGradient id="' + id + '" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="' + c + '" stop-opacity=".95"/>' +
          '<stop offset="100%" stop-color="' + c + '" stop-opacity=".25"/>' +
        '</linearGradient></defs>' +
        '<polygon points="50,6 78,30 70,84 30,84 22,30" fill="url(#' + id + ')"/>' +
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
    vista: VISTA,
    especies: DATA.especies.length,
    campos: pieza.ficha.length,
    basicos: basicos.length,
    verificados: verificados,
    pendientes: pendientes,
    versos: (pieza.relato ? pieza.relato.versos.length : 0),
    bloques: (pieza.directa ? pieza.directa.bloques.length : 0),
    fuentes: fuentes
  };
})();
