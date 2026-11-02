# RELEVO — Museo de Minerales Descubiertos en Chile

**Fecha de cierre:** 2026-11-01
**Estado:** PUBLICADO y estable. Nada a medias.

---

## Lo que pasó en esta sesión (en orden)

| # | Qué | Resultado |
|---|---|---|
| 1 | El dueño ordenó **«ELIMINAR TODO»** GeoNativo | Ejecutado y verificado: URL 404, repo GitHub borrado, local borrado. Sobrevive solo `geonativo-entregables/` (MD5 intacto) |
| 2 | Giro de rumbo: **museo virtual**, no comercial | Museo creado, publicado |
| 3 | Corrección: **sobrecarga de información** | Partido en portada (12 campos) + archivo (36) |
| 4 | Pedido: **intro negra + revelado progresivo** | Implementado con 2 bugs detectados y corregidos |

---

## URLs y repositorio

```
Portada:  https://matiasbenavides-bot.github.io/museo-minerales-chile/
Archivo:  https://matiasbenavides-bot.github.io/museo-minerales-chile/atacamita.html
Repo:     matiasbenavides-bot/museo-minerales-chile  (rama main, Pages desde /)
Local:    /mnt/c/dev/museo-minerales-chile
Último commit: 0bf0f25
```

---

## Dónde está cada cosa (skills)

Las tres skills minerales vivieron separadas; ahora quedan ordenadas:

```
~/.hermes/skills/projects/
├── libro-minerales-chile/      ← el libro (donde nace el texto)
└── museo-minerales-chile/      ← el museo (publica lo aprobado)  [MOVIDA AQUÍ HOY]

~/.hermes/skills/software-development/
└── geonativo/                  ← ELIMINADO, solo memoria histórica
```

**Cargar:**
- «el libro», fichas, fuentes, Word → `libro-minerales-chile`
- «el museo», vitrina, publicar en web → `museo-minerales-chile`
- «GeoNativo», precios, vender → `geonativo` **solo como archivo, no reconstruir**

---

## Arquitectura del museo (resumen operativo)

```
index.html        portada: hero + vitrina (12 campos) + relato + sala
atacamita.html    archivo: 36 campos + filtro + versión directa + fuentes + transparencia
data/museo.js     FUENTE ÚNICA. Cada campo lleva basico:true|false
js/museo.js       renderizador de las dos vistas (detecta body[data-vista])
js/futuro.js      Vitrina viva (canvas) — solo portada
js/revelar.js     intro + revelado progresivo
css/main.css      negro + --acento por especie
```

**Contratos duros:** C1 ningún texto en el HTML · C2 cada campo con fuente+estado · C3 lo
pendiente se marca, no se esconde · C4 el relato va literal · C5 reduced-motion apaga todo ·
C6 lo no básico se archiva, nunca se borra.

---

## Para seguir: el paso siguiente real

**Agregar la 2ª especie.** Pero eso **no depende del museo**: depende del libro, que tiene
**1 ficha de 144**. La secuencia es:

```
1. Escribir y aprobar la ficha en el libro (skill libro-minerales-chile)
2. Extraerla:  museo-minerales-chile/scripts/extraer-especie-docx.py <libro.docx>
3. Revisar los conteos que imprime el script (si no cuadran, NO integrar)
4. Marcar basico:true en los 12 campos de portada
5. Agregar el objeto a MUSEO.especies en data/museo.js
6. Verificar con `node -e` que window.MUSEO.especies existe  ← NO basta node --check
7. Medir las dos vistas a 6 anchos y publicar
```

⚠️ **Nunca escribir texto nuevo para llenar una sala.** Si la ficha no está aprobada, esa
sala no existe. Es la misma regla del libro: el agente no escribe el relato.

---

## Pendientes declarados (no son deuda, son realidad)

| Pendiente | Por qué no está |
|---|---|
| Las otras 143 especies | El libro tiene 1 ficha escrita de 144 |
| Fotos de piezas | Decisión: el museo hoy no exhibe imágenes |
| Dominio propio | El dueño rechaza costo mensual |

---

## Riesgos abiertos

- **R1** — El nombre `matiasbenavides-bot/geonativo` quedó **libre** en GitHub. Cualquiera puede tomarlo. Si se quiere de vuelta, hay que reclamarlo.
- **R2** — El archivo `atacamita.html` mide ~10.000 px. Si al dueño le parece largo, se puede paginar por bloques (físicas / ópticas / referencias).
- **R3** — La intro dura 2,5 s. El dueño no confirmó si le parece bien; quedó revisando.

---

## Cómo verificar que todo sigue bien (comando único)

```bash
# sintaxis
cd /mnt/c/dev/museo-minerales-chile
node --check data/museo.js && node --check js/museo.js \
  && node --check js/futuro.js && node --check js/revelar.js

# que los datos realmente cargan (esto atrapa el bug del window.MUSEO)
node -e "global.window={};eval(require('fs').readFileSync('data/museo.js','utf8'));
console.log('especies:',window.MUSEO.especies.length,
            'campos:',window.MUSEO.especies[0].ficha.length,
            'basicos:',window.MUSEO.especies[0].ficha.filter(f=>f.basico).length)"
# esperado: especies: 1 campos: 36 basicos: 12

# en vivo
curl -s -o /dev/null -w "%{http_code}\n" https://matiasbenavides-bot.github.io/museo-minerales-chile/
```

---

## Herramientas que funcionaron en este proyecto

- **Chromium para medir:** `~/.cache/ms-playwright/chromium-1248/chrome-linux64/chrome` con `puppeteer-core` (instalado en `/tmp/node_modules`). **Chrome/Edge de Windows NO funciona desde WSL** (ECONNREFUSED).
- **Leer el .docx del libro:** `/tmp/docxv/bin/python` (venv con `uv`, `python-docx` + `pillow`).
- **Generar favicons:** PIL, hexágono facetado en `#2fbf71`.

⚠️ Esas dos rutas viven en `/tmp`: **si WSL se reinició, hay que recrearlas**.
