# RELEVO — Museo de Minerales Descubiertos en Chile

**Última actualización:** **2026-11-25** · **4 especies publicadas** (Atacamita + Copiapite + Fibroferrite + Pickeringite)
**Estado:** PUBLICADO y estable. DEC-023 a **DEC-029**.
**Último commit:** `d5c7f34` — medido en vivo: `md5` servido == HEAD, 3 medidores en verde.

---

## 🔴 DEC-027 — EL LIBRO (.docx) ESTÁ FUERA DEL ALCANCE

El dueño: *«EL DOCX NO ES NECESARIO AVANZAR, YA QUE NO LANZARE EL LIBRO. ENFOQUEMOSNOS EN LA PAGINA»*.

**No se toca `Minerales-descubiertos-en-Chile.docx`.** Consecuencias que hay que respetar:

- La ficha 4 (Pickeringite) **sí** se insertó en el `.docx` antes de esta decisión, y quedó bien
  (34 páginas, 0 hojas en blanco, 4 tablas 37×5, REFERENCIAS al final). No se deshace, pero
  **tampoco se sigue**: el próximo trabajo va sólo al sitio.
- Las **tildes que faltan en el `.docx`** (`composicion`, `Tarapaca`, `Biaxica`, `una` por «uña»)
  **dejan de ser deuda**. El museo las restaura al extraer, así que el sitio ya está bien.
- El respaldo del libro anterior a la ficha 4 vive en
  `Downloads/museo-respaldos/BACKUP-libro-antes-pickeringite-20261125-162459.docx`.

## 🆕 FICHA 4 — PICKERINGITE (1844, Chile) · publicada

**36 campos · 36 verificados · 0 pendientes.** Acento **azul hielo `#8fc6e8`** (10,89:1 contra el
negro; 1,48:1 contra el blanco amarillento de Fibroferrite, así que las dos especies claras no se
confunden).

| Dato | Valor | Fuente |
|---|---|---|
| IMA | Pickeringite · **G** · 1844 · Chile | IMA Master List **2026-11**, **p. 172** |
| Fórmula | `MgAl₂(SO₄)₄(H₂O)₁₇·5H₂O` | idem (el Handbook escribe `•22H₂O`: las mismas 22 aguas) |
| **Autor del nombre** | **Alonzo Austin Hayes (1818-1894), 1844** | **Chester (1896)**: «A. A. Hayes, 1844, A.J.S., xlvi, 360» |
| Homenajeado | **John Pickering (1777-1846)**, abogado y filólogo de Boston | Handbook, campo `Name` |
| Estructura | P2₁/c · a 6,1844 · b 24,2715 · c 21,2265 · β 100,326° · Z 4 | Quartieri, Triscari y Viani (2000), DOI 10.1127/ejm/12/6/1131 |
| Chile | Cerros Pintados (abundante) · Quetena · Chuquicamata | Handbook, `Distribution` |

### 🔴 Contradicciones entre fuentes, DECLARADAS (no resueltas en silencio)

| Campo | Handbook | Webmineral | Qué se hizo |
|---|---|---|---|
| **Grupo espacial** | `P2₁/c` | `P2` | Se toma **P2₁/c**: la determinación dedicada (Quartieri et al. 2000) lo confirma por Rietveld. Webmineral arrastra la tarjeta PDF 12-299 vieja — y **el propio paper dice que esa tarjeta hay que redefinirla** |
| **Fractura** | concoidea | irregular | Se conserva la del Handbook y la otra queda declarada en la nota |
| **Celda** | a 6,1844 · b 24,2715 · c 21,2265 | a 20,8 · b 24,2 · c 6,18 · β 95° | Se cita la del refinamiento, con la razón escrita en la nota |

### 🔴 Verificación literal — 43 checks + 6 negativos

`/tmp/verificar_pickeringite.py` compara cada valor contra el texto extraído de su fuente y
**falla con exit 1**. Dos trampas nuevas que costaron dos vueltas:

1. **`U+00B7` MIDDLE DOT** es el punto de las fórmulas (`·5H2O`). `NFKD` **no** lo convierte:
   sin `.replace("\u00b7",".")` la fórmula del IMA nunca coincide. Es la misma familia que los
   subíndices de la Copiapite.
2. El abstract de **OpenAlex** trae `confmned` (OCR del editor) donde el artículo dice
   `confirmed`. Se verifica el fragmento estable (`p21/c with unit cell parameters`), no la frase.

**Regla que queda:** antes de declarar mal un dato, sospechar del normalizador.

## 🔴 DEC-028 — la transparencia de Atacamita estaba desfasada (P0, corregido)

La revisión del dueño detectó que la *Nota de transparencia* de Atacamita seguía diciendo
*«Quedan dos frentes abiertos… el año y el autor del nombre, que sólo constan en Mindat… y la
fluorescencia y la solubilidad»*, **mientras su propia tabla daba los 36 campos por verificados**.
Era el texto de octubre, nunca actualizado tras cerrar los cuatro datos el 2-nov.

