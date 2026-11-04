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

export const gradeFivePeriods = [
  {
    id: 1,
    title: 'Los números también cumplen reglas',
    description: 'Explora múltiplos, divisores, fracciones, decimales y formas geométricas.',
    icon: '🧭',
    color: 'green',
  },
  {
    id: 2,
    title: 'Con los números podemos hacer muchos cálculos',
    description: 'Resuelve operaciones con decimales, potencias, enteros y coordenadas.',
    icon: '⚙️',
    color: 'orange',
  },
  {
    id: 3,
    title: 'Utilicemos adecuadamente los sistemas de medida',
    description: 'Relaciona medidas, proporciones, datos y transformaciones de figuras.',
    icon: '🔬',
    color: 'blue',
  },
  {
    id: 4,
    title: 'Apliquemos nuestros conocimientos a la resolución de problemas',
    description: 'Aplica medidas, porcentajes, datos, probabilidad y propiedades de sólidos.',
    icon: '🏗️',
    color: 'pink',
  },
];

export const gradeFiveGames = [
  [
    game('Sendero de los números', 'Múltiplos, divisores, factores primos, MCM y MCD', 'Un múltiplo sale al multiplicar; un divisor reparte sin sobrantes. El MCM señala el primer encuentro y el MCD el mayor reparto común.', 'pick', [
      level('Encuentra un múltiplo de 6 que también divida a 24.', '12', ['10', '12', '14', '18'], '12 = 6 × 2 y 24 ÷ 12 = 2.', 'Busca cuál de esos números cabe exactamente en 24.'),
      level('Forma 30 usando únicamente factores primos.', '2 × 3 × 5', ['2 × 3 × 5', '3 × 10', '2 × 15', '5 × 5'], '2 × 3 × 5 = 30; los tres factores son primos.', 'Descompón 30 como 3 × 10 y luego 10 en 2 × 5.'),
      level('Dos luces parpadean cada 4 y 6 segundos. ¿Cuándo coinciden primero?', '12', ['6', '8', '12', '24'], '12 es el primer múltiplo común de 4 y 6.', 'Escribe 4, 8, 12 y compáralo con 6, 12.'),
    ]),
    game('Jardín de fracciones', 'Fracciones homogéneas, heterogéneas, propias, impropias, mixtos y recta numérica', 'El denominador dice en cuántas partes se divide un entero. Una fracción impropia puede superar un entero.', 'pick', [
      level('Elige dos fracciones homogéneas.', '2/5 y 4/5', ['2/5 y 4/5', '1/2 y 3/4', '3/8 y 1/4'], 'Ambas tienen denominador 5.', 'Encuentra dos fracciones divididas en quintos.'),
      level('En la recta de 0 a 1, ¿cuál queda justo a la mitad?', '1/2', ['1/4', '1/2', '3/4'], '1/2 está a la misma distancia de 0 y de 1.', 'Divide la distancia en dos segmentos iguales.'),
      level('Convierte 7/4 en número mixto.', '1 3/4', ['1 1/4', '1 3/4', '2 1/4'], '4/4 forma un entero y sobran 3/4.', 'Separa 7 cuartos en grupos de 4.'),
    ]),
    game('Taller de piezas fraccionarias', 'Suma, resta, inverso multiplicativo y división de fracciones', 'Para operar fracciones heterogéneas, usa un denominador común. Para dividir, multiplica por el inverso de la segunda.', 'input', [
      level('Comparte una fruta: 1/2 + 1/4 = ¿cuánto?', '3/4', null, '1/2 = 2/4; al agregar 1/4 obtienes 3/4.', 'Convierte primero la mitad a cuartos.'),
      level('Tienes 3/4 y usas 1/2. ¿Cuánto queda?', '1/4', null, '1/2 = 2/4; entonces 3/4 − 2/4 = 1/4.', 'Representa 3/4 y quita dos cuartos.'),
      level('Calcula 2/3 ÷ 4/5. Escribe una fracción simplificada.', '5/6', null, '2/3 × 5/4 = 10/12 = 5/6.', 'Da vuelta a la segunda fracción y simplifica.'),
    ]),
    game('Puente decimal', 'Decimales, conversiones y décimas, centésimas y milésimas', 'Una décima es una parte entre diez; una centésima, entre cien; una milésima, entre mil.', 'build', [
      level('Construye 5 décimas para representar 0,5.', '5', [1, 2, 3], '5/10 = 0,5 = 1/2.', 'Pinta cinco de diez partes.'),
      level('Construye 25 centésimas para representar 0,25.', '25', [5, 10, 15], '25/100 = 0,25 = 1/4.', 'Pinta 25 casillas de una cuadrícula de 100.'),
      level('Construye 125 milésimas para representar 0,125.', '125', [25, 50, 75], '125/1000 = 0,125 = 1/8.', 'Suma piezas hasta llegar a 125.'),
    ]),
    game('Ruta de medidas', 'Longitud, superficie, conversiones, perímetro y área', 'El perímetro rodea una figura; el área cubre su superficie.', 'input', [
      level('Un camino mide 2 m. ¿Cuántos centímetros son?', '200', null, '1 m = 100 cm, por eso 2 m = 200 cm.', 'Multiplica los metros por 100.'),
      level('Un rectángulo mide 4 cm por 3 cm. ¿Cuál es su perímetro?', '14', null, '4 + 3 + 4 + 3 = 14 cm.', 'Suma los cuatro lados.'),
      level('¿Cuál es el área de un rectángulo de 4 cm por 3 cm?', '12', null, '4 × 3 = 12 cm².', 'Cuenta las filas y columnas de cuadritos.'),
    ]),
    game('Museo de polígonos', 'Clasificación de polígonos', 'Un polígono es una figura cerrada formada por lados rectos.', 'pick', [
      level('Envía al portal la figura de tres lados.', 'Triángulo', ['Cuadrado', 'Triángulo', 'Pentágono'], 'Un triángulo tiene tres lados.', 'Cuenta los lados rectos.'),
      level('Envía al portal la figura de cinco lados.', 'Pentágono', ['Hexágono', 'Pentágono', 'Triángulo'], 'Penta significa cinco.', 'Cuenta los segmentos del borde.'),
      level('Envía al portal la figura de seis lados.', 'Hexágono', ['Cuadrado', 'Octágono', 'Hexágono'], 'Hexa significa seis.', 'Busca el nombre que corresponde a seis.'),
    ]),
  ],
  [
    game('Tienda de cálculos', 'Operaciones y problemas con decimales', 'En sumas y restas alinea las comas y comprueba que el resultado tenga sentido.', 'input', [
      level('Una fruta cuesta 2,5 fichas y otra 1,25. ¿Cuánto cuestan juntas?', '3,75', null, '2,50 + 1,25 = 3,75 fichas.', 'Escribe 2,5 como 2,50.'),
      level('Tienes 10 fichas y gastas 3,4. ¿Cuánto queda?', '6,6', null, '10,0 − 3,4 = 6,6 fichas.', 'Representa 10 como 10,0.'),
      level('Dos paquetes cuestan 2,4 cada uno. Reparte el costo entre 3 amigos.', '1,6', null, '2 × 2,4 = 4,8; 4,8 ÷ 3 = 1,6.', 'Calcula primero el costo de los dos paquetes.'),
    ]),
    game('Ascensor de enteros', 'Operaciones con números enteros', 'Subir o sumar mueve a la derecha; bajar o restar mueve a la izquierda.', 'pick', [
      level('Estás en −2 y subes 3 pisos. ¿Dónde llegas?', '1', ['−5', '−1', '1', '5'], '−2 + 3 = 1.', 'Da tres pasos hacia la derecha.'),
      level('Estás en 4 y bajas 7 pisos. ¿Dónde llegas?', '−3', ['−11', '−3', '3', '11'], '4 − 7 = −3.', 'Da siete pasos hacia la izquierda.'),
      level('La temperatura es −3 °C, sube 5 °C y baja 4 °C. ¿Cómo queda?', '−2', ['−4', '−2', '2', '6'], '−3 + 5 − 4 = −2 °C.', 'Haz los movimientos en orden.'),
    ]),
    game('Torres de potencias', 'Potenciación, radicación y logaritmación', 'Una potencia repite una multiplicación; la raíz y el logaritmo deshacen esas operaciones.', 'pick', [
      level('Forma 2³. ¿Cuántos bloques necesitas?', '8', ['5', '6', '8', '9'], '2 × 2 × 2 = 8.', 'Multiplica tres factores 2.'),
      level('Un cuadrado tiene 25 bloques. ¿Cuánto mide cada lado? √25 =', '5', ['4', '5', '10', '25'], '5 × 5 = 25.', 'Busca dos lados iguales cuyo producto sea 25.'),
      level('¿A qué exponente elevas 2 para obtener 16? log₂16 =', '4', ['2', '3', '4', '8'], '2⁴ = 16.', 'Cuenta los factores 2.'),
    ]),
    game('Mapa del tesoro', 'Plano cartesiano, parejas ordenadas, puntos y localizaciones', 'Una pareja (x, y) indica primero el desplazamiento horizontal y luego el vertical.', 'grid', [
      level('Encuentra el tesoro en (1, 2).', '1,2', null, 'Avanza uno a la derecha y dos arriba.', 'x va primero y después y.'),
      level('Llega al puente en (3, 1).', '3,1', null, 'Avanza tres a la derecha y uno arriba.', 'El primer número es x.'),
      level('Busca la estrella en (4, 3).', '4,3', null, 'Avanza cuatro columnas y tres filas.', 'Empieza en el origen.'),
    ]),
    game('Máquina de operaciones', 'Orden de operaciones y resolución de problemas', 'Resolvemos paréntesis, potencias, multiplicaciones y divisiones antes de sumas y restas.', 'order', [
      level('Ordena los pasos para resolver 2 + 3 × 4.', 'multiplicar|sumar', ['sumar', 'multiplicar'], 'Primero multiplicar y después sumar.', 'La multiplicación tiene prioridad.'),
      level('Ordena los pasos para resolver (8 − 2) ÷ 3.', 'paréntesis|dividir', ['dividir', 'paréntesis'], 'Primero el paréntesis y después dividir.', 'Resuelve lo que está entre paréntesis.'),
      level('Ordena los pasos para 2² + (9 − 3) ÷ 2.', 'paréntesis|potencia|dividir|sumar', ['sumar', 'dividir', 'potencia', 'paréntesis'], 'El orden es paréntesis, potencia, división y suma.', 'La suma queda al final.'),
    ]),
    game('Laboratorio de propiedades', 'Propiedad conmutativa y distributiva', 'Conmutar cambia el orden; distribuir multiplica cada término dentro de un paréntesis.', 'pick', [
      level('Por conmutatividad, 3 + 7 equivale a…', '7 + 3', ['7 + 3', '7 − 3', '3 × 7'], '3 + 7 = 7 + 3.', 'Solo cambia el orden.'),
      level('Por conmutatividad, 4 × 6 equivale a…', '6 × 4', ['6 + 4', '6 × 4', '6 ÷ 4'], '4 × 6 = 6 × 4.', 'Conserva el signo de multiplicar.'),
      level('Distribuye 3 × (4 + 2).', '3 × 4 + 3 × 2', ['3 × 4 + 2', '3 × 4 + 3 × 2', '3 + 4 × 2'], 'El 3 multiplica al 4 y al 2.', 'Traza una flecha desde el 3 a cada término.'),
    ]),
  ],
  [
    game('Estación de medidas', 'Volumen, masa y relaciones entre unidades', 'La masa indica material y el volumen el espacio que ocupa.', 'pick', [
      level('Envía al portal la equivalencia de 1 kg.', '1000 g', ['100 g', '1000 g', '10 g'], 'Un kilogramo contiene 1000 gramos.', 'Un kilo equivale a mil gramos.'),
      level('Envía al portal la equivalencia de 1 m³.', '1000 dm³', ['10 dm³', '100 dm³', '1000 dm³'], '10 × 10 × 10 = 1000 dm³.', 'En volumen se cuentan tres dimensiones.'),
      level('Envía al portal la equivalencia de 2500 g.', '2,5 kg', ['25 kg', '2,5 kg', '0,25 kg'], '2500 ÷ 1000 = 2,5 kg.', 'Divide los gramos entre 1000.'),
    ]),
    game('Balanza de razones', 'Razones, proporciones e igualdades', 'En una proporción ambas cantidades crecen o disminuyen por el mismo factor.', 'build', [
      level('La razón roja:azul es 1:2. Para 2 rojas construye las azules.', '4', [1, 2], 'Dos rojas necesitan cuatro azules.', 'Duplica ambos términos.'),
      level('3 semillas necesitan 6 vasos. Para 6 semillas construye los vasos.', '12', [2, 4, 6], 'Al duplicar semillas, duplicas vasos.', 'Aplica ×2 también a los vasos.'),
      level('4 cajas pesan 20 kg. Para 8 cajas construye los kg.', '40', [5, 10, 20], 'Ocho cajas son el doble: 40 kg.', 'Forma dos grupos de cuatro cajas.'),
    ]),
    game('Ruta de variables', 'Variables, proporción directa e inversa y regla de tres', 'Una variable puede depender de otra. La relación puede ser directa o inversa.', 'input', [
      level('Cada bolsa tiene 3 mangos. ¿Cuántos hay en 4 bolsas?', '12', null, '4 × 3 = 12.', 'Forma cuatro grupos de tres.'),
      level('6 personas tardan 4 horas. Si trabajan 3 al mismo ritmo, ¿cuántas horas?', '8', null, 'La mitad de personas necesita el doble de tiempo.', 'Duplica las cuatro horas.'),
      level('5 m de tela cuestan 15 fichas. ¿Cuánto cuestan 8 m?', '24', null, 'Cada metro cuesta 3; ocho metros cuestan 24.', 'Divide 15 entre 5 y multiplica por 8.'),
    ]),
    game('Bosque de gráficas', 'Datos, diagramas, barras, líneas e histogramas', 'Las gráficas permiten comparar cantidades y observar cambios.', 'build', [
      level('Construye la barra de 2 aves observadas el lunes.', '2', [1], 'Dos bloques representan dos aves.', 'Coloca un bloque por cada ave.'),
      level('El martes hubo 3 aves y el miércoles 4. Construye el total.', '7', [1, 2, 3], '3 + 4 = 7 aves.', 'Suma ambas barras.'),
      level('Una línea sube de 4 a 9. Construye cuánto aumentó.', '5', [1, 2, 3], '9 − 4 = 5.', 'Calcula la diferencia entre final e inicio.'),
    ]),
    game('Exploradores de datos', 'Media, mediana, moda y recolección de datos', 'La media reparte la suma; la mediana es el valor central y la moda el más repetido.', 'input', [
      level('Se recolectaron 2, 3 y 4. ¿Cuál es la media?', '3', null, '(2 + 3 + 4) ÷ 3 = 3.', 'Suma y reparte entre tres datos.'),
      level('Ordena 7, 3 y 5. ¿Cuál es la mediana?', '5', null, 'Ordenados quedan 3, 5, 7.', 'Busca el número del centro.'),
      level('En 2, 4, 4, 6 y 9, ¿cuál es la moda?', '4', null, 'El 4 aparece dos veces.', 'Elige el valor que más se repite.'),
    ]),
    game('Espejo de figuras', 'Simetría, semejanza, congruencia y transformaciones', 'Reflejar, trasladar y rotar transforman figuras; la homotecia cambia su tamaño.', 'pick', [
      level('Una figura se refleja respecto a una línea. ¿Cómo se llama?', 'Eje de simetría', ['Eje de simetría', 'Traslación', 'Volumen'], 'El eje de simetría separa mitades reflejadas.', 'Imagina doblar la figura por la línea.'),
      level('Un triángulo se mueve sin girar ni cambiar tamaño. Clasifica el movimiento.', 'Traslación', ['Rotación', 'Traslación', 'Homotecia'], 'Una traslación desplaza la figura.', 'Desliza la figura sin girarla.'),
      level('Una figura crece sin cambiar su forma. ¿Qué transformación es?', 'Homotecia', ['Rotación', 'Congruencia', 'Homotecia'], 'La homotecia cambia el tamaño y conserva la forma.', 'Compara la figura pequeña con la ampliada.'),
    ]),
  ],
  [
    game('Depósito de capacidad', 'Equivalencias de volumen y capacidad', 'Un decímetro cúbico ocupa el mismo espacio que un litro.', 'input', [
      level('¿Cuántos mililitros hay en 1 litro?', '1000', null, '1 L = 1000 mL.', 'Un litro tiene mil mililitros.'),
      level('¿Cuántos litros son 2 dm³?', '2', null, '1 dm³ = 1 L, por eso 2 dm³ = 2 L.', 'Convierte cada dm³ en un litro.'),
      level('Una caja tiene 3000 cm³. ¿Cuántos litros caben?', '3', null, '1000 cm³ = 1 L; 3000 cm³ = 3 L.', 'Agrupa en grupos de 1000 cm³.'),
    ]),
    game('Feria de datos', 'Media, mediana, moda, frecuencia y gráficas', 'Una tabla de frecuencia cuenta repeticiones y una gráfica las muestra.', 'pick', [
      level('Datos: 1, 2, 2, 3. ¿Cuál es la frecuencia del 2?', '2', ['1', '2', '3', '4'], 'El 2 aparece dos veces.', 'Cuenta las apariciones del 2.'),
      level('Datos: 2, 4, 6. ¿Cuál es la media?', '4', ['2', '3', '4', '6'], '(2 + 4 + 6) ÷ 3 = 4.', 'Suma y divide entre tres.'),
      level('La barra A mide 5 y la B mide 8. ¿Cuál es la diferencia?', '3', ['2', '3', '5', '13'], '8 − 5 = 3.', 'Resta la altura menor de la mayor.'),
    ]),
    game('Mercado de porcentajes', 'Porcentaje, aumentos y disminuciones', 'Porcentaje significa partes de cada cien.', 'input', [
      level('¿Cuánto es el 10 % de 50 fichas?', '5', null, '10 % es una décima parte: 50 ÷ 10 = 5.', 'Divide 50 en diez partes.'),
      level('Un objeto cuesta 80 y tiene 25 % de descuento. ¿Precio final?', '60', null, '25 % de 80 = 20; 80 − 20 = 60.', '25 % equivale a un cuarto.'),
      level('Un presupuesto de 120 aumenta 15 %. ¿Nuevo total?', '138', null, '15 % de 120 = 18; 120 + 18 = 138.', 'Calcula 10 % y 5 %, luego súmalos.'),
    ]),
    game('Puertas de igualdad', 'Ecuaciones e igualdades', 'Una ecuación es una balanza: ambos lados deben valer lo mismo.', 'pick', [
      level('x + 3 = 8. ¿Cuánto vale x?', '5', ['3', '5', '8', '11'], '5 + 3 = 8.', 'Quita tres a ambos lados.'),
      level('2 × x = 14. ¿Cuánto vale x?', '7', ['6', '7', '12', '28'], '14 ÷ 2 = 7.', 'Reparte 14 entre dos grupos.'),
      level('3 × x + 2 = 20. ¿Cuánto vale x?', '6', ['5', '6', '7', '9'], '20 − 2 = 18 y 18 ÷ 3 = 6.', 'Deshaz primero el +2 y después el ×3.'),
    ]),
    game('Ruleta de posibilidades', 'Posibilidad de eventos y probabilidad', 'La probabilidad compara resultados favorables con todos los posibles.', 'pick', [
      level('En una bolsa hay solo fichas rojas. Sacar una azul es…', 'Imposible', ['Seguro', 'Posible', 'Imposible'], 'No existe ninguna azul.', 'Cuenta las fichas azules: cero.'),
      level('Hay 2 rojas y 2 azules. Probabilidad de sacar una roja:', '1/2', ['1/4', '1/2', '1'], 'Dos de cuatro son rojas: 2/4 = 1/2.', 'El total de fichas es cuatro.'),
      level('Hay 3 verdes y 1 amarilla. ¿Qué color es más probable?', 'Verde', ['Amarilla', 'Verde', 'Igual'], 'Verde tiene 3/4 de probabilidad.', 'El color con más fichas tiene más oportunidades.'),
    ]),
    game('Arquitectos de sólidos', 'Sólidos, desarrollos planos, área superficial y volumen', 'Un sólido tiene caras, aristas y ocupa espacio.', 'pick', [
      level('Un cubo tiene seis caras cuadradas. ¿Qué piezas forman su molde?', '6 cuadrados', ['4 triángulos', '6 cuadrados', '2 círculos'], 'Su desarrollo plano necesita seis cuadrados.', 'Imagina abrir una caja cúbica.'),
      level('Aristas de un cubo: 2 cm. ¿Área superficial?', '24', ['8', '12', '24', '48'], 'Cada cara mide 4 cm²; seis caras suman 24.', 'Calcula el área de una cara y multiplícala por seis.'),
      level('Una caja mide 2 × 3 × 4 cm. ¿Volumen?', '24', ['9', '18', '24', '36'], '2 × 3 × 4 = 24 cm³.', 'Multiplica las tres dimensiones.'),
    ]),
  ],
];
