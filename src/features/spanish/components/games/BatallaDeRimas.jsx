import RondasJuego from './RondasJuego';

const COPLAS_BATALLA = [
  {
    id: 1,
    verso1: 'Ayer pasé por tu casa',
    verso2: 'y me tiraste un limón...',
    rimaClave: '-ón',
    opciones: [
      { texto: 'el limón cayó en el suelo y el jugo en mi corazón.', correcta: true, explicacion: 'Rima consonante perfecta en -ón (limón / corazón).' },
      { texto: 'me comí una mandarina con azúcar y con pan.', correcta: false, explicacion: 'Termina en -an, no rima con limón.' },
      { texto: 'me puse a mirar la luna que brillaba en el tejado.', correcta: false, explicacion: 'Termina en -ado, sin rima musical.' },
      { texto: 'el camino estaba solo y me fui para la escuela.', correcta: false, explicacion: 'Termina en -ela, métrica no coincidente.' }
    ],
    tema: 'Copla Tradicional',
    icono: '🍋'
  },
  {
    id: 2,
    verso1: 'En las selvas colombianas',
    verso2: 'cuida bien la Madremonte...',
    rimaClave: '-onte',
    opciones: [
      { texto: 'los arroyos cristalinos que bajan del horizonte.', correcta: true, explicacion: 'Rima perfecta en -onte (Madremonte / horizonte).' },
      { texto: 'las flores que están creciendo en medio del pastizal.', correcta: false, explicacion: 'Termina en -al.' },
      { texto: 'a los pajaritos dulces que cantan en la mañana.', correcta: false, explicacion: 'Termina en -ana.' },
      { texto: 'los árboles de la sierra que tocan el cielo azul.', correcta: false, explicacion: 'Termina en -ul.' }
    ],
    tema: 'Mitos y Leyendas',
    icono: '🌿'
  },
  {
    id: 3,
    verso1: 'La gallina campesina',
    verso2: 'puso un huevo en el corral...',
    rimaClave: '-al',
    opciones: [
      { texto: 'y el gallito cantó fuerte: ¡ese huevo es colosal!', correcta: true, explicacion: 'Rima aguda consonante en -al (corral / colosal).' },
      { texto: 'y se fue para el sendero a comer un poco de maíz.', correcta: false, explicacion: 'Termina en -iz.' },
      { texto: 'las estrellas alumbraban el camino de la granja.', correcta: false, explicacion: 'Termina en -anja.' },
      { texto: 'los pollitos se acostaron a dormir en el granero.', correcta: false, explicacion: 'Termina en -ero.' }
    ],
    tema: 'Tradición Rural',
    icono: '🐔'
  },
  {
    id: 4,
    verso1: 'Con mariposas amarillas',
    verso2: 'en Macondo brilla el sol...',
    rimaClave: '-ol',
    opciones: [
      { texto: 'alumbrando los secretos de la magia y del caracol.', correcta: true, explicacion: 'Rima consonante en -ol (sol / caracol).' },
      { texto: 'recordando las leyendas que escribió nuestro gran Gabo con fervor.', correcta: false, explicacion: 'Termina en -or.' },
      { texto: 'las guitarras van sonando en la plaza principal.', correcta: false, explicacion: 'Termina en -al.' },
      { texto: 'las historias de los abuelos se quedan en la memoria.', correcta: false, explicacion: 'Termina en -oria.' }
    ],
    tema: 'Realismo Mágico',
    icono: '🦋'
  },
  {
    id: 5,
    verso1: 'Quien lee libros con empeño',
    verso2: 'y cultiva la razón...',
    rimaClave: '-ón',
    opciones: [
      { texto: 'abre puertas al futuro con saber y convicción.', correcta: true, explicacion: 'Rima rotunda en -ón (razón / convicción).' },
      { texto: 'llega siempre muy temprano a la clase de español.', correcta: false, explicacion: 'Termina en -ol.' },
      { texto: 'dibuja muchos paisajes con lápices de colores.', correcta: false, explicacion: 'Termina en -ores.' },
      { texto: 'comparte con sus amigos en el patio de recreo.', correcta: false, explicacion: 'Termina en -eo.' }
    ],
    tema: 'El Valor del Lenguaje',
    icono: '📚'
  },
  {
    id: 6,
    verso1: 'Por las costas del Arauca',
    verso2: 'galopando va el corcel...',
    rimaClave: '-el',
    opciones: [
      { texto: 'levantando polvo fino con el cuatro y el laurel.', correcta: true, explicacion: 'Rima aguda consonante en -el (corcel / laurel).' },
      { texto: 'mirando la tarde clara que cae sobre el morichal.', correcta: false, explicacion: 'Termina en -al.' },
      { texto: 'buscando un poco de sombra debajo del samán.', correcta: false, explicacion: 'Termina en -án.' },
      { texto: 'los terneros van corriendo alegremente en la sabana.', correcta: false, explicacion: 'Termina en -ana.' }
    ],
    tema: 'Joropo Llanero',
    icono: '🐎'
  },
  {
    id: 7,
    verso1: 'Por las aguas de mi río',
    verso2: 'va bajando la piragua...',
    rimaClave: '-agua',
    opciones: [
      { texto: 'entre cantos de bogas navegando sobre el agua.', correcta: true, explicacion: 'Rima exacta y juego poético en -agua (piragua / agua).' },
      { texto: 'los peces van saltando alegres en la corriente.', correcta: false, explicacion: 'Termina en -ente.' },
      { texto: 'las palmeras se divisan cerquita de la ribera.', correcta: false, explicacion: 'Termina en -era.' },
      { texto: 'los caimanes descansan tomando el sol caliente.', correcta: false, explicacion: 'Termina en -ente.' }
    ],
    tema: 'Río Magdalena',
    icono: '🛶'
  },
  {
    id: 8,
    verso1: 'Al sonar de la marimba',
    verso2: 'y al repique del tambor...',
    rimaClave: '-or',
    opciones: [
      { texto: 'baila alegre el pueblo entero con cadencia y con sabor.', correcta: true, explicacion: 'Rima consonante festiva en -or (tambor / sabor).' },
      { texto: 'las olas van quebrando en la playa de arena negra.', correcta: false, explicacion: 'Termina en -egra.' },
      { texto: 'los pescadores recogen sus redes en la canoa.', correcta: false, explicacion: 'Termina en -oa.' },
      { texto: 'el cielo se viste de nubes grises al atardecer.', correcta: false, explicacion: 'Termina en -er.' }
    ],
    tema: 'Pacífico Colombiano',
    icono: '🥁'
  },
  {
    id: 9,
    verso1: 'Con mi ruana campesina',
    verso2: 'y sombrero de jipijapa...',
    rimaClave: '-apa',
    opciones: [
      { texto: 'recorro las vereditas de mi tierrita en el mapa.', correcta: true, explicacion: 'Rima perfecta en -apa (jipijapa / mapa).' },
      { texto: 'subo la cuesta empinada silbando una guabina.', correcta: false, explicacion: 'Termina en -ina.' },
      { texto: 'me como una papita criolla con queso y con café.', correcta: false, explicacion: 'Termina en -é.' },
      { texto: 'los bueyes van arando la tierra para la siembra.', correcta: false, explicacion: 'Termina en -embra.' }
    ],
    tema: 'Trova Andina',
    icono: '🧶'
  },
  {
    id: 10,
    verso1: 'Las palabras son las alas',
    verso2: 'del que quiere navegar...',
    rimaClave: '-ar',
    opciones: [
      { texto: 'por los mares del saber y del asombro sin cesar.', correcta: true, explicacion: 'Rima en infinitivo -ar (navegar / sin cesar).' },
      { texto: 'descubriendo muchos mundos en cada amanecer.', correcta: false, explicacion: 'Termina en -er.' },
      { texto: 'haciendo amigos sinceros en el camino escolar.', correcta: true, explicacion: 'También rima en -ar, pero la opción canónica es la poética del saber.' },
      { texto: 'escribiendo en su libreta con letra redondita.', correcta: false, explicacion: 'Termina en -ita.' }
    ],
    tema: 'Lectura y Creación',
    icono: '⛵'
  },
  {
    id: 11,
    verso1: 'Si una palabra es aguda',
    verso2: 'y termina en N o en S...',
    rimaClave: '-és / -es',
    opciones: [
      { texto: 'márquele la tilde clara como aprendiste en el mes.', correcta: true, explicacion: 'Rima consonante en -es (S / mes).' },
      { texto: 'la pronuncias muy fuerte al principio de la frase.', correcta: false, explicacion: 'Termina en -ase.' },
      { texto: 'no le pongas nada encima que se entiende al revés.', correcta: false, explicacion: 'Sentido contradictorio a la regla ortográfica.' },
      { texto: 'cuenta las sílabas con los dedos de la mano.', correcta: false, explicacion: 'Termina en -ano.' }
    ],
    tema: 'Regla Ortográfica',
    icono: '✍️'
  },
  {
    id: 12,
    verso1: 'En la copa del samán',
    verso2: 'canta libre el ruiseñor...',
    rimaClave: '-or',
    opciones: [
      { texto: 'regalando su tonada a la dicha y al amor.', correcta: true, explicacion: 'Rima consonante clásica en -or (ruiseñor / amor).' },
      { texto: 'comiendo ricas semillas que caen del árbol.', correcta: false, explicacion: 'Termina en -ol.' },
      { texto: 'volando entre las nubes del cielo mañanero.', correcta: false, explicacion: 'Termina en -ero.' },
      { texto: 'las mariposas lo miran desde la hierba fresca.', correcta: false, explicacion: 'Termina en -esca.' }
    ],
    tema: 'Canto a la Naturaleza',
    icono: '🐦'
  }
];