Reescrita (6 párrafos) con la verdad de hoy:
- los 36 campos verificados, y **cómo** se cerraron fluorescencia (Webmineral) y solubilidad (Collins 1871);
- la **disputa Blumenbach/Golitsyn declarada con las dos atribuciones** y la discrepancia 1801/1802;
- la localidad tipo exacta como dato verificado (la fuente dice que no se definió).

⚠️ **Lección:** sincronizar la tabla no sincroniza la transparencia. Son **dos** sitios, y el
segundo es el que se olvida. Al cerrar un campo, revisar el párrafo de transparencia que lo nombra.

## 🔴 DEC-029 — el número de la nota ES el número del campo

El dueño: *«algunos campos no muestran el número de nota en su etiqueta… mientras que las notas
saltan directamente a esos números»*. **Tenía razón, y no era un desajuste de datos** (medido: 0
desajustes; la nota *n* siempre apuntaba al campo correcto) **sino dos numeraciones paralelas**:
las notas iban 1…31 por orden de aparición, y sólo 31 de los 36 campos tienen nota, así que la
nota «27» hablaba de un campo rotulado **32**.

| Antes | Ahora |
|---|---|
| nota `1…31` por orden · margen `01…36` por campo | **el mismo número en los tres sitios** |
| `String(n).padStart(2,'0')` repetido en 3 lugares → el campo 1 salía `01` arriba y `1` abajo | una sola función `num2()` |

Y el encabezado de la sección lo dice: *«El número de cada nota es el número de su campo»*.

### Lo que se revisó y NO se cambió (con la fuente en la mano)

- **«Polimorfos»**: el Handbook declara literalmente `Polymorphous with botallackite,
  clinoatacamite and paratacamite`. El término lo usa la fuente citada; no es vocabulario propio.
- **Fórmulas sin subíndices en el campo, con subíndices en la cabecera**: es una **decisión
  pendiente**, no un olvido. Unificar toca el render de las 4 especies **y** la búsqueda NFKD
  (que se apoya en que `Cu2Cl` sea ASCII). Hacerlo sin medir la búsqueda rompería lo de DEC-026.

---

## 🆕 SESIÓN 2026-11-25 — formato de las fichas + buscador + siguiente mineral

El dueño: *«descartemos los cuentos pero no los borres, los haremos al final despues de tener
todos los minerales. mejora el formato de las fichas»*, y después *«no use el nav para poner los
minerales, haz un cosito de busqueda… PARA NO CONFUNDIR SOLO EN EL HOME ESO. Y CUANDO UNO TERMINE
DE LEER AL FINAL ABAJO SALES UNA CARD DE SIGUIENTE MINERAL»*.

Eligió la opción **D** para el formato: **etapas numeradas + grupos + tipografía de archivo**.

### 🔴 DEC-024 — los cuentos están GUARDADOS, no borrados

`data/museo.js` conserva **íntegros** los 14 versos de Atacamita («HERIDA EN EL DESIERTO») y los
2 de Copiapite («EL CORAZÓN EXPUESTO»). Lo único que cambió es que se **dejan de pintar**:

```js
"MUSEO.relatosOcultos": ["atacamita", "copiapite"]
```

- **Devolver uno** → quitar su id de la lista.
- **Devolverlos todos** → dejar la lista vacía.
- No hay que tocar HTML, CSS ni ninguna otra línea de datos.

Mientras están en pausa, la sección del relato dice **«Relato en preparación»** con un texto
NEUTRO (marcado `data-pausa="1"`, **no** `data-rev="verso"`): con el cuento guardado no hay nada
que anunciar, y anunciarlo sería prometer un texto que hoy no se va a publicar.

### DEC-023 — el formato de la ficha

| Antes | Ahora |
|---|---|
| Una pila de 36 filas idénticas, ~9.000 px, sin jerarquía | **4 grupos**: Identidad (7) · Cristal (6) · Propiedades (14) · Yacimiento (9) |
| La nota larga era una 4.ª franja dentro de la fila (hasta **346 caracteres**) y rompía la regla en 6 de 36 | Baja a **«Notas de la ficha»** como nota al pie numerada; la fila muestra sólo su número |
| Sin numeración | **01…36** al margen, en el acento de la pieza, `tabular-nums` |
| `#tablaBasica` duplicaba 12 de los 36 campos cien píxeles más arriba | **Se retiró de la pieza.** `basico:true` **se conserva** (C6 intacto: 36 = 12 + 24); la sala sigue pintando los 12 |

Los grupos son una **lista cerrada** en `js/museo.js` (`GRUPOS`), por prefijo de `campo`, con
`Otros datos` como red de seguridad: un campo de una ficha futura que no caiga en ninguno **no se
pierde**, nunca.

⚠️ **«Autor del nombre» no caía en ningún grupo** y dejaba un grupo de UN solo dato. Medido con un
script que recorre las 3 fichas: era el único huérfano. Va en **Identidad** (quién puso el nombre
es identidad, no yacimiento).

### DEC-025 — etapas 01…06 derivadas, no escritas

