const level = (prompt, answer, options, explanation, hint) => ({
  prompt,
  answer,
  options,
  explanation,
  hint,
});

const game = (name, topics, concept, type, levels) => ({
  name,
  topics,
  concept,
  type,
  levels,
});

const practice = (type, answer, options, label) => {
  if (type === 'input') {
    return level(`${label}. Escribe la respuesta.`, answer, null, `La respuesta es ${answer}.`, 'Revisa la operación paso a paso.');
  }
  if (type === 'order') {
    return level(`${label}. Ordena las piezas.`, answer, options, `El orden correcto es ${answer.replaceAll('|', ' → ')}.`, 'Compara cada elemento antes de continuar.');
  }
  if (type === 'grid') {
    return level(`${label}. Representa la cantidad en la cuadrícula.`, answer, null, `Debes seleccionar ${answer} cuadros.`, 'Cuenta los cuadros seleccionados.');
  }
  return level(`${label}. Elige la respuesta correcta.`, answer, options, `La respuesta correcta es ${answer}.`, 'Lee cada opción y compárala con el ejemplo.');
};

const five = (type, levels, extra) => ({
  type,
  levels: [...levels, ...extra.map((item) => practice(type, ...item))],
});

export const gradeFourPeriods = [
  {
    id: 1,
    title: 'Exploremos nuestro entorno',
    description: 'Construye números, resuelve operaciones y descubre figuras y medidas.',
    icon: '🔢',
    games: [
      game('Torre de millones', 'Sistema decimal · valor posicional · descomposición de más de seis cifras', 'Reconoce cuánto vale cada cifra según su lugar.', ...Object.values(five('order', [
        level('Construye 342: 3 centenas, 4 decenas y 2 unidades.', '3|4|2', ['2', '3', '4'], 'Las cifras se ubican de izquierda a derecha: centenas, decenas y unidades.', 'Observa el nombre de cada posición.'),
        level('Construye 7.245: 7 millares, 2 centenas, 4 decenas y 5 unidades.', '7|2|4|5', ['5', '4', '7', '2'], '7.245 se descompone en 7 millares, 2 centenas, 4 decenas y 5 unidades.', 'Empieza por la cifra de mayor valor.'),
        level('Construye 3.482.615: millones, centenas de mil, decenas de mil, millares, centenas, decenas y unidades.', '3|4|8|2|6|1|5', ['5', '1', '6', '2', '8', '4', '3'], 'Cada cifra ocupa una posición distinta.', 'Lee el número de izquierda a derecha.'),
      ], [['8|6|0|5|3|4|1', ['1', '4', '3', '5', '0', '6', '8'], 'Construye 8.605.341'], ['9|0|7|0|2|0|8', ['8', '0', '2', '0', '7', '0', '9'], 'Construye 9.070.208']]))),
      game('Puente de operaciones', 'Adición y sustracción de números mayores de seis cifras', 'Suma y resta números grandes para cruzar el puente.', ...Object.values(five('input', [
        level('Cruza: 1.200.000 + 300.000 =', '1500000', null, '1.200.000 + 300.000 = 1.500.000.', 'Alinea las posiciones.'),
        level('Cruza: 2.450.000 − 150.000 =', '2300000', null, '2.450.000 − 150.000 = 2.300.000.', 'Resta por columnas.'),
        level('Cruza: 3.250.000 + 1.750.000 =', '5000000', null, 'La suma es 5.000.000.', 'Suma primero los millares.'),
      ], [['5520310', null, 'Cruza: 7.835.420 − 2.315.110'], ['10251110', null, 'Cruza: 8.764.325 + 1.486.785']]))),
      game('Máquina multiplicadora', 'Propiedades conmutativa, asociativa, modulativa, anulativa y distributiva', 'Descubre qué regla transforma cada multiplicación.', ...Object.values(five('pick', [
        level('4 × 7 = 7 × 4. ¿Qué propiedad ves?', 'Conmutativa', ['Conmutativa', 'Asociativa', 'Anulativa'], 'Cambiar el orden de los factores es la propiedad conmutativa.', 'Observa que solo cambia el orden.'),
        level('(2 × 3) × 5 = 2 × (3 × 5). ¿Qué propiedad ves?', 'Asociativa', ['Distributiva', 'Asociativa', 'Modulativa'], 'La agrupación cambia, por eso es asociativa.', 'Fíjate en los paréntesis.'),
        level('3 × (4 + 2) = 3 × 4 + 3 × 2. ¿Qué propiedad ves?', 'Distributiva', ['Conmutativa', 'Asociativa', 'Distributiva'], 'El factor se distribuye a cada sumando.', 'Separa la suma dentro del paréntesis.'),
      ], [['Modulativa', ['Conmutativa', 'Modulativa', 'Anulativa'], '8 × 1 = 8.'], ['Anulativa', ['Conmutativa', 'Asociativa', 'Anulativa'], '6 × 0 = 0.']]))),
      game('Reparto explorador', 'División exacta e inexacta · divisores · atributos de objetos', 'Reparte objetos por igual y reconoce lo que sobra.', ...Object.values(five('input', [
        level('Hay 24 semillas para 6 equipos. ¿Cuántas van en cada equipo?', '4', null, '24 ÷ 6 = 4.', 'Reparte 24 en seis grupos.'),
        level('Hay 29 semillas para 4 equipos. ¿Cuántas sobran?', '1', null, '4 × 7 = 28 y sobra 1.', 'Busca el múltiplo de 4 más cercano.'),
        level('Hay 156 semillas para 12 equipos. ¿Cuántas recibe cada equipo?', '13', null, '156 ÷ 12 = 13.', 'Comprueba multiplicando 12 × 13.'),
      ], [['5', null, 'Hay 173 semillas para 12 equipos. ¿Cuántas sobran?'], ['12', null, 'Hay 348 semillas para 24 equipos. ¿Cuántas sobran?']]))),
      game('Taller de figuras', 'Atributos · ángulos y triángulos · transportador · polígonos', 'Reconoce atributos, mide ángulos y clasifica figuras.', ...Object.values(five('pick', [
        level('Un transportador marca 90°. ¿Qué ángulo forma?', 'Recto', ['Agudo', 'Recto', 'Obtuso'], 'Un ángulo de 90° es recto.', 'Compáralo con el ángulo de una esquina.'),
        level('Un triángulo tiene un ángulo de 110°. ¿Cómo se llama?', 'Obtusángulo', ['Acutángulo', 'Rectángulo', 'Obtusángulo'], 'Un ángulo mayor que 90° es obtuso.', '110° es mayor que 90°.'),
        level('Una figura cerrada de 5 lados, ¿qué polígono es?', 'Pentágono', ['Triángulo', 'Pentágono', 'Hexágono'], 'Penta significa cinco.', 'Cuenta los lados.'),
      ], [['Agudo', ['Agudo', 'Recto', 'Obtuso'], 'Un transportador marca 35°.'], ['Octágono', ['Hexágono', 'Heptágono', 'Octágono'], 'Una figura cerrada tiene ocho lados.']]))),
      game('Bloques de valor', 'Sistema decimal · descomposición de números de más de seis cifras', 'Separa un número grande en el valor de sus cifras.', ...Object.values(five('input', [
        level('En 1.234.567, ¿cuánto vale el 1?', '1000000', null, 'El 1 está en la posición de los millones.', 'Mira la primera cifra.'),
        level('En 4.321.000, ¿cuánto vale el 3?', '300000', null, 'El 3 está en las centenas de mil.', 'Cuenta tres posiciones desde la derecha.'),
        level('En 7.482.615, ¿cuánto vale el 8?', '80000', null, 'El 8 está en las decenas de mil.', 'Observa su posición.'),
      ], [['500000', null, 'En 9.506.214, ¿cuánto vale el 5?'], ['740000', null, 'En 6.742.381, ¿cuánto valen juntos el 7 y el 4?']]))),
      game('Exploradores de atributos', 'Atributos de los objetos · clasificación', 'Agrupa objetos por forma, color y tamaño.', ...Object.values(five('pick', [
        level('🔴 🔴 🔵. ¿Qué atributo comparten los dos primeros?', 'Color', ['Forma', 'Color', 'Tamaño'], 'Los dos objetos son rojos.', 'Mira qué característica se repite.'),
        level('🔺 🔺 ◼. ¿Qué atributo comparten los dos primeros?', 'Forma', ['Color', 'Forma', 'Peso'], 'Los dos objetos tienen forma triangular.', 'Compara el contorno.'),
        level('Un cubo grande y uno pequeño tienen distinto…', 'Tamaño', ['Tamaño', 'Forma', 'Número de caras'], 'Grande y pequeño describen el tamaño.', 'El objeto conserva su forma.'),
      ], [['Forma', ['Color', 'Forma', 'Tamaño'], 'Dos triángulos cambian de color y tamaño.'], ['Color y forma', ['Solo tamaño', 'Color y forma', 'Color y tamaño'], 'Dos cubos azules, uno grande y otro pequeño.']]))),
      game('Transportador aventurero', 'Clases de ángulos · medición con transportador', 'Reconoce el tipo de ángulo a partir de sus grados.', ...Object.values(five('pick', [
        level('El transportador señala 45°. ¿Qué clase de ángulo es?', 'Agudo', ['Agudo', 'Recto', 'Obtuso'], '45° es menor que 90°.', 'Menor que 90° es agudo.'),
        level('El transportador señala 90°. ¿Qué clase de ángulo es?', 'Recto', ['Agudo', 'Recto', 'Obtuso'], '90° es recto.', 'Es el ángulo de una esquina.'),
        level('El transportador señala 135°. ¿Qué clase de ángulo es?', 'Obtuso', ['Agudo', 'Recto', 'Obtuso'], '135° está entre 90° y 180°.', 'Mayor que 90° es obtuso.'),
      ], [['Obtuso', ['Agudo', 'Recto', 'Obtuso'], 'El transportador señala 178°.'], ['Agudo', ['Agudo', 'Recto', 'Obtuso'], 'Un ángulo mide 89°.']]))),
      game('Campamento de triángulos', 'Clases de triángulos según sus lados y ángulos', 'Clasifica triángulos observando lados y ángulos.', ...Object.values(five('pick', [
        level('Lados 3 cm, 3 cm y 3 cm. ¿Qué triángulo es?', 'Equilátero', ['Equilátero', 'Isósceles', 'Escaleno'], 'Tiene tres lados iguales.', 'Equi significa igual.'),
        level('Lados 4 cm, 4 cm y 6 cm. ¿Qué triángulo es?', 'Isósceles', ['Equilátero', 'Isósceles', 'Escaleno'], 'Tiene dos lados iguales.', 'Observa los dos lados de 4 cm.'),
        level('Un ángulo de 90° y dos ángulos agudos: ¿qué triángulo es?', 'Rectángulo', ['Acutángulo', 'Rectángulo', 'Obtusángulo'], 'Tiene un ángulo recto.', 'Busca el ángulo de 90°.'),
      ], [['Escaleno', ['Equilátero', 'Isósceles', 'Escaleno'], 'Lados 5, 6 y 7 cm.'], ['Acutángulo', ['Acutángulo', 'Rectángulo', 'Obtusángulo'], 'Ángulos 40°, 60° y 80°.']]))),
      game('Museo de polígonos', 'Polígonos · clases de polígonos', 'Cuenta lados y reconoce polígonos.', ...Object.values(five('pick', [
        level('△ tiene tres lados. ¿Qué polígono es?', 'Triángulo', ['Triángulo', 'Pentágono', 'Hexágono'], 'Tres lados forman un triángulo.', 'Cuenta hasta tres.'),
        level('⬟ tiene cinco lados. ¿Qué polígono es?', 'Pentágono', ['Cuadrilátero', 'Pentágono', 'Hexágono'], 'Cinco lados forman un pentágono.', 'Penta significa cinco.'),
        level('Un polígono cerrado tiene seis lados. ¿Cómo se llama?', 'Hexágono', ['Pentágono', 'Hexágono', 'Triángulo'], 'Seis lados forman un hexágono.', 'Hexa significa seis.'),
      ], [['Heptágono', ['Pentágono', 'Heptágono', 'Octágono'], 'Una figura cerrada tiene siete lados.'], ['Octágono', ['Hexágono', 'Heptágono', 'Octágono'], 'Una figura cerrada tiene ocho lados.']]))),
    ],
  },
  {
    id: 2,
    title: 'Me divierto con mis conocimientos matemáticos',
    description: 'Explora divisibilidad, fracciones y medidas de figuras planas.',
    icon: '🧩',
    games: [
      game('Ruta de los números', 'Pares e impares · múltiplos · divisores · divisibilidad', 'Sigue pistas numéricas y ordena los saltos del recorrido.', 'order', [
        level('Ordena los tres primeros múltiplos positivos de 4.', '4|8|12', ['12', '4', '8'], 'Los múltiplos aumentan de cuatro en cuatro.', 'Empieza por el menor.'),
        level('Ordena divisores pares de 12, de menor a mayor.', '2|4|6', ['6', '2', '4'], '2, 4 y 6 dividen exactamente a 12.', 'Prueba cada división.'),
        level('Ordena números divisibles entre 5.', '15|25|40', ['40', '15', '25'], 'Los números terminan en 0 o 5.', 'Ordena de menor a mayor.'),
        practice('order', '6|12|18|24', ['18', '6', '24', '12'], 'Ordena los múltiplos de 6'),
        practice('order', '2|4|6|8', ['8', '2', '6', '4'], 'Ordena divisores pares de 24'),
      ]),
      game('Relojes y equipos', 'Mínimo común múltiplo · máximo común divisor', 'Encuentra cuándo coinciden eventos y forma equipos iguales.', 'input', [
        level('Dos campanas suenan cada 2 y 3 minutos. ¿Cuándo coinciden?', '6', null, 'El primer múltiplo común es 6.', 'Escribe los múltiplos de 2 y 3.'),
        level('Dos campanas suenan cada 4 y 6 minutos. ¿Cuándo coinciden?', '12', null, 'El mínimo común múltiplo es 12.', 'Busca el primer número repetido.'),
        level('Con 12 mangos y 18 guayabas, ¿cuál es el mayor número de equipos iguales?', '6', null, 'El máximo común divisor es 6.', 'Busca el mayor divisor compartido.'),
        level('Dos campanas suenan cada 6 y 8 minutos. ¿Cuándo coinciden?', '24', null, 'El primer múltiplo común es 24.', 'Escribe ambas listas.'),
        level('Con 24 mangos y 36 guayabas, ¿cuál es el mayor número de equipos iguales?', '12', null, 'El máximo común divisor es 12.', 'Busca el mayor divisor común.'),
      ]),
      game('Árbol de primos', 'Números primos y compuestos · factores primos', 'Desarma números en factores que sean primos.', 'order', [
        level('Desarma 12 en factores primos.', '2|2|3', ['3', '2', '2'], '12 = 2 × 2 × 3.', 'Divide primero entre 2.'),
        level('Desarma 18 en factores primos.', '2|3|3', ['3', '2', '3'], '18 = 2 × 3 × 3.', 'Busca divisores primos.'),
        level('Desarma 30 en factores primos.', '2|3|5', ['5', '2', '3'], '30 = 2 × 3 × 5.', 'Descompón en factores pequeños.'),
        practice('order', '2|3|7', ['7', '3', '2'], 'Desarma 42 en factores primos'),
        practice('order', '2|2|3|5', ['5', '2', '3', '2'], 'Desarma 60 en factores primos'),
      ]),
      game('Terrenos y trapecios', 'Área y perímetro · conversión de longitud · trapecios', 'Mide bordes y superficies, incluso en trapecios.', 'input', [
        level('Terreno rectangular de 4 m por 3 m. ¿Área en m²?', '12', null, 'Área = 4 × 3 = 12.', 'Multiplica largo por ancho.'),
        level('Un camino mide 3 m. ¿Cuántos centímetros son?', '300', null, '3 × 100 = 300 cm.', 'Un metro tiene 100 centímetros.'),
        level('Trapecio: bases 8 m y 4 m, altura 3 m. ¿Área en m²?', '18', null, '((8 + 4) × 3) ÷ 2 = 18.', 'Suma las bases antes de multiplicar.'),
        level('Un trapecio tiene lados 5 m, 6 m, 9 m y 6 m. ¿Perímetro?', '26', null, '5 + 6 + 9 + 6 = 26.', 'Suma todos los lados.'),
        level('Trapecio: bases 12 m y 8 m, altura 5 m. ¿Área?', '50', null, '((12 + 8) × 5) ÷ 2 = 50.', 'Usa la fórmula del trapecio.'),
      ]),
      game('Mesa de repartos', 'Fracciones · repartos · perímetros', 'Reconoce partes iguales y resuelve situaciones con figuras.', 'pick', [
        level('Tomas 1 de 4 partes iguales de un pan. ¿Qué fracción tomaste?', '1/4', ['1/4', '1/2', '3/4'], 'Una de cuatro partes es un cuarto.', 'El denominador cuenta las partes.'),
        level('Repartes 3 panes entre 6 personas. ¿Cuánto recibe cada una?', '1/2', ['1/3', '1/2', '2/3'], '3 ÷ 6 = 1/2.', 'Simplifica 3/6.'),
        level('Un trapecio tiene lados 4, 5, 8 y 3 m. ¿Perímetro?', '20', ['18', '20', '24'], '4 + 5 + 8 + 3 = 20.', 'Suma el borde completo.'),
        level('Repartes 5 panes entre 10 personas. ¿Qué fracción recibe cada una?', '1/2', ['1/2', '1/5', '2/5'], '5/10 se simplifica a 1/2.', 'Divide y simplifica.'),
        level('Un trapecio tiene lados 6, 7, 10 y 7 m. ¿Perímetro?', '30', ['24', '30', '36'], '6 + 7 + 10 + 7 = 30.', 'Suma todos sus lados.'),
      ]),
      game('Patrulla par e impar', 'Números pares e impares · agrupación', 'Reconoce si todos los objetos pueden formar parejas.', 'pick', [
        level('¿El 6 es par o impar?', 'Par', ['Par', 'Impar'], '6 forma tres parejas.', 'Comprueba si sobra uno.'),
        level('¿El 5 es par o impar?', 'Impar', ['Par', 'Impar'], '5 deja un objeto sin pareja.', 'Forma parejas.'),
        level('Si repartes 27 semillas en parejas, ¿es par o impar?', 'Impar', ['Par', 'Impar'], '27 termina en una cifra impar.', 'Mira la última cifra.'),
        level('¿El 8 es par o impar?', 'Par', ['Par', 'Impar'], '8 forma cuatro parejas.', 'No debe sobrar ninguno.'),
        level('Si hay 103 semillas y formas parejas, ¿es par o impar?', 'Impar', ['Par', 'Impar'], '103 deja una semilla sin pareja.', 'Observa la última cifra.'),
      ]),
      game('Puertas de divisibilidad', 'Criterios de divisibilidad por 2, 3, 5 y 10', 'Abre puertas usando pistas de las cifras.', 'pick', [
        level('La puerta del 2: ¿puede pasar 48?', 'Sí', ['Sí', 'No'], '48 termina en cifra par.', 'Un número par es divisible por 2.'),
        level('La puerta del 3: ¿puede pasar 123?', 'Sí', ['Sí', 'No'], '1 + 2 + 3 = 6, múltiplo de 3.', 'Suma sus cifras.'),
        level('La puerta del 10: ¿puede pasar 345?', 'No', ['Sí', 'No'], 'Para dividir entre 10 debe terminar en 0.', 'Mira la última cifra.'),
        level('La puerta del 5: ¿puede pasar 235?', 'Sí', ['Sí', 'No'], 'Termina en 5.', 'Los múltiplos de 5 terminan en 0 o 5.'),
        level('La puerta del 3: ¿puede pasar 256?', 'No', ['Sí', 'No'], '2 + 5 + 6 = 13, no es múltiplo de 3.', 'Suma las cifras.'),
      ]),
      game('Isla de los primos', 'Números primos y compuestos', 'Distingue números con solo dos divisores de los que tienen más.', 'pick', [
        level('El 7 tiene como divisores 1 y 7. ¿Qué es?', 'Primo', ['Primo', 'Compuesto'], 'Tiene exactamente dos divisores.', 'Cuenta sus divisores.'),
        level('El 9 tiene como divisores 1, 3 y 9. ¿Qué es?', 'Compuesto', ['Primo', 'Compuesto'], 'Tiene más de dos divisores.', 'Busca otro divisor además de 1 y él mismo.'),
        level('El 17 solo se divide entre 1 y 17. ¿Qué es?', 'Primo', ['Primo', 'Compuesto'], 'Tiene dos divisores.', 'Comprueba divisiones exactas.'),
        level('El 21 se divide entre 1, 3, 7 y 21. ¿Qué es?', 'Compuesto', ['Primo', 'Compuesto'], 'Tiene cuatro divisores.', '3 × 7 = 21.'),
        level('El 29 solo tiene los divisores 1 y 29. ¿Qué es?', 'Primo', ['Primo', 'Compuesto'], 'Solo tiene dos divisores.', 'Un número primo tiene dos divisores.'),
      ]),
      game('Puente de longitudes', 'Conversión de medidas · área y perímetro', 'Transforma medidas y calcula la distancia alrededor de figuras.', 'input', [
        level('Un sendero mide 2 m. ¿Cuántos centímetros mide?', '200', null, '2 × 100 = 200 cm.', 'Convierte metros a centímetros.'),
        level('Un cuadrado tiene lados de 5 cm. ¿Cuál es su perímetro?', '20', null, '5 × 4 = 20 cm.', 'Suma sus cuatro lados.'),
        level('Un rectángulo mide 6 cm por 4 cm. ¿Área?', '24', null, '6 × 4 = 24 cm².', 'Multiplica largo por ancho.'),
        level('Un camino mide 4 m y 50 cm. ¿Cuántos centímetros mide?', '450', null, '400 + 50 = 450 cm.', 'Convierte primero los metros.'),
        level('Un terreno mide 9 m por 6 m. ¿Perímetro?', '30', null, '9 + 6 + 9 + 6 = 30 m.', 'Calcula el borde.'),
      ]),
      game('Arquitectos de trapecios', 'Trapecios · clasificación según ángulos · área y perímetro', 'Reconoce trapecios y sus características.', 'pick', [
        level('Un trapecio tiene un lado perpendicular a sus bases. ¿Qué clase es?', 'Rectángulo', ['Rectángulo', 'Isósceles', 'Escaleno'], 'Tiene ángulos rectos.', 'Perpendicular significa 90°.'),
        level('Sus lados no paralelos tienen igual longitud. ¿Qué clase es?', 'Isósceles', ['Rectángulo', 'Isósceles', 'Escaleno'], 'Los lados iguales lo hacen isósceles.', 'Compara los lados inclinados.'),
        level('Bases 8 y 4 m, altura 3 m. ¿Área?', '18', ['12', '18', '24'], '((8 + 4) × 3) ÷ 2 = 18.', 'Usa la fórmula del trapecio.'),
        level('Bases 10 y 6 m, altura 4 m. ¿Área?', '32', ['24', '32', '40'], '((10 + 6) × 4) ÷ 2 = 32.', 'Suma las bases.'),
        level('Bases paralelas y dos ángulos rectos. ¿Qué clase es?', 'Rectángulo', ['Rectángulo', 'Isósceles', 'Escaleno'], 'Los ángulos rectos identifican el trapecio rectángulo.', 'Busca los 90°.'),
      ]),
    ],
  },
  {
    id: 3,
    title: '¿Qué sucede cuando las unidades no están completas?',
    description: 'Manipula fracciones, ubica figuras y lee datos visuales.',
    icon: '🍰',
    games: [
      game('Pasteles de fracciones', 'Fracciones homogéneas y heterogéneas · equivalencia · ampliación · simplificación', 'Junta o quita partes del mismo tamaño.', 'pick', [
        level('1/4 + 2/4 =', '3/4', ['2/4', '3/4', '3/8'], 'Al sumar partes con el mismo denominador obtenemos 3/4.', 'Suma los numeradores.'),
        level('¿Qué fracción equivale a 1/2 al ampliar por 2?', '2/4', ['1/4', '2/4', '2/3'], 'Multiplica numerador y denominador por 2.', 'Conserva la misma parte del entero.'),
        level('3/4 − 1/2 =', '1/4', ['1/4', '2/4', '3/2'], '1/2 equivale a 2/4; quedan 1/4.', 'Convierte a cuartos.'),
        level('5/6 − 2/6 =', '3/6', ['3/6', '3/12', '7/6'], 'Resta los numeradores: 5 − 2 = 3.', 'El denominador se conserva.'),
        level('2/3 + 1/6 =', '5/6', ['3/9', '5/6', '1/2'], '2/3 equivale a 4/6; 4/6 + 1/6 = 5/6.', 'Usa sextos.'),
      ]),
      game('Máquina de fracciones', 'Fracciones propias e impropias · operaciones', 'Compara y opera fracciones paso a paso.', 'pick', [
        level('2/5: ¿propia o impropia?', 'Propia', ['Propia', 'Impropia'], 'El numerador es menor que el denominador.', 'Compara 2 y 5.'),
        level('1/2 + 1/4 =', '3/4', ['2/6', '3/4', '1/4'], '1/2 = 2/4 y 2/4 + 1/4 = 3/4.', 'Convierte a cuartos.'),
        level('1/2 ÷ 1/4 =', '2', ['1/8', '2', '4'], 'Hay dos cuartos en un medio.', 'Dibuja los cuartos.'),
        level('2/3 × 3/4 =', '1/2', ['1/2', '5/7', '6/7'], '6/12 se simplifica a 1/2.', 'Multiplica y simplifica.'),
        level('3/4 − 1/6 =', '7/12', ['2/10', '7/12', '5/12'], '9/12 − 2/12 = 7/12.', 'Usa doceavos.'),
      ]),
      game('Mapa de coordenadas', 'Ubicación de figuras · plano · traslación', 'Recorre la cuadrícula usando primero derecha y luego arriba.', 'order', [
        level('Desde (1,1), avanza a la derecha y luego arriba.', 'derecha|arriba', ['arriba', 'derecha'], 'Llegas a (2,2).', 'Primero cambia la coordenada horizontal.'),
        level('Desde (1,1), ve dos veces a la derecha y una arriba.', 'derecha|derecha|arriba', ['arriba', 'derecha', 'derecha'], 'Llegas a (3,2).', 'Repite cada movimiento.'),
        level('Desde (2,1), sube dos y ve a la derecha.', 'arriba|arriba|derecha', ['derecha', 'arriba', 'arriba'], 'Llegas a (3,3).', 'Sube antes de moverte a la derecha.'),
        level('Desde (1,2), ve dos a la derecha y dos arriba.', 'derecha|derecha|arriba|arriba', ['arriba', 'derecha', 'arriba', 'derecha'], 'Llegas a (3,4).', 'Sigue los movimientos en orden.'),
        level('Desde (3,1), sube dos, ve dos a la derecha y sube una vez.', 'arriba|arriba|derecha|derecha|arriba', ['derecha', 'arriba', 'arriba', 'derecha', 'arriba'], 'Llegas a (5,4).', 'No cambies el orden.'),
      ]),
      game('Cuadrícula y espejos', 'Fracciones decimales · rotación · traslación · simetría', 'Representa décimos y observa cambios de tamaño y posición.', 'build', [
        level('Pinta 3 de 10 cuadros para mostrar 3/10.', '3', [1, 1, 1], 'Tres cuadros representan 3/10.', 'Selecciona tres cuadros.'),
        level('Pinta 6 de 10 cuadros para mostrar 6/10.', '6', [1, 1, 1, 1, 1, 1], 'Seis cuadros representan 6/10.', 'Cuenta hasta seis.'),
        level('Pinta 8 de 10 cuadros para mostrar 8/10.', '8', [1, 1, 1, 1, 1, 1, 1, 1], 'Ocho cuadros representan 8/10.', 'Pinta ocho partes.'),
        level('Pinta 4 de 10 cuadros para mostrar 4/10.', '4', [1, 1, 1, 1], 'Cuatro cuadros representan 4/10.', 'Cuenta las partes pintadas.'),
        level('Pinta 9 de 10 cuadros para mostrar 9/10.', '9', [1, 1, 1, 1, 1, 1, 1, 1, 1], 'Nueve cuadros representan 9/10.', 'Deja un cuadro sin pintar.'),
      ]),
      game('Observatorio de datos', 'Tablas · pictogramas · barras · líneas · diagramas circulares', 'Lee datos en distintos dibujos y compáralos.', 'pick', [
        level('Cada 🌱 vale 2. ¿Cuántas plantas son 🌱🌱🌱?', '6', ['3', '6', '8'], '3 × 2 = 6.', 'Multiplica la clave por los símbolos.'),
        level('Barras: lunes 4 libros y martes 7. ¿Qué día tiene más?', 'Martes', ['Lunes', 'Martes', 'Igual'], '7 es mayor que 4.', 'Compara las barras.'),
        level('La línea sube de 3 a 5 y medio círculo está coloreado. ¿Qué indica?', 'Aumenta; mitad', ['Disminuye; mitad', 'Aumenta; mitad', 'Aumenta; cuarto'], 'La línea aumenta y el círculo muestra la mitad.', 'Lee ambas representaciones.'),
        level('Cada 🌱 vale 3. ¿Cuántas representan 🌱🌱🌱🌱?', '12', ['9', '12', '15'], '4 × 3 = 12.', 'Aplica la escala.'),
        level('De martes 7 a miércoles 6, ¿qué ocurrió?', 'Disminuyó', ['Aumentó', 'Disminuyó', 'Quedó igual'], 'El valor bajó de 7 a 6.', 'Compara los dos días.'),
      ]),
      game('Parejas equivalentes', 'Equivalencia · ampliación y simplificación de fracciones', 'Encuentra fracciones que representan la misma parte.', 'pick', [
        level('¿Qué fracción equivale a 1/2?', '2/4', ['2/4', '1/4', '3/4'], '1/2 y 2/4 representan la misma parte.', 'Amplía por 2.'),
        level('Amplía 2/3 multiplicando arriba y abajo por 2.', '4/6', ['3/5', '4/6', '2/6'], '2 × 2 / 3 × 2 = 4/6.', 'Multiplica ambos términos.'),
        level('Simplifica 6/8 dividiendo entre 2.', '3/4', ['3/4', '2/4', '6/4'], '6 ÷ 2 / 8 ÷ 2 = 3/4.', 'Divide numerador y denominador.'),
        level('Amplía 3/5 multiplicando por 3.', '9/15', ['6/15', '9/15', '9/5'], '3 × 3 / 5 × 3 = 9/15.', 'Usa el mismo factor.'),
        level('Simplifica 12/16 dividiendo entre 4.', '3/4', ['3/4', '6/8', '4/3'], '12 ÷ 4 / 16 ÷ 4 = 3/4.', 'Divide ambos términos.'),
      ]),
      game('Reparto de unidades', 'Fracciones propias e impropias · problemas', 'Reconoce cuándo una fracción ocupa menos o más de una unidad.', 'pick', [
        level('Tres de cuatro partes: 3/4. ¿Es propia o impropia?', 'Propia', ['Propia', 'Impropia'], '3 es menor que 4.', 'Compara numerador y denominador.'),
        level('Cinco cuartos: 5/4. ¿Es propia o impropia?', 'Impropia', ['Propia', 'Impropia'], '5 es mayor que 4.', 'Supera una unidad.'),
        level('Se reparten 7 medios panes. ¿7/2 es propia o impropia?', 'Impropia', ['Propia', 'Impropia'], '7/2 es mayor que 1.', 'El numerador supera al denominador.'),
        level('Nueve cuartos: 9/4. ¿Propia o impropia?', 'Impropia', ['Propia', 'Impropia'], '9 es mayor que 4.', 'Representa más de dos unidades.'),
        level('De 10 partes tomas 9: 9/10. ¿Propia o impropia?', 'Propia', ['Propia', 'Impropia'], '9 es menor que 10.', 'Aún no completas la unidad.'),
      ]),
      game('Taller de movimientos', 'Rotación · traslación · simetría', 'Reconoce si una figura gira, se desliza o se refleja.', 'pick', [
        level('Una figura se desliza dos cuadros a la derecha sin girar.', 'Traslación', ['Traslación', 'Rotación', 'Simetría'], 'Deslizar sin girar es trasladar.', 'No cambia su orientación.'),
        level('Una flecha gira un cuarto de vuelta.', 'Rotación', ['Traslación', 'Rotación', 'Simetría'], 'Girar alrededor de un punto es rotar.', 'Observa el movimiento circular.'),
        level('Una figura se refleja al otro lado de una línea.', 'Simetría', ['Traslación', 'Rotación', 'Simetría'], 'Es como verse en un espejo.', 'Busca la línea central.'),
        level('Una figura sube tres cuadros y avanza uno sin girar.', 'Traslación', ['Traslación', 'Rotación', 'Simetría'], 'Se desplaza conservando su forma.', 'Solo cambia de lugar.'),
        level('Una flecha da media vuelta alrededor de su centro.', 'Rotación', ['Traslación', 'Rotación', 'Simetría'], 'Media vuelta es una rotación.', 'Gira alrededor del centro.'),
      ]),
      game('Figuras hermanas', 'Ampliación · reducción · congruencia · semejanza', 'Compara la forma y el tamaño de dos figuras.', 'pick', [
        level('Dos cuadrados miden 3 cm por lado. ¿Son congruentes o semejantes?', 'Congruentes', ['Congruentes', 'Solo semejantes'], 'Tienen la misma forma y tamaño.', 'Compara las medidas.'),
        level('Un triángulo mantiene su forma y duplica sus lados. ¿Qué es?', 'Semejantes', ['Congruentes', 'Semejantes'], 'Misma forma y otro tamaño: semejantes.', 'Observa el cambio de tamaño.'),
        level('Un cuadrado pasa de lado 2 cm a lado 4 cm. ¿Qué cambio ocurrió?', 'Ampliación', ['Ampliación', 'Reducción', 'Traslación'], 'El tamaño aumentó.', '4 es mayor que 2.'),
        level('Un rectángulo de 8 × 4 pasa a 4 × 2. ¿Qué ocurrió?', 'Reducción', ['Ampliación', 'Reducción', 'Traslación'], 'Cada lado se hizo menor.', 'Compara las medidas.'),
        level('Triángulos 3-4-5 y 6-8-10. ¿Qué son?', 'Semejantes', ['Congruentes', 'Semejantes'], 'Conservan la forma, pero cambia el tamaño.', 'Cada lado se duplicó.'),
      ]),
      game('Estación de gráficas', 'Tablas · pictogramas · barras · líneas · diagramas circulares', 'Cuenta datos representados de distintas formas.', 'input', [
        level('Cada ⭐ representa 2 puntos. ¿Cuánto valen ⭐⭐⭐⭐?', '8', null, '4 × 2 = 8.', 'Multiplica símbolos por la clave.'),
        level('A tiene 5 y B tiene 8. ¿Cuántos más tiene B?', '3', null, '8 − 5 = 3.', 'Resta las cantidades.'),
        level('De 8 partes iguales, 2 están pintadas. ¿Cuántos cuartos son?', '1', null, '2/8 = 1/4.', 'Simplifica la fracción.'),
        level('Barras: A = 4, B = 7 y C = 5. ¿Cuál es el total?', '16', null, '4 + 7 + 5 = 16.', 'Suma las tres barras.'),
        level('La línea marca 8 el martes y 6 el miércoles. ¿Cuánto bajó?', '2', null, '8 − 6 = 2.', 'Calcula la diferencia.'),
      ]),
    ],
  },
  {
    id: 4,
    title: 'Otros números… otros usos',
    description: 'Usa decimales, porcentajes, medidas, datos y relaciones entre cantidades.',
    icon: '📊',
    games: [
      game('Jardín de décimos', 'Números decimales · conversión decimal y fracción · suma y resta', 'Muestra décimos como cuadros y como números.', 'build', [
        level('Pinta 0,2 de la cuadrícula.', '2', [1, 1], '0,2 representa dos décimos.', 'Selecciona dos cuadros.'),
        level('Pinta 0,5 de la cuadrícula.', '5', [1, 1, 1, 1, 1], '0,5 representa cinco décimos.', 'Selecciona cinco cuadros.'),
        level('Si 0,3 + 0,4 = 0,7, pinta el resultado.', '7', [1, 1, 1, 1, 1, 1, 1], 'El resultado son siete décimos.', 'Suma los décimos.'),
        level('Si 0,9 − 0,3 = 0,6, pinta el resultado.', '6', [1, 1, 1, 1, 1, 1], 'Quedan seis décimos.', 'Resta los cuadros.'),
        level('Si 0,8 + 0,2 = 1, pinta la unidad completa.', '10', [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 'Diez décimos forman una unidad.', 'Completa los diez cuadros.'),
      ]),
      game('Mercado de porcentajes', 'Suma y resta decimal · porcentajes · razones · fracciones', 'Relaciona una cantidad escrita de varias maneras.', 'pick', [
        level('Compras 1,2 kg y 0,3 kg. ¿Cuántos kg llevas?', '1,5', ['1,5', '1,23', '0,9'], '1,2 + 0,3 = 1,5.', 'Alinea las comas.'),
        level('25 % de 20 fichas: ¿cuántas son?', '5', ['5', '10', '15'], '25 % es la cuarta parte; 20 ÷ 4 = 5.', 'Convierte 25 % en 1/4.'),
        level('La razón 1 de cada 10 equivale a…', '10 % y 0,1', ['1 % y 0,01', '10 % y 0,1', '50 % y 0,5'], '1/10 = 0,1 = 10 %.', 'Usa cien como referencia.'),
        level('50 % de 18 fichas: ¿cuántas son?', '9', ['6', '9', '12'], 'La mitad de 18 es 9.', '50 % es la mitad.'),
        level('Compras 2,5 kg y usas 0,8 kg. ¿Cuánto queda?', '1,7', ['1,7', '2,3', '3,3'], '2,5 − 0,8 = 1,7.', 'Resta décimas.'),
      ]),
      game('Constructor de medidas', 'Volumen · múltiplos y submúltiplos · capacidad y peso', 'Cuenta cubos y distingue qué mide cada unidad.', 'input', [
        level('Una capa tiene 2 filas de 3 cubos. ¿Cuántos cubos ocupa?', '6', null, '2 × 3 = 6.', 'Cuenta filas y columnas.'),
        level('Un cubo mide 2 m por 2 m por 2 m. ¿Volumen?', '8', null, '2 × 2 × 2 = 8 m³.', 'Multiplica las tres dimensiones.'),
        level('¿Cuántos dm³ hay en 1 m³?', '1000', null, '1 m = 10 dm; 10 × 10 × 10 = 1000.', 'Convierte cada dimensión.'),
        level('Un prisma tiene 3 filas de 4 cubos en 2 capas. ¿Cuántos cubos?', '24', null, '3 × 4 × 2 = 24.', 'Calcula una capa y repítela.'),
        level('Un bloque mide 3 m × 2 m × 2 m. ¿Volumen?', '12', null, '3 × 2 × 2 = 12 m³.', 'Multiplica largo, ancho y alto.'),
      ]),
      game('Reporteros del azar', 'Tablas y gráficas · fenómenos aleatorios y deterministas', 'Distingue lo seguro de lo que puede variar.', 'pick', [
        level('Lunes 3 libros y martes 5. ¿Qué día tiene más?', 'Martes', ['Lunes', 'Martes', 'Igual'], '5 es mayor que 3.', 'Compara los datos.'),
        level('Lanzar un dado. ¿Es aleatorio o determinista?', 'Aleatorio', ['Aleatorio', 'Determinista'], 'No se sabe qué cara aparecerá.', 'Puede salir más de un resultado.'),
        level('A = 8 y B = 6. ¿Cuál es la diferencia?', '2', ['2', '6', '14'], '8 − 6 = 2.', 'Resta los grupos.'),
        level('Sacar una ficha sin mirar de una bolsa. ¿Qué es?', 'Aleatorio', ['Aleatorio', 'Determinista'], 'El resultado no se conoce de antemano.', 'Puede variar.'),
        level('Sumar 7 + 5 y obtener 12. ¿Qué es?', 'Determinista', ['Aleatorio', 'Determinista'], 'La suma siempre da 12.', 'El resultado es seguro.'),
      ]),
      game('Balanza proporcional', 'Igualdades · proporcionalidad directa e inversa', 'Equilibra cantidades y descubre cómo cambian juntas.', 'input', [
        level('Equilibra: 4 + □ = 10. ¿Qué número falta?', '6', null, '4 + 6 = 10.', 'Busca la diferencia.'),
        level('Si 2 panes cuestan 4 fichas, ¿cuánto cuestan 5 panes?', '10', null, 'Cada pan cuesta 2 fichas; 5 × 2 = 10.', 'Encuentra el valor de uno.'),
        level('Si 3 personas tardan 8 horas, ¿cuánto tardan 6 al mismo ritmo?', '4', null, 'Al duplicar personas, el tiempo se reduce a la mitad.', 'Es una relación inversa.'),
        level('Si 4 cuadernos cuestan 12 fichas, ¿cuánto cuestan 7?', '21', null, 'Cada cuaderno cuesta 3; 7 × 3 = 21.', 'Calcula el valor unitario.'),
        level('Si 4 personas tardan 15 horas, ¿cuánto tardan 6?', '10', null, '4 × 15 = 60; 60 ÷ 6 = 10.', 'Usa horas-persona.'),
      ]),
      game('Cambios decimales', 'Conversión de decimales a fracciones y viceversa · suma y resta', 'Cambia entre décimos, fracciones y números decimales.', 'pick', [
        level('¿Qué decimal representa 4/10?', '0,4', ['0,4', '0,04', '4,0'], 'Cuatro décimos son 0,4.', 'El denominador es 10.'),
        level('¿Qué fracción representa 0,7?', '7/10', ['7/10', '7/100', '1/7'], '0,7 son siete décimos.', 'Escribe la fracción decimal.'),
        level('0,8 − 0,3 =', '0,5', ['0,3', '0,5', '1,1'], '8 décimos − 3 décimos = 5 décimos.', 'Resta las décimas.'),
        level('0,6 + 0,25 =', '0,85', ['0,31', '0,85', '0,65'], '0,60 + 0,25 = 0,85.', 'Alinea las comas.'),
        level('¿Qué fracción decimal representa 0,35?', '35/100', ['35/10', '35/100', '3/5'], '0,35 son 35 centésimos.', 'Hay dos cifras decimales.'),
      ]),
      game('Escaparate de descuentos', 'Porcentajes · razones · fracciones y decimales', 'Calcula partes de una cantidad con porcentajes sencillos.', 'input', [
        level('¿Cuánto es el 50 % de 12 fichas?', '6', null, 'La mitad de 12 es 6.', '50 % es la mitad.'),
        level('¿Cuánto es el 25 % de 20 fichas?', '5', null, 'La cuarta parte de 20 es 5.', '25 % = 1/4.'),
        level('¿Cuánto es el 10 % de 70 fichas?', '7', null, 'La décima parte de 70 es 7.', 'Divide entre 10.'),
        level('¿Cuánto es el 20 % de 45 fichas?', '9', null, '20 % = 1/5; 45 ÷ 5 = 9.', 'Usa una quinta parte.'),
        level('Una bolsa cuesta 80 fichas y tiene 25 % de descuento. ¿Cuánto se descuenta?', '20', null, 'La cuarta parte de 80 es 20.', 'Calcula 80 ÷ 4.'),
      ]),
      game('Laboratorio de recipientes', 'Volumen · capacidad · peso · metro cúbico', 'Elige qué magnitud se mide en cada situación.', 'pick', [
        level('¿Qué magnitud indica el espacio que ocupa una caja?', 'Volumen', ['Volumen', 'Capacidad', 'Peso'], 'El espacio ocupado es volumen.', 'Piensa en el interior de la caja.'),
        level('¿Qué indica cuánto líquido cabe en una botella?', 'Capacidad', ['Volumen', 'Capacidad', 'Peso'], 'La cantidad que cabe es capacidad.', 'Observa que contiene líquido.'),
        level('¿Qué comparas al poner frutas en una balanza?', 'Peso', ['Volumen', 'Capacidad', 'Peso'], 'La balanza compara peso.', 'Mira el instrumento.'),
        level('Una jarra contiene 2 litros. ¿Qué magnitud expresa?', 'Capacidad', ['Volumen', 'Capacidad', 'Peso'], 'Los litros miden capacidad.', 'Es líquido que cabe.'),
        level('Un bloque ocupa 4 dm³. ¿Qué mide ese dato?', 'Volumen', ['Volumen', 'Capacidad', 'Peso'], 'Los dm³ miden espacio ocupado.', 'Observa la unidad cúbica.'),
      ]),
      game('Detectives de tablas', 'Análisis de tablas y gráficas · interpretación', 'Compara cantidades en tablas y gráficas.', 'input', [
        level('Lunes 3 y martes 4. ¿Cuál es el total?', '7', null, '3 + 4 = 7.', 'Suma ambos días.'),
        level('A = 5 y B = 8. ¿Cuántos más tiene B?', '3', null, '8 − 5 = 3.', 'Calcula la diferencia.'),
        level('Enero 6, febrero 9 y marzo 5. ¿Cuál es el total?', '20', null, '6 + 9 + 5 = 20.', 'Suma los tres meses.'),
        level('Martes 12 y miércoles 7. ¿Cuántos más hubo el martes?', '5', null, '12 − 7 = 5.', 'Resta los datos.'),
        level('A = 12, B = 9 y C = 15. ¿A + C − B?', '18', null, '12 + 15 − 9 = 18.', 'Resuelve en el orden indicado.'),
      ]),
      game('Rutas proporcionales', 'Proporcionalidad directa e inversa · regla de tres', 'Resuelve situaciones donde dos cantidades cambian juntas.', 'input', [
        level('Si 2 cuadernos cuestan 6 fichas, ¿cuánto cuestan 4?', '12', null, 'Al duplicar cuadernos, se duplican fichas.', 'Es proporcionalidad directa.'),
        level('Si 3 botellas llenan 6 vasos, ¿cuántos llenan 5?', '10', null, 'Cada botella llena 2 vasos.', 'Encuentra el valor unitario.'),
        level('Si 2 personas tardan 12 horas, ¿cuánto tardan 4?', '6', null, 'Al duplicar personas, se reduce a la mitad.', 'Es proporcionalidad inversa.'),
        level('Si 4 bolsas contienen 12 semillas, ¿cuántas contienen 7?', '21', null, 'Cada bolsa contiene 3 semillas.', 'Calcula primero una bolsa.'),
        level('Si 5 personas tardan 12 días, ¿cuánto tardan 10?', '6', null, 'El doble de personas requiere la mitad de días.', 'Usa la relación inversa.'),
      ]),
    ],
  },
];

const gradeFourInstructions = {
  'Torre de millones': {
    steps: '1. Mira las columnas. 2. Ordena las cifras de izquierda a derecha según su posición. 3. Comprueba.',
    example: 'Centenas | Decenas | Unidades\n  3      →    4     →    2\n             342',
  },
  'Puente de operaciones': {
    steps: '1. Mira las cantidades. 2. Calcula y escribe el resultado. 3. Comprueba.',
    example: '1.200.000 + 300.000\n→ 1.500.000',
  },
  'Máquina multiplicadora': {
    steps: '1. Lee la igualdad. 2. Elige el nombre de la propiedad. 3. Comprueba.',
    example: '4 × 7 = 7 × 4\n↔ Cambia el orden: conmutativa',
  },
  'Reparto explorador': {
    steps: '1. Observa los grupos de objetos. 2. Reparte por igual y escribe lo pedido. 3. Comprueba.',
    example: '12 semillas ÷ 3 equipos\n●●●● | ●●●● | ●●●●\n→ 4 por equipo',
  },
  'Taller de figuras': {
    steps: '1. Observa la figura y su medida. 2. Elige la figura o clase correcta. 3. Comprueba.',
    example: 'Transportador: 90°\n∟ → ángulo recto',
  },
  'Bloques de valor': {
    steps: '1. Mira la cifra señalada. 2. Identifica su posición. 3. Escribe cuánto vale.',
    example: '2.345.678\n2 millones → 2.000.000',
  },
  'Exploradores de atributos': {
    steps: '1. Observa el atributo señalado. 2. Compara las piezas. 3. Elige la descripción correcta.',
    example: '🔴 🔴 🔵\nDos objetos comparten el color rojo.',
  },
  'Transportador aventurero': {
    steps: '1. Mira la abertura y su medida. 2. Compárala con 90°. 3. Elige su clase.',
    example: '45° < 90° → agudo\n90° → recto\n120° > 90° → obtuso',
  },
  'Campamento de triángulos': {
    steps: '1. Observa las medidas. 2. Compara los lados o los ángulos. 3. Elige el nombre.',
    example: '3 cm · 3 cm · 3 cm\nTres lados iguales → equilátero',
  },
  'Museo de polígonos': {
    steps: '1. Comprueba que la figura esté cerrada. 2. Cuenta sus lados. 3. Elige su nombre.',
    example: '□ → 4 lados → cuadrilátero',
  },
  'Ruta de los números': {
    steps: '1. Lee la pista. 2. Ordena las piezas de menor a mayor. 3. Comprueba el recorrido.',
    example: 'Saltos de 4:\n4 → 8 → 12',
  },
  'Relojes y equipos': {
    steps: '1. Sigue los saltos o agrupaciones. 2. Escribe el número común. 3. Comprueba.',
    example: '2: 2, 4, 6\n3: 3, 6\n→ primero en común: 6',
  },
  'Árbol de primos': {
    steps: '1. Mira cómo se separa el número. 2. Ordena los factores primos. 3. Comprueba.',
    example: '12 → 2 × 6 → 2 × 2 × 3',
  },
  'Terrenos y trapecios': {
    steps: '1. Mira la figura y sus medidas. 2. Calcula el área o perímetro pedido. 3. Escribe solo el número.',
    example: 'Rectángulo 4 m × 3 m\nárea = 4 × 3 = 12 m²',
  },
  'Mesa de repartos': {
    steps: '1. Observa las partes o los lados. 2. Elige la respuesta correspondiente. 3. Comprueba.',
    example: '🍞 dividido en 4 partes\n1 parte → 1/4',
  },
  'Patrulla par e impar': {
    steps: '1. Imagina parejas de objetos. 2. Mira si sobra alguno. 3. Elige par o impar.',
    example: '●● ●● → 4: par\n●● ● → 3: impar',
  },
  'Puertas de divisibilidad': {
    steps: '1. Lee la regla de la puerta. 2. Observa el número. 3. Elige si puede pasar.',
    example: 'Termina en 0 o 5 → divisible por 5',
  },
  'Isla de los primos': {
    steps: '1. Busca divisores exactos. 2. Cuenta cuántos hay. 3. Elige primo o compuesto.',
    example: '7: divisores 1 y 7 → primo\n8: 1, 2, 4, 8 → compuesto',
  },
  'Puente de longitudes': {
    steps: '1. Observa la unidad. 2. Usa la equivalencia indicada. 3. Escribe el número.',
    example: '1 m = 100 cm\n2 m = 200 cm',
  },
  'Arquitectos de trapecios': {
    steps: '1. Mira bases, lados y ángulos. 2. Identifica la característica. 3. Elige la respuesta.',
    example: 'Dos bases paralelas\nUn lado perpendicular → trapecio rectángulo',
  },
  'Pasteles de fracciones': {
    steps: '1. Mira las partes dibujadas. 2. Busca denominadores iguales. 3. Elige el resultado.',
    example: '1/4 + 2/4\n■□□□ + ■■□□ → 3/4',
  },
  'Máquina de fracciones': {
    steps: '1. Observa la transformación. 2. Elige el resultado. 3. Comprueba.',
    example: '1/2 × 1/3\n1 × 1 / 2 × 3 → 1/6',
  },
  'Mapa de coordenadas': {
    steps: '1. Parte de la coordenada indicada. 2. Ordena los pasos del recorrido. 3. Comprueba.',
    example: '(1,1) + derecha + arriba\n→ (2,2)',
  },
  'Cuadrícula y espejos': {
    steps: '1. Cada cuadro vale un décimo. 2. Selecciona los cuadros necesarios. 3. Comprueba.',
    example: '■■■□□□□□□□\n3 cuadros de 10 → 3/10',
  },
  'Observatorio de datos': {
    steps: '1. Mira la gráfica o tabla. 2. Cuenta o compara. 3. Elige la respuesta.',
    example: '🌱 = 2 plantas\n🌱🌱 → 4 plantas',
  },
  'Parejas equivalentes': {
    steps: '1. Compara las partes pintadas. 2. Amplía o simplifica. 3. Elige la fracción equivalente.',
    example: '■□ = ■■□□\n1/2 = 2/4',
  },
  'Reparto de unidades': {
    steps: '1. Mira las partes. 2. Compara las partes tomadas con el total. 3. Elige.',
    example: '3/4 < 1 unidad → propia\n5/4 > 1 unidad → impropia',
  },
  'Taller de movimientos': {
    steps: '1. Compara la figura antes y después. 2. Mira cómo se movió. 3. Elige el movimiento.',
    example: '△ → → △ (se desliza) = traslación\n↻ (gira) = rotación',
  },
  'Figuras hermanas': {
    steps: '1. Observa forma y tamaño. 2. Decide qué cambió. 3. Elige la relación.',
    example: 'Misma forma + mismo tamaño → congruentes\nMisma forma + otro tamaño → semejantes',
  },
  'Estación de gráficas': {
    steps: '1. Lee la clave o escala. 2. Cuenta las marcas. 3. Escribe el número.',
    example: '🌱 = 2 plantas\n🌱🌱🌱 = 6 plantas',
  },
  'Jardín de décimos': {
    steps: '1. Mira el decimal. 2. Selecciona esa cantidad de diez cuadros. 3. Comprueba.',
    example: '0,2 = 2/10\n■■□□□□□□□□',
  },
  'Mercado de porcentajes': {
    steps: '1. Mira las cantidades. 2. Relaciona sus representaciones. 3. Elige y comprueba.',
    example: '50 % = 50/100 = 1/2 = 0,5',
  },
  'Constructor de medidas': {
    steps: '1. Mira los cubos o el recipiente. 2. Calcula o compara. 3. Escribe el número.',
    example: '2 filas × 3 cubos\n■■■  ■■■ → 6 cubos',
  },
  'Reporteros del azar': {
    steps: '1. Lee la tabla o el experimento. 2. Compara los datos. 3. Elige la respuesta.',
    example: 'Dado 🎲 → puede variar: aleatorio\n2 + 2 → siempre 4: determinista',
  },
  'Balanza proporcional': {
    steps: '1. Observa los dos lados o cantidades. 2. Busca la relación. 3. Escribe el número que falta.',
    example: '2 panes → 4 fichas\n4 panes → 8 fichas',
  },
  'Cambios decimales': {
    steps: '1. Observa las partes de diez. 2. Escribe la misma cantidad de otra manera. 3. Elige.',
    example: '3/10 = 0,3\n■■■□□□□□□□',
  },
  'Escaparate de descuentos': {
    steps: '1. Convierte el porcentaje en una parte conocida. 2. Divide la cantidad. 3. Escribe el resultado.',
    example: '50 % = 1/2\n50 % de 10 = 5',
  },
  'Laboratorio de recipientes': {
    steps: '1. Mira el objeto. 2. Piensa qué quieres medir. 3. Elige la magnitud.',
    example: 'Caja → volumen\nBotella → capacidad\nBalanza → peso',
  },
  'Detectives de tablas': {
    steps: '1. Busca los datos indicados. 2. Súmalos o compáralos. 3. Escribe el resultado.',
    example: 'Lunes 2 | Martes 4\nTotal = 2 + 4 = 6',
  },
  'Rutas proporcionales': {
    steps: '1. Compara los dos casos. 2. Decide si se duplican o se reducen. 3. Escribe el número.',
    example: '2 cuadernos → 6 fichas\n4 cuadernos → 12 fichas',
  },
};

gradeFourPeriods.forEach((period) => {
  period.games.forEach((game) => Object.assign(game, gradeFourInstructions[game.name]));
});
