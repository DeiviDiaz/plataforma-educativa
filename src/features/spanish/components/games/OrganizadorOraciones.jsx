import ArmarSecuencia from './ArmarSecuencia';

const BANCO_ORACIONES = [
  // Nivel 1: Estructura básica sujeto + verbo + predicado (1° a 3° Grado)
  {
    id: 1,
    nivel: 'Básico',
    palabrasCorrectas: ['El', 'colibrí', 'vuela', 'entre', 'las', 'flores', 'silvestres'],
    pista: 'Ave diminuta que liba el néctar en el jardín.',
    icono: '🌸'
  },
  {
    id: 2,
    nivel: 'Básico',
    palabrasCorrectas: ['La', 'maestra', 'lee', 'un', 'cuento', 'maravilloso', 'en', 'voz', 'alta'],
    pista: 'Actividad de narración oral en el salón de clases.',
    icono: '📖'
  },
  {
    id: 3,
    nivel: 'Básico',
    palabrasCorrectas: ['El', 'campesino', 'cultiva', 'el', 'café', 'con', 'gran', 'esmero'],
    pista: 'Labor agrícola tradicional en las montañas colombianas.',
    icono: '☕'
  },
  {
    id: 4,
    nivel: 'Básico',
    palabrasCorrectas: ['Los', 'niños', 'escriben', 'poemas', 'con', 'rimas', 'alegres'],
    pista: 'Creación literaria en el cuaderno de español.',
    icono: '✏️'
  },
  {
    id: 5,
    nivel: 'Básico',
    palabrasCorrectas: ['El', 'sol', 'dorado', 'ilumina', 'la', 'mañana', 'en', 'el', 'campo'],
    pista: 'Amanecer radiante en la vereda.',
    icono: '☀️'
  },
  {
    id: 6,
    nivel: 'Básico',
    palabrasCorrectas: ['La', 'mariposa', 'amarilla', 'visita', 'las', 'plantas', 'del', 'huerto'],
    pista: 'Insecto alado de bellos colores.',
    icono: '🦋'
  },

  // Nivel 2: Mitos, fábulas y geografía (4° a 5° Grado)
  {
    id: 7,
    nivel: 'Intermedio',
    palabrasCorrectas: ['La', 'Madremonte', 'protege', 'las', 'fuentes', 'de', 'agua', 'cristalina'],
    pista: 'Leyenda del folclor que cuida la naturaleza y los bosques.',
    icono: '🌿'
  },
  {
    id: 8,
    nivel: 'Intermedio',
    palabrasCorrectas: ['Los', 'dioses', 'mayas', 'crearon', 'al', 'hombre', 'a', 'partir', 'del', 'maíz'],
    pista: 'Mito del Popol Vuh sobre el origen sagrado de la humanidad.',
    icono: '🌽'
  },
  {
    id: 9,
    nivel: 'Intermedio',
    palabrasCorrectas: ['Las', 'fábulas', 'dejan', 'una', 'valiosa', 'moraleja', 'para', 'reflexionar'],
    pista: 'Narraciones protagonizadas por animales que enseñan virtudes.',
    icono: '📜'
  },
  {
    id: 10,
    nivel: 'Intermedio',
    palabrasCorrectas: ['El', 'río', 'Magdalena', 'atraviesa', 'valles', 'fértiles', 'de', 'nuestro', 'país'],
    pista: 'Principal arteria fluvial que une las regiones de Colombia.',
    icono: '🌊'
  },
  {
    id: 11,
    nivel: 'Intermedio',
    palabrasCorrectas: ['Bochica', 'abrió', 'el', 'Salto', 'del', 'Tequendama', 'con', 'su', 'báculo', 'sagrado'],
    pista: 'Mito muisca sobre el desagüe de la sabana de Bogotá.',
    icono: '⚡'
  },
  {
    id: 12,
    nivel: 'Intermedio',
    palabrasCorrectas: ['Los', 'adjetivos', 'califican', 'las', 'cualidades', 'del', 'sustantivo', 'en', 'la', 'oración'],
    pista: 'Regla gramatical sobre las palabras que describen personas y cosas.',
    icono: '📌'
  },

  // Nivel 3: Sintaxis avanzada, subordinadas y figuras literarias (6° a 9° Grado)
  {
    id: 13,
    nivel: 'Avanzado',
    palabrasCorrectas: ['El', 'realismo', 'mágico', 'entrelaza', 'lo', 'cotidiano', 'con', 'lo', 'fantástico'],
    pista: 'Corriente literaria cumbre de Gabriel García Márquez.',
    icono: '✨'
  },
  {
    id: 14,
    nivel: 'Avanzado',
    palabrasCorrectas: ['Una', 'metáfora', 'transforma', 'las', 'palabras', 'en', 'imágenes', 'poéticas'],
    pista: 'Recurso expresivo que compara realidades sin usar conectores explícitos.',
    icono: '🎭'
  },
  {
    id: 15,
    nivel: 'Avanzado',
    palabrasCorrectas: ['Aunque', 'el', 'camino', 'sea', 'largo', 'el', 'conocimiento', 'ilumina', 'el', 'futuro'],
    pista: 'Oración subordinada concesiva sobre el valor de estudiar.',
    icono: '💡'
  },
  {
    id: 16,
    nivel: 'Avanzado',
    palabrasCorrectas: ['Los', 'ensayos', 'argumentativos', 'defienden', 'una', 'tesis', 'con', 'evidencias', 'demostrables'],
    pista: 'Estructura formal del discurso persuasivo y crítico.',
    icono: '📚'
  },
  {
    id: 17,
    nivel: 'Avanzado',
    palabrasCorrectas: ['La', 'Vorágine', 'denunció', 'la', 'explotación', 'cauchense', 'en', 'las', 'selvas', 'amazónicas'],
    pista: 'Novela de José Eustasio Rivera de 1924.',
    icono: '🌳'
  },
  {
    id: 18,
    nivel: 'Avanzado',
    palabrasCorrectas: ['El', 'oxímoron', 'combina', 'dos', 'términos', 'opuestos', 'en', 'un', 'mismo', 'verso'],
    pista: 'Figura retórica que armoniza conceptos contrarios como fuego helado.',
    icono: '⚖️'
  }
];

export default function OrganizadorOraciones({ gradoNumero = 3 }) {
  const nivel = gradoNumero <= 3 ? 'Básico' : gradoNumero <= 5 ? 'Intermedio' : 'Avanzado';
  const basicas = [
    { piezas: ['El', 'gato', 'duerme.'], pista: 'Cuenta qué hace el gato.', icono: '🐱' },
    { piezas: ['La', 'rana', 'salta.'], pista: 'Cuenta qué hace la rana.', icono: '🐸' },
    { piezas: ['Ana', 'lee', 'un', 'cuento.'], pista: 'Cuenta qué lee Ana.', icono: '📖' },
    { piezas: ['El', 'sol', 'brilla.'], pista: 'Cuenta qué hace el sol.', icono: '☀️' },
  ];
  const retos = gradoNumero <= 3 ? basicas : BANCO_ORACIONES.filter((item) => item.nivel === nivel).slice(0, 4).map((item) => ({ piezas: item.palabrasCorrectas, pista: item.pista, icono: item.icono }));
  return <ArmarSecuencia titulo="Ordena la frase" gradoNumero={gradoNumero} tipo="oración" retos={retos} />;
}