Cada `<section data-orden data-etapa="Ficha técnica">` recibe su número del **orden real en el
DOM**, y el nav y el pie toman el número de ahí. Si una etapa desaparece, las demás se renumeran
solas: no queda un «04» donde ahora hay «03». Etapas actuales: **01 El relato · 02 Ficha técnica ·
03 Notas · 04 Versión directa · 05 Fuentes · 06 Transparencia**.

### DEC-026 — buscador en la sala + card de siguiente mineral

**El nav ya no lista piezas** (ni en la barra ni en el pie). La barra vuelve a ser un índice de
secciones.

**Buscador, sólo en `index.html`** (`#buscarPieza`): filtra las cards en vivo, con **una sola
letra** ya. Busca por nombre en español y por nombre IMA.

⚠️ **Tres defectos medidos que hubo que corregir, y que se repetirían:**

1. **La fórmula NO entra al texto de búsqueda largo.** «Cu2Cl(OH)3» y «Fe₂(SO₄)₃·9H₂O» contienen
   `c`, `o` y `h`: escribir **una letra** hacía coincidir piezas cuyo nombre no la tiene («c»
   traía Copiapite y dejaba fuera Fibroferrite). La fórmula se compara **aparte**, sólo cuando lo
   escrito trae un dígito o un paréntesis.
2. **`NFD` no basta con las fórmulas:** los subíndices (`₄`) son compatibles pero **no
   descomponen**. Hay que usar **`NFKD`**, o «Fe2(SO4)6» nunca encuentra «Fe²⁺Fe³⁺₄(SO₄)₆…».
3. **Las cargas iónicas van pegadas al átomo** (`fe2+fe3+4`): hay que quitar `+`/`−` **después**
   de normalizar, o el «+» parte la cadena justo donde el visitante no lo escribe.

**Card de «Siguiente mineral»** al final de cada pieza (`#siguienteCaja`), en el **orden del
libro** y **circular** (después de la última vuelve la primera). Se arma con la misma función
`cardPieza()` que la sala: **un solo HTML de card** para las dos vistas. La sección «Volver a la
sala» **se retiró** (la card la reemplaza y el enlace sigue en el texto del cierre).

### 🔴 Bug atrapado al medir (mismo patrón que DEC-011)

`relatoEnPausa` se calculaba con `pieza`, que en la **sala** es `especies[0]`: la portada reportaba
`true` heredando el estado de la Atacamita. No era visible, pero era exactamente el error de fondo
de DEC-011 (`especies[0]` fijo). Corregido: en la portada la pausa es `false`.

### Verificación en vivo (post-deploy, md5 servido == commit)

```
4 páginas × 3 anchos (360/768/1440)   0 fallas en los DOS medidores
atacamita/copiapite/fibroferrite      36 campos · 4 grupos · 6 etapas · 0 desbordes
atacamita 31 notas · copiapite 35 · fibroferrite 36
buscador: 15 casos (letra, prefijo, mayúsculas, tildes, fórmula, vacío, X, Escape)
siguiente: atacamita→copiapite→fibroferrite→atacamita, en los 3 anchos
nav: 1 enlace («La sala») en la portada · 0 listas de piezas en todo el sitio
0 errores de consola · 0 desborde horizontal · 0 desborde contra contenedor
```

Los dos medidores están en `/tmp` (se pierden al reiniciar WSL): `medir-formato.mjs` y
`medir-buscador.mjs`. Si se pierden, la receta es la de siempre: Chromium de Playwright +
`puppeteer-core` de `/mnt/c/dev/lfxcore/tmp/verify-responsive/node_modules`, y **exigir números
esperados**, no sólo «sin desborde».

### Respaldos de esta sesión (fuera de `/tmp`)

```
/mnt/c/Users/logic/Downloads/museo-respaldos/formato-20261125-155334/
  data/museo.js  js/museo.js  css/main.css  *.html      (estado previo a todo el cambio)
/mnt/c/Users/logic/Downloads/museo-respaldos/capturas-formato/
  zoom-grupo · zoom-sig · zoom-buscador · zoom-notas · cap-sala-m · cap-ficha-m
```

### Próximo paso real

1. **Ficha 4: Pickeringite** — la receta de fuentes ya está probada (§FICHA 3).
2. **Los cuentos**, cuando el museo tenga todas las especies: vaciar `relatosOcultos`.
3. **V3** (cristal propio por especie) y **V5** (paralaje) siguen pendientes y aprobadas.

---

## 📌 CIERRE DE SESIÓN 2026-11-08 — leer esto primero

**URL:** https://matiasbenavides-bot.github.io/museo-minerales-chile/
**Repo:** `matiasbenavides-bot/museo-minerales-chile` · rama `main` · Pages desde `/` · árbol **limpio**
**Último commit:** `dc0010f`

### Qué se hizo en esta sesión (todo medido, no heredado)

