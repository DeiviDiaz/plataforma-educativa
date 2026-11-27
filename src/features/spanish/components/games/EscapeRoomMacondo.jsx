import RondasJuego from './RondasJuego';
import { preguntasPorGrado } from '../../data/preguntasPorGrado';

const SALAS_ESCAPE = [
  {
    id: 1,
    nombre: 'Sala 1: El Laboratorio de Melquíades',
    icono: '📜',
    historia: 'Has entrado al cuarto secreto del sabio gitano Melquíades. Los frascos de mercurio hierven solos y hay pergaminos flotando. Para abrir el candado de la puerta, debes descifrar el concepto cumbre del sabio que trajo los imanes y el hielo a Macondo.',
    enigma: '¿Cuál es el concepto clave de la literatura hispanoamericana que fusiona la realidad cotidiana con sucesos fantásticos tratados con total naturalidad?',
    opciones: [
      { texto: 'Realismo Mágico', correcta: true, explicacion: '¡Exacto! El Realismo Mágico hace que lo insólito ocurra con naturalidad, como alfombras voladoras o lluvia de flores amarillas.' },
      { texto: 'Ciencia Ficción Futurista', correcta: false, explicacion: 'La ciencia ficción se basa en tecnología y futuro, no en mitos y folclore cotidiano.' },
      { texto: 'Romanticismo Trágico', correcta: false, explicacion: 'El romanticismo exalta la nostalgia sentimental, como en María de Jorge Isaacs.' },
      { texto: 'Crónica Periodística Pura', correcta: false, explicacion: 'La crónica relata hechos reales sin elementos sobrenaturales.' }
    ],
    objetoDesbloqueado: '🔑 La Llave de Hielo de Aureliano'
  },
  {
    id: 2,
    nombre: 'Sala 2: La Peste del Olvido y del Insomnio',
    icono: '🏷️',
    historia: 'Una extraña peste ha caído sobre el pueblo: los habitantes no pueden dormir y han empezado a olvidar el nombre y la función de las cosas. Aureliano Buendía cuelga letreros para recordar.',
    enigma: 'Ayuda a Aureliano a etiquetar la figura retórica correcta: En la frase "Llovió durante cuatro años, once meses y dos días", ¿qué figura de exageración deliberada y descomunal se está empleando?',
    opciones: [
      { texto: 'Hipérbole', correcta: true, explicacion: '¡Brillante! La hipérbole es una exageración deliberada para magnificar una idea o sentimiento.' },
      { texto: 'Símil o Comparación', correcta: false, explicacion: 'El símil utiliza nexos comparativos explícitos como "como" o "cual".' },
      { texto: 'Aliteración', correcta: false, explicacion: 'La aliteración es la repetición de sonidos consonánticos.' },
      { texto: 'Metonimia', correcta: false, explicacion: 'La metonimia designa una cosa con el nombre de otra por relación de causa o procedencia.' }
    ],
    objetoDesbloqueado: '🏷️ El Rótulo de la Memoria'
  },
  {
    id: 3,
    nombre: 'Sala 3: El Baúl de las Mariposas Amarillas',
    icono: '🦋',
    historia: 'El aire se llena de mariposas doradas que anuncian la llegada de Mauricio Babilonia. Un baúl colonial de madera tallada bloquea la salida hacia el río de piedras blancas pulidas.',
    enigma: 'Identifica el OXÍMORON que desbloquea la cerradura del baúl (unión de dos términos contradictorios en una sola expresión):',
    opciones: [
      { texto: 'Un silencio atronador', correcta: true, explicacion: '¡Perfecto! "Silencio" y "atronador" son dos términos directamente contradictorios unidos en una misma frase.' },
      { texto: 'Tus ojos son como estrellas', correcta: false, explicacion: 'Eso es un símil o comparación.' },
      { texto: 'El viento silbaba en la colina', correcta: false, explicacion: 'Eso es una personificación o prosopopeya.' },
      { texto: 'Macondo era una aldea de veinte casas', correcta: false, explicacion: 'Eso es una descripción literal.' }
    ],
    objetoDesbloqueado: '🦋 Amuleto de las Mariposas'
  },
  {
    id: 4,
    nombre: 'Sala 4: La Ciénaga y el Mito Ancestral',
    icono: '🌿',
    historia: 'El suelo se transforma en ciénaga y manglares milenarios. Los espíritus de los ancianos indígenas cantan una leyenda sobre el origen de la luz y de las leyes de la selva amazónica colombiana.',
    enigma: '¿Cuál es el gran relato épico y mito sagrado indígena originario del río Vaupés y la Amazonía colombiana?',
    opciones: [
      { texto: 'La Leyenda de Yuruparí', correcta: true, explicacion: '¡Correcto! El mito de Yuruparí es la máxima epopeya indígena de la Amazonía colombiana sobre las leyes ancestrales.' },
      { texto: 'La Odisea de Homero', correcta: false, explicacion: 'La Odisea es de la Grecia antigua clásica.' },
      { texto: 'El Mío Cid Campeador', correcta: false, explicacion: 'El Cantar de Mío Cid es un poema épico medieval español.' },
      { texto: 'Las Mil y Una Noches', correcta: false, explicacion: 'Pertenece a la tradición literaria de Oriente Medio.' }
    ],
    objetoDesbloqueado: '🪶 La Pluma Chamánica de Yuruparí'
  },
  {
    id: 5,
    nombre: 'Sala 5: La Biblioteca Virreinal de Santafé',
    icono: '📚',
    historia: 'Las paredes se cubren de anaqueles coloniales con manuscritos en tinta de nuez y candelabros de plata. Un escribano del siglo XVII te desafía a reconocer la obra cumbre de la Colonia en Colombia.',
    enigma: '¿Qué célebre crónica colonial de 1636, escrita por Juan Rodríguez Freyle, narra la conquista y los sucesos curiosos de Santafé de Bogotá?',
    opciones: [
      { texto: 'El Carnero', correcta: true, explicacion: '¡Exacto! "El Carnero" es la gran crónica colonial neogranadina que retrata la sociedad santafereña con picardía y rigor.' },
      { texto: 'Cien Años de Soledad', correcta: false, explicacion: 'García Márquez escribió en el siglo XX, no en la Colonia.' },
      { texto: 'La Vorágine', correcta: false, explicacion: 'José Eustasio Rivera publicó en 1924 sobre el caucho.' },
      { texto: 'Don Quijote de la Mancha', correcta: false, explicacion: 'Cervantes escribió su novela en España.' }
    ],
    objetoDesbloqueado: '📜 El Códice de Santafé de 1636'
  },
  {
    id: 6,
    nombre: 'Sala 6: El Viento que Todo lo Arrastra',
    icono: '🌪️',
    historia: 'El tiempo se pliega sobre sí mismo. Para escapar de Macondo antes de que el huracán bíblico arrastre el pueblo de la faz de la tierra, debes ordenar las cuatro grandes épocas de las letras colombianas.',
    enigma: '¿Cuál es la secuencia cronológica correcta de la literatura en Colombia y América Latina?',
    opciones: [
      {
        texto: '1. Indígena Precolombina ➔ 2. Conquista y Colonia ➔ 3. Romanticismo e Independencia ➔ 4. Boom Latinoamericano',
        correcta: true,
        explicacion: '¡Extraordinario! Mitos ancestrales (Yuruparí), Crónicas de Indias (El Carnero), Romanticismo del siglo XIX (María), y el Boom del siglo XX.'
      },
      {
        texto: '1. Boom Latinoamericano ➔ 2. Conquista ➔ 3. Precolombino ➔ 4. Modernismo',
        correcta: false,
        explicacion: 'El orden está invertido; el Boom ocurrió en el siglo XX.'
      },
      {
        texto: '1. Romanticismo ➔ 2. Vanguardias ➔ 3. Precolombino ➔ 4. Barroco',
        correcta: false,
        explicacion: 'El periodo precolombino es el origen ancestral previo a la llegada europea.'
      },
      {
        texto: '1. Conquista ➔ 2. Poesía Contemporánea ➔ 3. Leyendas Muiscas ➔ 4. Independencia',
        correcta: false,
        explicacion: 'Las leyendas indígenas precedieron por miles de años a la Conquista.'
      }
    ],
    objetoDesbloqueado: '👑 El Pergamino Descifrado de Melquíades'
  }
];

