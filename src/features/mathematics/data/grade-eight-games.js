const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

export function generateGradeEightChallenge(topicId = '') {
  const tid = String(topicId).toLowerCase();

  // =========================================================================
  // PERIODO 3: GEOMETRÍA Y TEOREMA DE PITÁGORAS (Evaluado primero por especificidad)
  // =========================================================================

  // 3.1 Teorema de Pitágoras (Hallar hipotenusa o cateto faltante)
  if (tid.includes('pitagoras')) {
    const triples = [
      { a: 3, b: 4, c: 5 },
      { a: 6, b: 8, c: 10 },
      { a: 5, b: 12, c: 13 },
      { a: 8, b: 15, c: 17 },
      { a: 9, b: 12, c: 15 },
      { a: 7, b: 24, c: 25 },
    ];
    const t = pick(triples);
    const findHypotenuse = Math.random() > 0.45;

    if (findHypotenuse) {
      return {
        type: 'pythagoras',
        period: 3,
        title: 'Teorema de Pitágoras',
        badge: `a = ${t.a}  |  b = ${t.b}  |  c = ?`,
        sideA: t.a,
        sideB: t.b,
        sideC: '?',
        expected: t.c,
        formulaHint: 'Fórmula general: c² = a² + b²',
        prompt: `Calcula la longitud exacta de la hipotenusa (c) para un triángulo rectángulo con catetos a = ${t.a} y b = ${t.b}:`,
        failHint: `Eleva ambos catetos al cuadrado (${t.a}² + ${t.b}²), súmalos y extrae la raíz cuadrada.`,
        learnConcept: 'En todo triángulo rectángulo, el cuadrado de la hipotenusa es igual a la suma de los cuadrados de los dos catetos.',
        howToPlay: '1. Observa las medidas de los catetos en el triángulo. 2. Aplica c = √(a² + b²). 3. Escribe el valor exacto.',
      };
    } else {
      return {
        type: 'pythagoras',
        period: 3,
        title: 'Teorema de Pitágoras (Cateto)',
        badge: `a = ${t.a}  |  b = ?  |  c = ${t.c}`,
        sideA: t.a,
        sideB: '?',
        sideC: t.c,
        expected: t.b,
        formulaHint: 'Despeje de cateto: b² = c² - a²',
        prompt: `Si la hipotenusa mide c = ${t.c} y un cateto mide a = ${t.a}, ¿cuánto mide el cateto faltante (b)?`,
        failHint: `Resta el cuadrado del cateto al cuadrado de la hipotenusa (${t.c}² - ${t.a}²) y saca la raíz cuadrada.`,
        learnConcept: 'Para hallar un cateto desconocido, se resta al cuadrado de la hipotenusa el cuadrado del cateto conocido y se extrae la raíz.',
        howToPlay: '1. Identifica la hipotenusa y el cateto dado. 2. Calcula b = √(c² - a²). 3. Ingresa el resultado.',
      };
    }
  }

  // 3.2 Área y volumen de prismas y cilindros
  if (tid.includes('prisma') || tid.includes('cilindro') || tid.includes('volumen') || tid.includes('area')) {
    const isCylinder = Math.random() > 0.5;
    if (isCylinder) {
      const r = pick([2, 3, 4, 5]);
      const h = pick([5, 6, 8, 10]);
      // Usando π ≈ 3 para cálculo mental exacto o pidiendo el coeficiente de π
      const coefPi = r * r * h;
      return {
        type: 'geometry-3d',
        shape: 'cylinder',
        period: 3,
        title: 'Volumen de Cilindros',
        badge: `r = ${r} cm  |  h = ${h} cm`,
        r,
        h,
        expected: coefPi,
        formulaHint: 'Volumen del cilindro: V = π · r² · h',
        prompt: `Expresa el volumen del cilindro en términos de π (V = ? · π cm³). ¿Cuál es el valor numérico que multiplica a π?`,
        failHint: `Eleva el radio al cuadrado (${r}²) y multiplícalo por la altura (${h}).`,
        learnConcept: 'El volumen de un cilindro recto se obtiene multiplicando el área de su base circular (π·r²) por su altura (h).',
        howToPlay: '1. Eleva el radio al cuadrado. 2. Multiplica ese resultado por la altura h. 3. Escribe el coeficiente que acompaña a π.',
      };
    } else {
      const l = rand(3, 7);
      const w = rand(2, 6);
      const h = rand(4, 9);
      return {
        type: 'geometry-3d',
        shape: 'prism',
        period: 3,
        title: 'Volumen de Prismas',
        badge: `Base: ${l}×${w} cm  |  h = ${h} cm`,
        l,
        w,
        h,
        expected: l * w * h,
        formulaHint: 'Volumen del prisma: V = Área_base × h',
        prompt: `Calcula el volumen total en cm³ de un prisma rectangular con base de ${l} cm por ${w} cm y altura de ${h} cm:`,
        failHint: `Multiplica las tres dimensiones: largo × ancho × altura.`,
        learnConcept: 'El volumen de cualquier prisma recto equivale al producto del área de su base poligonal por su altura.',
        howToPlay: '1. Calcula el área del rectángulo base. 2. Multiplica por la altura del prisma. 3. Escribe el volumen total.',
      };
    }
  }

  // 3.3 Congruencia y semejanza de triángulos
  if (tid.includes('congruencia') || tid.includes('semejanza') || tid.includes('triangulo') || tid.includes('geometria')) {
    const mode = Math.random() > 0.5 ? 'scale' : 'criteria';
    if (mode === 'scale') {
      const a = rand(3, 7);
      const b = rand(4, 9);
      const k = pick([2, 3, 4]);
      return {
        type: 'numeric',
        period: 3,
        title: 'Semejanza de Triángulos (Razón de Thales)',
        badge: `Δ1: (${a}, ${b})  ∼  Δ2: (${a * k}, x)`,
        expected: b * k,
        formulaHint: 'Lados homólogos proporcionales: a / a\' = b / b\'',
        prompt: `Dos triángulos son semejantes. Si los lados del primero miden ${a} y ${b}, y en el segundo el lado homólogo al primero mide ${a * k}, ¿cuánto mide el lado x?`,
        failHint: 'Halla la razón de ampliación dividiendo los lados homólogos conocidos y multiplica por el segundo lado.',
        learnConcept: 'Dos triángulos son semejantes si tienen sus ángulos iguales y sus lados correspondientes son proporcionales según una razón k.',
        howToPlay: '1. Determina por cuánto se multiplicó el primer lado. 2. Aplica ese mismo factor al segundo lado. 3. Escribe el valor de x.',
      };
    } else {
      const cases = [
        { desc: 'Dos triángulos tienen sus tres lados correspondientes exactamente iguales.', ans: 'LLL (Lado-Lado-Lado)' },
        { desc: 'Dos triángulos tienen dos lados iguales y el ángulo comprendido entre ellos idéntico.', ans: 'LAL (Lado-Ángulo-Lado)' },
        { desc: 'Dos triángulos tienen dos ángulos iguales y el lado adyacente entre ellos de igual medida.', ans: 'ALA (Ángulo-Lado-Ángulo)' },
      ];
      const chosen = pick(cases);
      return {
        type: 'multiple-choice',
        period: 3,
        title: 'Criterios de Congruencia',
        badge: 'Postulados Geométricos',
        scenarioText: chosen.desc,
        expectedStr: chosen.ans,
        options: ['LLL (Lado-Lado-Lado)', 'LAL (Lado-Ángulo-Lado)', 'ALA (Ángulo-Lado-Ángulo)'],
        formulaHint: 'Criterios de congruencia: LLL, LAL, ALA',
        prompt: 'Según la condición descrita, ¿qué criterio garantiza la congruencia de ambos triángulos?',
        failHint: 'Analiza las iniciales de los elementos dados: L para Lado y A para Ángulo.',
        learnConcept: 'Los criterios de congruencia permiten demostrar que dos triángulos son idénticos en forma y tamaño sin medir todas sus partes.',
        howToPlay: '1. Lee los datos conocidos del par de triángulos. 2. Identifica la secuencia de lados y ángulos. 3. Selecciona el criterio.',
      };
    }
  }

  // =========================================================================
  // PERIODO 4: ESTADÍSTICA, PROBABILIDAD Y CONTEO
  // =========================================================================

  // 4.2 Técnicas de conteo y permutaciones
  if (tid.includes('conteo') || tid.includes('permutacion') || tid.includes('combinatoria')) {
    const isFactorial = Math.random() > 0.5;
    if (isFactorial) {
      const n = pick([3, 4, 5]);
      const facts = { 3: 6, 4: 24, 5: 120 };
      return {
        type: 'numeric',
        period: 4,
        title: 'Permutaciones Lineales',
        badge: `P(${n}) = ${n}!`,
        expected: facts[n],
        formulaHint: 'Permutación sin repetición: P(n) = n! = n × (n-1) × ... × 1',
        prompt: `¿De cuántas formas distintas se pueden ordenar en una fila ${n} elementos diferentes sin repetir ninguno?`,
        failHint: `Calcula el factorial de ${n} multiplicando todos los enteros positivos desde 1 hasta ${n}.`,
        learnConcept: 'Una permutación lineal cuenta todas las ordenaciones posibles donde sí importa el orden y participan todos los elementos.',
        howToPlay: '1. Identifica el total de elementos n. 2. Calcula el producto factorial n!. 3. Escribe el total de arreglos.',
      };
    } else {
      const shirts = rand(3, 6);
      const pants = rand(2, 5);
      const shoes = rand(2, 3);
      return {
        type: 'numeric',
        period: 4,
        title: 'Principio Multiplicativo de Conteo',
        badge: `${shirts} opciones × ${pants} opciones × ${shoes} opciones`,
        expected: shirts * pants * shoes,
        formulaHint: 'Total de combinaciones = m × n × p',
        prompt: `Un sistema permite elegir entre ${shirts} procesadores, ${pants} memorias RAM y ${shoes} chasis. ¿Cuántas configuraciones distintas se pueden armar?`,
        failHint: 'Por el principio multiplicativo, multiplica entre sí el número de opciones de cada etapa.',
        learnConcept: 'Si un evento ocurre de m formas y otro independiente de n formas, ambos eventos sucesivos ocurren de m × n maneras.',
        howToPlay: '1. Identifica las opciones de cada categoría. 2. Multiplica las cantidades entre sí. 3. Escribe el número total.',
      };
    }
  }

  // 4.3 Probabilidad de eventos simples y compuestos
  if (tid.includes('probabilidad') || tid.includes('evento') || tid.includes('azar')) {
    const cases = [
      { badge: 'Dado de 6 caras: sacar número primo', fav: 3, total: 6, ans: '1/2', opts: ['1/2', '1/3', '2/3', '1/6'] },
      { badge: 'Dado de 6 caras: sacar múltiplo de 3', fav: 2, total: 6, ans: '1/3', opts: ['1/3', '1/2', '1/6', '2/3'] },
      { badge: 'Lanzar 2 monedas al aire: sacar 2 caras', fav: 1, total: 4, ans: '1/4', opts: ['1/4', '1/2', '3/4', '1/3'] },
      { badge: 'Urna con 3 rojas y 5 azules: sacar roja', fav: 3, total: 8, ans: '3/8', opts: ['3/8', '5/8', '3/5', '1/8'] },
      { badge: 'Urna con 4 verdes y 6 amarillas: sacar verde', fav: 4, total: 10, ans: '2/5', opts: ['2/5', '3/5', '4/6', '1/5'] },
    ];
    const chosen = pick(cases);
    return {
      type: 'multiple-choice',
      period: 4,
      title: 'Regla de Laplace y Probabilidad',
      badge: chosen.badge,
      expectedStr: chosen.ans,
      options: chosen.opts.sort(() => Math.random() - 0.5),
      formulaHint: 'P(A) = Casos Favorables ÷ Casos Posibles (Simplificado)',
      prompt: 'Calcula la probabilidad del evento expresada como una fracción irreducible:',
      failHint: 'Cuenta cuántos casos cumplen la condición, divídelo por el espacio muestral total y simplifica la fracción.',
      learnConcept: 'La ley de Laplace define la probabilidad de un suceso equiprobable como el cociente entre los casos favorables y el total de casos posibles.',
      howToPlay: '1. Determina los casos favorables y los totales. 2. Simplifica la fracción resultante. 3. Selecciona la ficha correcta.',
    };
  }

  // 4.1 Estadística: Medidas de tendencia central y dispersión
  if (tid.includes('estadistica') || tid.includes('tendencia') || tid.includes('media') || tid.includes('datos')) {
    const base = rand(4, 12);
    // Conjunto de 5 datos simétricos para que la media y mediana sean enteras pero no obvias a simple vista
    const d1 = base - 3;
    const d2 = base - 1;
    const d3 = base;
    const d4 = base + 1;
    const d5 = base + 3;
    const data = [d2, d5, d1, d4, d3]; // Desordenados
    const askMean = Math.random() > 0.4;

    return {
      type: 'stats-chart',
      period: 4,
      title: 'Medidas de Tendencia Central',
      badge: `Datos: [ ${data.join(' , ')} ]`,
      dataValues: data,
      expected: base,
      formulaHint: askMean ? 'Media (x̄) = Suma de datos ÷ Total de datos' : 'Mediana (Me) = Dato central tras ordenar de menor a mayor',
      prompt: askMean
        ? `Calcula el promedio o Media Aritmética (x̄) del conjunto de datos registrados:`
        : `Ordena el conjunto de datos de menor a mayor y encuentra el valor de la Mediana (Me):`,
      failHint: askMean
        ? 'Suma los 5 valores del conjunto y divide el resultado total entre 5.'
        : 'Ordena los 5 números de menor a mayor; la mediana es el número que queda exactamente en la tercera posición.',
      learnConcept: 'La media aritmética es el centro de gravedad de los datos, mientras que la mediana divide la muestra ordenada en dos partes iguales.',
      howToPlay: '1. Analiza la serie de datos y el gráfico de barras. 2. Realiza el cálculo de promedio u ordenamiento. 3. Escribe el valor.',
    };
  }

  // =========================================================================
  // PERIODO 2: PRODUCTOS NOTABLES, FACTORIZACIÓN Y FUNCIONES
  // =========================================================================

  // 2.3 Función lineal y afín (f(x) = mx + b)
  if (tid.includes('funcion') || tid.includes('afin') || tid.includes('pendiente') || tid.includes('recta')) {
    const m = pick([-3, -2, 2, 3, 4, 5]);
    const b = pick([-6, -4, -2, 3, 5, 7]);
    const xVal = rand(-2, 4);
    const yVal = m * xVal + b;
    const signB = b >= 0 ? `+ ${b}` : `- ${Math.abs(b)}`;

    return {
      type: 'linear-function',
      period: 2,
      title: 'Función Afín y Pendiente',
      badge: `f(x) = ${m}x ${signB}`,
      m,
      b,
      xVal,
      expected: yVal,
      formulaHint: 'Evaluación funcional: f(x) = m·x + b',
      prompt: `Dada la función lineal f(x) = ${m}x ${signB}, calcula el valor de la imagen cuando x = ${xVal}:`,
      failHint: `Sustituye x por ${xVal}: multiplica (${m} × ${xVal}) y luego aplica ${signB} respetando la ley de signos.`,
      learnConcept: 'Una función afín tiene la forma f(x) = mx + b, donde m es la pendiente de inclinación de la recta y b es el corte con el eje Y.',
      howToPlay: '1. Observa la función y su gráfica en el plano. 2. Reemplaza la variable x por el valor indicado. 3. Escribe la coordenada y resultante.',
    };
  }

  // 2.2 Casos de factorización
  if (tid.includes('factorizacion') || tid.includes('factor') || tid.includes('trinomio')) {
    const r1 = rand(2, 6);
    const r2 = rand(2, 6);
    const sum = r1 + r2;
    const prod = r1 * r2;
    const correct = `(x + ${r1})(x + ${r2})`;
    const opt2 = `(x + ${prod})(x + 1)`;
    const opt3 = `(x - ${r1})(x - ${r2})`;
    const opt4 = `(x + ${sum})(x + ${prod})`;

    return {
      type: 'multiple-choice',
      period: 2,
      title: 'Factorización de Trinomios',
      badge: `x² + ${sum}x + ${prod}`,
      expectedStr: correct,
      options: Array.from(new Set([correct, opt2, opt3, opt4])).slice(0, 3).sort(() => Math.random() - 0.5),
      formulaHint: 'x² + (a+b)x + (a·b) = (x + a)(x + b)',
      prompt: `Factoriza el trinomio buscando dos números que sumados den ${sum} y multiplicados den ${prod}:`,
      failHint: `Busca dos factores cuyo producto sea ${prod} y cuya suma sea exactamente ${sum}.`,
      learnConcept: 'Factorizar un polinomio consiste en transformarlo en el producto de dos o más factores primos algebraicos.',
      howToPlay: '1. Analiza el coeficiente del término central y el término independiente. 2. Halla el par de números que cumplen ambas condiciones. 3. Elige los binomios.',
    };
  }

  // 2.1 Productos notables (Binomio al cuadrado y suma por diferencia)
  if (tid.includes('producto') || tid.includes('notable') || tid.includes('binomio')) {
    const isDiffSquares = Math.random() > 0.5;
    const a = rand(3, 9);

    if (isDiffSquares) {
      return {
        type: 'numeric',
        period: 2,
        title: 'Producto Notable: Suma por Diferencia',
        badge: `(x + ${a})(x - ${a}) = x² - k`,
        expected: a * a,
        formulaHint: '(x + a)(x - a) = x² - a²',
        prompt: `Al desarrollar el producto notable (x + ${a})(x - ${a}), se obtiene x² - k. ¿Cuál es el valor numérico positivo de k?`,
        failHint: 'El producto de la suma por la diferencia de dos cantidades es igual al cuadrado de la primera menos el cuadrado de la segunda.',
        learnConcept: 'Al multiplicar binomios conjugados (x + a)(x - a), los términos cruzados se cancelan y resulta una diferencia de cuadrados.',
        howToPlay: '1. Identifica el término constante del binomio conjugado. 2. Elévalo al cuadrado. 3. Escribe el valor de k.',
      };
    } else {
      return {
        type: 'numeric',
        period: 2,
        title: 'Cuadrado de un Binomio',
        badge: `(x + ${a})² = x² + bx + ${a * a}`,
        expected: 2 * a,
        formulaHint: '(x + a)² = x² + 2·a·x + a²',
        prompt: `En el desarrollo del binomio al cuadrado (x + ${a})², ¿cuál es el coeficiente central (b) que acompaña a la x?`,
        failHint: 'El término central de un trinomio cuadrado perfecto es el doble producto del primero por el segundo (2 · a).',
        learnConcept: 'Un binomio al cuadrado es igual al cuadrado del primer término, más el doble producto del primero por el segundo, más el cuadrado del segundo.',
        howToPlay: '1. Observa el número dentro del paréntesis. 2. Calcula el doble producto (2 × a). 3. Ingresa el coeficiente b.',
      };
    }
  }

  // =========================================================================
  // PERIODO 1: NÚMEROS REALES Y EXPRESIONES ALGEBRAICAS
  // =========================================================================

  // 1.1 Números reales (Racionales vs Irracionales)
  if (tid.includes('real') || tid.includes('irracional') || tid.includes('racional')) {
    const isIrrational = Math.random() > 0.5;
    const irrationals = ['√2', '√3', 'π', '√5', '-√7', '2π', '√11'];
    const rationals = ['√25', '-3/4', '0.333...', '√81', '-12', '7/5', '√100'];
    const chosen = isIrrational ? pick(irrationals) : pick(rationals);

    return {
      type: 'multiple-choice',
      period: 1,
      title: 'Conjunto de los Números Reales (ℝ)',
      badge: chosen,
      expectedStr: isIrrational ? 'Irracional (𝕀)' : 'Racional (ℚ)',
      options: ['Racional (ℚ)', 'Irracional (𝕀)'],
      formulaHint: 'ℝ = Racionales (ℚ) ∪ Irracionales (𝕀)',
      prompt: `Clasifica el número real "${chosen}" según la naturaleza de su expansión decimal:`,
      failHint: 'Las raíces inexactas y π tienen infinitos decimales no periódicos (Irracionales). Las raíces exactas, enteros y fracciones son Racionales.',
      learnConcept: 'Los números racionales pueden escribirse como fracción de enteros (incluyendo raíces exactas); los irracionales tienen decimales infinitos sin periodo.',
      howToPlay: '1. Evalúa si la raíz es exacta o si el número puede expresarse como fracción. 2. Elige Racional o Irracional. 3. Comprueba.',
    };
  }

  // 1.3 Operaciones aditivas y multiplicativas con polinomios
  if (tid.includes('operacion') || tid.includes('polinomio') || tid.includes('suma') || tid.includes('multiplicacion')) {
    const a1 = rand(2, 7);
    const b1 = rand(2, 6);
    const a2 = rand(2, 6);
    const b2 = rand(1, 5);
    const isSub = Math.random() > 0.5;

    const coefX = isSub ? a1 - a2 : a1 + a2;
    return {
      type: 'numeric',
      period: 1,
      title: 'Operaciones con Polinomios',
      badge: `(${a1}x² + ${b1}x) ${isSub ? '-' : '+'} (${a2}x² - ${b2}x)`,
      expected: coefX,
      formulaHint: 'Reducción de términos semejantes de igual grado',
      prompt: `Al resolver la operación entre ambos polinomios y reducir términos semejantes, ¿cuál es el coeficiente final que acompaña a x²?`,
      failHint: `Opera únicamente los coeficientes que tienen parte literal x²: ${a1} ${isSub ? '-' : '+'} ${a2}.`,
      learnConcept: 'Para sumar o restar polinomios se agrupan y operan únicamente los coeficientes de los términos semejantes (los que tienen la misma letra y el mismo exponente).',
      howToPlay: '1. Identifica los términos con x² en ambos paréntesis. 2. Aplica el signo de suma o resta entre ellos. 3. Escribe el coeficiente resultante.',
    };
  }

  // 1.2 Expresiones algebraicas y valor numérico (Por defecto para Periodo 1)
  const a = rand(2, 4);
  const b = rand(2, 6);
  const xVal = pick([-2, -1, 2, 3]);
  const expected = a * (xVal * xVal) - b * xVal;

  return {
    type: 'numeric',
    period: 1,
    title: 'Valor Numérico de Polinomios',
    badge: `P(x) = ${a}x² - ${b}x   para  x = ${xVal}`,
    expected,
    formulaHint: 'Jerarquía: 1° Potencias  ➔  2° Multiplicaciones  ➔  3° Sumas y restas',
    prompt: `Evalúa el polinomio P(x) sustituyendo la variable por x = ${xVal}:`,
    failHint: `Primero calcula (${xVal})², multiplícalo por ${a}, y luego réstale el producto de ${b} por (${xVal}) cuidando los signos.`,
    learnConcept: 'El valor numérico de una expresión algebraica es el número real que se obtiene al sustituir las variables por valores específicos y efectuar las operaciones.',
    howToPlay: '1. Sustituye la x por el número indicado entre paréntesis. 2. Resuelve primero el exponente al cuadrado. 3. Multiplica y resta respetando signos.',
  };
}