| # | Decisión | Qué cambió | Estado |
|---|---|---|---|
| **V2** | Sala en **grilla de vitrinas** | De barras de 1180 px apiladas a `auto-fit minmax(320px)`: 3 col a 1440 · 2 a 768 · 1 a 360 | ✅ publicado |
| **V1** | **Foco de luz** sigue al cursor | `js/foco.js` (88 líneas, sin librerías) + `body::after` | ✅ publicado |
| **V4** | **Navegación de las 3 piezas** | `#navPiezas` generado desde `data/museo.js` + `aria-current` | ✅ publicado |
| **DEC-013** | Fuera el sello «verificado» | 48 distintivos menos por página; **se mantiene** la marca ámbar de pendiente | ✅ publicado |
| **DEC-014** | **Crédito de autoría** | `© 2026 Matías Benavides · Creación de la página` en las 4 páginas | ✅ publicado |
| **DEC-015** | Fuera «No es un catálogo de venta» | Se conserva la declaración de fuentes | ✅ publicado |
| **FICHA 3** | **Fibroferrite publicada** | 36 campos · 33 verificados · 3 pendientes · libro + museo | ✅ publicado |
| **DEC-016** | **Colores por especie** | Fibroferrite blanco amarillento `#f2e6c8`; gama derivada del acento | ✅ publicado |

### Pendientes declarados (ninguno es deuda técnica)

| Pendiente | Detalle | Quién |
|---|---|---|
| **Relato de Fibroferrite** | `"relato": null`. La página dice «Relato en preparación». **Es la voz del dueño: no se inventa.** Basta llenar el campo en `data/museo.js` | **el dueño** |
| **V3** | Cada mineral con su **cristal propio** (hoy los 3 dibujan el mismo SVG) | Hermes |
| **V5** | **Paralaje del cristal** con el ratón en la página de la pieza | Hermes |
| Año del `©` | Hoy dice sólo `2026`; si el sitio crece, evaluar `2026–2027` | el dueño |
| **141 especies** | El libro tiene **3 fichas de 144** | libro + museo |

### Próximo paso real

1. **Relato de Fibroferrite** (dueño) → llenar `relato` en `data/museo.js`.
2. **Ficha 4: Pickeringite (1844)** — la receta de fuentes ya está probada (§FICHA 3).
3. **V3** si se quiere más impacto visual antes de seguir con el libro.

### Respaldos (fuera de `/tmp`, que se borra)

```
/mnt/c/Users/logic/Downloads/museo-respaldos/
  BACKUP-libro-antes-fibroferrite-20261108-235851.docx   48.187 b  (libro con 2 fichas)
  Minerales-descubiertos-en-Chile-FICHA3-20261109.docx   54.485 b  (libro con 3 fichas)
```
El libro vivo es `Downloads/Minerales-descubiertos-en-Chile.docx` (54.485 b).

---

## 🔴 DEC-020 — Fibroferrite es TRIGONAL, no hexagonal (2026-11-09)

**El dato confuso que detectó el dueño era real.** La ficha decía `Sistema cristalino: Hexagonal`
porque el Handbook abre `Crystal Data:` con esa palabra — pero **el Handbook mismo dice
`Point Group: 3`**, que es **trigonal**. El Handbook nombraba la **red** (red hexagonal), no el
sistema.

**Arbitraje:** Webmineral declara literal *«Trigonal - Rhombohedral, H-M Symbol (3), Space Group:
R 3»*. Se cita Webmineral y se conserva el `R3` del Handbook.

Corregido en **`data/museo.js` Y en el `.docx`** (tabla 3, fila 10) para no desincronizarlos.
Respaldo previo: `museo-respaldos/BACKUP-antes-trigonal-20261109-033706.docx`.

⚠️ Al reemplazar el campo se perdió `"basico": true` → los básicos cayeron a **11**. Detectado y
restaurado a 12. **Después de tocar el JSON, contar campos/basicos/verif/pend siempre.**

**Revisadas también:** Atacamita (ortorrómbico/mmm/Pnam) y Copiapite (triclínico/1/P1) → coherentes,
sin cambios.

## 📇 DEC-019 — la card dice qué ES el mineral (2026-11-09)

Se fueron el rótulo («Localidad tipo Chile»), el **acta de procedencia** (99 px: «Descrita en 1797
(IMA Master List…) · Nombrada en 1802 por…») y los contadores internos. Queda: **nombre · fórmula ·
Color · Dureza · Cristal**, todos desde la propia ficha.

## 🖼️ DEC-017/018 — logo del museo (2026-11-09)

Logo de IA con fondo quitado por **matting** (el primer intento dejó 50 % de borde blanco).
En barra (34 px), intro (128 px) y favicons. El SVG del hexágono queda detrás como respaldo.
Verificación de halo que sí sirve: componer sobre negro y comparar luminancia anillo vs interior
→ **2,4 puntos = limpio**.

## 🎨 DEC-016 — colores por especie (2026-11-08)

Fibroferrite pasó a **blanco amarillento `#f2e6c8`** (pedido del dueño). Elegido midiendo:
**8,41:1** contra el fondo, **7,94:1** tinta sobre acento.

