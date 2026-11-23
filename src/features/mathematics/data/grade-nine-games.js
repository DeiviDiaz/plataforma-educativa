export const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const det3 = (m) =>
  m[0] * (m[4] * m[8] - m[5] * m[7])
  - m[1] * (m[3] * m[8] - m[5] * m[6])
  + m[2] * (m[3] * m[7] - m[4] * m[6]);

export const gradeNineGames = [
  {
    id: 'grado9-1',
    title: 'Ecuaciones lineales',
    make: () => {
      const x = rand(-5, 8);
      const a = rand(2, 6);
      const b = rand(-9, 9);
      return {
        prompt: `Resuelve ${a}x ${b < 0 ? '−' : '+'} ${Math.abs(b)} = ${a * x + b}. ¿Cuánto vale x?`,
        answer: x,
        explain: `Al despejar, x = ${x}.`,
        hint: 'Primero resta el término independiente; después divide por el coeficiente de x.',
      };
    },
  },
  {
    id: 'grado9-2',
    title: 'Sistemas de ecuaciones 2×2',
    make: () => {
      const x = rand(-3, 3);
      const slope = rand(1, 3);
      const intercept = rand(-2, 2);
      return {
        prompt: `La recta y = ${slope}x ${intercept < 0 ? '−' : '+'} ${Math.abs(intercept)} corta a la recta horizontal y = ${slope * x + intercept}. ¿Cuál es la coordenada x de la intersección?`,
        answer: x,
        intercept,
        slope,
        target: slope * x + intercept,
        explain: `Igualando ambas expresiones, x = ${x}.`,
      };
    },
  },
  {
    id: 'grado9-3',
    title: 'Problemas de sistemas',
    make: () => {
      const juicePrice = rand(2, 6);
      const arepaPrice = rand(1, 5);
      const juiceCount = rand(2, 8);
      const arepaCount = rand(1, 6);
      const total = juiceCount * juicePrice + arepaCount * arepaPrice;
      return {
        prompt: `En una feria del Putumayo, ${juiceCount} jugos y ${arepaCount} arepas cuestan $${total} mil. Cada jugo vale $${juicePrice} mil. ¿Cuánto vale cada arepa, en miles de pesos?`,
        sub: `Construye la ecuación: ${juiceCount}(${juicePrice}) + ${arepaCount}y = ${total}.`,
        answer: arepaPrice,
        explain: `${arepaCount}y = ${arepaCount * arepaPrice}, así que y = ${arepaPrice}.`,
      };
    },
  },
  {
    id: 'grado9-4',
    title: 'Determinantes de 2×2',
    make: () => {
      const a = rand(-4, 5);
      const b = rand(-4, 5);
      const c = rand(-4, 5);
      const d = rand(-4, 5);
      return {
        prompt: 'Calcula el determinante de la matriz 2×2.',
        a, b, c, d,
        answer: a * d - b * c,
        explain: `ad − bc = (${a})(${d}) − (${b})(${c}) = ${a * d - b * c}.`,
      };
    },
  },
  {
    id: 'grado9-5',
    title: 'Determinantes de 3×3',
    make: () => {
      const matrix = Array.from({ length: 9 }, () => rand(-2, 3));
      return {
        prompt: 'Calcula el determinante de esta matriz 3×3 mediante expansión o regla de Sarrus.',
        matrix,
        answer: det3(matrix),
        explain: `El determinante es ${det3(matrix)}.`,
        hint: 'Expande por la primera fila: a(ei−fh) − b(di−fg) + c(dh−eg).',
      };
    },
  },
  {
    id: 'grado9-6',
    title: 'Racionalización',
    make: () => {
      const n = rand(2, 8);
      return {
        prompt: `Racionaliza 1 / (√${n} + 1). ¿Cuál es el denominador después de multiplicar por la conjugada?`,
        sub: `La conjugada es √${n} − 1.`,
        answer: n - 1,
        explain: `(√${n}+1)(√${n}−1) = ${n}−1 = ${n - 1}.`,
      };
    },
  },
  {
    id: 'grado9-7',
    title: 'Representamos funciones',
    make: () => {
      const a = rand(1, 4);
      const b = rand(-3, 3);
      const x = rand(0, 4);
      return {
        prompt: `La función f(x) = ${a}x ${b < 0 ? '−' : '+'} ${Math.abs(b)}. ¿Cuál es la imagen de x = ${x}?`,
        answer: a * x + b,
        a,
        b,
        x,
        explain: `f(${x}) = ${a}·${x} ${b < 0 ? '−' : '+'} ${Math.abs(b)} = ${a * x + b}.`,
      };
    },
  },
  {
    id: 'grado9-8',
    title: 'Función lineal',
    make: () => {
      const m = rand(-3, 3) || 1;
      const b = rand(-3, 3);
      const x = rand(-3, 3);
      return {
        prompt: `Para la función y = ${m}x ${b < 0 ? '−' : '+'} ${Math.abs(b)}, calcula y cuando x = ${x}.`,
        answer: m * x + b,
        m,
        b,
        x,
        explain: `y = ${m}·${x} ${b < 0 ? '−' : '+'} ${Math.abs(b)} = ${m * x + b}.`,
      };
    },
  },
  {
    id: 'grado9-9',
    title: 'Función cuadrática',
    make: () => {
      const a = rand(1, 3);
      const h = rand(-3, 3);
      const k = rand(-3, 3);
      return {
        prompt: `La parábola es y = ${a}(x − (${h}))² ${k < 0 ? '−' : '+'} ${Math.abs(k)}. ¿Cuál es la coordenada x del vértice?`,
        answer: h,
        a,
        h,
        k,
        explain: `En la forma a(x−h)²+k, el vértice es (${h}, ${k}).`,
      };
    },
  },
  {
    id: 'grado9-10',
    title: 'Función exponencial',
    make: () => {
      const base = rand(2, 4);
      const x = rand(1, 4);
      return {
        prompt: `Completa la tabla: para f(x) = ${base}ˣ, ¿cuánto vale f(${x})?`,
        answer: base ** x,
        base,
        x,
        explain: `${base} elevado a ${x} es ${base ** x}.`,
      };
    },
  },
  {
    id: 'grado9-11',
    title: 'Función logarítmica',
    make: () => {
      const base = rand(2, 5);
      const power = rand(1, 4);
      const result = base ** power;
      return {
        prompt: `Si ${base} elevado a x es ${result}, ¿cuánto vale log₍${base}₎(${result})?`,
        answer: power,
        base,
        power,
        explain: `Porque ${base}^${power} = ${result}, el logaritmo vale ${power}.`,
      };
    },
  },
  {
    id: 'grado9-12',
    title: 'Figuras semejantes',
    make: () => {
      const area = rand(2, 7);
      const factor = rand(2, 4);
      return {
        prompt: `Dos figuras son semejantes con razón de longitudes ${factor}. Si el área pequeña es ${area} cm², ¿cuál es el área grande?`,
        answer: area * factor * factor,
        factor,
        explain: `Las áreas cambian por ${factor}² = ${factor * factor}. Resultado: ${area * factor * factor} cm².`,
      };
    },
  },
  {
    id: 'grado9-13',
    title: 'Segmentos proporcionales',
    make: () => {
      const triple = [[3, 4, 5], [5, 12, 13], [8, 15, 17]][rand(0, 2)];
      return {
        prompt: `Un triángulo rectángulo tiene catetos ${triple[0]} cm y ${triple[1]} cm. ¿Cuánto mide la hipotenusa?`,
        answer: triple[2],
        triple,
        explain: `√(${triple[0]}² + ${triple[1]}²) = ${triple[2]} cm.`,
      };
    },
  },
  {
    id: 'grado9-14',
    title: 'La herramienta escala',
    make: () => {
      const measure = rand(2, 9);
      const ratio = [50, 100, 200][rand(0, 2)];
      return {
        prompt: `En un plano a escala 1:${ratio}, un sendero mide ${measure} cm. ¿Cuánto mide realmente en metros?`,
        answer: measure * ratio / 100,
        measure,
        ratio,
        explain: `${measure} × ${ratio} = ${measure * ratio} cm = ${measure * ratio / 100} m.`,
      };
    },
  },
  {
    id: 'grado9-15',
    title: 'Probabilidad de eventos',
    make: () => {
      const threshold = rand(2, 5);
      return {
        prompt: `Lanzas un dado justo. ¿Cuál es la probabilidad de obtener un número mayor que ${threshold}? Escríbela como decimal.`,
        answer: (6 - threshold) / 6,
        threshold,
        explain: `Hay ${6 - threshold} resultados favorables de 6: ${((6 - threshold) / 6).toFixed(3)}.`,
      };
    },
  },
  {
    id: 'grado9-16',
    title: 'Probabilidades de varios eventos',
    make: () => {
      const tosses = rand(2, 4);
      return {
        prompt: `Lanzas una moneda ${tosses} veces. ¿Cuántas secuencias diferentes de cara (C) y sello (S) son posibles?`,
        answer: 2 ** tosses,
        tosses,
        explain: `Cada lanzamiento tiene 2 opciones: 2^${tosses} = ${2 ** tosses}.`,
      };
    },
  },
];