export default function EscapeRoomMacondo({ gradoNumero = 9 }) {
  const preguntas = [
    'En Macondo ocurren hechos fantásticos que todos ven como normales. ¿Qué estilo literario es?',
    'Llovió durante años sin parar. ¿Qué recurso literario se reconoce en esta exageración?',
    '¿Qué expresión une dos ideas que se contradicen?',
    '¿Qué relato indígena de la Amazonía narra las leyes ancestrales de Yuruparí?',
    '¿Qué obra de Rodríguez Freyle cuenta sucesos de la sociedad colonial de Santafé?',
  ];
  const retos = SALAS_ESCAPE.slice(0, 5).map((sala, index) => {
    const giro = index % sala.opciones.length;
    const opciones = [...sala.opciones.slice(giro), ...sala.opciones.slice(0, giro)];
    return {
      pregunta: preguntas[index],
      opciones: opciones.map((opcion) => opcion.texto),
      correcta: opciones.findIndex((opcion) => opcion.correcta),
      pista: sala.historia,
      explicacion: sala.opciones.find((opcion) => opcion.correcta).explicacion,
    };
  });
  return <RondasJuego insignia="escape_macondo" titulo="Las llaves de Macondo" gradoNumero={gradoNumero} retos={gradoNumero < 8 ? preguntasPorGrado[gradoNumero] : retos}
    consigna="Resuelve un enigma para abrir cada puerta. Puedes leer una pista." />;
}