**Defecto encontrado de paso:** `--acento-2` estaba **fijo en verde** y el render sólo escribía
`--acento`, así que Copiapite y Fibroferrite mostraban **rótulos verdes**. Ahora la gama completa
(`--acento-2`, `--acento-deep`, `--acento-tinta`) se **deriva del acento** en `js/museo.js`, y
`--acento-tinta` se calcula por **luminancia WCAG** para que el botón lleno sea legible con
cualquier acento.

| Especie | Acento |
|---|---|
| Atacamita | `#2fbf71` verde |
| Copiapite | `#e8b33c` dorado |
| Fibroferrite | `#f2e6c8` blanco amarillento |

---

## 🆕 FICHA 3 — FIBROFERRITE publicada (2026-11-08)

Primera ficha del libro redactada **sin que el dueño tuviera el material a mano**: todas las
fuentes se descargaron de internet y se leyeron. Es el patrón a repetir para las 141 restantes.

| Dato | Valor | Fuente |
|---|---|---|
| IMA | Fibroferrite · G · 1833 · Chile | IMA Master List **2026-11** (oficial CNMNC), **p. 73** |
| Fórmula | Fe³⁺(SO₄)(OH)(H₂O)₂·3H₂O | idem (Handbook escribe `·5H₂O`) |
| **Autor del nombre** | **Heinrich Rose (1795-1864), 1833** | **Chester (1896)**: «H. Rose, 1833, Pogg. Ann., xxvii, 309» |
| Cristalografía y físicas | hexagonal · P3 · R3 · a 24,176 Å · c 7,656 Å · Z 18 | Handbook, ficha Fibroferrite |
| Raya / fractura | blanca / irregular | Webmineral |
| Chile | Tierra Amarilla (Copiapó) · Quetena (Calama) · Chuquicamata | Handbook, Distribution |

**36 campos · 33 verificados · 3 pendientes** (tenacidad, material tipo, fluorescencia).
Los 3 están **comprobados por búsqueda literal** en Handbook y Webmineral: no los declara
ninguna fuente y no se deducen. **No son deuda, son la verdad del documento.**

### 🔴 El relato NO se escribió — es voz del dueño

Fibroferrite entra **sin relato**. `data/museo.js` lleva `"relato": null` y el render muestra
una sección **«Relato en preparación»** en vez de dejarla vacía o rellenarla con texto inventado.
Cuando el dueño dicte el relato, basta llenar el campo: **no hay que tocar HTML ni CSS**.

### Cómo se consiguieron las fuentes (reproducible)

```bash
# Handbook: PDF directo por especie (funciona con User-Agent de navegador)
curl -A "Mozilla/5.0 ... Chrome/120" https://www.handbookofmineralogy.org/pdfs/fibroferrite.pdf
# IMA Master List OFICIAL (el libro usó 2026-09; ya existe 2026-11)
curl -L "https://cnmnc.units.it/files/editor/IMA_Master_List_(2026-11).pdf"   # 244 págs
# Chester 1896: texto completo desde Internet Archive
curl -L "https://archive.org/download/cu31924004039008/cu31924004039008_djvu.txt"
# Webmineral
curl -A "Mozilla/5.0 ..." https://webmineral.com/data/Fibroferrite.shtml
```

⚠️ **Mindat da 403** y **rruff.info da 403**: no son viables como fuente automatizable.
⚠️ **La 7.ª edición de Dana (1951) está restringida (401)** en Archive.org: la referencia
estructural se tomó del Handbook y del Master List, no de Dana.

### Libro: ficha 3 insertada en el `.docx`

Precedida de respaldo `/tmp/BACKUP-libro-antes-fibroferrite-20261108-235851.docx`.
Resultado medido: **354 párrafos, 3 tablas de 37×5** (36/36 · 36/36 · **33/3**), las 6 zonas
del template, y **REFERENCIAS sigue siendo la última**. Índice: las 3 especies con ficha van en
negrita, con leyenda.

⚠️ La tabla de la ficha 3 se arma con `doc.add_table` y **luego se mueve** con
`addnext`/`addprevious`; `python-docx` no permite insertar tablas en posición arbitraria.

---

## ✅ DEC-013 — fuera el sello «verificado» (2026-11-08)

El dueño: *«ese icono de verificado estorba, si ya sale la fuente oficial»*. **Correcto:** el
sello iba pegado a su propia fuente y se repetía **48 veces por página** (12 básicos + 36 del
archivo), sin aportar nada cuando las dos especies están 36/36.

| | Estado |
|---|---|
| `.marca-estado--ok` (verificados) | **FUERA** |
| `.marca-estado--pend` (pendientes) | **SE MANTIENE** (contrato C3, afinado) |
| `data-estado` por fila + `MUSEO_RENDER.verificados` | **SE MANTIENE** (auditable) |

**`data/museo.js` no se tocó.** Probado con un pendiente sintético: la marca ámbar
(`rgb(226,149,75)` + texto «pendiente») sigue apareciendo cuando un campo no tiene respaldo.

