// src/features/mathematics/data/topics-game-registry.js

// Funciones auxiliares matemáticas
const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

// Máximo Común Divisor (MCD) para simplificar fracciones
const gcd = (a, b) => (b === 0 ? Math.abs(a) : gcd(b, a % b));

export const TOPIC_GENERATORS = {
  // =========================================================================
  // GRADO 7°
  // =========================================================================

  // Periodo 1: Relaciones y Ecuaciones
  'variables-incognitas': () => {
    const letters = ['x', 'y', 'z', 'm', 'n', 'p', 'w', 'k'];
    const v = pick(letters);
    const a = rand(2, 9);
    const b = rand(3, 25);
    const xVal = rand(2, 8);
    const c = a * xVal + b;

    const roleType = rand(1, 3);
    let prompt = '';
    let correct = '';
    let options = [];

    if (roleType === 1) {
      prompt = `En la ecuación algebraica: ${a}${v} + ${b} = ${c}\n¿Qué representa el símbolo "${v}"?`;
      correct = 'La incógnita';
      options = ['La incógnita', 'El coeficiente', 'El término constante', 'El exponente'];
    } else if (roleType === 2) {
      prompt = `En la ecuación algebraica: ${a}${v} + ${b} = ${c}\n¿Qué elemento representa el valor numérico ${b}?`;
      correct = 'Término constante';
      options = ['Término constante', 'Coeficiente de la variable', 'Incógnita', 'Grado de la ecuación'];
    } else {
      prompt = `En la ecuación algebraica: ${a}${v} + ${b} = ${c}\n¿Qué elemento representa el número ${a}?`;
      correct = 'Coeficiente';
      options = ['Coeficiente', 'Término independiente', 'Incógnita', 'Variable secundaria'];
    }

    return {
      title: 'Elementos Algebraicos',
      prompt,
      correct,
      options: shuffle(options),
      explanation: `En la expresión ${a}${v} + ${b} = ${c}: ${v} es la incógnita, ${a} es su coeficiente y ${b} es la constante.`
    };
  },

  'conjunto-solucion': () => {
    const v = pick(['x', 'y', 'w']);
    const limit = rand(3, 15);
    const isLessThan = Math.random() > 0.5;
    const opSymbol = isLessThan ? '<' : '>';

    const delta = rand(1, 6);
    const testNum = isLessThan
      ? (Math.random() > 0.5 ? limit - delta : limit + delta)
      : (Math.random() > 0.5 ? limit + delta : limit - delta);

    const belongs = isLessThan ? testNum < limit : testNum > limit;
    const correct = belongs ? 'Sí pertenece' : 'No pertenece';

    return {
      title: 'Conjunto Solución e Inecuaciones',
      prompt: `Dada la desigualdad: ${v} ${opSymbol} ${limit}\n¿El valor ${v} = ${testNum} pertenece al conjunto solución?`,
      correct,
      options: ['Sí pertenece', 'No pertenece'],
      explanation: `Al sustituir ${v} = ${testNum}: ¿Es ${testNum} ${opSymbol} ${limit}? La condición es ${belongs ? 'verdadera' : 'falsa'}.`
    };
  },

  // Periodo 2: Números Racionales
  'racionales-recta': () => {
    const den = rand(2, 8);
    const num = rand(1, 24);
    const floorVal = Math.floor(num / den);
    const ceilVal = floorVal + 1;
    const correct = `Entre ${floorVal} y ${ceilVal}`;

    const opt1 = `Entre ${floorVal + 1} y ${floorVal + 2}`;
    const opt2 = `Entre ${Math.max(0, floorVal - 1)} y ${floorVal}`;
    const opt3 = `Exactamente en ${floorVal}`;

    return {
      title: 'Racionales en la Recta',
      prompt: `¿Entre cuáles dos números enteros consecutivos se ubica la fracción ${num}/${den}?`,
      correct,
      options: shuffle(Array.from(new Set([correct, opt1, opt2, opt3]))),
      explanation: `${num} dividido entre ${den} es ${(num / den).toFixed(2)}, lo cual cae entre ${floorVal} y ${ceilVal}.`
    };
  },

  'operaciones-racionales': () => {
    const a = rand(1, 6);
    const b = rand(2, 6);
    const c = rand(1, 6);
    const d = rand(2, 6);
    const isSum = Math.random() > 0.5;

    const rawNum = isSum ? (a * d + b * c) : (a * d - b * c);
    const rawDen = b * d;
    const div = gcd(rawNum, rawDen);

    const simpNum = rawNum / div;
    const simpDen = rawDen / div;
    const correct = `${simpNum}/${simpDen}`;

    const wrong1 = `${(rawNum + rand(1, 3)) / div}/${simpDen}`;
    const wrong2 = isSum ? `${a + c}/${b + d}` : `${Math.abs(a - c)}/${Math.abs(b - d) || 2}`;
    const wrong3 = `${simpNum}/${simpDen + 1}`;

    return {
      title: 'Aritmética de Fracciones',
      prompt: `Calcula el resultado simplificado de:\n(${a}/${b}) ${isSum ? '+' : '-'} (${c}/${d})`,
      correct,
      options: shuffle(Array.from(new Set([correct, wrong1, wrong2, wrong3]))),
      explanation: `Cruzado: (${a}·${d} ${isSum ? '+' : '-'} ${b}·${c}) / (${b}·${d}) = ${rawNum}/${rawDen} = ${correct}`
    };
  },

  'decimales-racionales': () => {
    const den = pick([2, 4, 5, 10, 20]);
    const num = rand(1, den * 3);
    const decimal = (num / den).toFixed(den === 10 || den === 2 || den === 5 ? 1 : 2);

    const div = gcd(num, den);
    const simpNum = num / div;
    const simpDen = den / div;
    const correct = `${simpNum}/${simpDen}`;

    const wrong1 = `${simpNum + 1}/${simpDen}`;
    const wrong2 = `${simpNum}/${simpDen + 2}`;
    const wrong3 = `${simpNum * 2}/${simpDen + 1}`;

    return {
      title: 'Conversión Decimal a Racional',
      prompt: `Convierte el número decimal ${decimal} a su fracción irreducible:`,
      correct,
      options: shuffle(Array.from(new Set([correct, wrong1, wrong2, wrong3]))),
      explanation: `${decimal} expresado en fracción simplificada equivale a ${correct}.`
    };
  },

  // Periodo 3: Proporcionalidad y Variación
  'razones-proporciones': () => {
    const a = rand(2, 8);
    const b = rand(3, 9);
    const k = rand(2, 6);
    const a2 = a * k;
    const targetX = b * k;

    const correct = `${targetX}`;
    const wrong1 = `${targetX + rand(2, 4)}`;
    const wrong2 = `${targetX - rand(1, 3)}`;
    const wrong3 = `${a2 + b}`;

    return {
      title: 'Proporciones e Igualdad de Razones',
      prompt: `Halla el valor de x en la proporción:\n${a} / ${b} = ${a2} / x`,
      correct,
      options: shuffle(Array.from(new Set([correct, wrong1, wrong2, wrong3]))),
      explanation: `Propiedad fundamental: x = (${b} · ${a2}) / ${a} = ${targetX}.`
    };
  },

  'porcentajes': () => {
    const pct = pick([5, 10, 15, 20, 25, 30, 40, 50, 75]);
    const base = rand(2, 30) * 10;
    const result = (pct / 100) * base;

    const correct = Number.isInteger(result) ? `${result}` : `${result.toFixed(1)}`;
    const wrong1 = `${Number(result) + rand(2, 5)}`;
    const wrong2 = `${Math.max(1, Number(result) - rand(2, 4))}`;
    const wrong3 = `${(base * (pct / 10)).toFixed(0)}`;

    return {
      title: 'Tanto Por Ciento',
      prompt: `¿Cuál es el ${pct}% de ${base}?`,
      correct,
      options: shuffle(Array.from(new Set([correct, wrong1, wrong2, wrong3]))),
      explanation: `(${pct} × ${base}) / 100 = ${correct}.`
    };
  },

  'proporcionalidad-directa-inversa': () => {
    const contextList = [
      {
        text: `Un vehículo viaja a velocidad constante: a mayor tiempo de viaje (t), mayor distancia recorrida (d).`,
        type: 'Directamente proporcional'
      },
      {
        text: `Para pavimentar una calle: a mayor cantidad de trabajadores al mismo ritmo, menos días de trabajo.`,
        type: 'Inversamente proporcional'
      },
      {
        text: `En una tienda: si compras más cuadernos idénticos, el costo total a pagar aumenta.`,
        type: 'Directamente proporcional'
      },
      {
        text: `Para llenar un tanque con agua: a mayor cantidad de grifos abiertos con el mismo flujo, menor tiempo de llenado.`,
        type: 'Inversamente proporcional'
      },
      {
        text: `A mayor velocidad promedio de un auto para una ruta fija, menor tiempo en llegar al destino.`,
        type: 'Inversamente proporcional'
      }
    ];

    const item = pick(contextList);
    return {
      title: 'Tipos de Proporcionalidad',
      prompt: `${item.text}\n\n¿Qué tipo de relación de proporcionalidad describe?`,
      correct: item.type,
      options: ['Directamente proporcional', 'Inversamente proporcional'],
      explanation: item.type === 'Directamente proporcional'
        ? 'Ambas magnitudes aumentan en la misma proporción.'
        : 'Cuando una magnitud aumenta, la otra disminuye en la misma proporción.'
    };
  },

  // Periodo 4: Capacidad y Volumen
  'unidades-volumen': () => {
    const val = rand(2, 12);
    const toDm3 = Math.random() > 0.5;

    if (toDm3) {
      const correct = `${val * 1000} dm³`;
      return {
        title: 'Conversión de Volumen',
        prompt: `¿Cuántos decímetros cúbicos (dm³) equivalen a ${val} metros cúbicos (m³)?`,
        correct,
        options: shuffle([correct, `${val * 100} dm³`, `${val * 10} dm³`, `${val * 10000} dm³`]),
        explanation: `1 m³ = 1.000 dm³. Por tanto, ${val} × 1.000 = ${val * 1000} dm³.`
      };
    } else {
      const correct = `${val * 1000} cm³`;
      return {
        title: 'Conversión de Volumen',
        prompt: `¿Cuántos centímetros cúbicos (cm³) equivalen a ${val} decímetros cúbicos (dm³)?`,
        correct,
        options: shuffle([correct, `${val * 100} cm³`, `${val * 10} cm³`, `${val * 10000} cm³`]),
        explanation: `1 dm³ = 1.000 cm³. Por tanto, ${val} × 1.000 = ${val * 1000} cm³.`
      };
    }
  },

  'magnitud-capacidad': () => {
    const l = rand(2, 15);
    const ml = l * 1000;
    const correct = `${ml} ml`;

    return {
      title: 'Capacidad en Líquidos',
      prompt: `Un depósito contiene ${l} Litros de agua. ¿A cuántos mililitros (ml) equivale esta capacidad?`,
      correct,
      options: shuffle([correct, `${l * 100} ml`, `${l * 10} ml`, `${ml + 500} ml`]),
      explanation: `1 Litro equivale exactamente a 1.000 mililitros.`
    };
  },

  'equivalencias-volumen-capacidad': () => {
    const n = rand(3, 25);
    const isToLiters = Math.random() > 0.5;

    if (isToLiters) {
      const correct = `${n} Litros`;
      return {
        title: 'Equivalencia Volumen y Capacidad',
        prompt: `Un recipiente tiene un volumen interno de ${n} dm³. ¿Cuántos Litros de líquido caben en su interior?`,
        correct,
        options: shuffle([correct, `${n * 10} Litros`, `${n * 1000} Litros`, `${(n / 10).toFixed(1)} Litros`]),
        explanation: `La relación fundamental establece que 1 dm³ equivale exactamente a 1 Litro.`
      };
    } else {
      const correct = `${n} ml`;
      return {
        title: 'Equivalencia Volumen y Capacidad',
        prompt: `Si una jeringa mide ${n} cm³ de volumen, ¿a cuántos mililitros (ml) equivale?`,
        correct,
        options: shuffle([correct, `${n * 10} ml`, `${n * 100} ml`, `${(n / 10).toFixed(1)} ml`]),
        explanation: `La relación fundamental establece que 1 cm³ equivale exactamente a 1 mililitro (ml).`
      };
    }
  },

  // =========================================================================
  // GRADO 8°
  // =========================================================================

  // Periodo 1: Números Reales y Polinomios
  'potenciacion-radicacion-reales': () => {
    const base = rand(2, 6);
    const exp = rand(2, 4);
    const pot = Math.pow(base, exp);

    const isRadical = Math.random() > 0.5;
    if (isRadical) {
      const correct = `${base}`;
      return {
        title: 'Radicación de Números Reales',
        prompt: `Calcula el valor de la raíz con índice ${exp}:\nⁿ√${pot} (donde n = ${exp})`,
        correct,
        options: shuffle(Array.from(new Set([correct, `${base + 1}`, `${base + 2}`, `${Math.max(1, base - 1)}`]))),
        explanation: `Porque ${base}^${exp} = ${pot}.`
      };
    } else {
      const correct = `${pot}`;
      return {
        title: 'Potenciación de Números Reales',
        prompt: `Calcula el valor de la potencia:\n${base}^${exp}`,
        correct,
        options: shuffle(Array.from(new Set([correct, `${pot + rand(2, 6)}`, `${pot - rand(1, 4)}`, `${base * exp}`]))),
        explanation: `${base} elevado a ${exp} es multiplicar ${base} por sí mismo ${exp} veces = ${pot}.`
      };
    }
  },

  'monomios-polinomios': () => {
    const letters = ['x', 'y', 'a', 'b'];
    const l1 = letters[rand(0, 1)];
    const l2 = letters[rand(2, 3)];
    const e1 = rand(2, 5);
    const e2 = rand(1, 4);
    const coef = rand(2, 9);
    const grade = e1 + e2;

    const correct = `${grade}`;
    return {
      title: 'Grado Absoluto de un Monomio',
      prompt: `¿Cuál es el grado absoluto del siguiente monomio?\n${coef}${l1}^${e1} ${l2}^${e2}`,
      correct,
      options: shuffle(Array.from(new Set([correct, `${Math.max(e1, e2)}`, `${e1 * e2}`, `${grade + 1}`]))),
      explanation: `El grado absoluto es la suma de los exponentes de las variables: ${e1} + ${e2} = ${grade}.`
    };
  },

  'operaciones-polinomios': () => {
    const c1 = rand(2, 8);
    const c2 = rand(2, 7);
    const exp = rand(2, 4);
    const isSum = Math.random() > 0.5;
    const resultCoef = isSum ? c1 + c2 : c1 - c2;

    const correct = `${resultCoef}x^${exp}`;
    const wrong1 = `${resultCoef}x^${exp * 2}`;
    const wrong2 = `${c1 * c2}x^${exp}`;
    const wrong3 = `${resultCoef}`;

    return {
      title: 'Reducción de Términos Semejantes',
      prompt: `Reduce los siguientes términos semejantes:\n${c1}x^${exp} ${isSum ? '+' : '-'} ${c2}x^${exp}`,
      correct,
      options: shuffle(Array.from(new Set([correct, wrong1, wrong2, wrong3]))),
      explanation: `Solo se suman o restan los coeficientes numéricos (${c1} ${isSum ? '+' : '-'} ${c2} = ${resultCoef}) y se mantiene la misma parte literal (x^${exp}).`
    };
  },

  // Periodo 2: Productos Notables y Factorización
  'productos-notables': () => {
    const a = rand(2, 7);
    const a2 = a * a;
    const dosA = 2 * a;
    const isSum = Math.random() > 0.5;

    const correct = isSum ? `x² + ${dosA}x + ${a2}` : `x² - ${dosA}x + ${a2}`;
    const wrong1 = isSum ? `x² + ${a2}` : `x² - ${a2}`;
    const wrong2 = isSum ? `x² + ${a}x + ${a2}` : `x² - ${a}x + ${a2}`;
    const wrong3 = `2x ${isSum ? '+' : '-'} ${dosA}`;

    return {
      title: 'Cuadrado de un Binomio',
      prompt: `Desarrolla el producto notable:\n(x ${isSum ? '+' : '-'} ${a})²`,
      correct,
      options: shuffle(Array.from(new Set([correct, wrong1, wrong2, wrong3]))),
      explanation: `Fórmula: (a ± b)² = a² ± 2ab + b² -> x² ${isSum ? '+' : '-'} 2(${a})x + ${a}² = ${correct}`
    };
  },

  'factor-comun': () => {
    const f = rand(3, 9);
    const k = rand(2, 5);
    const b = f * k;

    const correct = `${f}(x + ${k})`;
    const wrong1 = `${f}(x + ${b})`;
    const wrong2 = `x(${f} + ${k})`;
    const wrong3 = `${f * 2}(x + 1)`;

    return {
      title: 'Factor Común Monomio',
      prompt: `Factoriza por factor común la siguiente expresión:\n${f}x + ${b}`,
      correct,
      options: shuffle(Array.from(new Set([correct, wrong1, wrong2, wrong3]))),
      explanation: `El máximo común divisor entre ${f} y ${b} es ${f}. Al dividir cada término entre ${f} resulta ${correct}.`
    };
  },

  'trinomios-diferencia-cuadrados': () => {
    const k = rand(3, 10);
    const k2 = k * k;

    const correct = `(x - ${k})(x + ${k})`;
    const wrong1 = `(x - ${k})²`;
    const wrong2 = `(x + ${k})²`;
    const wrong3 = `(x² - ${k})`;

    return {
      title: 'Diferencia de Cuadrados Perfectos',
      prompt: `Factoriza la siguiente diferencia de cuadrados:\nx² - ${k2}`,
      correct,
      options: shuffle(Array.from(new Set([correct, wrong1, wrong2, wrong3]))),
      explanation: `Fórmula: a² - b² = (a - b)(a + b). Como √x² = x y √${k2} = ${k}, el resultado es ${correct}.`
    };
  },

  // Periodo 3: Geometría
  'congruencia-semejanza': () => {
    const k = rand(2, 4);
    const a = rand(3, 6);
    const b = rand(4, 7);
    const c = rand(5, 8);
    const angle = pick([30, 45, 60, 90]);

    const type = rand(1, 3);
    if (type === 1) {
      return {
        title: 'Criterios de Semejanza',
        prompt: `El triángulo 1 tiene lados (${a}, ${b}, ${c}) y el triángulo 2 tiene lados (${a * k}, ${b * k}, ${c * k}).\n¿Por qué criterio son semejantes?`,
        correct: 'L-L-L (Lado-Lado-Lado)',
        options: shuffle(['L-L-L (Lado-Lado-Lado)', 'L-A-L (Lado-Ángulo-Lado)', 'A-A (Ángulo-Ángulo)', 'No son semejantes']),
        explanation: `Los tres lados son proporcionales con razón de semejanza k = ${k}.`
      };
    } else if (type === 2) {
      return {
        title: 'Criterios de Semejanza',
        prompt: `Dos triángulos comparten un ángulo de ${angle}° entre lados proporcionales (${a} y ${b} vs ${a * k} y ${b * k}).\n¿Qué criterio garantiza su semejanza?`,
        correct: 'L-A-L (Lado-Ángulo-Lado)',
        options: shuffle(['L-A-L (Lado-Ángulo-Lado)', 'L-L-L (Lado-Lado-Lado)', 'A-A (Ángulo-Ángulo)', 'Criterio Hipotenusa']),
        explanation: 'Dos lados proporcionales con el mismo ángulo comprendido cumplen L-A-L.'
      };
    } else {
      const angle2 = 180 - angle - rand(20, 40);
      return {
        title: 'Criterios de Semejanza',
        prompt: `Dos triángulos tienen dos ángulos interiores idénticos de ${angle}° y ${angle2}°.\n¿Qué criterio de semejanza se aplica?`,
        correct: 'A-A (Ángulo-Ángulo)',
        options: shuffle(['A-A (Ángulo-Ángulo)', 'L-L-L (Lado-Lado-Lado)', 'L-A-L (Lado-Ángulo-Lado)', 'Perímetro']),
        explanation: 'Al coincidir dos ángulos, el tercero obligatoriamente es igual (Criterio A-A).'
      };
    }
  },

  'areas-volumenes-prismas': () => {
    const l = rand(3, 7);
    const w = rand(2, 5);
    const h = rand(4, 9);
    const vol = l * w * h;

    const correct = `${vol} cm³`;
    const wrong1 = `${l + w + h} cm³`;
    const wrong2 = `${vol + rand(10, 20)} cm³`;
    const wrong3 = `${l * w + h} cm³`;

    return {
      title: 'Volumen de Prismas Rectos',
      prompt: `Calcula el volumen de un prisma rectangular con:\nLargo = ${l} cm, Ancho = ${w} cm, Alto = ${h} cm`,
      correct,
      options: shuffle(Array.from(new Set([correct, wrong1, wrong2, wrong3]))),
      explanation: `Volumen = Área de la base × Altura = (${l} × ${w}) × ${h} = ${vol} cm³.`
    };
  },

  // Periodo 4: Estadística y Conteo
  'tablas-frecuencias-intervalos': () => {
    const f1 = rand(4, 12);
    const f2 = rand(5, 15);
    const f3 = rand(3, 10);
    const total = f1 + f2 + f3;

    const correct = `${total}`;
    const wrong1 = `${total + rand(2, 5)}`;
    const wrong2 = `${total - rand(2, 4)}`;
    const wrong3 = `${f1 + f2}`;

    return {
      title: 'Tamaño de la Muestra (N)',
      prompt: `En un estudio por intervalos de clase, las frecuencias absolutas son:\nIntervalo A: ${f1}\nIntervalo B: ${f2}\nIntervalo C: ${f3}\n¿Cuál es el tamaño total de la muestra (N)?`,
      correct,
      options: shuffle(Array.from(new Set([correct, wrong1, wrong2, wrong3]))),
      explanation: `N es la suma de todas las frecuencias absolutas: ${f1} + ${f2} + ${f3} = ${total}.`
    };
  },

  'medidas-tendencia-central': () => {
    const n1 = rand(2, 6);
    const n2 = n1 + rand(1, 4);
    const n3 = n2 + rand(1, 5);
    const arr = [n1, n2, n3];

    const correct = `${n2}`;
    const wrong1 = `${n1}`;
    const wrong2 = `${n3}`;
    const wrong3 = `${((n1 + n2 + n3) / 3).toFixed(1)}`;

    return {
      title: 'Mediana en Datos Ordenados',
      prompt: `Determina la mediana del siguiente conjunto ordenado de datos:\n{ ${arr.join(', ')} }`,
      correct,
      options: shuffle(Array.from(new Set([correct, wrong1, wrong2, wrong3]))),
      explanation: `En un número impar de datos ordenados, la mediana es el dato que ocupa la posición central: ${n2}.`
    };
  },

  'principios-conteo': () => {
    const n1 = rand(3, 7);
    const n2 = rand(2, 5);
    const total = n1 * n2;

    const correct = `${total} combinaciones`;
    const wrong1 = `${n1 + n2} combinaciones`;
    const wrong2 = `${total + rand(2, 6)} combinaciones`;
    const wrong3 = `${total - 1} combinaciones`;

    return {
      title: 'Principio Fundamental de Conteo',
      prompt: `Si un estudiante tiene ${n1} camisetas diferentes y ${n2} pantalones diferentes, ¿cuántas combinaciones distintas de ropa puede formar?`,
      correct,
      options: shuffle(Array.from(new Set([correct, wrong1, wrong2, wrong3]))),
      explanation: `Por el principio multiplicativo: ${n1} × ${n2} = ${total} combinaciones.`
    };
  },

  // =========================================================================
  // GRADO 9°
  // =========================================================================

  // Periodo 1: Sistemas de Ecuaciones Lineales
  'sistemas-2x2-metodos': () => {
    const a = rand(2, 5);
    const b = rand(2, 4);
    const c = rand(10, 30);
    const v = pick(['x', 'y']);
    const otherV = v === 'x' ? 'y' : 'x';

    const type = rand(1, 3);
    if (type === 1) {
      return {
        title: 'Métodos de Sistemas 2x2',
        prompt: `Si de la ecuación ${a}x + ${b}y = ${c} despejas "${v} = (${c} - ${v === 'x' ? b + 'y' : a + 'x'}) / ${v === 'x' ? a : b}" y la insertas en la otra ecuación, aplicas:`,
        correct: 'Método de Sustitución',
        options: shuffle(['Método de Sustitución', 'Método de Igualación', 'Método de Reducción', 'Regla de Cramer']),
        explanation: 'Despejar una incógnita en una ecuación y reemplazarla en la otra es el método de sustitución.'
      };
    } else if (type === 2) {
      return {
        title: 'Métodos de Sistemas 2x2',
        prompt: `Si despejas la misma variable "${v}" en las dos ecuaciones del sistema y formulas una nueva igualdad, aplicas:`,
        correct: 'Método de Igualación',
        options: shuffle(['Método de Igualación', 'Método de Sustitución', 'Método de Reducción', 'Método Matricial']),
        explanation: 'Plantear una sola ecuación igualando ambas expresiones despejadas es igualación.'
      };
    } else {
      const mult = rand(2, 4);
      return {
        title: 'Métodos de Sistemas 2x2',
        prompt: `Si multiplicas la primera ecuación por -${mult} para cancelar los coeficientes de "${otherV}" al sumarlas verticalmente, aplicas:`,
        correct: 'Método de Reducción (Eliminación)',
        options: shuffle(['Método de Reducción (Eliminación)', 'Método de Igualación', 'Método de Sustitución', 'Método Gráfico']),
        explanation: 'Operar las ecuaciones para eliminar una variable sumándolas es el método de reducción.'
      };
    }
  },

  'determinantes-cramer': () => {
    const a = rand(1, 5);
    const b = rand(1, 4);
    const c = rand(1, 4);
    const d = rand(2, 6);
    const det = a * d - b * c;

    const correct = `${det}`;
    const wrong1 = `${a * d + b * c}`;
    const wrong2 = `${det + rand(2, 5)}`;
    const wrong3 = `${det - rand(1, 4)}`;

    return {
      title: 'Determinante de una Matriz 2x2',
      prompt: `Calcula el valor del determinante:\n| ${a}   ${b} |\n| ${c}   ${d} |`,
      correct,
      options: shuffle(Array.from(new Set([correct, wrong1, wrong2, wrong3]))),
      explanation: `Det = (${a} × ${d}) - (${b} × ${c}) = ${a * d} - ${b * c} = ${det}.`
    };
  },

  'racionalizacion': () => {
    const n = pick([2, 3, 5, 6, 7]);
    const correct = `√${n} / ${n}`;
    const wrong1 = `√${n}`;
    const wrong2 = `${n} / √${n}`;
    const wrong3 = `1 / ${n}`;

    return {
      title: 'Racionalización de Denominadores',
      prompt: `¿Cuál es el resultado de racionalizar la expresión: 1 / √${n}?`,
      correct,
      options: shuffle([correct, wrong1, wrong2, wrong3]),
      explanation: `Multiplicando numerador y denominador por √${n}: (1 × √${n}) / (√${n} × √${n}) = √${n} / ${n}.`
    };
  },

  // Periodo 2: Estudio de Funciones
  'concepto-funcion': () => {
    const a = rand(2, 6);
    const b = rand(1, 9);
    const isDomain = Math.random() > 0.5;

    if (isDomain) {
      return {
        title: 'Dominio de Funciones',
        prompt: `Para la función polinómica f(x) = ${a}x - ${b}, ¿cuál es su DOMINIO?`,
        correct: 'Todos los números reales (ℝ)',
        options: shuffle(['Todos los números reales (ℝ)', 'Solo reales positivos', 'Reales excepto el cero', 'Solo números enteros']),
        explanation: 'Las funciones lineales están definidas para cualquier valor de x en los números reales.'
      };
    } else {
      const testVal = rand(1, 4);
      return {
        title: 'Evaluación de Rango',
        prompt: `Dada la función f(x) = ${a}x + ${b}, si x = ${testVal}, ¿cuál es su valor imagen f(${testVal}) en el rango?`,
        correct: `${a * testVal + b}`,
        options: shuffle([`${a * testVal + b}`, `${a * testVal + b + 2}`, `${a * testVal}`, `${a + b}`]),
        explanation: `Sustituyendo x en la función: f(${testVal}) = ${a}(${testVal}) + ${b} = ${a * testVal + b}.`
      };
    }
  },

  'funcion-cuadratica': () => {
    const a = pick([-5, -4, -3, -2, 2, 3, 4, 5]);
    const b = rand(2, 8);
    const c = rand(1, 15);
    const opensUp = a > 0;

    return {
      title: 'Análisis de Parábolas',
      prompt: `Dada la parábola: f(x) = ${a}x² + ${b}x + ${c}\n¿Hacia dónde abren sus ramas según el coeficiente principal a = ${a}?`,
      correct: opensUp ? 'Hacia arriba' : 'Hacia abajo',
      options: ['Hacia arriba', 'Hacia abajo', 'Hacia la derecha', 'Hacia la izquierda'],
      explanation: opensUp
        ? `Como a = ${a} > 0 (positivo), las ramas de la curva abren hacia arriba.`
        : `Como a = ${a} < 0 (negativo), las ramas de la curva abren hacia abajo.`
    };
  },

  'exponencial-logaritmica': () => {
    const base = rand(2, 5);
    const exp = rand(2, 4);
    const pot = Math.pow(base, exp);

    const correct = `${exp}`;
    const wrong1 = `${pot}`;
    const wrong2 = `${base}`;
    const wrong3 = `${exp + 1}`;

    return {
      title: 'Definición de Logaritmo',
      prompt: `Calcula el valor del siguiente logaritmo:\nlog_${base}(${pot}) = ?`,
      correct,
      options: shuffle(Array.from(new Set([correct, wrong1, wrong2, wrong3]))),
      explanation: `Por definición de logaritmo: buscamos a qué exponente se eleva la base ${base} para obtener ${pot}. Como ${base}^${exp} = ${pot}, la respuesta es ${exp}.`
    };
  },

  // Periodo 3: Semejanza y Teorema de Tales
  'teorema-tales': () => {
    const a = rand(2, 6);
    const k = rand(2, 4);
    const b = a * k;
    const c = rand(3, 7);
    const targetX = c * k;

    const correct = `${targetX}`;
    const wrong1 = `${targetX + rand(2, 4)}`;
    const wrong2 = `${targetX - rand(1, 3)}`;
    const wrong3 = `${a * c}`;

    return {
      title: 'Teorema de Tales',
      prompt: `Rectas paralelas cortadas por secantes generan segmentos proporcionales:\n${a} / ${b} = ${c} / x\n¿Cuánto mide el segmento x?`,
      correct,
      options: shuffle(Array.from(new Set([correct, wrong1, wrong2, wrong3]))),
      explanation: `Por el Teorema de Tales: x = (${b} × ${c}) / ${a} = ${targetX}.`
    };
  },

  'escalas-planos': () => {
    const esc = pick([50, 100, 200, 500]);
    const cm = rand(2, 8);
    const meters = (cm * esc) / 100;

    const correct = `${meters} m`;
    const wrong1 = `${meters * 10} m`;
    const wrong2 = `${(meters / 2).toFixed(1)} m`;
    const wrong3 = `${cm * esc} m`;

    return {
      title: 'Escalas Numéricas en Planos',
      prompt: `En un plano a escala 1:${esc}, un segmento mide ${cm} cm.\n¿A cuántos metros (m) equivale en la realidad?`,
      correct,
      options: shuffle(Array.from(new Set([correct, wrong1, wrong2, wrong3]))),
      explanation: `${cm} cm × ${esc} = ${cm * esc} cm. Convirtiendo a metros (dividido entre 100) = ${meters} m.`
    };
  },

  'cuerpos-redondos': () => {
    const r = rand(2, 8);
    const h = rand(4, 12);
    const type = rand(1, 3);

    if (type === 1) {
      return {
        title: 'Cilindro Recto',
        prompt: `Un cilindro se genera rotando un rectángulo de base r = ${r} cm y altura h = ${h} cm sobre su eje.\n¿Qué forma tiene la base de este cuerpo?`,
        correct: 'Círculo de radio ' + r + ' cm',
        options: shuffle(['Círculo de radio ' + r + ' cm', 'Rectángulo plano', 'Elipse inclinada', 'Triángulo']),
        explanation: 'La rotación de un lado perpendicular al eje genera secciones circulares de radio r.'
      };
    } else if (type === 2) {
      return {
        title: 'Cono Recto',
        prompt: `Un cono recto se obtiene al girar un triángulo rectángulo de catetos ${r} cm (radio) y ${h} cm (altura).\n¿Qué nombre recibe la hipotenusa al rotar?`,
        correct: 'Generatriz',
        options: shuffle(['Generatriz', 'Directriz', 'Diámetro', 'Apotema de la base']),
        explanation: 'En los cuerpos de revolución cónicos, la hipotenusa que engendra la superficie curva se llama generatriz.'
      };
    } else {
      return {
        title: 'Esfera',
        prompt: `Al girar un semicírculo de diámetro ${r * 2} cm sobre su propio eje, se forma una esfera de radio:`,
        correct: `${r} cm`,
        options: shuffle([`${r} cm`, `${r * 2} cm`, `${r * 4} cm`, `${(r / 2).toFixed(1)} cm`]),
        explanation: `El radio de la esfera resultante es la mitad de su diámetro: ${r * 2} / 2 = ${r} cm.`
      };
    }
  },

  // Periodo 4: Probabilidad Avanzada
  'espacio-muestral-eventos': () => {
    const scenarioType = rand(1, 4);

    if (scenarioType === 1) {
      const coins = rand(1, 3);
      const dieFaces = pick([6, 8, 12]);
      const coinOutcomes = Math.pow(2, coins);
      const total = coinOutcomes * dieFaces;

      const correct = `${total}`;
      const wrong1 = `${coinOutcomes + dieFaces}`;
      const wrong2 = `${total + rand(2, 6)}`;
      const wrong3 = `${Math.max(2, total - rand(2, 4))}`;

      return {
        title: 'Espacio Muestral Compuesto',
        prompt: `Se lanza(n) ${coins} moneda(s) al aire y simultáneamente un dado de ${dieFaces} caras.\n\n¿Cuál es el número total de elementos del espacio muestral (S)?`,
        correct,
        options: shuffle(Array.from(new Set([correct, wrong1, wrong2, wrong3]))),
        explanation: `Por principio multiplicativo: (2^${coins}) × ${dieFaces} = ${coinOutcomes} × ${dieFaces} = ${total} resultados posibles.`
      };
    }

    if (scenarioType === 2) {
      const diceCount = rand(2, 3);
      const faces = pick([4, 6]);
      const total = Math.pow(faces, diceCount);

      const correct = `${total}`;
      const wrong1 = `${faces * diceCount}`;
      const wrong2 = `${total + rand(4, 8)}`;
      const wrong3 = `${Math.pow(faces, diceCount - 1)}`;

      return {
        title: 'Espacio Muestral en Dados',
        prompt: `Se lanzan simultáneamente ${diceCount} dados de ${faces} caras cada uno.\n\n¿Cuántos resultados posibles conforman el espacio muestral total?`,
        correct,
        options: shuffle(Array.from(new Set([correct, wrong1, wrong2, wrong3]))),
        explanation: `Cada dado tiene ${faces} posibilidades: ${faces}^${diceCount} = ${total} resultados posibles.`
      };
    }

    if (scenarioType === 3) {
      const digits = rand(3, 4);
      const total = Math.pow(10, digits);

      const correct = `${total}`;
      const wrong1 = `${digits * 10}`;
      const wrong2 = `${total / 10}`;
      const wrong3 = `${total + 100}`;

      return {
        title: 'Espacio Muestral de Códigos',
        prompt: `Un candado de seguridad se abre con una combinación de ${digits} dígitos (del 0 al 9, permitiendo repetición).\n\n¿Cuántas combinaciones posibles existen en su espacio muestral?`,
        correct,
        options: shuffle(Array.from(new Set([correct, wrong1, wrong2, wrong3]))),
        explanation: `Cada posición tiene 10 opciones (0 al 9): 10^${digits} = ${total} combinaciones posibles.`
      };
    }

    const c1 = rand(3, 5);
    const c2 = rand(2, 4);
    const c3 = rand(2, 3);
    const total = c1 * c2 * c3;

    const correct = `${total}`;
    const wrong1 = `${c1 + c2 + c3}`;
    const wrong2 = `${total + rand(3, 6)}`;
    const wrong3 = `${(c1 * c2) + c3}`;

    return {
      title: 'Espacio Muestral Combinatorio',
      prompt: `Un menú escolar permite armar un almuerzo eligiendo:\n• 1 plato de entrada (entre ${c1} opciones)\n• 1 plato principal (entre ${c2} opciones)\n• 1 postre o bebida (entre ${c3} opciones)\n\n¿Cuántos almuerzos diferentes conforman el espacio muestral?`,
      correct,
      options: shuffle(Array.from(new Set([correct, wrong1, wrong2, wrong3]))),
      explanation: `Multiplicando las opciones de cada etapa: ${c1} × ${c2} × ${c3} = ${total} eventos posibles.`
    };
  },

  'calculo-probabilidades': () => {
    const experimentType = rand(1, 2);

    if (experimentType === 1) {
      // Experimento 1: Canicas de colores
      const colors = ['rojas', 'azules', 'verdes', 'amarillas'];
      const selectedColor = pick(colors);

      const c1 = rand(2, 7);
      const c2 = rand(2, 6);
      const c3 = rand(2, 5);
      const total = c1 + c2 + c3;

      const remainingColors = colors.filter((c) => c !== selectedColor);
      const otherColor1 = remainingColors[0];
      const otherColor2 = remainingColors[1];

      const fav = c1;
      const div = gcd(fav, total);
      const simpNum = fav / div;
      const simpDen = total / div;

      const correct = `${simpNum}/${simpDen}`;
      
      // Opciones distractoras bien formadas (favorables / total)
      const wrong1 = `${Math.min(simpNum + 1, simpDen - 1)}/${simpDen}`;
      const wrong2 = `${Math.max(1, simpNum - 1)}/${simpDen}`;
      const wrong3 = `${simpNum}/${simpDen + 2}`;

      const options = Array.from(new Set([correct, wrong1, wrong2, wrong3]));
      while (options.length < 4) {
        options.push(`${rand(1, 4)}/${simpDen + options.length}`);
      }

      return {
        title: 'Probabilidad Clásica (Regla de Laplace)',
        prompt: `Una bolsa contiene:\n• ${c1} canicas ${selectedColor}\n• ${c2} canicas ${otherColor1}\n• ${c3} canicas ${otherColor2}\n\nSi se extrae una canica al azar, ¿cuál es la probabilidad simplificada de que sea ${selectedColor}?`,
        correct,
        options: shuffle(options),
        explanation: `Total = ${c1} + ${c2} + ${c3} = ${total} canicas. Favorables (${selectedColor}) = ${fav}. Probabilidad = ${fav}/${total} = ${correct}.`
      };
    } else {
      // Experimento 2: Ruleta numerada
      const maxNumber = rand(10, 20); // total de sectores (ej. 17)
      const threshold = rand(4, maxNumber - 3); // punto de corte (ej. 8)
      const isGreaterThan = Math.random() > 0.5;

      let fav = 0;
      let conditionText = '';

      if (isGreaterThan) {
        fav = maxNumber - threshold;
        conditionText = `un número mayor que ${threshold}`;
      } else {
        fav = threshold;
        conditionText = `un número menor o igual que ${threshold}`;
      }

      const div = gcd(fav, maxNumber);
      const simpNum = fav / div;
      const simpDen = maxNumber / div;

      // Respuesta correcta SIEMPRE: numerador < denominador
      const correct = `${simpNum}/${simpDen}`;
      
      // Distractores que siempre mantienen la forma propia (n < d)
      const wrong1 = `${Math.min(simpNum + 1, simpDen - 1)}/${simpDen}`;
      const wrong2 = `${Math.max(1, simpNum - 1)}/${simpDen}`;
      const wrong3 = `${simpNum}/${simpDen + 1}`;

      const options = Array.from(new Set([correct, wrong1, wrong2, wrong3]));
      while (options.length < 4) {
        options.push(`${Math.max(1, simpNum - options.length)}/${simpDen}`);
      }

      return {
        title: 'Probabilidad Clásica (Regla de Laplace)',
        prompt: `Se hace girar una ruleta dividida en ${maxNumber} sectores iguales numerados del 1 al ${maxNumber}.\n\n¿Cuál es la probabilidad simplificada de obtener ${conditionText}?`,
        correct,
        options: shuffle(options),
        explanation: `Casos posibles = ${maxNumber}. Casos favorables (${conditionText}) = ${fav}. Probabilidad = ${fav}/${maxNumber} = ${correct}.`
      };
    }
  },
};