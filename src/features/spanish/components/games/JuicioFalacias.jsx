import RondasJuego from './RondasJuego';
import { preguntasPorGrado } from '../../data/preguntasPorGrado';

const CASOS_TRIBUNAL = [
  {
    id: 1,
    acusador: 'Fiscal Retórico',
    avatar: '👨‍⚖️',
    caso: 'Debate Escolar sobre Reciclaje',
    argumento: '"No debemos escuchar la propuesta de Mateo sobre reciclar en el colegio; ¡todos sabemos que a Mateo le va mal en matemáticas y no se peina bien!"',
    tipoCorrecto: 'Ad Hominem',
    opciones: [
      { id: 'Ad Hominem', label: 'Falacia Ad Hominem', desc: 'Ataca a la persona en lugar de refutar su idea.', correcta: true },
      { id: 'Hombre de Paja', label: 'Hombre de Paja', desc: 'Caricaturiza o distorsiona el argumento rival.', correcta: false },
      { id: 'Falsa Causa', label: 'Falsa Causa', desc: 'Asume que porque algo pasó antes, causó lo siguiente.', correcta: false },
      { id: 'Valido', label: 'Argumento Válido', desc: 'Premisa lógica y coherente bien demostrada.', correcta: false }
    ],
    explicacion: '¡Objeción a lugar! Descalifica a Mateo por su apariencia y notas, evadiendo debatir la propuesta de reciclaje.'
  },
  {
    id: 2,
    acusador: 'Senador de la Hipérbole',
    avatar: '🧐',
    caso: 'Presupuesto de la Biblioteca',
    argumento: '"Los estudiantes que piden comprar más novelas y poemas para la biblioteca quieren que cerremos la cancha deportiva para siempre y que nadie vuelva a hacer ejercicio."',
    tipoCorrecto: 'Hombre de Paja',
    opciones: [
      { id: 'Falso Dilema', label: 'Falso Dilema', desc: 'Reduce todo a solo dos opciones extremas.', correcta: false },
      { id: 'Hombre de Paja', label: 'Hombre de Paja', desc: 'Exagera e inventa una postura extrema que el rival nunca dijo.', correcta: true },
      { id: 'Ad Populum', label: 'Apelación a la Mayoría', desc: 'Dice que algo es verdad porque todos lo hacen.', correcta: false },
      { id: 'Valido', label: 'Argumento Sólido', desc: 'Conclusión derivada rigurosamente de hechos.', correcta: false }
    ],
    explicacion: '¡Objeción contundente! Nadie pidió cerrar la cancha; inventó un enemigo absurdo y fácil de atacar.'
  },
  {
    id: 3,
    acusador: 'Testigo Supersticioso',
    avatar: '🧙‍♂️',
    caso: 'El Clima de la Vereda',
    argumento: '"Ayer cantó un gallo negro a medianoche en la loma y hoy cayó una tormenta terrible. Por lo tanto, el canto del gallo desató la tempestad."',
    tipoCorrecto: 'Falsa Causa',
    opciones: [
      { id: 'Ad Baculum', label: 'Apelación al Miedo', desc: 'Amenaza con la fuerza o castigo.', correcta: false },
      { id: 'Falsa Causa', label: 'Falsa Causa (Post Hoc)', desc: 'Confunde simple coincidencia temporal con relación de causa y efecto.', correcta: true },
      { id: 'Ad Hominem', label: 'Ad Hominem', desc: 'Ataque contra el mensajero.', correcta: false },
      { id: 'Tu Quoque', label: 'Tu Quoque', desc: 'Acusa al otro de hacer lo mismo.', correcta: false }
    ],
    explicacion: '¡Objeción fundada! La coincidencia de dos eventos en el tiempo no significa que uno cause al otro.'
  },
  {
    id: 4,
    acusador: 'Influencer Publicitario',
    avatar: '📱',
    caso: 'Salud y Remedios Mágicos',
    argumento: '"Este jarabe de hierbas cura todas las enfermedades pulmonares sin excepción, porque lo recomendó en un video un cantante famosísimo de reguetón."',
    tipoCorrecto: 'Apelacion Autoridad',
    opciones: [
      { id: 'Apelacion Autoridad', label: 'Apelación a la Falsa Autoridad', desc: 'Cita a una celebridad fuera de su campo de conocimiento como prueba.', correcta: true },
      { id: 'Generalizacion', label: 'Generalización Apresurada', desc: 'Saca conclusiones universales de un solo caso.', correcta: false },
      { id: 'Circular', label: 'Petición de Principio', desc: 'La conclusión repite la premisa.', correcta: false },
      { id: 'Valido', label: 'Argumento Científico Válido', desc: 'Respaldado por estudios clínicos.', correcta: false }
    ],
    explicacion: '¡Objeción admitida! Un cantante no es una autoridad médica ni científica calificada.'
  },
  {
    id: 5,
    acusador: 'Capitán del Absolutismo',
    avatar: '💂',
    caso: 'Convivencia Ciudadana',
    argumento: '"O estás 100% de acuerdo con todas y cada una de mis reglas de convivencia, o estás a favor del desorden total y la anarquía en la escuela."',
    tipoCorrecto: 'Falso Dilema',
    opciones: [
      { id: 'Falso Dilema', label: 'Falso Dilema (Blanco o Negro)', desc: 'Obliga a elegir entre dos extremos ignorando puntos medios o acuerdos.', correcta: true },
      { id: 'Ad Hominem', label: 'Ad Hominem', desc: 'Insulta a quien opina distinto.', correcta: false },
      { id: 'Hombre de Paja', label: 'Hombre de Paja', desc: 'Deforma las palabras de la contraparte.', correcta: false },
      { id: 'Pendiente Resbaladiza', label: 'Pendiente Resbaladiza', desc: 'Cadena exagerada de tragedias.', correcta: false }
    ],
    explicacion: '¡Objeción a lugar! Existen múltiples opciones intermedias, debates constructivos y acuerdos pedagógicos.'
  },
  {
    id: 6,
    acusador: 'Estudiante Dramático',
    avatar: '🥺',
    caso: 'Evaluación de Ortografía',
    argumento: '"Profesor, usted no puede calificarme mal por no poner tildes ni comas, porque si repruebo mi perrito se va a poner muy triste y llorará toda la tarde."',
    tipoCorrecto: 'Apelacion Emocion',
    opciones: [
      { id: 'Apelacion Emocion', label: 'Apelación a la Piedad / Emoción', desc: 'Manipula sentimientos de lástima para evadir las reglas o evidencias.', correcta: true },
      { id: 'Falsa Causa', label: 'Falsa Causa', desc: 'Confusión causal.', correcta: false },
      { id: 'Ad Populum', label: 'Ad Populum', desc: 'Apelar a la moda de la masa.', correcta: false },
      { id: 'Valido', label: 'Premisa Rigurosa', desc: 'Criterio evaluativo coherente.', correcta: false }
    ],
    explicacion: '¡Objeción aceptada! El estado de ánimo de una mascota no refuta los criterios gramaticales de la lengua.'
  },
  {
    id: 7,
    acusador: 'Turista Acelerado',
    avatar: '🤠',
    caso: 'Caracterización de Pueblos',
    argumento: '"Ayer llegué al pueblo vecino y el primer vendedor que vi me cobró de más. ¡Por lo tanto, todos los habitantes de ese departamento son tramposos!"',
    tipoCorrecto: 'Generalizacion Apresurada',
    opciones: [
      { id: 'Generalizacion Apresurada', label: 'Generalización Apresurada', desc: 'Aplica una conclusión universal a miles de personas basándose en una sola muestra.', correcta: true },
      { id: 'Hombre de Paja', label: 'Hombre de Paja', desc: 'Distorsión de argumento ajeno.', correcta: false },
      { id: 'Ad Baculum', label: 'Apelación a la Fuerza', desc: 'Uso de la intimidación.', correcta: false },
      { id: 'Valido', label: 'Muestreo Estadístico Válido', desc: 'Muestra representativa de datos.', correcta: false }
    ],
    explicacion: '¡Objeción a lugar! Una sola experiencia aislada no permite juzgar a toda una comunidad.'
  },
  {
    id: 8,
    acusador: 'Profesor de Lógica',
    avatar: '👩‍🏫',
    caso: 'Estructura del Texto Argumentativo',
    argumento: '"Todos los textos de opinión rigurosos presentan una tesis clara apoyada en evidencias empíricas. Este editorial presenta una tesis clara y tres fuentes de investigación empírica. Por lo tanto, cumple con la estructura requerida."',
    tipoCorrecto: 'Valido',
    opciones: [
      { id: 'Valido', label: '¡Argumento Válido y Bien Fundamentado!', desc: 'Las premisas son verdaderas y la conclusión se desprende de forma lógica.', correcta: true },
      { id: 'Ad Hominem', label: 'Falacia Ad Hominem', desc: 'Ataque personal.', correcta: false },
      { id: 'Hombre de Paja', label: 'Hombre de Paja', desc: 'Deformación de ideas.', correcta: false },
      { id: 'Falsa Causa', label: 'Falsa Causa', desc: 'Error causal.', correcta: false }
    ],
    explicacion: '¡Veredicto impecable! No contiene falacias: es un silogismo deductivo válido con premisas demostradas.'
  },
  {
    id: 9,
    acusador: 'Compañero Evasivo',
    avatar: '😏',
    caso: 'Puntualidad en la Asamblea',
    argumento: '"Tú me dices que no llegue tarde a la reunión de personería escolar, pero tú llegaste tarde al recreo el martes pasado, así que no tienes derecho a decirme nada."',
    tipoCorrecto: 'Tu Quoque',
    opciones: [
      { id: 'Tu Quoque', label: 'Falacia Tu Quoque (Y tú también)', desc: 'Evade la crítica acusando al otro de haber cometido una falta similar.', correcta: true },
      { id: 'Falso Dilema', label: 'Falso Dilema', desc: 'Dos opciones forzadas.', correcta: false },
      { id: 'Apelacion Autoridad', label: 'Apelación a la Autoridad', desc: 'Citar famosos.', correcta: false },
      { id: 'Valido', label: 'Argumento Válido', desc: 'Razonamiento lógico.', correcta: false }
    ],
    explicacion: '¡Objeción fundada! Que la otra persona haya cometido un error no invalida que la puntualidad sea un deber.'
  },
  {
    id: 10,
    acusador: 'Profeta Catastrófico',
    avatar: '😱',
    caso: 'Uso de Cuadernos con Dibujos',
    argumento: '"Si permitimos que los estudiantes dibujen en las márgenes de su cuaderno hoy, mañana nadie tomará apuntes, el próximo año reprobarán el colegio y el país terminará en la ruina absoluta."',
    tipoCorrecto: 'Pendiente Resbaladiza',
    opciones: [
      { id: 'Pendiente Resbaladiza', label: 'Pendiente Resbaladiza (Slippery Slope)', desc: 'Encadena consecuencias trágicas y exageradas sin demostración real.', correcta: true },
      { id: 'Ad Hominem', label: 'Ad Hominem', desc: 'Ataque personal.', correcta: false },
      { id: 'Ad Populum', label: 'Ad Populum', desc: 'Apelar a la mayoría.', correcta: false },
      { id: 'Falsa Causa', label: 'Falsa Causa', desc: 'Causa errada.', correcta: false }
    ],
    explicacion: '¡Objeción admitida! Conectar un dibujo en la margen con la ruina del país es una cadena especulativa sin fundamento.'
  },
  {
    id: 11,
    acusador: 'Voz de la Muchedumbre',
    avatar: '🗣️',
    caso: 'Copia en Exámenes',
    argumento: '"Copiar las respuestas de la evaluación no puede estar mal, porque todos los estudiantes de los tres salones lo están haciendo hoy."',
    tipoCorrecto: 'Ad Populum',
    opciones: [
      { id: 'Ad Populum', label: 'Falacia Ad Populum (Apelación a la Mayoría)', desc: 'Afirma que algo es correcto o verdadero solo porque mucha gente lo hace.', correcta: true },
      { id: 'Hombre de Paja', label: 'Hombre de Paja', desc: 'Deformar al rival.', correcta: false },
      { id: 'Tu Quoque', label: 'Tu Quoque', desc: 'Devolver acusación.', correcta: false },
      { id: 'Valido', label: 'Criterio Ético Válido', desc: 'Principio ético universal.', correcta: false }
    ],
    explicacion: '¡Objeción rotunda! Que una mayoría cometa una falta ética no convierte la falta en algo correcto.'
  },
  {
    id: 12,
    acusador: 'Capitán Intimidador',
    avatar: '🥊',
    caso: 'Elección del Representante',
    argumento: '"Mi propuesta de torneo de fútbol debe ganar la votación del curso, porque el que vote en contra se las verá conmigo a la salida."',
    tipoCorrecto: 'Ad Baculum',
    opciones: [
      { id: 'Ad Baculum', label: 'Falacia Ad Baculum (Apelación a la Fuerza o Miedo)', desc: 'Sustituye la razón por amenazas o coerción para imponer una postura.', correcta: true },
      { id: 'Ad Hominem', label: 'Ad Hominem', desc: 'Insulto verbal.', correcta: false },
      { id: 'Circular', label: 'Petición de Principio', desc: 'Circularidad lógica.', correcta: false },
      { id: 'Falso Dilema', label: 'Falso Dilema', desc: 'Opciones polares.', correcta: false }
    ],
    explicacion: '¡Objeción a lugar! La amenaza y la violencia anulan el debate democrático y no son argumentos válidos.'
  },
  {
    id: 13,
    acusador: 'Filósofo Circular',
    avatar: '🔄',
    caso: 'Autoridad de un Manuscrito',
    argumento: '"Este libro histórico dice la verdad absoluta porque fue dictado por el sabio supremo, y sabemos que es el sabio supremo porque este mismo libro lo afirma en su prólogo."',
    tipoCorrecto: 'Circular',
    opciones: [
      { id: 'Circular', label: 'Petición de Principio (Razonamiento Circular)', desc: 'Usa la misma conclusión que intenta probar como si fuera la prueba.', correcta: true },
      { id: 'Hombre de Paja', label: 'Hombre de Paja', desc: 'Caricatura del oponente.', correcta: false },
      { id: 'Ad Baculum', label: 'Apelación a la Fuerza', desc: 'Uso de amenazas.', correcta: false },
      { id: 'Valido', label: 'Demostración Científica', desc: 'Comprobación externa.', correcta: false }
    ],
    explicacion: '¡Objeción concedida! Es un círculo vicioso: el libro valida al sabio y el sabio valida al libro sin pruebas externas.'
  },
  {
    id: 14,
    acusador: 'Investigadora Científica',
    avatar: '🔬',
    caso: 'Hábito de Lectura Diaria',
    argumento: '"Dedicar 20 minutos diarios a la lectura incrementa el vocabulario activo y la comprensión en estudiantes, según evidenció un estudio longitudinal de tres años con más de mil alumnos en Colombia."',
    tipoCorrecto: 'Valido',
    opciones: [
      { id: 'Valido', label: '¡Argumento Científico Válido y Demostrado!', desc: 'Se sustenta en evidencias empíricas comprobables y razonamiento lógico.', correcta: true },
      { id: 'Ad Populum', label: 'Ad Populum', desc: 'Moda colectiva.', correcta: false },
      { id: 'Hombre de Paja', label: 'Hombre de Paja', desc: 'Deformación de ideas.', correcta: false },
      { id: 'Falsa Causa', label: 'Falsa Causa', desc: 'Coincidencia casual.', correcta: false }
    ],
    explicacion: '¡Veredicto impecable! Las afirmaciones apoyadas en metodologías rigurosas y evidencias son argumentos legítimos.'
  }
];

export default function JuicioFalacias({ gradoNumero = 7 }) {
  const casos = CASOS_TRIBUNAL.slice(0, 5).map((caso) => ({
    pregunta: caso.argumento + '\n¿Qué problema encuentras en esta idea?',
    opciones: caso.opciones.map((opcion) => opcion.desc),
    correcta: caso.opciones.findIndex((opcion) => opcion.correcta),
    pista: 'Piensa si se apoya en pruebas o si se intenta convencer sin explicar las razones.',
    explicacion: caso.explicacion,
  }));
  return <RondasJuego insignia="tribunal_falacia" titulo="Detecta el argumento" gradoNumero={gradoNumero} retos={gradoNumero <= 5 ? preguntasPorGrado[gradoNumero] : casos}
    consigna="Lee la idea y elige la explicación que mejor la describe." />;
}