⚠️ **Cuidado al medir:** un `grep -i verificado` encuentra también texto legítimo del libro
(*«Verificado» no es una fuente…*, *Los 36 campos tienen fuente declarada y estado verificado*).
Se cuenta por nodo (`.marca-estado--ok`), no por palabra.

---

## 🔴 Lo último (2026-11-08) — V1 + V2 + V4: salir del «fondo negro»

El dueño: *«primero mejoremos toda la interactividad y la estética visual. no nos quedemos
solo con fondo negro»* → y luego *«por ahora no tengamos imágenes»*. Se hizo **sin una sola
imagen**: el museo pasó de negro plano a sala en penumbra usando luz, grilla y navegación.

| # | Qué | Archivo | Medición |
|---|---|---|---|
| **V2** | La sala deja de ser **barras de 1180 px apiladas** y pasa a **grilla de vitrinas** `auto-fit minmax(320px)` | `css/main.css` `.sala` / `.pieza-card` | 1 col a ≤520 px · **2 col desde 768 px** · cards de 322 px a 1440 → 581 px |
| **V1** | **Foco de luz** que sigue al cursor sobre toda la sala | `js/foco.js` (nuevo) + `body::after` | `--foco-x/y` siguen al puntero, `opacity 1`; **0** con `prefers-reduced-motion` |
| **V4** | La barra lista **todas las piezas** desde `data/museo.js`, no sólo «La Atacamita» | `#navPiezas` + `js/museo.js` | `["Atacamita","Copiapite"]`, `aria-current` en la pieza activa |

**`data/museo.js` NO se tocó.** Cero cambios en datos, textos o relatos (72 campos intactos).

### Reglas que quedaron fijas

- **El hover NO usa `transform` ni `scale`** (regla del dueño). La vitrina se enciende con
  **luz y borde**: `--acento` sube en `::after` (opacidad 0→1) y el borde se mezcla con el acento.
- **El foco sólo se activa con puntero fino.** En táctil, un halo seguiría al último toque y
  parecería un defecto congelado. `js/foco.js` lo comprueba con `(pointer: fine)`.
- **La nav de piezas se genera desde los datos**, no escrita a mano: la 3.ª especie entra
  sin tocar HTML (misma filosofía que DEC-008 con las cards).

### 🔴 Dos defectos que se atraparon ANTES de publicar

1. **`git commit -am` NO agrega archivos nuevos.** El primer commit referenciaba
   `js/foco.js` desde las 3 páginas pero **no lo incluía**. Publicado, habría sido un **404**
   y el foco habría dejado de existir en silencio. Corregido en `392d0fc`; ahora se verifica
   `curl` del archivo en vivo (`js/foco.js -> 200`).
2. **El texto para lector de pantalla salía partido:** «Abrir el archivo → de Atacamita».
   El nombre va **dentro** del texto del enlace, no en un `span` aparte.

### Pitfalls de medición nuevos (headless miente)

- **Chromium headless reporta `(pointer: fine)` y `(hover: hover)` como `false`.** Sin
  `--blink-settings=primaryPointerType=4,availablePointerTypes=4,primaryHoverType=2,availableHoverTypes=2`
  el foco y el `:hover` **nunca se activan** y el medidor da FALLA sobre código correcto.
- **Medir la caja en el mismo frame del `scrollIntoView` da un punto que ya no existe.**
  Primero se desplaza, se espera (~600 ms), y **después** se lee `getBoundingClientRect`.
- **`auto-fit` deja pistas sobrantes:** con 2 cards a 1440 px hay 3 pistas. Contar
  `gridTemplateColumns.split(' ').length` da 3; el número real es `min(pistas, cards)`.
- **Los versos del relato son `p[data-rev="verso"]`**, no `.verso` ni `.relato__verso`.
  Un selector inventado devuelve **0** y parece página vacía.

---

## Lo que sigue pendiente en lo visual (aprobado, NO hecho)

| # | Qué | Estado |
|---|---|---|
| **V3** | **Cristal propio por especie**: hoy Atacamita y Copiapite dibujan **el MISMO SVG**. Cada uno necesita su hábito real (atacamita prismático; copiapite tabular escamoso) | pendiente |
| **V5** | **Paralaje del cristal** con el ratón en la página de la pieza (sin librerías ni 3D) | pendiente |

⚠️ La tentación es usar fotos. **El dueño dijo que no por ahora.** Todo se construye con SVG,
CSS y canvas.


---

## Lo último que pasó (2026-11-02)

| # | Qué | Resultado |
|---|---|---|
| 1 | Se verificaron los 36 campos de la ficha contra fuente primaria | **58/58 comprobaciones literales OK** |
| 2 | Se buscó la fuente del año/autor del nombre | **Encontrada** (no era Mindat) |
| 3 | Museo actualizado y republicado | commit `5d36907` |
| 4 | **El dueño corrigió el relato**: el verso 9 NO es pregunta | commit `c67b686` |
| 5 | **Ficha al 36/36**: fluorescencia, solubilidad y autoría doble | commit `932f9d9` |
| 6 | **Contadores fuera** (opción A): el estado se lee en cada dato | commit `932f9d9` |

