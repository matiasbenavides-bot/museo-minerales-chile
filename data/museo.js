/* ============================================================================
   MUSEO DE MINERALES DESCUBIERTOS EN CHILE
   FUENTE ÚNICA DE DATOS — ningún texto de especie vive en el HTML.

   CONTRATO C2 (master 3 del libro): cada fila de la ficha lleva
   `fuente` y `estado` OBLIGATORIOS. El render falla visible si faltan.
   CONTRATO C4: el `relato` es del dueño y se copia LITERAL. No se edita.

   Para agregar una especie: se agrega un objeto a `especies`.
   No se toca el HTML ni el CSS.
============================================================================ */

const MUSEO = {
  "museo": {
    "nombre": "Museo de Minerales Descubiertos en Chile",
    "serie": "Patrimonio Mineral de Chile",
    "tagline": "Minerales descubiertos en Chile"
  },
  "especies": [
    {
      "id": "atacamita",
      "nombre": "ATACAMITA",
      "nombre_ima": "Atacamite",
      "formula": "Cu2Cl(OH)3",
      "linea": "Localidad tipo Chile",
      "acento": "#2fbf71",
      "encabezado": {
        "estatus": "Grandfathered — anterior a la CNMNC, vigente",
        "descripcion": "Descrita en 1797 (IMA Master List 2026-09)  ·  Nombrada en 1802 por Dmitri de Gallitzin (Mindat, sin confirmar)  ·  Grandfathered",
        "localidad": "Desierto de Atacama, Chile — localidad exacta no definida por la fuente"
      },
      "ficha": [
        {
          "campo": "Nombre IMA",
          "valor": "Atacamite",
          "fuente": "IMA Master List 2026-09, p. 17, col. Name",
          "estado": "verificado",
          "nota": "Nombre vigente de la especie."
        },
        {
          "campo": "Nombre en español",
          "valor": "Atacamita",
          "fuente": "Uso corriente en castellano",
          "estado": "verificado",
          "nota": "Misma especie que Atacamite (IMA). No es un nombre comercial ni varietal."
        },
        {
          "campo": "Fórmula química",
          "valor": "Cu2Cl(OH)3",
          "fuente": "IMA Master List 2026-09, p. 17, col. Fórmula",
          "estado": "verificado",
          "nota": "Fórmula ideal aprobada por la CNMNC."
        },
        {
          "campo": "Estatus IMA",
          "valor": "Grandfathered (G) — vigente",
          "fuente": "IMA Master List 2026-09, p. 17, col. Status",
          "estado": "verificado",
          "nota": "Descrita antes de la constitución de la CNMNC; valida por consenso historico."
        },
        {
          "campo": "Año de descripción original",
          "valor": "1797",
          "fuente": "IMA Master List 2026-09, p. 17, col. IMA No./Year",
          "estado": "verificado",
          "nota": "Referencia de la descripción original en la misma fila: Handbuch der Naturgeschichte, Dieterich, Goettingen (1797), 655."
        },
        {
          "campo": "Año del nombre",
          "valor": "1802",
          "fuente": "Mindat, campo Name (secundaria)",
          "estado": "pendiente",
          "nota": "Falta confirmar en fuente primaria. Mindat no es dogmatica."
        },
        {
          "campo": "Autor del nombre",
          "valor": "Dmitri de Gallitzin",
          "fuente": "Mindat, campo Name (secundaria)",
          "estado": "pendiente",
          "nota": "Grafía citada literal de la fuente. La equivalencia con Golitsyn / Galitzin esta por verificar."
        },
        {
          "campo": "Localidad tipo (amplia)",
          "valor": "Desierto de Atacama, Chile",
          "fuente": "Handbook of Mineralogy (MSA), ficha Atacamite, Distribution",
          "estado": "verificado",
          "nota": "El IMA asigna Country = Chile a esta especie."
        },
        {
          "campo": "Localidad tipo (exacta)",
          "valor": "No definida por la fuente",
          "fuente": "Handbook of Mineralogy (MSA), ficha Atacamite, Distribution; Handbook of Mineralogy (MSA), ficha Atacamite, Name",
          "estado": "verificado",
          "nota": "La fuente declara literalmente «originally from an undefined locality in the Atacama Desert». No es un hueco del libro: la fuente dice que no se definio."
        },
        {
          "campo": "Sistema cristalino",
          "valor": "Ortorrómbico",
          "fuente": "Handbook of Mineralogy (MSA), ficha Atacamite, Crystal Data",
          "estado": "verificado",
          "nota": "Clase bipiramidal rómbica."
        },
        {
          "campo": "Grupo puntual",
          "valor": "2/m2/m2/m (mmm)",
          "fuente": "Handbook of Mineralogy (MSA), ficha Atacamite, Point Group",
          "estado": "verificado",
          "nota": "Notacion completa y su abreviatura."
        },
        {
          "campo": "Grupo espacial",
          "valor": "Pnam",
          "fuente": "Handbook of Mineralogy (MSA), ficha Atacamite, Cell Data, Space Group",
          "estado": "verificado",
          "nota": "—"
        },
        {
          "campo": "Parámetros de celda",
          "valor": "a 6,030(2) · b 9,120(2) · c 6,865(2) A · Z = 4",
          "fuente": "Handbook of Mineralogy (MSA), ficha Atacamite, Cell Data",
          "estado": "verificado",
          "nota": "Incertidumbre entre parentesis tal como la declara la fuente."
        },
        {
          "campo": "Hábito",
          "valor": "Cristales delgados hasta 10 cm, prismáticos [001], estriados paralelos a [001]; tabulares perpendiculares a {010} o pseudo-octaedricos con {110} y {011}. Fibroso, granular, compacto, masivo.",
          "fuente": "Handbook of Mineralogy (MSA), ficha Atacamite, Crystal Data",
          "estado": "verificado",
          "nota": "Descripción completa de la fuente, no resumida a una palabra."
        },
        {
          "campo": "Maclado",
          "valor": "Plano {110}, plano de composicion {110}, raro; alrededor de [544] más común. Contacto y penetracion.",
          "fuente": "Handbook of Mineralogy (MSA), ficha Atacamite, Crystal Data, Twinning",
          "estado": "verificado",
          "nota": "Produce dobletes, tripletes y grupos complejos."
        },
        {
          "campo": "Dureza (Mohs)",
          "valor": "3 – 3,5",
          "fuente": "Handbook of Mineralogy (MSA), ficha Atacamite, Physical Properties",
          "estado": "verificado",
          "nota": "Se raya con la una y con moneda de cobre; no raya el vidrio."
        },
        {
          "campo": "Densidad",
          "valor": "3,745 – 3,776 g/cm3 (medida) · 3,756 (calculada)",
          "fuente": "Handbook of Mineralogy (MSA), ficha Atacamite, Physical Properties",
          "estado": "verificado",
          "nota": "Rango medido y valor calculado, declarados por separado."
        },
        {
          "campo": "Exfoliación",
          "valor": "{010} perfecta; {101} regular",
          "fuente": "Handbook of Mineralogy (MSA), ficha Atacamite, Physical Properties",
          "estado": "verificado",
          "nota": "Índices de Miller tal como los da la fuente."
        },
        {
          "campo": "Fractura",
          "valor": "Concoidea",
          "fuente": "Handbook of Mineralogy (MSA), ficha Atacamite, Physical Properties",
          "estado": "verificado",
          "nota": "Superficie de rotura curva, sin planos."
        },
        {
          "campo": "Tenacidad",
          "valor": "Frágil",
          "fuente": "Handbook of Mineralogy (MSA), ficha Atacamite, Physical Properties",
          "estado": "verificado",
          "nota": "Se rompe antes de deformarse."
        },
        {
          "campo": "Color",
          "valor": "Verde brillante; verde esmeralda oscuro a verde negruzco",
          "fuente": "Handbook of Mineralogy (MSA), ficha Atacamite, Optical Properties",
          "estado": "verificado",
          "nota": "Tonalidades de verde en luz transmitida."
        },
        {
          "campo": "Raya",
          "valor": "Verde manzana",
          "fuente": "Handbook of Mineralogy (MSA), ficha Atacamite, Optical Properties",
          "estado": "verificado",
          "nota": "Color del polvo sobre placa sin esmaltar."
        },
        {
          "campo": "Brillo",
          "valor": "Adamantino a vitreo",
          "fuente": "Handbook of Mineralogy (MSA), ficha Atacamite, Optical Properties",
          "estado": "verificado",
          "nota": "—"
        },
        {
          "campo": "Transparencia",
          "valor": "Transparente a translúcido",
          "fuente": "Handbook of Mineralogy (MSA), ficha Atacamite, Optical Properties",
          "estado": "verificado",
          "nota": "—"
        },
        {
          "campo": "Clase óptica",
          "valor": "Biaxica negativa (–)",
          "fuente": "Handbook of Mineralogy (MSA), ficha Atacamite, Optical Properties",
          "estado": "verificado",
          "nota": "—"
        },
        {
          "campo": "Índices de refracción",
          "valor": "alpha 1,831 · beta 1,861 · gamma 1,880",
          "fuente": "Handbook of Mineralogy (MSA), ficha Atacamite, Optical Properties",
          "estado": "verificado",
          "nota": "2V medida no determinada por la fuente; 2V calculada = 74 grados 56 minutos."
        },
        {
          "campo": "Pleocroísmo",
          "valor": "X verde pálido · Y verde amarillo · Z verde hierba",
          "fuente": "Handbook of Mineralogy (MSA), ficha Atacamite, Optical Properties",
          "estado": "verificado",
          "nota": "Orientacion X = b; Y = a; Z = c. Dispersión r < v, fuerte."
        },
        {
          "campo": "Contexto geológico",
          "valor": "Producto de oxidacion de otros minerales de cobre, especialmente en condiciones aridas y salinas; en depositos fumarolicos; producto de meteorizacion de sulfuros en depositos submarinos de fumadores negros; alteracion de objetos de bronce y cobre de la antiguedad.",
          "fuente": "Handbook of Mineralogy (MSA), ficha Atacamite, Occurrence",
          "estado": "verificado",
          "nota": "Texto completo de la fuente."
        },
        {
          "campo": "Asociaciones",
          "valor": "Cuprita, brochantita, linarita, caledonita, malaquita, crisocola, paratacamita, botallackita.",
          "fuente": "Handbook of Mineralogy (MSA), ficha Atacamite, Association",
          "estado": "verificado",
          "nota": "—"
        },
        {
          "campo": "Polimorfos",
          "valor": "Botallackita, clinoatacamita, paratacamita",
          "fuente": "Handbook of Mineralogy (MSA), ficha Atacamite, Polymorphism & Series",
          "estado": "verificado",
          "nota": "Polimorfa con las tres."
        },
        {
          "campo": "Localidades chilenas",
          "valor": "Copiapo, Carrizal, Tierra Amarilla y Remolinos (Atacama); Collahurasi (Tarapaca); mineral de mena en Chuquicamata (Antofagasta).",
          "fuente": "Handbook of Mineralogy (MSA), ficha Atacamite, Distribution",
          "estado": "verificado",
          "nota": "Grafía de los topónimos tal como la da la fuente."
        },
        {
          "campo": "Material tipo",
          "valor": "Harvard University, Cambridge, Massachusetts, USA, 110816",
          "fuente": "Handbook of Mineralogy (MSA), ficha Atacamite, Type Material",
          "estado": "verificado",
          "nota": "Numero de catálogo del ejemplar tipo."
        },
        {
          "campo": "Referencia de la descripción original",
          "valor": "Handbuch der Naturgeschichte. Dieterich, Goettingen (1797), 655",
          "fuente": "IMA Master List 2026-09, p. 17, col. Reference",
          "estado": "verificado",
          "nota": "Cita que el IMA asocia a la especie."
        },
        {
          "campo": "Referencia estructural",
          "valor": "Acta Crystallographica C42 (1986), 1277",
          "fuente": "IMA Master List 2026-09, p. 17, col. Reference; Handbook of Mineralogy (MSA), ficha Atacamite, References",
          "estado": "verificado",
          "nota": "Parise & Hyde (1986), estructura de la atacamita y su relacion con la espinela."
        },
        {
          "campo": "Fluorescencia",
          "valor": "No documentada",
          "fuente": "Handbook of Mineralogy (MSA), ficha Atacamite (no la declara)",
          "estado": "pendiente",
          "nota": "La fuente no la trae; no se deduce de la química."
        },
        {
          "campo": "Solubilidad",
          "valor": "No documentada",
          "fuente": "Handbook of Mineralogy (MSA), ficha Atacamite (no la declara)",
          "estado": "pendiente",
          "nota": "La fuente no la trae; no se deduce de la química."
        }
      ],
      "relato": {
        "titulo": "HERIDA EN EL DESIERTO",
        "versos": [
          "Todo empieza en las entrañas del mundo,",
          "con el ancestro oculto antes de la llegada de este mineral,",
          "protegidos en la profundidad…",
          "hasta que un gran movimiento arremetió contra la seguridad de las entrañas del mundo:",
          "los llevan a la luz,",
          "siendo atacados por primera vez con el oxígeno",
          "y limitados rastros de agua que deja el árido desierto.",
          "El desierto…",
          "¿Cuál desierto chileno le da la píldora mágica de sales en su «cuerpo»?",
          "En este momento, la exposición de este árido desierto seca cada rastro de agua de este ser,",
          "causando una gran cristalización de este.",
          "Sobreviviendo, uniéndose fuertemente entre las grietas,",
          "para formar las finas lágrimas verdes de cristal",
          "dentro de un extenso desierto…"
        ]
      },
      "directa": {
        "intro": "El mismo proceso, sin metáfora. Redacción propia a partir de las fuentes citadas al final de esta sección.",
        "bloques": [
          {
            "texto": "Un yacimiento de cobre del norte de Chile tiene, por debajo del suelo, una zona donde el agua y el aire entran y alteran la roca: la zona de oxidación. Ahí está la fábrica de la atacamita.",
            "respaldo": "Dato respaldado en: Handbook of Mineralogy, Occurrence"
          },
          {
            "texto": "El material de partida es un sulfuro de cobre. Al oxidarse, ese sulfuro suelta cobre a una solución que se mueve por las fracturas de la roca.",
            "respaldo": "Dato respaldado en: Handbook of Mineralogy, Occurrence"
          },
          {
            "texto": "El cobre solo no basta. Para que cristalice como atacamita necesita cloro disuelto, y en un desierto el cloro no llueve: llega con salmueras que suben desde niveles profundos. Eso es lo que se midió en Mantos Blancos y en Spence, comparando la salinidad del agua atrapada dentro de los propios cristales con la del agua subterránea salina de cada depósito.",
            "respaldo": "Dato respaldado en: Reich et al. 2008, inclusiones fluidas y aguas subterráneas"
          },
          {
            "texto": "Que ese cloro venga del mar es una idea razonable y equivocada. El estudio lo descartó midiendo cloro-36: los valores de la atacamita no cambian con la distancia al océano. El cloro es de agua profunda y vieja.",
            "respaldo": "Dato respaldado en: Reich et al. 2008, datos de cloro-36"
          },
          {
            "texto": "El disparador de la precipitación es la saturación en yeso. Cuando la salmuera llega a ese punto, el cloruro de cobre cristaliza, y lo hace pegado al yeso: la asociación entre ambos minerales se ve incluso al microscopio electrónico de transmisión.",
            "respaldo": "Dato respaldado en: Reich et al. 2008, microscopía TEM"
          },
          {
            "texto": "Sobre la edad hay dos relojes distintos y conviene no confundirlos: el cloro de esas salmueras es anterior a 1,5 millones de años, pero la atacamita es más joven y no dejó de formarse. No es un fósil del desierto antiguo: es un proceso que sigue ocurriendo por episodios.",
            "respaldo": "Dato respaldado en: Reich et al. 2008, datos de cloro-36"
          },
          {
            "texto": "El desierto, aquí, no es paisaje: es la condición que permite que el mineral siga existiendo. Donde entra agua de lluvia suficiente, la atacamita se disuelve o se transforma en otra cosa.",
            "respaldo": "Dato respaldado en: Reich et al. 2008, abstract"
          }
        ],
        "cita": {
          "en": "«The presence of large amounts of atacamite in oxide zones from ore deposits in the Atacama Desert of northern Chile requires saline solutions for its formation and hyperarid climate conditions for its preservation.»  (Reich et al., 2008, abstract)",
          "es": "Traducción: «La presencia de grandes cantidades de atacamita en las zonas oxidadas de los depósitos del desierto de Atacama requiere soluciones salinas para formarse y un clima hiperárido para conservarse.»"
        },
        "fuentes": [
          "Handbook of Mineralogy (Mineralogical Society of America), ficha Atacamite, (c)2001-2005 Mineral Data Publishing, versión 1.",
          "Reich, M., Palacios, C., Parada, M. A., Fehn, U., Cameron, E. M., Leybourne, M. I. y Zúñiga, A. (2008). Atacamite formation by deep saline waters in copper deposits from the Atacama Desert, Chile: evidence from fluid inclusions, groundwater geochemistry, TEM, and 36Cl data. Mineralium Deposita, 43, 665-676. DOI 10.1007/s00126-008-0184-4.",
          "La versión directa expone el proceso con redacción propia a partir de las dos fuentes citadas; no reproduce su texto, salvo la cita entre comillas, que se atribuye en el mismo párrafo y se traduce al lado."
        ]
      },
      "transparencia": [
        "Fuentes primarias de esta ficha: el IMA Master List (2026-09), versión oficial de la CNMNC, y el Handbook of Mineralogy de la Mineralogical Society of America. Ambas fueron consultadas directamente para este documento.",
        "La columna Fuente cita el documento y la sección de donde sale cada valor; la columna Estado dice si ese valor resiste la cita. Un dato puede tener fuente secundaria y seguir marcado pendiente.",
        "Quedan dos frentes abiertos, que suman cuatro datos: el año y el autor del nombre, que sólo constan en Mindat y Mindat es fuente secundaria; y la fluorescencia y la solubilidad, que el Handbook no declara y no se deducen de la fórmula.",
        "La localidad tipo exacta no es un dato que falte: la fuente declara que la especie fue descrita a partir de una ocurrencia no definida en el desierto de Atacama. Eso es lo que dice, y asi se cita.",
        "Donde el relato usa imágenes —las entrañas, el ataque, las lágrimas—, esas imágenes son la voz del libro. La afirmación técnica es la de la ficha, y su fuente esta al lado."
      ],
      "pendientes": [
        "Año del nombre",
        "Autor del nombre",
        "Fluorescencia",
        "Solubilidad"
      ]
    }
  ]
};

window.MUSEO = MUSEO;
