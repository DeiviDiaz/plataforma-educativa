export const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const gradeNineInstructions = {
  'grado9-1': {
    objective: 'Aprende a despejar la incógnita x en una ecuación.',
    steps: ['Identifica los números de la ecuación.', 'Deshaz la suma o resta.', 'Divide por el número que acompaña a x.'],
    explanation: 'Despejar una incógnita significa dejar sola la letra x usando operaciones inversas en ambos lados. Primero eliminamos la suma o resta; después dividimos por el coeficiente. Así mantenemos el equilibrio de la ecuación.',
    example: 'Ejemplo: 3x + 5 = 20. Restamos 5: 3x = 15. Dividimos entre 3: x = 5.',
  },
  'grado9-2': {
    objective: 'Encuentra el punto donde se cruzan dos rectas.',
    steps: ['Observa las dos rectas.', 'Iguala sus expresiones.', 'Escribe el valor de x en el cruce.'],
    explanation: 'En el cruce, las dos rectas tienen el mismo valor de y para la misma x. Igualamos sus ecuaciones y resolvemos la incógnita. Luego sustituimos x en una recta para comprobar y.',
    example: 'Ejemplo: y = 2x + 1 y y = x + 4. Igualamos: 2x + 1 = x + 4. Entonces x = 3 y y = 7.',
  },
  'grado9-3': {
    objective: 'Representa una compra con dos cantidades desconocidas.',
    steps: ['Escribe el precio de los jugos.', 'Resta ese resultado del total.', 'Divide lo que queda entre las arepas.'],
    explanation: 'Primero multiplicamos la cantidad conocida por su precio para calcular cuánto se gastó en ese producto. Luego restamos ese valor al total y repartimos lo restante entre las unidades desconocidas.',
    example: 'Ejemplo: 2 jugos cuestan $2.000 y el total es $5.000. Restamos: 5.000 − 2.000 = 3.000. Si hay 3 arepas, cada una cuesta 3.000 ÷ 3 = $1.000.',
  },
  'grado9-4': {
    objective: 'Calcula el determinante de una matriz 2 por 2.',
    steps: ['Multiplica los números de la diagonal principal.', 'Multiplica los números de la otra diagonal.', 'Resta el segundo producto del primero.'],
    explanation: 'El determinante mide una cantidad asociada a la matriz. En una matriz 2×2, se multiplican los extremos de la diagonal que baja y luego se restan los extremos de la otra diagonal.',
    example: 'Ejemplo: [1 2; 3 4]. Diagonal principal: 1×4 = 4. Otra diagonal: 2×3 = 6. Determinante: 4 − 6 = −2.',
  },
  'grado9-5': {
    objective: 'Calcula el determinante de una matriz 3 por 3.',
    steps: ['Toma la primera fila.', 'Aplica a(ei−fh) − b(di−fg) + c(dh−eg).', 'Simplifica y escribe el resultado.'],
    explanation: 'Al expandir por la primera fila, se usa cada número con su menor de 2×2. Los signos del desarrollo son más, menos y más. En una matriz identidad el resultado se conserva con la regla de Cramer.',
    example: 'Ejemplo: [1 0 0; 0 2 0; 0 0 3]. Solo la diagonal contiene valores: 1×2×3 = 6.',
  },
  'grado9-6': {
    objective: 'Elimina la raíz del denominador usando el conjugado.',
    steps: ['Cambia el signo central.', 'Multiplica arriba y abajo por la conjugada.', 'Reduce el denominador con diferencia de cuadrados.'],
    explanation: 'La conjugada conserva los términos y cambia el signo central. Multiplicar expresiones conjugadas elimina la raíz porque aplica la diferencia de cuadrados: (a+b)(a−b)=a²−b².',
    example: 'Ejemplo: 1/(2+√3). Multiplicamos por (2−√3)/(2−√3). El denominador queda 2²−(√3)² = 4−3 = 1.',
  },
  'grado9-7': {
    objective: 'Calcula la imagen de una función.',
    steps: ['Observa el valor de x.', 'Sustitúyelo en f(x).', 'Multiplica, suma o resta y escribe el resultado.'],
    explanation: 'La imagen es el valor que entrega la función cuando entra un número del dominio. Sustituimos x en la fórmula y seguimos el orden de operaciones.',
    example: 'Ejemplo: f(x)=2x+1. Para x=3, f(3)=2×3+1=7. La pareja formada es (3,7).',
  },
  'grado9-8': {
    objective: 'Evalúa una función lineal con una pendiente y una tabla.',
    steps: ['Lee el valor de x.', 'Multiplica por la pendiente.', 'Suma o resta el corte con el eje y.'],
    explanation: 'En y=mx+b, m indica cuánto cambia y por cada unidad de x y b indica dónde la recta corta el eje y. Sustituir x permite calcular un punto exacto de la recta.',
    example: 'Ejemplo: y=3x−2. Si x=4, y=3×4−2=10. La recta pasa por el punto (4,10).',
  },
  'grado9-9': {
    objective: 'Identifica el vértice de una parábola.',
    steps: ['Observa y = a(x−h)²+k.', 'El primer número del vértice es h.', 'El segundo número del vértice es k.'],
    explanation: 'La forma y=a(x−h)²+k muestra directamente el vértice. El eje de simetría pasa por x=h y k indica la altura mínima o máxima según la apertura.',
    example: 'Ejemplo: y=(x−2)²+3. El vértice es (2,3) y el eje de simetría es x=2.',
  },
  'grado9-10': {
    objective: 'Completa valores de una función exponencial.',
    steps: ['Observa la base y el exponente.', 'Multiplica la base tantas veces como indica x.', 'Escribe el valor obtenido.'],
    explanation: 'Una función exponencial multiplica por la misma base en cada paso. Por eso crece o disminuye con rapidez. Cuando x=0, cualquier base distinta de cero elevada a cero vale 1.',
    example: 'Ejemplo: f(x)=2ˣ. Para x=4, f(4)=2×2×2×2=16.',
  },
  'grado9-11': {
    objective: 'Relaciona una potencia con su logaritmo.',
    steps: ['Observa la base y el resultado.', 'Pregunta qué exponente produce ese resultado.', 'Escribe el exponente como logaritmo.'],
    explanation: 'Un logaritmo responde: “¿a qué exponente elevamos la base para obtener este número?”. El resultado log_b(a)=c significa exactamente bᶜ=a.',
    example: 'Ejemplo: 2³=8, por eso log₂(8)=3.',
  },
  'grado9-12': {
    objective: 'Convierte áreas entre figuras semejantes.',
    steps: ['Observa la razón de las longitudes.', 'Eleva esa razón al cuadrado.', 'Multiplica el área pequeña por el resultado.'],
    explanation: 'Las figuras semejantes mantienen sus proporciones. La razón de longitudes se eleva al cuadrado para áreas y al cubo para volúmenes.',
    example: 'Ejemplo: si k=2 y el área pequeña es 5 cm², el área grande es 5×2²=5×4=20 cm².',
  },
  'grado9-13': {
    objective: 'Halla la hipotenusa de un triángulo rectángulo.',
    steps: ['Identifica los dos catetos.', 'Eleva cada cateto al cuadrado.', 'Suma los cuadrados y calcula la raíz.'],
    explanation: 'En todo triángulo rectángulo se cumple c²=a²+b², donde c es la hipotenusa. Luego calculamos la raíz cuadrada de la suma.',
    example: 'Ejemplo: catetos 3 y 4. c²=3²+4²=9+16=25. Por tanto, c=√25=5.',
  },
  'grado9-14': {
    objective: 'Convierte una medida del plano a la medida real.',
    steps: ['Lee la escala 1:n.', 'Multiplica los centímetros por n.', 'Convierte los centímetros a metros dividiendo entre 100.'],
    explanation: 'Una escala 1:n significa que una unidad en el plano representa n unidades reales. Primero multiplicamos por n y después convertimos las unidades si el ejercicio usa metros.',
    example: 'Ejemplo: escala 1:100 y el plano mide 3 cm. Realmente mide 3×100=300 cm, es decir, 3 m.',
  },
  'grado9-15': {
    objective: 'Calcula la probabilidad de un evento con un dado.',
    steps: ['Cuenta los resultados favorables.', 'Escribe el total de resultados posibles.', 'Divide y expresa el resultado como decimal.'],
    explanation: 'La probabilidad teórica compara casos favorables con casos posibles. El dado justo tiene seis resultados equiprobables.',
    example: 'Ejemplo: obtener un número par: hay 3 casos favorables, {2,4,6}, entre 6 posibles. La probabilidad es 3÷6=0,5.',
  },
  'grado9-16': {
    objective: 'Cuenta todas las secuencias posibles al lanzar monedas.',
    steps: ['Recuerda que cada lanzamiento tiene 2 opciones.', 'Multiplica 2 por sí mismo una vez por lanzamiento.', 'Escribe el total de secuencias.'],
    explanation: 'Cada lanzamiento genera dos ramas: cara o sello. Como los lanzamientos son consecutivos, multiplicamos las opciones de cada paso.',
    example: 'Ejemplo: con 3 monedas hay 2×2×2=8 secuencias: CCC, CCS, CSC, CSS, SCC, SCS, SSC y SSS.',
  },
};

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