### 🔴 Los dos datos que se cerraron

Se creía que sólo Mindat los tenía (fuente secundaria, además con 403). **Estaban en
literatura mineralógica del siglo XIX digitalizada en Internet Archive.** La búsqueda que
funcionó fue `"Gallitzin" + "atacamite"` en texto completo, no `atacamite` a secas.

| Dato | Valor | Fuente primaria |
|---|---|---|
| Año del nombre | **1802** | Gallitzin, *Recueil de noms appropriés en minéralogie* (1802); confirmado en Chester (1896), *A Dictionary of the Names of Minerals*, p. 24 |
| Autor del nombre | **Dmitri Alekséievich Golitsyn (1734-1803)** | Chester (1896), p. 24 — índice de autores: `GALLITZIN, D. M → Atacamite` |

**Discrepancia declarada, no resuelta en silencio:** Chester escribe **1801**, el registro
bibliográfico de la obra y un tratado alemán de nomenclatura dan **1802**. Probablemente la
1.ª edición es de 1801 y la 2.ª corregida de 1802. El documento lo dice así.

**Grafías del autor** (todas la misma persona): Gallitzin · Gallizin · Golitsyn · «Galittzen».

---

## Estado numérico actual (medido, no de memoria)

```
especies         3  → Atacamita + Copiapite + Fibroferrite
campos           36 por especie  ·  12 básicos  ·  24 en el archivo
verificados      36/36 · 36/36 · 33/36
pendientes        0 · 0 · 3  (fibroferrite: tenacidad, material tipo, fluorescencia)

paginas: index.html (sala, 3 cards) · atacamita.html · copiapite.html · fibroferrite.html
```

## 🔴 DEC-009 — orden fijo: el índice del libro

