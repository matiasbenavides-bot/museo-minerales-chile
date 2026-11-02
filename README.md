# Museo de Minerales Descubiertos en Chile

Museo virtual de las especies minerales descritas por primera vez en Chile.
Sitio estático: sin backend, sin base de datos, sin build, sin costo mensual.
Se abre con doble clic o se sirve desde cualquier hosting de archivos.

## Principio

**Solo se exhibe lo que tiene texto terminado y cada dato con su fuente.**
Una especie entra al museo cuando su ficha del libro está aprobada. No hay
salas vacías ni fichas a medio escribir.

## Estructura

```
index.html            shell del museo (nav, sala, vitrina, relato, fuentes)
data/museo.js         FUENTE ÚNICA de datos — ningún texto de especie en el HTML
js/museo.js           renderizador: construye el DOM desde data/museo.js
js/futuro.js          Vitrina viva (canvas) — degradable, respeta reduced-motion
css/main.css          sistema visual: negro + acento por especie
assets/img/           favicons
```

## Cómo agregar una especie

Se agrega **un objeto** al array `MUSEO.especies` en `data/museo.js`.
No se toca el HTML ni el CSS.

Cada especie requiere:

| Campo | Contenido |
|---|---|
| `id`, `nombre`, `nombre_ima`, `formula` | identificación |
| `linea` | p. ej. «Localidad tipo Chile» |
| `acento` | color hex que pinta la sala y la animación |
| `encabezado` | `estatus`, `descripcion`, `localidad` |
| `ficha` | array de campos — **cada uno con `fuente` y `estado` obligatorios** |
| `relato` | `titulo` + `versos` (texto del dueño, **literal**) |
| `directa` | `intro`, `bloques[{texto,respaldo}]`, `cita{en,es}`, `fuentes[]` |
| `transparencia` | array de párrafos |
| `pendientes` | derivado: campos con `estado: "pendiente"` |

## Contratos que el código hace cumplir

- **C2** — si una fila de la ficha no trae `fuente` o `estado`, el render la
  marca en pantalla y avisa por consola. **No se inventa un dato.**
- **C3** — todo campo en `pendiente` se muestra marcado en ámbar, con filtro propio.
  Un museo que esconde lo pendiente miente.
- **C4** — el relato se pinta verso por verso, sin corrección ni reordenamiento.
- **C5** — si el canvas falla o el usuario pide menos movimiento
  (`prefers-reduced-motion`), el museo se lee igual.

## Paleta

| Token | Hex | Uso |
|---|---|---|
| `--negro` | `#07080a` | fondo |
| `--acento` | por especie | la atacamita usa `#2fbf71` |
| `--alerta` | `#e2954b` | datos pendientes |

## Verificación

Medido con Chromium real a 360, 380, 414, 520, 600, 768, 900, 1024, 1280 y 1440 px:

- 0 desborde horizontal en los 10 anchos
- 0 valores de ficha colapsados
- 0 errores de consola, 0 recursos fallidos
- 36 campos de ficha, 4 pendientes declarados, 14 versos, 7 bloques, 3 fuentes

## Lo que NO está

- Fotos de piezas: este museo no exhibe imágenes todavía.
- Las otras 143 especies: se publican cuando su texto esté aprobado.
