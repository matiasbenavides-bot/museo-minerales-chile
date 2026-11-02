# RELEVO — Museo de Minerales Descubiertos en Chile

**Última actualización:** 2026-11-02
**Estado:** PUBLICADO y estable. **Ficha 1 cerrada en el libro y sincronizada en la web.**

---

## Lo último que pasó (2026-11-02)

| # | Qué | Resultado |
|---|---|---|
| 1 | Se verificaron los 36 campos de la ficha contra fuente primaria | **58/58 comprobaciones literales OK** |
| 2 | Se buscó la fuente del año/autor del nombre | **Encontrada** (no era Mindat) |
| 3 | Museo actualizado y republicado | commit `5d36907` |

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
especie          1 (Atacamita)
campos           36   ·  12 básicos (portada)  ·  24 en el archivo
verificados      34
pendientes        2   → Fluorescencia y Solubilidad
```

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
# esperado: especies: 1 campos: 36 verificados: 34

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
