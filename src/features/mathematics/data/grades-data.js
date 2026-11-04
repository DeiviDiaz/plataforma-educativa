// src/features/mathematics/data/grades-data.js
export const gradesCurriculum = {
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
        title: 'Periodo 1: Sistemas de Ecuaciones Lineales',
        topics: [
          { id: 'sistemas-2x2-metodos', title: 'Sistemas 2x2: sustitución, igualación y reducción', gameIds: ['sistemas-2x2-metodos'] },
          { id: 'determinantes-cramer', title: 'Determinantes y regla de Cramer (2x2 y 3x3)', gameIds: ['determinantes-cramer'] },
          { id: 'racionalizacion', title: 'Radicales y racionalización', gameIds: ['racionalizacion'] }
        ]
      },
      {
        id: 2,
        title: 'Periodo 2: Estudio de Funciones',
        topics: [
          { id: 'concepto-funcion', title: 'Función: dominio, codominio y representaciones', gameIds: ['concepto-funcion'] },
          { id: 'funcion-lineal-afin', title: 'Función lineal y cálculo de pendiente', gameIds: ['funcion-lineal-afin'] },
          { id: 'funcion-cuadratica', title: 'Función cuadrática, vértice y eje de simetría', gameIds: ['funcion-cuadratica'] },
          { id: 'exponencial-logaritmica', title: 'Funciones exponenciales y logarítmicas', gameIds: ['exponencial-logaritmica'] }
        ]
      },
      {
        id: 3,
        title: 'Periodo 3: Semejanza y Teorema de Tales',
        topics: [
          { id: 'teorema-tales', title: 'Segmentos proporcionales y Teorema de Tales', gameIds: ['teorema-tales'] },
          { id: 'escalas-planos', title: 'Manejo de escalas, planos y maquetas', gameIds: ['escalas-planos'] },
          { id: 'cuerpos-redondos', title: 'Volumen y capacidad de cuerpos redondos', gameIds: ['cuerpos-redondos'] }
        ]
      },
      {
        id: 4,
        title: 'Periodo 4: Probabilidad Avanzada',
        topics: [
          { id: 'espacio-muestral-eventos', title: 'Espacio muestral y clases de eventos', gameIds: ['espacio-muestral-eventos'] },
          { id: 'calculo-probabilidades', title: 'Cálculo de probabilidad de eventos compuestos', gameIds: ['calculo-probabilidades'] }
        ]
      }
    ]
  }
};