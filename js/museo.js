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

  /* Luminancia relativa de un #rrggbb (fórmula WCAG). Sirve para decidir si
     el texto va en oscuro o en claro SOBRE el color de acento de la especie.
     Un acento muy claro —el blanco amarillento de la Fibroferrite— necesita
     tinta oscura, o el botón queda ilegible. */
  function luminancia(hex) {
    var m = /^#?([0-9a-f]{6})$/i.exec(String(hex || ''));
    if (!m) return 0;
    var n = parseInt(m[1], 16);
    var canales = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map(function (v) {
      v = v / 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * canales[0] + 0.7152 * canales[1] + 0.0722 * canales[2];
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
    /* DEC-016 (2026-11-08): los colores secundarios se DERIVAN del acento.
       Antes `--acento-2` estaba fijo en verde (#6ee7a8), así que una especie
       naranja —Copiapite y Fibroferrite— mostraba sus rótulos en verde.
       Ahora cada especie arrastra su propia gama. */
    document.documentElement.style.setProperty('--acento-2',
      'color-mix(in srgb, ' + pieza.acento + ' 62%, white)');
    document.documentElement.style.setProperty('--acento-deep',
      'color-mix(in srgb, ' + pieza.acento + ' 18%, black)');
    /* El texto que va ENCIMA del acento (botón lleno) necesita contraste:
       con un acento claro, blanco sobre blanco sería ilegible. */
    document.documentElement.style.setProperty('--acento-tinta',
      luminancia(pieza.acento) > 0.55 ? '#12100a' : '#04140b');
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

  /* DEC-019 (2026-11-09) — la card dice qué ES el mineral, no cómo se archivó.
     El dueño: «siento que en las cards es texto irrelevante». Tenía razón:
     antes mostraba el rótulo «Localidad tipo Chile», el acta de procedencia
     («Descrita en 1797 (IMA Master List…) · Nombrada en 1802 por…») y dos
     contadores internos. Nada de eso ayuda a mirar la pieza.

     Ahora: nombre, fórmula, y tres datos que sí describen el mineral —
     color, dureza y cómo cristaliza. Todos salen de la propia ficha; si un
     campo no existe, simplemente no se pinta (no se inventa).

     DEC-026 (2026-11-25) — la card se extrajo a `cardPieza()` porque ahora la usan
     DOS sitios: la sala y la card de «Siguiente mineral» al pie de una pieza. Con
     el HTML duplicado, cualquier cambio en la vitrina quedaba sólo en una de las
     dos vistas. */
  function dato(e, campo) {
    var f = e.ficha.filter(function (x) { return x.campo === campo; })[0];
    return f ? f.valor : '';
  }
  /* El color llega como lista larga («Verde brillante; verde esmeralda…»).
     En la card se usa el primero: es el que el visitante nombra al verlo. */
  function colorCorto(e) {
    var c = dato(e, 'Color');
    if (!c) return '';
    return c.split(';')[0].split(',')[0].trim();
  }

  function cardPieza(e) {
    var color = colorCorto(e);
    var dureza = dato(e, 'Dureza (Mohs)');
    var sistema = dato(e, 'Sistema cristalino');

    var datos = '';
    if (color)   datos += '<div><dt>Color</dt><dd>' + esc(color) + '</dd></div>';
    if (dureza)  datos += '<div><dt>Dureza</dt><dd>' + esc(dureza) + '</dd></div>';
    if (sistema) datos += '<div><dt>Cristal</dt><dd>' + esc(sistema) + '</dd></div>';

    return '' +
      '<li class="pieza-card" style="--acento:' + esc(e.acento || '#2fbf71') + '">' +
        '<div class="pieza-card__vitrina">' + cristal(e.acento) + '</div>' +
        '<div class="pieza-card__cuerpo">' +
          '<h3 class="pieza-card__h3">' + esc(titulo(e.nombre)) + '</h3>' +
          '<span class="pieza-card__formula">' + esc(e.formula) + '</span>' +
          (datos ? '<dl class="pieza-card__datos">' + datos + '</dl>' : '') +
          '<a class="pieza-card__ir" href="' + esc(e.id) + '.html">' +
            'Abrir el archivo de ' + esc(titulo(e.nombre)) + ' →</a>' +
        '</div>' +
      '</li>';
  }

  if (salaLista) {
    salaLista.innerHTML = DATA.especies.map(cardPieza).join('');
  }

  /* ------------------------------------------- V4 (2026-11-08): nav de sala
     La barra superior listaba TODAS las piezas. DEC-026 (2026-11-25) la retiró:
     el dueño: «no use el nav para poner los minerales, haz un cosito de busqueda
     … PARA NO CONFUNDIR SOLO EN EL HOME ESO». La barra vuelve a ser un índice de
     secciones; los minerales se buscan en la sala.

     El bloque queda como RED DE SEGURIDAD: si alguna página futura vuelve a
     traer un contenedor `#navPiezas`, se llena igual. Hoy no existe en ninguna. */
  var navPiezas = $('#navPiezas') || $('#navPiezasPie');
  if (navPiezas) {
    navPiezas.innerHTML = DATA.especies.map(function (e) {
      var attrs = 'href="' + esc(e.id) + '.html" data-pieza="' + esc(e.id) + '"' +
        (e.acento ? ' style="--acento:' + esc(e.acento) + '"' : '') +
        (e.id === pieza.id && VISTA === 'archivo' ? ' aria-current="page"' : '');
      return '<li><a ' + attrs + '>' + esc(titulo(e.nombre)) + '</a></li>';
    }).join('');
  }

  /* ------------------------------------------------- BUSCADOR (DEC-026)
     Vive SÓLO en la sala. Busca por nombre en español, nombre IMA y fórmula, y
     con una sola letra ya filtra: el dueño pidió «una letra o el nombre
     completo».

     ⚠️ Se compara SIN TILDES ni mayúsculas («atacamita» encuentra «Atacamita»,
     «fórmula» encuentra «formula»). `normalize('NFD')` + quitar los diacríticos
     es lo que hace que escribir rápido en un teclado inglés siga funcionando. */
  function plegar(s) {
    return String(s == null ? '' : s)
      /* ⚠️ `NFD` + quitar diacríticos NO basta para las fórmulas: los dígitos
         en subíndice son compatibles pero NO descomponen (`₄` no se convierte
         en `4`). Medido: la fórmula de Copiapite es
         «Fe²⁺Fe³⁺₄(SO₄)₆(OH)₂(H₂O)₁₄·6H₂O» y un visitante escribe «Fe2(SO4)3».
         Por eso se normaliza también a `NFKD`, que sí lleva los subíndices a
         dígitos y los superíndices a números. */
      .normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
      /* signos que se tipean distinto pero significan lo mismo.
         ⚠️ Los iones van con su carga PEGADA al átomo («fe2+fe3+4»), así que
         hay que quitar el «+» antes de comparar: sin esto, escribir «fe2(so4)6»
         —lo que tipea cualquiera— no encontraba la fórmula del libro, que es
         «Fe²⁺Fe³⁺₄(SO₄)₆…». Medido, no supuesto. */
      .replace(/[·•⋅∙]/g, '.').replace(/[⁺⁻]/g, '').replace(/[+-]/g, '')
      .toLowerCase().trim();
  }

  var buscador = $('#buscarPieza');
  if (buscador && salaLista) {
    var vacio   = $('#salaVacio');
    var cuenta  = $('#buscarCuenta');
    var limpiar = $('#buscarLimpiar');
    var cards   = $$('.pieza-card', salaLista);

    /* Índice de búsqueda armado UNA vez desde los datos, no desde el texto de la
       card: así el nombre IMA («Atacamite») y la fórmula también encuentran la
       pieza aunque no se pinten en la vitrina.

       ⚠️ La fórmula JAMÁS entra al texto de búsqueda largo. Medido: «Cu2Cl(OH)3»
       y «Fe2(SO4)3·9H2O» contienen «c», «o» y «h», así que escribir una sola
       letra hacía coincidir piezas cuyo NOMBRE no la tiene («c» traía
       Copiapite y dejaba fuera Fibroferrite). Se busca por nombre, y la fórmula
       sólo se compara aparte, cuando lo escrito trae un dígito o un paréntesis
       —que es cuando el visitante está buscando por composición y no por
       letra. */
    var indice = DATA.especies.map(function (e) {
      return {
        id: e.id,
        nombre: plegar([e.nombre, e.nombre_ima].join(' ')),
        form: plegar(e.formula)
      };
    });

    function coincide(it, q) {
      if (!q) return true;
      if (it.nombre.indexOf(q) !== -1) return true;
      /* Fórmula: sólo si hay algo que parezca composición. */
      if (/[0-9()]/.test(q) && it.form.indexOf(q) !== -1) return true;
      return false;
    }

    var filtrar = function () {
      var q = plegar(buscador.value);
      var vistos = 0;

      cards.forEach(function (c) {
        var id = (c.querySelector('.pieza-card__ir') || {}).getAttribute
          ? c.querySelector('.pieza-card__ir').getAttribute('href').replace(/\.html$/, '')
          : '';
        var it = indice.filter(function (x) { return x.id === id; })[0];
        var si = it ? coincide(it, q) : !q;
        c.hidden = !si;
        if (si) vistos++;
      });

      if (vacio) vacio.hidden = vistos !== 0 || !q;
      /* El aviso dice cuántas hay DE VERDAD, no un número escrito a mano: con
         cada especie nueva el «3» quedaría mintiendo (misma lección que los
         contadores de DEC-007). */
      if (vacio && vistos === 0 && q) {
        var piezas = '' + DATA.especies.length;
        vacio.innerHTML = 'No hay ninguna pieza en el museo que coincida con ' +
          '<b>«' + esc(buscador.value.trim()) + '»</b>. Hoy hay <b>' + piezas +
          '</b> ' + (DATA.especies.length === 1 ? 'pieza expuesta' : 'piezas expuestas') +
          ': borra la búsqueda para verlas todas.';
      }
      /* Sólo aparece si hay texto REAL: con espacios sueltos la X no tendría
         nada que borrar y estaría de más. */
      if (limpiar) limpiar.hidden = !buscador.value.trim();

      /* El contador sólo habla cuando hay algo escrito: un «3 de 3» permanente
         sería ruido, y el museo no presume de cuántas piezas tiene. */
      if (cuenta) {
        cuenta.textContent = !q ? '' :
          (vistos === 0 ? 'Ninguna pieza coincide.' :
           vistos === 1 ? '1 pieza' : vistos + ' piezas');
      }
    };

    buscador.addEventListener('input', filtrar);
    buscador.addEventListener('search', filtrar);
    if (limpiar) {
      limpiar.addEventListener('click', function () {
        buscador.value = '';
        filtrar();
        buscador.focus();
      });
    }
    /* Escape limpia la búsqueda sin sacar al visitante del campo. */
    buscador.addEventListener('keydown', function (ev) {
      if (ev.key === 'Escape' && buscador.value) {
        ev.preventDefault();
        buscador.value = '';
        filtrar();
      }
    });
    filtrar();
  }

  /* --------------------------------------- SIGUIENTE MINERAL (DEC-026)
     El dueño: «cuando uno termine de leer al final abajo sales una card de
     siguiente mineral». La card se arma con el MISMO constructor de la sala, así
     que nombre, fórmula, color, dureza y cristal salen de la ficha y no se
     mantienen en dos sitios.

     El orden es el del índice del libro (DEC-009), y da la vuelta: después de la
     última vuelve la primera. Un museo no tiene final, y dejar el visitante en un
     callejón sin salida era justo lo que esta card viene a resolver. */
  var siguienteCaja = $('#siguienteCaja');
  if (siguienteCaja && VISTA === 'archivo') {
    var i = DATA.especies.map(function (e) { return e.id; }).indexOf(pieza.id);
    var sig = DATA.especies[(i + 1) % DATA.especies.length];
    siguienteCaja.innerHTML = cardPieza(sig);
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
  /* DEC-023 (2026-11-25) — el archivo se lee por FAMILIAS, no de corrido.
     Los 36 campos llegaban como una pila idéntica de 36 filas y ~9.000 px: nada
     decía dónde terminaba la identidad del mineral y dónde empezaba su física.
     `GRUPOS` es una lista CERRADA, no un rótulo inventado por ficha: si un campo
     de una ficha futura no cae en ninguno, se va a «Otros datos», nunca se pierde
     (contrato C6). Cada grupo es un prefijo de `campo`, salvo «Yacimiento», que
     agrupa tres materias distintas por lista explícita. */
  var GRUPOS = [
    { id: 'identidad',   nombre: 'Identidad',      nota: 'Qué es y cómo se llama. De dónde salió el nombre y quién lo puso.',
      /* «Autor del nombre» va aquí y no en Yacimiento: quién puso el nombre es
         parte de la identidad del mineral, no de dónde aparece. Sin esta rama el
         campo se iba a «Otros datos» y dejaba un grupo de UN solo dato. */
      test: function (c) { return /^Nombre |^Autor del nombre|^Fórmula|^Estatus|^Año /.test(c); } },
    { id: 'cristal',     nombre: 'Cristal',        nota: 'Cómo se ordenan sus átomos y qué forma toma al crecer.',
      test: function (c) { return /^Sistema cristalino|^Grupo |^Parámetros de celda|^Hábito|^Maclado/.test(c); } },
    { id: 'propiedades', nombre: 'Propiedades',    nota: 'Lo que se puede medir o ver de la pieza en la mano.',
      test: function (c) { return /^Dureza|^Densidad|^Exfoliación|^Fractura|^Tenacidad|^Color|^Raya|^Brillo|^Transparencia|^Clase óptica|^Índices de refracción|^Pleocroísmo|^Fluorescencia|^Solubilidad/.test(c); } },
    { id: 'yacimiento',  nombre: 'Yacimiento',     nota: 'Dónde aparece en Chile, con qué otros minerales y cómo se formó.',
      test: function (c) { return /^Contexto geológico|^Asociaciones|^Polimorfos|^Localidad|^Localidades|^Material tipo|^Referencia/.test(c); } }
  ];
  var GRUPO_OTROS = { id: 'otros', nombre: 'Otros datos', nota: 'Campos que no caen en ninguna familia anterior.' };

  /* Agrupa respetando el ORDEN de la ficha: dentro de cada familia, los campos
     salen en el orden en que el libro los escribió. */
  function agrupar(ficha) {
    var salida = [], porId = {};
    GRUPOS.forEach(function (g) { var o = { grupo: g, campos: [] }; porId[g.id] = o; salida.push(o); });
    var otros = { grupo: GRUPO_OTROS, campos: [] };
    ficha.forEach(function (f) {
      var g = GRUPOS.filter(function (x) { return x.test(f.campo); })[0];
      if (g) porId[g.id].campos.push(f); else otros.campos.push(f);
    });
    if (otros.campos.length) salida.push(otros);
    return salida.filter(function (o) { return o.campos.length; });
  }

  /* La nota larga sale de la fila y se va al PIE de la pieza como nota numerada.
     Antes vivía como 4.ª columna de la fila y rompía la regla en 6 de las 36, con
     hasta 346 caracteres metidos entre el dato y el siguiente dato.

     DEC-029 (2026-11-25) — el número de la nota ES el número del campo.
     Antes se numeraban 1…31 por orden de aparición, pero sólo 31 de los 36
     campos tienen nota, así que el superíndice dejaba de coincidir con el número
     del margen: la nota «27» hablaba de un campo rotulado 32. El lector veía dos
     numeraciones distintas para la misma fila. Ahora la nota del campo 32 se
     llama 32, y las cinco filas sin nota simplemente no tienen superíndice. */
  var notas = [];                    /* {n, campo, texto} — se llena al pintar */
  var notasPorNumero = {};           /* evita repetir la misma nota en un campo */
  function notaRef(f, nCampo) {
    if (!f.nota || f.nota === '—') return 0;
    /* En la sala (sin numeración de campos) la nota no se referencia: la card no
       lleva notas. Se devuelve 0 para no inventar un número que no existe. */
    if (!nCampo) return 0;
    if (notasPorNumero[nCampo]) return notasPorNumero[nCampo];
    notas.push({ n: nCampo, campo: f.campo, texto: f.nota });
    notasPorNumero[nCampo] = nCampo;
    return nCampo;
  }

  /* El número de campo SIEMPRE con dos dígitos («01»…«36»). Vive en una sola
     función porque se pinta en TRES sitios —el margen de la fila, el superíndice
     de la nota y la cabecera de la nota al pie— y si uno se olvida del relleno,
     el mismo campo aparece como «01» arriba y «1» abajo. Medido: pasaba. */
  function num2(n) {
    return String(n).padStart(2, '0');
  }

  function filaHTML(f, nCampo) {
    var faltaContrato = !f.fuente || !f.estado;
    var pend = f.estado === 'pendiente';
    var clase = 'fila' + (pend ? ' is-pendiente' : '') + (faltaContrato ? ' is-error' : '');

    if (faltaContrato) {
      console.error('[museo] CONTRATO C2 roto en el campo "' + f.campo + '": falta fuente o estado');
    }

    /* DEC-021 (2026-11-14) — la marca ámbar dice POR QUÉ, no sólo que falta.
       El dueño: «cuando se dice pendiente, no debería decir que se buscó y no se
       encontró». Tenía razón: «pendiente» a secas se lee como «falta buscarlo»,
       cuando la verdad es que ya se buscó y ninguna fuente lo declara. El método
       estaba declarado en la transparencia de la pieza, pero la etiqueta de la
       fila —que es donde mira el lector— no lo traía.

       DEC-022 (misma sesión) — el método NO se explica con vocabulario interno.
       El dueño: «es completamente innecesario decir se comprobó por búsqueda
       literal con jergas técnicas de programación». El museo habla para un
       visitante, no para un programador: las notas y la transparencia dicen qué
       NO declara la fuente, sin describir cómo se buscó.

       El texto se DERIVA aquí y no se escribe en las 36 filas del JSON: si se
       escribiera a mano, la próxima ficha lo repetiría mal. Misma lógica que
       --acento-2 en DEC-016. Se conserva la palabra «pendiente» porque data-estado
       y las mediciones cuentan por ella.

       NO se toca el caso `faltaContrato`: ahí el dato no está buscado, está SIN
       FUENTE declarada (contrato C2). Son dos verdades distintas y no se unifican. */
    var marca = faltaContrato
      ? '<span class="marca-estado marca-estado--pend">sin fuente</span>'
      : (pend ? '<span class="marca-estado marca-estado--pend">' + esc(f.estado) + ' · buscado sin resultado</span>' : '');

    var ref = notaRef(f, nCampo);

    return '' +
      '<div class="' + clase + '" data-estado="' + esc(f.estado) + '">' +
        '<div class="fila__n" aria-hidden="true">' + (nCampo ? num2(nCampo) : '') + '</div>' +
        '<div class="fila__campo">' + esc(f.campo) +
          (ref ? '<sup class="fila__ref"><a href="#nota-' + num2(ref) + '">' + num2(ref) + '</a></sup>' : '') + '</div>' +
        '<div class="fila__valor">' + esc(f.valor) + '</div>' +
        '<div class="fila__fuente">' + esc(f.fuente || 'SIN FUENTE') + marca + '</div>' +
      '</div>';
  }

  /* PORTADA → solo los campos básicos (12).
     DEC-023 (2026-11-25): la pieza ya NO pinta una segunda tabla con estos mismos
     12 campos. Pertenecían al mismo dato y se leían dos veces.
     `basico:true` NO se toca: sigue en los datos y el contrato C6 se cumple
     (36 = 12 básicos + 24 de archivo); lo que cambió es cuántas veces se pinta. */
  var tablaBasica = $('#tablaBasica');
  if (tablaBasica) tablaBasica.innerHTML = basicos.map(filaHTML).join('');

  /* ARCHIVO → los 36 campos, agrupados por familia y numerados.
     La numeración es de LECTURA (01…36 en el orden del libro), no un dato nuevo:
     los datos siguen siendo el campo, el valor, la fuente y el estado. */
  var tablaFicha = $('#tablaFicha');
  if (tablaFicha) {
    /* El contador de campo corre a través de los grupos, para que el visitante
       pueda seguir el hilo 01…36 sin importar dónde empiece cada familia. */
    var n = 0;
    tablaFicha.innerHTML = agrupar(pieza.ficha).map(function (o) {
      var filas = o.campos.map(function (f) { n++; return filaHTML(f, n); }).join('');
      return '' +
        '<div class="grupo" data-grupo="' + esc(o.grupo.id) + '">' +
          '<div class="grupo__cab">' +
            '<h4 class="grupo__h4">' + esc(o.grupo.nombre) + '</h4>' +
            '<p class="grupo__nota">' + esc(o.grupo.nota) + '</p>' +
            '<span class="grupo__cuenta">' + o.campos.length + '</span>' +
          '</div>' +
          '<div class="grupo__filas">' + filas + '</div>' +
        '</div>';
    }).join('');
  }

  /* Notas al pie de la pieza: aquí baja el texto largo que antes iba dentro de la
     fila. Se arman con el mismo recorrido, así que si una ficha no tiene notas la
     sección no existe. */
  var notasCaja = $('#notasCaja');
  if (notasCaja) {
    if (notas.length) {
      notasCaja.innerHTML = notas.map(function (o) {
        return '<li id="nota-' + num2(o.n) + '"><span class="nota__n">' + num2(o.n) + '</span>' +
               '<span class="nota__txt"><strong>' + esc(o.campo) + '.</strong> ' + esc(o.texto) + '</span></li>';
      }).join('');
    } else {
      var seccionNotas = $('#notas');
      if (seccionNotas) seccionNotas.hidden = true;
    }
  }


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
  /* DEC-024 (2026-11-25) — los cuentos quedan GUARDADOS, no borrados.
     El dueño: «descartemos los cuentos pero no los borres, los haremos al final
     despues de tener todos los minerales».

     Los versos siguen íntegros en data/museo.js. Esta página deja de pintarlos
     mientras el id de la especie esté en MUSEO.relatosOcultos. Devolver uno es
     quitar su id de esa lista; devolverlos todos, vaciarla.

     ⚠️ La rama de «Relato en preparación» se PISA a neutra mientras los relatos
     estén en pausa: con el cuento guardado no hay nada que anunciar, y anunciarlo
     sería prometer un texto que hoy no se va a publicar. Cuando el dueño los
     devuelva, la rama de preparación vuelve a tener sentido sola. */
  /* En la SALA no hay una pieza en pantalla: `pieza` sólo sirve para que la nav
     y los contadores no revienten. La pausa del relato es una propiedad DE LA
     ESPECIE que se está leyendo, así que en la sala se reporta `false` en vez de
     heredar el estado de `especies[0]` —es el mismo error de fondo que DEC-011,
     donde `especies[0]` fijo hacía que copiapite.html mostrara la Atacamita. */
  var relatosEnPausa = VISTA === 'portada'
    ? false
    : (DATA.relatosOcultos || []).indexOf(pieza.id) !== -1;
  var relatoCaja = $('#relatoCaja');
  if (relatoCaja) {
    if (relatosEnPausa) {
      relatoCaja.innerHTML = '' +
        '<h3 class="relato__titulo relato__titulo--pendiente">Relato en preparación</h3>' +
        '<div class="relato__versos">' +
          '<p data-pausa="1">Los relatos de las piezas se publicarán cuando el museo tenga todas sus especies.</p>' +
          '<p data-pausa="1">La ficha técnica de esta pieza está completa: cada dato declara su fuente.</p>' +
        '</div>';
    } else if (pieza.relato && pieza.relato.versos && pieza.relato.versos.length) {
      /* CONTRATO C4: literal, verso por verso. No se toca ni se corrige. */
      relatoCaja.innerHTML = '' +
        '<h3 class="relato__titulo">' + esc(pieza.relato.titulo) + '</h3>' +
        '<div class="relato__versos">' +
          pieza.relato.versos.map(function (v) {
            return '<p data-rev="verso">' + esc(v) + '</p>';
          }).join('') +
        '</div>';
    } else {
      /* Sin relato aprobado todavía (Fibroferrite, ficha 3).
         El relato es la voz del autor del libro: NO se escribe uno para tapar el
         hueco. Se declara en pantalla, que es más honesto que una sección vacía
         o que un texto inventado. Cuando el dueño lo dicte, basta con llenar
         `relato` en data/museo.js y esta rama deja de ejecutarse. */
      relatoCaja.innerHTML = '' +
        '<h3 class="relato__titulo relato__titulo--pendiente">Relato en preparación</h3>' +
        '<div class="relato__versos">' +
          '<p data-rev="verso">Esta especie todavía no tiene su relato escrito por el autor del libro.</p>' +
          '<p data-rev="verso">La ficha de abajo sí está completa y documentada: cada dato declara su fuente.</p>' +
        '</div>';
    }
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

  /* ------------------------------------------- DEC-025: etapas numeradas
     El archivo son seis bloques seguidos sin nada que diga en qué punto del
     recorrido está el visitante. Se numeran 01…06 en el orden en que aparecen en
     la página.

     ⚠️ El número NO se escribe a mano en el HTML: se DERIVA de los `<section>`
     con `data-orden`. Si mañana el dueño pide quitar el relato (o devolverlo), el
     pie y la nav se renumeran solos y no queda un «04» donde ahora hay «03». Es
     la misma regla que --acento-2 (DEC-016) y la marca de pendiente (DEC-021):
     lo que se puede derivar no se transcribe. */
  $$('section[data-orden]').forEach(function (sec, i) {
    var n = i + 1;
    var rotulo = sec.getAttribute('data-etapa') || '';
    sec.style.setProperty('--etapa', '"' + String(n).padStart(2, '0') + '"');

    /* La nav y el pie no escriben el número: lo toman de aquí. Así un enlace
       «03 · Ficha técnica» no puede quedar desfasado de la sección que señala. */
    var id = sec.id;
    if (!id) return;
    $$('a[href="#' + id + '"]').forEach(function (a) {
      if (a.classList.contains('saltar') || a.classList.contains('volver')) return;
      if (a.closest('.pie__nav') || a.closest('.nav')) {
        if (rotulo) a.textContent = String(n).padStart(2, '0') + ' · ' + rotulo;
      }
    });
  });

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
    fuentes: fuentes,
    /* DEC-024/DEC-025 (2026-11-25): lo que agregó el nuevo formato. Sirve para
       medir sin adivinar selectores. */
    relatoEnPausa: relatosEnPausa,
    grupos: $$('#tablaFicha .grupo').length,
    notas: notas.length,
    etapas: $$('section[data-orden]').length,
    /* DEC-026: buscador y card de siguiente mineral. */
    cards: $$('.pieza-card').length,
    cardsVisibles: $$('.pieza-card').filter(function (c) { return !c.hidden; }).length,
    navPiezas: (navPiezas ? navPiezas.querySelectorAll('a').length : 0),
    siguiente: (function () {
      var a = $('#siguienteCaja .pieza-card__ir');
      return a ? a.getAttribute('href').replace(/\.html$/, '') : null;
    }())
  };
})();