Las fichas se hacen **en el orden del índice** (por año de descubrimiento), no eligiendo la
más vistosa. Después de Atacamita (#1) va **Copiapite (#2, 1833)**. El dueño lo pidió así:
*«seguir siempre el orden del libro»*.

## 🔴 DEC-011 — el bug de `especies[0]`

`js/museo.js` tenía `var pieza = DATA.especies[0];` **fijo**. Con una especie andaba; con dos,
`copiapite.html` habría mostrado la Atacamita. Ahora se resuelve por el **slug del archivo**.
Verificación que lo detecta: en `copiapite.html` el relato tiene **2 versos** (no 14) y el
acento es `#e8b33c` (no `#2fbf71`).

## 🔴 DEC-008 — la portada es la sala de cards

El dueño: *«en vez de dos partes separadas explicando lo mismo, el museo lleva a la pagina
atacamita a traves de unas cards, asi con todos»*. Opción **A**.

La portada duplicaba la ficha (1.705 px) y el relato (1.137 px) que ya estaban en la pieza,
y tenía **cuatro** enlaces al mismo destino. Ahora:

| | Antes | Ahora |
|---|---|---|
| `index.html` | 4.840 px | **2.024 px** (hero + card + aviso) |
| `atacamita.html` | 36 campos | **12 + 14 versos + 36 campos** |

**Regla:** la card es el único camino a la pieza. Con 144 especies la portada crece en cards,
nunca en fichas. Agregar una especie **no toca HTML**.

⚠️ Al mover secciones se rompieron **6 enlaces muertos** (`#vitrina`, `#relato`) en nav, hero,
saltar, cabecera y pie. Ya corregidos; verificar con
`grep -n "#vitrina\|#relato" index.html atacamita.html`.

## 🔴 DEC-005 — el autor del nombre tiene DOS autorías (no elegir bando)

La investigación encontró **fuentes primarias que se contradicen**:

| Fuente | Dice |
|---|---|
| **Blumenbach, Handbuch der Naturgeschichte (1802), p. 653** | Él lo nombró: «Ich habe diesem… Kupfer-Erz… hier diesen [Nahmen]… gelegt». Reporta que Dombey la trajo en 1788 |
| **Collins (1871)**, Handbook to the Mineralogy of Cornwall and Devon | «named by Blumenbach… in 1805» |
| **Chester (1896), p. 24** | «D. de Galittzen, 1801, Gall. Rec.» |

El dueño resolvió declarar **las dos**: nombre acuñado por Blumenbach (1802) y recogido
por Golitsyn en su *Recueil* (1802). **No se elige bando.** Si una sesión futura encuentra el
dato «limpio» en un solo autor, es porque se perdió esta nota.

## 🔴 DEC-006 — dos datos se cerraron fuera del Handbook

El Handbook of Mineralogy **no trata** fluorescencia ni solubilidad (verificado: las palabras
`fluorescen` y `solubil` no aparecen en el PDF). Se buscaron en otras fuentes:

- **Fluorescencia** → Webmineral: **«Non-fluorescent»**.
- **Solubilidad** → Collins (1871): **soluble en amoníaco fuerte**, escasa o nula efervescencia
  con HCl (es el criterio que la separa de la malaquita).

## 🔴 DEC-007 — contadores fuera, marca por fila conservada

El dueño: *«todavia dice datos pendientes y datos verificados, eso esta de mas»*. Opción **A**:

- **FUERA:** cifras de portada (`heroCifras`), contador de la tarjeta de sala, chips
  Verificados/Pendientes del archivo.
- **DENTRO (contrato C3):** la marca `.marca-estado` de **cada uno de los 36 datos**.

Un contador repetido era ruido; esconder el estado de un dato sería mentir. Son cosas distintas.

⚠️ **Pitfall:** el bloque de filtros accedía a `chips[1]` y `chips[2]` por índice. Al dejar un
solo chip reventaba. Ahora se escribe por `data-f`, no por posición.

## 🔴 DEC-004 — el verso 9 no es pregunta

El agente había convertido una frase **afirmativa** del dueño en interrogativa
(`cual` → `¿Cuál …?`), con tilde y mayúscula. Eso es **cambio de sentido**, no puntuación.
El dueño eligió su texto literal:

```
cual desierto chileno le da la píldora mágica de sales en su «cuerpo».
```

Sincronizado en `.docx` + `data/museo.js` + Pages. Verificado en la URL en vivo: 14 versos,
0 apariciones de `¿` en toda la página.

**Regla permanente:** no se agrega `¿ ?` ni tildes diacríticas que cambien una afirmación en
pregunta. Se avisa como cambio de sentido y se pide confirmación.

---

**Los 2 pendientes NO son deuda:** el Handbook of Mineralogy no las declara y no se deducen
de la fórmula. Verificado por búsqueda literal: las palabras `fluorescen` y `solubil` no
aparecen en el PDF de la ficha.

---

## URLs y repositorio

```
Portada:  https://matiasbenavides-bot.github.io/museo-minerales-chile/
Archivo:  https://matiasbenavides-bot.github.io/museo-minerales-chile/atacamita.html
Repo:     matiasbenavides-bot/museo-minerales-chile  (rama main, Pages desde /)
Local:    /mnt/c/dev/museo-minerales-chile
```

---

## Cómo verificar que todo sigue bien

```bash
cd /mnt/c/dev/museo-minerales-chile

# 1. sintaxis
node --check data/museo.js && node --check js/museo.js

# 2. 🔴 que los datos REALMENTE carguen (node --check NO atrapa la perdida de `= MUSEO;`)
node -e "global.window={};eval(require('fs').readFileSync('data/museo.js','utf8'));
console.log('especies:',window.MUSEO.especies.length,
            'campos:',window.MUSEO.especies[0].ficha.length,
            'verificados:',window.MUSEO.especies[0].ficha.filter(f=>f.estado==='verificado').length)"
# esperado: especies: 3 · campos: 36 · verificados: 36 (atacamita)

# 3. en vivo
curl -s -o /dev/null -w "%{http_code}\n" https://matiasbenavides-bot.github.io/museo-minerales-chile/
```

---

## Pitfalls confirmados en esta sesión

- **`#tablaFicha` NO contiene `<tr>`: son `div.fila`.** Un medidor que busca `tr` reporta
  **0 filas** y parece que la página está vacía. Es el mismo falso positivo de siempre:
  **un cero se investiga antes de reportarlo.**
- **El puerto 8899 lo tenía tomado otra sesión** sirviendo el museo paleontológico. Se midió
  la página equivocada. Usar un puerto propio (8917) y comprobar el `<title>` antes de medir.
- **`MUSEO_RENDER`** expone `{vista, especies, campos, basicos, verificados, pendientes,
  versos, bloques, fuentes}`. Es la verificación más rápida de que el render ocurrió.
- **Contrato C4 verificado**: 14/14 versos del relato idénticos al `.docx`.

---

## Para seguir: el paso siguiente real

**Agregar la 2ª especie.** Sigue dependiendo del libro (**1 ficha de 144**).

```
1. Escribir y aprobar la ficha en el libro (skill libro-minerales-chile)
2. Extraerla:  scripts/extraer-especie-docx.py <libro.docx>
3. Revisar los conteos que imprime el script (si no cuadran, NO integrar)
4. Marcar basico:true en los 12 campos de portada
5. Agregar el objeto a MUSEO.especies en data/museo.js
6. Verificar con node -e que window.MUSEO.especies existe
7. Medir las dos vistas a 6 anchos y publicar
```

⚠️ **Nunca escribir texto nuevo para llenar una sala.**

---

## Pendientes declarados (no son deuda, son realidad)

| Pendiente | Por qué no está |
|---|---|
| Las otras 143 especies | El libro tiene 1 ficha escrita de 144 |
| Fotos de piezas | Decisión: el museo hoy no exhibe imágenes |
| Dominio propio | El dueño rechaza costo mensual |

## Riesgos abiertos

- **R1** — `matiasbenavides-bot/geonativo` quedó libre en GitHub.
- **R2** — `atacamita.html` mide ~10.000 px. Si molesta, paginar por bloques.
- **R3** — La intro dura 2,5 s; el dueño no confirmó si le parece bien.