export default function BatallaDeRimas({ gradoNumero = 3 }) {
  const sencillas = [
    { pregunta: '¿Qué palabra rima con gato?', opciones: ['Pato', 'Sol', 'Mesa'], correcta: 0, pista: 'Escucha el sonido ato.', explicacion: 'Gato y pato terminan igual.', icono: '🐱' },
    { pregunta: '¿Qué palabra rima con luna?', opciones: ['Flor', 'Cuna', 'Pez'], correcta: 1, pista: 'Escucha el sonido una.', explicacion: 'Luna y cuna terminan igual.', icono: '🌙' },
    { pregunta: '¿Qué palabra rima con ratón?', opciones: ['Casa', 'Nube', 'Botón'], correcta: 2, pista: 'Escucha el sonido ón.', explicacion: 'Ratón y botón comparten el sonido final.', icono: '🐭' },
    { pregunta: '¿Qué palabra rima con rana?', opciones: ['Campana', 'Perro', 'Árbol'], correcta: 0, pista: 'Escucha el sonido ana.', explicacion: 'Rana y campana comparten el sonido final.', icono: '🐸' },
  ];
  const coplas = COPLAS_BATALLA.slice(0, 4).map((copla) => ({ pregunta: copla.verso1 + '\n' + copla.verso2 + '\n¿Qué verso completa la rima?', opciones: copla.opciones.map((item) => item.texto), correcta: copla.opciones.findIndex((item) => item.correcta), pista: 'Busca una terminación que suene como ' + copla.rimaClave, explicacion: copla.opciones.find((item) => item.correcta).explicacion, icono: copla.icono }));
  return <RondasJuego insignia="rimas_flow" titulo="Encuentra la rima" gradoNumero={gradoNumero} retos={gradoNumero <= 3 ? sencillas : coplas} consigna="Escucha cómo terminan las palabras y elige la que rima." />;
}
