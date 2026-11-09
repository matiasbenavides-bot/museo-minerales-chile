# RELEVO — Museo de Minerales Descubiertos en Chile

**Última actualización:** 2026-11-08 · **2 especies publicadas** (Atacamita + Copiapite)
**Estado:** PUBLICADO y estable. **Capa visual V1/V2/V4 en producción.**

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
especies         2  → Atacamita + Copiapite
campos           36 por especie  ·  12 básicos  ·  24 en el archivo
verificados      36/36 en las dos
pendientes        0

paginas: index.html (sala, 2 cards) · atacamita.html · copiapite.html
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
# esperado: especies: 1 campos: 36 verificados: 36

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
