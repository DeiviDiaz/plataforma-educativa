// src/features/mathematics/data/grades-data.js
export const gradesCurriculum = {
  1: {
    grade: 1,
    subject: 'matematicas',
    title: 'Matemáticas Primer Grado',
    periods: [
      {
        id: 1,
        title: 'Periodo 1: Aventuras matemáticas',
        description: 'Descubre los números del 0 al 50, cuenta, ordena y resuelve adiciones y sustracciones jugando.',
        topics: [
          { id: 'aventuras-matematicas', title: 'Aventuras matemáticas: números y operaciones', gameIds: ['aventuras-matematicas'] },
        ],
      },
      {
        id: 2,
        title: 'Periodo 2: Cuando contamos aprendemos',
        description: 'Adiciona reagrupando, desagrupa para restar y resuelve situaciones con números hasta 99.',
        topics: [
          { id: 'cuando-contamos-aprendemos', title: 'Cuando contamos aprendemos', gameIds: ['cuando-contamos-aprendemos'] },
        ],
      },
      {
        id: 3,
        title: 'Periodo 3: Exploremos y descubramos las centenas',
        description: 'Construye centenas, representa números hasta 999 y resuelve operaciones en nuevas aventuras.',
        topics: [
          { id: 'aventuras-centenas', title: 'Aventuras de las centenas', gameIds: ['aventuras-centenas'] },
        ],
      },
      {
        id: 4,
        title: 'Periodo 4: Juguemos con las operaciones matemáticas',
        description: 'Explora unidades de mil, figuras, sólidos, medidas, tiempo y organización de datos.',
        topics: [
          { id: 'operaciones-matematicas', title: 'Juguemos con las operaciones matemáticas', gameIds: ['operaciones-matematicas'] },
        ],
      },
    ],
  },
  4: {
    grade: 4,
    subject: 'matematicas',
    title: 'Matemáticas Cuarto Grado',
    periods: [
      {
        id: 1,
        title: 'Periodo 1: Números Naturales y Operaciones',
        topics: [
          { id: 'lectura-valor-posicional', title: 'Lectura, escritura y valor posicional de números naturales', gameIds: [] },
          { id: 'orden-comparacion-naturales', title: 'Orden y comparación de números naturales', gameIds: [] },
          { id: 'suma-resta-naturales', title: 'Suma y resta de números naturales', gameIds: [] },
          { id: 'multiplicacion-division-naturales', title: 'Multiplicación y división de números naturales', gameIds: [] },
          { id: 'problemas-operaciones-naturales', title: 'Resolución de problemas con operaciones combinadas', gameIds: [] },
        ],
      },
      {
        id: 2,
        title: 'Periodo 2: Fracciones y Números Decimales',
        topics: [
          { id: 'representacion-fracciones', title: 'Representación y lectura de fracciones', gameIds: [] },
          { id: 'fracciones-equivalentes', title: 'Fracciones equivalentes y comparación de fracciones', gameIds: [] },
          { id: 'suma-resta-fracciones', title: 'Suma y resta de fracciones homogéneas', gameIds: [] },
          { id: 'decimales-decimas-centesimas', title: 'Décimas, centésimas y números decimales', gameIds: [] },
          { id: 'operaciones-decimales', title: 'Comparación y operaciones básicas con decimales', gameIds: [] },
        ],
      },
      {
        id: 3,
        title: 'Periodo 3: Geometría y Medición',
        topics: [
          { id: 'rectas-angulos', title: 'Rectas, segmentos y clasificación de ángulos', gameIds: [] },
          { id: 'poligonos-cuadrilateros', title: 'Polígonos y clasificación de cuadriláteros', gameIds: [] },
          { id: 'perimetro-figuras', title: 'Perímetro de figuras planas', gameIds: [] },
          { id: 'area-rectangulos-cuadrados', title: 'Área de cuadrados y rectángulos', gameIds: [] },
          { id: 'unidades-medida', title: 'Unidades de longitud, capacidad, masa y tiempo', gameIds: [] },
        ],
      },
      {
        id: 4,
        title: 'Periodo 4: Datos, Patrones y Resolución de Problemas',
        topics: [
          { id: 'secuencias-patrones', title: 'Secuencias numéricas y patrones', gameIds: [] },
          { id: 'tablas-graficas', title: 'Lectura y construcción de tablas y gráficas', gameIds: [] },
          { id: 'moda-promedio', title: 'Moda y promedio en situaciones sencillas', gameIds: [] },
          { id: 'probabilidad-eventos', title: 'Posibilidad y probabilidad de eventos', gameIds: [] },
          { id: 'estrategias-resolucion', title: 'Estrategias para resolver problemas matemáticos', gameIds: [] },
        ],
      },
    ],
  },
  7: {
    grade: 7,
    subject: 'matematicas',
    title: 'Matemáticas Séptimo Grado',
    periods: [
      {
        id: 1,
        title: 'Periodo 1: Relaciones y Ecuaciones',
        topics: [
          { id: 'ecuaciones-lineales', title: 'Ecuaciones de primer grado (x + a = b, ax + b = c)', gameIds: ['ecuaciones-lineales'] },
          { id: 'variables-incognitas', title: 'Constantes, variables e incógnitas', gameIds: ['variables-incognitas'] },
          { id: 'conjunto-solucion', title: 'Conjunto solución y valores de incógnitas', gameIds: ['conjunto-solucion'] }
        ]
      },
      {
        id: 2,
        title: 'Periodo 2: Números Racionales',
        topics: [
          { id: 'racionales-recta', title: 'Representación de racionales en la recta', gameIds: ['racionales-recta'] },
          { id: 'operaciones-racionales', title: 'Operaciones aditivas y multiplicativas con racionales', gameIds: ['operaciones-racionales'] },
          { id: 'decimales-racionales', title: 'Conversión y operaciones con expresiones decimales', gameIds: ['decimales-racionales'] }
        ]
      },
      {
        id: 3,
        title: 'Periodo 3: Proporcionalidad y Variación',
        topics: [
          { id: 'razones-proporciones', title: 'Razones y proporciones', gameIds: ['razones-proporciones'] },
          { id: 'porcentajes', title: 'Tanto por ciento de una cantidad', gameIds: ['porcentajes'] },
          { id: 'proporcionalidad-directa-inversa', title: 'Variación proporcional directa e inversa', gameIds: ['proporcionalidad-directa-inversa'] }
        ]
      },
      {
        id: 4,
        title: 'Periodo 4: Capacidad y Volumen',
        topics: [
          { id: 'unidades-volumen', title: 'Unidades de medida de volumen', gameIds: ['unidades-volumen'] },
          { id: 'magnitud-capacidad', title: 'Capacidad y unidades de medida', gameIds: ['magnitud-capacidad'] },
          { id: 'equivalencias-volumen-capacidad', title: 'Equivalencias entre volumen y capacidad', gameIds: ['equivalencias-volumen-capacidad'] }
        ]
      }
    ]
  },
  8: {
    grade: 8,
    subject: 'matematicas',
    title: 'Matemáticas Octavo Grado',
    periods: [
      {
        id: 1,
        title: 'Periodo 1: Números Reales y Polinomios',
        topics: [
          { id: 'potenciacion-radicacion-reales', title: 'Potenciación y radicación de reales', gameIds: ['potenciacion-radicacion-reales'] },
          { id: 'monomios-polinomios', title: 'Monomios, grados y términos semejantes', gameIds: ['monomios-polinomios'] },
          { id: 'operaciones-polinomios', title: 'Operaciones aditivas y multiplicación de polinomios', gameIds: ['operaciones-polinomios'] }
        ]
      },
      {
        id: 2,
        title: 'Periodo 2: Productos Notables y Factorización',
        topics: [
          { id: 'productos-notables', title: 'Productos notables y cocientes notables', gameIds: ['productos-notables'] },
          { id: 'factor-comun', title: 'Factor común y agrupación de términos', gameIds: ['factor-comun'] },
          { id: 'trinomios-diferencia-cuadrados', title: 'Diferencia de cuadrados y factorización de trinomios', gameIds: ['trinomios-diferencia-cuadrados'] }
        ]
      },
      {
        id: 3,
        title: 'Periodo 3: Geometría y Teorema de Pitágoras',
        topics: [
          { id: 'congruencia-semejanza', title: 'Criterios de congruencia y semejanza de triángulos', gameIds: ['congruencia-semejanza'] },
          { id: 'teorema-pitagoras', title: 'Teorema de Pitágoras y aplicaciones', gameIds: ['teorema-pitagoras'] },
          { id: 'areas-volumenes-prismas', title: 'Áreas y volúmenes de prismas y sólidos', gameIds: ['areas-volumenes-prismas'] }
        ]
      },
      {
        id: 4,
        title: 'Periodo 4: Estadística y Conteo',
        topics: [
          { id: 'tablas-frecuencias-intervalos', title: 'Tablas de frecuencias y datos agrupados', gameIds: ['tablas-frecuencias-intervalos'] },
          { id: 'medidas-tendencia-central', title: 'Media, mediana y moda en datos continuos', gameIds: ['medidas-tendencia-central'] },
          { id: 'principios-conteo', title: 'Principio fundamental del conteo y permutaciones', gameIds: ['principios-conteo'] }
        ]
      }
    ]
  },
  9: {
    grade: 9,
    subject: 'matematicas',
    title: 'Matemáticas Noveno Grado',
    periods: [
      {
        id: 1,
        title: 'Primer periodo',
        description: 'Álgebra, sistemas y radicales',
        topics: [
          { id: 'grado9-1', title: 'Ecuaciones lineales', sub: 'Construye soluciones y reconoce métodos algebraicos.', gameIds: ['grado9-1'] },
          { id: 'grado9-2', title: 'Sistemas de ecuaciones 2×2', sub: 'Encuentra intersecciones moviendo rectas.', gameIds: ['grado9-2'] },
          { id: 'grado9-3', title: 'Problemas de sistemas', sub: 'Traduce situaciones cotidianas a ecuaciones.', gameIds: ['grado9-3'] },
          { id: 'grado9-4', title: 'Determinantes de 2×2', sub: 'Calcula determinantes y aplica Cramer.', gameIds: ['grado9-4'] },
          { id: 'grado9-5', title: 'Determinantes de 3×3', sub: 'Explora matrices de tres variables.', gameIds: ['grado9-5'] },
          { id: 'grado9-6', title: 'Racionalización', sub: 'Elige conjugadas y elimina radicales.', gameIds: ['grado9-6'] }
        ]
      },
      {
        id: 2,
        title: 'Segundo periodo',
        description: 'El universo de las funciones',
        topics: [
          { id: 'grado9-7', title: 'Representamos funciones', sub: 'Relaciona tablas, pares y diagramas.', gameIds: ['grado9-7'] },
          { id: 'grado9-8', title: 'Función lineal', sub: 'Cambia pendientes y lee la gráfica.', gameIds: ['grado9-8'] },
          { id: 'grado9-9', title: 'Función cuadrática', sub: 'Descubre el vértice de una parábola.', gameIds: ['grado9-9'] },
          { id: 'grado9-10', title: 'Función exponencial', sub: 'Observa crecimiento y completa valores.', gameIds: ['grado9-10'] },
          { id: 'grado9-11', title: 'Función logarítmica', sub: 'Conecta potencias con logaritmos.', gameIds: ['grado9-11'] }
        ]
      },
      {
        id: 3,
        title: 'Tercer periodo',
        description: 'Geometría, semejanza y escala',
        topics: [
          { id: 'grado9-12', title: 'Figuras semejantes', sub: 'Compara longitudes, áreas y volúmenes.', gameIds: ['grado9-12'] },
          { id: 'grado9-13', title: 'Segmentos proporcionales', sub: 'Resuelve longitudes con Pitágoras y Thales.', gameIds: ['grado9-13'] },
          { id: 'grado9-14', title: 'La herramienta escala', sub: 'Transforma medidas de planos y maquetas.', gameIds: ['grado9-14'] }
        ]
      },
      {
        id: 4,
        title: 'Cuarto periodo',
        description: 'Probabilidad y conteo',
        topics: [
          { id: 'grado9-15', title: 'Probabilidad de eventos', sub: 'Lanza dados y compara resultados.', gameIds: ['grado9-15'] },
          { id: 'grado9-16', title: 'Probabilidades de varios eventos', sub: 'Recorre árboles y cuenta posibilidades.', gameIds: ['grado9-16'] }
        ]
      }
    ]
  }
};