const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

export function generateGradeSevenChallenge(topicId = '') {
  const tid = String(topicId).toLowerCase();

  // =========================================================================
  // PERIODO 1: RELACIONES Y ECUACIONES ALGEBRAICAS
  // =========================================================================

  // 1.2 Constantes, variables e incógnitas
  if (tid.includes('variable') || tid.includes('constante') || tid.includes('incognita')) {
    const isVar = Math.random() > 0.5;
    const variables = ['-5x²', '3ab', 'x/4', '-7y³', '2πr', 'm²/2', '-k/3'];
    const constantes = ['-18', '√49', '3/4', 'π', '-0.75', '10²', '-√16', '√64'];
    const chosen = isVar ? pick(variables) : pick(constantes);

    return {
      type: 'classifier',
      period: 1,
      title: 'Clasificación Algebraica',
      badge: chosen,
      isVariable: isVar,
      formulaHint: 'Variables = letras incógnitas | Constantes = valores numéricos fijos',
      prompt: `¿La expresión "${chosen}" es una Variable o una Constante?`,
      failHint: 'Recuerda: si contiene letras con valores que varían es Variable; si es un valor numérico fijo es Constante.',
      learnConcept: 'Una constante tiene un valor numérico inmutable (como enteros, fracciones o raíces exactas). Una variable utiliza letras para representar cantidades desconocidas.',
      howToPlay: '1. Analiza el término en la caja azul. 2. Determina si tiene literales o si es solo un número. 3. Pulsa Variable o Constante y comprueba.',
    };
  }

  // 1.3 Conjunto solución y valores de incógnitas
  if (tid.includes('solucion') || tid.includes('conjunto') || tid.includes('inecuacion')) {
    const a = pick([2, 3, 4]);
    const b = rand(2, 8);
    const c = rand(10, 24);
    const isGreater = Math.random() > 0.5;
    const isSum = Math.random() > 0.5;

    const testVal = rand(-2, 7);
    const leftSide = isSum ? a * testVal + b : a * testVal - b;
    const satisfies = isGreater ? leftSide > c : leftSide < c;

    const exprBadge = `${a}x ${isSum ? '+' : '-'} ${b} ${isGreater ? '>' : '<'} ${c}`;

    return {
      type: 'inequality',
      period: 1,
      title: 'Conjunto Solución',
      badge: exprBadge,
      expectedChoice: satisfies ? 'Sí pertenece' : 'No pertenece',
      formulaHint: `Condición a verificar para x = ${testVal}`,
      prompt: `Si x = ${testVal}, ¿este valor pertenece al conjunto solución de la inecuación?`,
      failHint: 'Sustituye la x por el valor propuesto, realiza las operaciones y verifica si se cumple la desigualdad.',
      learnConcept: 'Un número pertenece al conjunto solución si al sustituirlo en la desigualdad, la relación matemática resulta verdadera.',
      howToPlay: '1. Reemplaza la x por el número propuesto. 2. Realiza la multiplicación y suma/resta. 3. Decide si la desigualdad se cumple o no.',
    };
  }

  // =========================================================================
  // PERIODO 2: NÚMEROS RACIONALES (Orden estricto para evitar cruces de ID)
  // =========================================================================

  // 2.3 Conversión y operaciones con expresiones decimales
  if (tid.includes('decimal') || tid.includes('conversion') || tid.includes('expresiones')) {
    const pairs = [
      { dec: '0.125', frac: '1/8' },
      { dec: '0.375', frac: '3/8' },
      { dec: '0.625', frac: '5/8' },
      { dec: '0.875', frac: '7/8' },
      { dec: '0.15', frac: '3/20' },
      { dec: '0.35', frac: '7/20' },
      { dec: '0.45', frac: '9/20' },
    ];
    const target = pick(pairs);

    return {
      type: 'decimal-match',
      period: 2,
      title: 'Fracción Generatriz Irreducible',
      badge: target.dec,
      expectedStr: target.frac,
      options: pairs.map((p) => p.frac).sort(() => Math.random() - 0.5),
      formulaHint: 'Decimal exacto ➔ Fracción irreducible simplificada',
      prompt: `Selecciona la fracción irreducible equivalente al decimal ${target.dec}:`,
      failHint: 'Expresa el decimal como fracción sobre base 10 o 100 y simplifica dividiendo por factores primos comunes.',
      learnConcept: 'Los números decimales exactos se convierten a fracción decimal y luego se simplifican hasta llegar a una fracción irreducible.',
      howToPlay: '1. Observa el número decimal en la caja azul. 2. Identifica la fracción equivalente simplificada. 3. Toca la ficha y comprueba.',
    };
  }

  // 2.2 Operaciones aditivas y multiplicativas con racionales (Pizzería Heterogénea)
  if (tid.includes('operaciones') || tid.includes('aditivas') || tid.includes('multiplicativas') || tid.includes('pizza')) {
    const pizzaCases = [
      { n1: 1, d1: 2, n2: 1, d2: 4, pizzaDen: 4, expected: 3 }, // 2/4 + 1/4 = 3/4
      { n1: 1, d1: 2, n2: 1, d2: 6, pizzaDen: 6, expected: 4 }, // 3/6 + 1/6 = 4/6
      { n1: 1, d1: 3, n2: 1, d2: 6, pizzaDen: 6, expected: 3 }, // 2/6 + 1/6 = 3/6
      { n1: 2, d1: 3, n2: 1, d2: 6, pizzaDen: 6, expected: 5 }, // 4/6 + 1/6 = 5/6
      { n1: 1, d1: 4, n2: 3, d2: 8, pizzaDen: 8, expected: 5 }, // 2/8 + 3/8 = 5/8
      { n1: 1, d1: 2, n2: 3, d2: 8, pizzaDen: 8, expected: 7 }, // 4/8 + 3/8 = 7/8
      { n1: 3, d1: 4, n2: 1, d2: 8, pizzaDen: 8, expected: 7 }, // 6/8 + 1/8 = 7/8
    ];
    const c = pick(pizzaCases);

    return {
      type: 'fraction-pizza',
      period: 2,
      title: 'Suma Heterogénea de Pizzas',
      badge: `${c.n1}/${c.d1} + ${c.n2}/${c.d2}`,
      den: c.pizzaDen,
      n1: c.n1,
      d1: c.d1,
      n2: c.n2,
      d2: c.d2,
      expected: c.expected,
      formulaHint: `Homogenizar al denominador común de la pizza de entrega (${c.pizzaDen} porciones)`,
      prompt: `Homogeniza mentalmente ambas fracciones y marca en la pizza de la derecha las porciones totales:`,
      failHint: `Convierte ambas fracciones a denominador ${c.pizzaDen} y suma las rebanadas equivalentes.`,
      learnConcept: 'Para sumar fracciones con distinto denominador se amplifican a un denominador común igual a las divisiones de la pizza final.',
      howToPlay: '1. Convierte cada fracción al tamaño de las porciones de la pizza final. 2. Toca las rebanadas en la tercera pizza para activarlas. 3. Comprueba.',
    };
  }

  // 2.1 Representación de racionales en la recta
  if (tid.includes('recta') && !tid.includes('directa')) {
    const den = pick([2, 4, 5]);
    const num = pick([-7, -5, -3, -1, 3, 5, 7]);
    const expected = parseFloat((num / den).toFixed(2));

    return {
      type: 'number-line',
      period: 2,
      title: 'Racionales en la Recta',
      badge: `${num}/${den}`,
      num,
      den,
      expected,
      formulaHint: 'Coordenada = numerador ÷ denominador',
      prompt: `Mueve el cursor rojo sobre la recta o escribe la coordenada exacta donde se ubica ${num}/${den}:`,
      failHint: 'Divide el numerador entre el denominador respetando el signo negativo o positivo.',
      learnConcept: 'Todo número racional tiene una ubicación exacta en la recta numérica real que se halla dividiendo el numerador entre el denominador.',
      howToPlay: '1. Haz clic o arrastra el punto rojo sobre la recta numérica. 2. Verifica el valor decimal en el recuadro. 3. Pulsa Comprobar.',
    };
  }

  // =========================================================================
  // PERIODO 3: PROPORCIONALIDAD Y VARIACIÓN
  // =========================================================================

  // 3.3 Variación proporcional directa e inversa
  if (tid.includes('variacion') || tid.includes('directa') || tid.includes('inversa')) {
    const cases = [
      { text: 'Un automóvil viaja a velocidad constante: a mayor tiempo de recorrido, mayor es la distancia total alcanzada.', ans: 'Directa' },
      { text: 'Una cuadrilla de obreros construye un puente: si se duplica el número de obreros al mismo ritmo, tardarán la mitad del tiempo.', ans: 'Inversa' },
      { text: 'Mangueras llenando un tanque de reserva: cuantas más mangueras iguales se abran al tiempo, menos horas tardará en llenarse.', ans: 'Inversa' },
      { text: 'En una fábrica de empaques: a mayor cantidad de horas de funcionamiento continuo, mayor es la cantidad de cajas producidas.', ans: 'Directa' },
    ];
    const chosen = pick(cases);

    return {
      type: 'variation',
      period: 3,
      title: 'Variación Proporcional',
      badge: 'Análisis de Magnitudes',
      scenarioText: chosen.text,
      expectedType: chosen.ans,
      formulaHint: 'Directa: ambas suben o bajan juntas | Inversa: una sube y la otra baja',
      prompt: 'Analiza el comportamiento de las magnitudes y selecciona el tipo de variación:',
      failHint: chosen.ans === 'Directa'
        ? 'Ambas magnitudes crecen en la misma proporción: es Directa.'
        : 'Cuando una magnitud crece, la otra disminuye en proporción inversa: es Inversa.',
      learnConcept: 'En la variación directa el cociente entre las magnitudes es constante; en la variación inversa el producto entre ambas es constante.',
      howToPlay: '1. Lee con atención el fenómeno descrito. 2. Evalúa qué pasa con la segunda magnitud cuando la primera aumenta. 3. Elige Directa o Inversa.',
    };
  }

  // 3.2 Tanto por ciento de una cantidad
  if (tid.includes('tanto') || tid.includes('ciento') || tid.includes('porcentaje')) {
    const pct = pick([15, 25, 35, 45, 65, 75, 80]);
    const totalCap = pick([200, 300, 400, 600, 800]);
    const expected = (pct * totalCap) / 100;

    return {
      type: 'percentage-tank',
      period: 3,
      title: 'Tanque de Porcentajes',
      badge: `${pct}% de ${totalCap} L`,
      pct,
      totalCap,
      expected,
      formulaHint: 'Cantidad = (Porcentaje × Capacidad Total) ÷ 100',
      prompt: `Calcula cuántos Litros exactos contiene el tanque al llenarse al ${pct}% de su capacidad máxima (${totalCap} L):`,
      failHint: 'Multiplica el porcentaje por la capacidad total del tanque y divide el resultado entre 100.',
      learnConcept: 'El porcentaje o tanto por ciento representa cuántas partes se toman de cada 100 unidades del total.',
      howToPlay: '1. Observa el nivel del tanque y la capacidad total. 2. Calcula el porcentaje correspondiente. 3. Escribe los litros exactos.',
    };
  }

  // 3.1 Razones y proporciones
  if (tid.includes('razon') || tid.includes('proporcion')) {
    const k = pick([12, 15, 25, 35, 40]);
    const basePortions = pick([2, 3, 4]);
    const targetPortions = pick([6, 8, 9, 10, 12]);
    const baseGrams = basePortions * k;
    const expected = targetPortions * k;

    return {
      type: 'proportion-recipe',
      period: 3,
      title: 'Razones y Proporciones',
      badge: `${basePortions} porciones ➔ ${baseGrams} g`,
      basePortions,
      baseGrams,
      targetPortions,
      expected,
      formulaHint: 'Constante de proporcionalidad: k = gramos ÷ porciones',
      prompt: `Si una fórmula requiere ${baseGrams} gramos para ${basePortions} porciones, ¿cuántos gramos exactos se necesitan para preparar ${targetPortions} porciones?`,
      failHint: 'Encuentra primero cuántos gramos lleva 1 sola porción y luego multiplica por las porciones solicitadas.',
      learnConcept: 'Una proporción es la igualdad entre dos razones. Si las cantidades aumentan proporcionalmente, su cociente se mantiene constante.',
      howToPlay: '1. Halla el valor unitario dividiendo los gramos entre las porciones base. 2. Multiplica por las nuevas porciones. 3. Ingresa el resultado.',
    };
  }

  // =========================================================================
  // PERIODO 4: VOLUMEN Y CAPACIDAD
  // =========================================================================

  // 4.3 Equivalencias entre volumen y capacidad
  if (tid.includes('equivalencia')) {
    const mode = rand(1, 3);
    if (mode === 1) {
      const dm3 = pick([2.5, 4.8, 7, 12.5, 15]);
      return {
        type: 'volume-capacity-lab',
        period: 4,
        title: 'Equivalencias Volumen y Capacidad',
        badge: `${dm3} dm³ ➔ ? Litros`,
        expected: dm3,
        formulaHint: 'Relación fundamental: 1 dm³ = 1 Litro  |  1 cm³ = 1 ml',
        prompt: `Un recipiente tiene un volumen interior de ${dm3} decímetros cúbicos (dm³). ¿Cuántos Litros (L) de agua le caben exactamente?`,
        failHint: 'Recuerda la equivalencia directa: 1 dm³ equivale exactamente a 1 Litro.',
        learnConcept: 'El volumen mide el espacio que ocupa un cuerpo (dm³, cm³) y la capacidad lo que cabe dentro (L, ml). Un cubo de 1 dm³ alberga exactamente 1 Litro.',
        howToPlay: '1. Identifica las unidades de origen y destino. 2. Aplica el puente de equivalencia. 3. Escribe el valor numérico.',
      };
    } else if (mode === 2) {
      const m3 = pick([1.5, 2, 3.2, 4.5]);
      return {
        type: 'volume-capacity-lab',
        period: 4,
        title: 'Equivalencias Volumen y Capacidad',
        badge: `${m3} m³ ➔ ? Litros`,
        expected: m3 * 1000,
        formulaHint: '1 m³ = 1.000 dm³ = 1.000 Litros',
        prompt: `Una cisterna tiene ${m3} metros cúbicos (m³) de volumen. ¿Cuántos Litros (L) de agua almacena al llenarse por completo?`,
        failHint: 'Como 1 m³ equivale a 1.000 dm³, entonces 1 m³ almacena 1.000 Litros. Multiplica por 1.000.',
        learnConcept: 'Un metro cúbico contiene 1.000 decímetros cúbicos, por lo que su capacidad equivale a 1.000 Litros.',
        howToPlay: '1. Convierte los metros cúbicos a decímetros cúbicos multiplicando por 1.000. 2. Pasa directamente a Litros. 3. Ingresa la cifra.',
      };
    } else {
      const cm3 = pick([250, 450, 750, 1200]);
      return {
        type: 'volume-capacity-lab',
        period: 4,
        title: 'Equivalencias Volumen y Capacidad',
        badge: `${cm3} cm³ ➔ ? ml`,
        expected: cm3,
        formulaHint: 'Relación fundamental: 1 cm³ = 1 mililitro (ml)',
        prompt: `Una roca sumergida desplaza ${cm3} centímetros cúbicos (cm³) de agua. ¿A cuántos mililitros (ml) equivale ese volumen desplazado?`,
        failHint: '1 centímetro cúbico (cm³) equivale exactamente a 1 mililitro (ml).',
        learnConcept: 'En laboratorio, 1 mililitro de líquido ocupa exactamente el espacio de un cubo de 1 centímetro de lado (1 cm³).',
        howToPlay: '1. Relaciona los cm³ con su equivalente en ml. 2. Escribe la cantidad exacta en el recuadro.',
      };
    }
  }

  // 4.1 Unidades de medida de volumen
  if (tid.includes('volumen')) {
    const isDown = Math.random() > 0.5;
    if (isDown) {
      const val = pick([2.4, 3.5, 5, 7.2, 9]);
      return {
        type: 'volume-converter',
        period: 4,
        title: 'Unidades de Medida de Volumen',
        badge: `${val} m³ ➔ ? dm³`,
        expected: val * 1000,
        formulaHint: 'Cada escalón cúbico hacia abajo multiplica por 1.000',
        prompt: `Convierte ${val} metros cúbicos (m³) a decímetros cúbicos (dm³):`,
        failHint: 'Para bajar un escalón de m³ a dm³, multiplica el valor por 1.000.',
        learnConcept: 'Las unidades de volumen son tridimensionales (largo × ancho × alto), por lo que cada salto en la escalera métrica equivale a multiplicar o dividir por 1.000.',
        howToPlay: '1. Ubica las unidades en la escalera cúbica. 2. Multiplica por 1.000 al bajar de m³ a dm³. 3. Escribe el resultado.',
      };
    } else {
      const val = pick([2500, 4000, 6500, 15000, 32000]);
      return {
        type: 'volume-converter',
        period: 4,
        title: 'Unidades de Medida de Volumen',
        badge: `${val} cm³ ➔ ? dm³`,
        expected: val / 1000,
        formulaHint: 'Cada escalón cúbico hacia arriba divide entre 1.000',
        prompt: `Convierte ${val} centímetros cúbicos (cm³) a decímetros cúbicos (dm³):`,
        failHint: 'Para subir un escalón de cm³ a dm³, divide el valor entre 1.000.',
        learnConcept: 'Para transformar unidades cúbicas menores a mayores se divide entre 1.000 por cada escalón que se sube.',
        howToPlay: '1. Observa los centímetros cúbicos. 2. Divide entre 1.000 para subir a decímetros cúbicos. 3. Escribe el valor decimal o entero.',
      };
    }
  }

  // 4.2 Capacidad y unidades de medida
  if (tid.includes('capacidad')) {
    const isLitersToMl = Math.random() > 0.5;
    if (isLitersToMl) {
      const liters = pick([1.25, 2.5, 3.75, 0.6, 4.8]);
      return {
        type: 'capacity-dispenser',
        period: 4,
        title: 'Capacidad y Unidades de Medida',
        badge: `${liters} L ➔ ? ml`,
        liters,
        expected: liters * 1000,
        formulaHint: '1 Litro (L) = 10 dl = 100 cl = 1.000 ml',
        prompt: `Convierte la medida de la probeta de ${liters} Litros (L) a mililitros (ml):`,
        failHint: 'Para pasar de Litros a mililitros debes multiplicar por 1.000.',
        learnConcept: 'En las unidades de capacidad cada escalón (L, dl, cl, ml) varía de 10 en 10. De Litros a mililitros hay tres escalones (10 × 10 × 10 = 1.000).',
        howToPlay: '1. Lee los Litros marcados en el dispensador. 2. Multiplica por 1.000 para hallar los mililitros. 3. Escribe el resultado.',
      };
    } else {
      const ml = pick([450, 800, 1500, 2750, 3400]);
      return {
        type: 'capacity-dispenser',
        period: 4,
        title: 'Capacidad y Unidades de Medida',
        badge: `${ml} ml ➔ ? L`,
        liters: ml / 1000,
        expected: ml / 1000,
        formulaHint: '1.000 mililitros (ml) = 1 Litro (L)',
        prompt: `Un envase contiene ${ml} mililitros (ml). ¿A cuántos Litros (L) equivale esa cantidad?`,
        failHint: 'Para convertir de mililitros a Litros debes dividir la cantidad entre 1.000.',
        learnConcept: 'Para pasar de una unidad menor de capacidad (ml) a la unidad principal (L), se divide entre 1.000.',
        howToPlay: '1. Toma la cantidad en mililitros. 2. Divídela entre 1.000. 3. Escribe el valor resultante en Litros.',
      };
    }
  }

  // =========================================================================
  // POR DEFECTO (1.1 Ecuaciones de primer grado de 2 pasos)
  // =========================================================================
  const a = pick([2, 3, 4, 5]);
  const x = rand(2, 9);
  const b = rand(2, 14);
  const isSub = Math.random() > 0.5;
  const c = isSub ? a * x - b : a * x + b;

  return {
    type: 'scale-eq',
    period: 1,
    title: 'Balanza de Ecuaciones (2 Pasos)',
    badge: `${a}x ${isSub ? '-' : '+'} ${b} = ${c}`,
    expected: x,
    formulaHint: `Forma general: ${a}x ${isSub ? '-' : '+'} ${b} = ${c}`,
    prompt: 'Encuentra el valor numérico de x que satisface la igualdad:',
    failHint: 'Aplica operaciones inversas: primero cancela el término independiente y luego divide entre el coeficiente de x.',
    learnConcept: 'Para resolver ecuaciones de la forma ax ± b = c, primero se aísla el término con x cancelando la suma o resta, y por último se divide entre el coeficiente.',
    howToPlay: '1. Despeja el término con x aplicando la operación opuesta en ambos lados. 2. Divide entre el número que acompaña a la x. 3. Escribe el valor final.',
  };
}