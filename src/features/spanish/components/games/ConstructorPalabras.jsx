import ArmarSecuencia from './ArmarSecuencia';

const NIVELES_PALABRAS = {
  basico: {
    nombre: 'Nivel 1: Palabras de 2 Sílabas',
    icono: '🌱',
    palabras: [
      { palabra: 'MAPA', silabas: ['MA', 'PA'], pista: 'Sirve para encontrar un lugar.', icono: '🗺️' },
      { palabra: 'SAPO', silabas: ['SA', 'PO'], pista: 'Salta y vive cerca del agua.', icono: '🐸' },
      { palabra: 'LUNA', silabas: ['LU', 'NA'], pista: 'La ves brillar por la noche.', icono: '🌙' },
      { palabra: 'CASA', silabas: ['CA', 'SA'], pista: 'Aquí vive una familia.', icono: '🏠' },
      { palabra: 'PATO', silabas: ['PA', 'TO'], pista: 'Es un ave que nada.', icono: '🦆' },
      { palabra: 'MESA', silabas: ['ME', 'SA'], pista: 'Mueble donde apoyamos los libros y el almuerzo.', icono: '🪑' },
      { palabra: 'MAIZ', silabas: ['MA', 'ÍZ'], pista: 'Grano sagrado para deliciosas arepas y mazorcas.', icono: '🌽' },
      { palabra: 'GATO', silabas: ['GA', 'TO'], pista: 'Felino cariñoso y buen cazador del tejado.', icono: '🐱' },
      { palabra: 'RANA', silabas: ['RA', 'NA'], pista: 'Salta en los charcos y rima con campana.', icono: '🐸' },
      { palabra: 'ROSA', silabas: ['RO', 'SA'], pista: 'Flor hermosa y aromática de suaves pétalos.', icono: '🌹' },
      { palabra: 'NUBE', silabas: ['NU', 'BE'], pista: 'Algodón blanco en el cielo que trae la lluvia.', icono: '☁️' },
      { palabra: 'PECES', silabas: ['PE', 'CES'], pista: 'Nadan en cardumen en las aguas limpias del río.', icono: '🐟' }
    ]
  },
  intermedio: {
    nombre: 'Nivel 2: Palabras de 3 Sílabas',
    icono: '🌿',
    palabras: [
      { palabra: 'FABULA', silabas: ['FÁ', 'BU', 'LA'], pista: 'Cuento de animales que deja una hermosa moraleja.', icono: '📜' },
      { palabra: 'POEMA', silabas: ['PO', 'E', 'MA'], pista: 'Composición llena de verso, rima y sentimientos.', icono: '🎶' },
      { palabra: 'CAMINO', silabas: ['CA', 'MI', 'NO'], pista: 'Sendero que recorremos para llegar a la escuela.', icono: '🛤️' },
      { palabra: 'ESTRELLA', silabas: ['ES', 'TRE', 'LLA'], pista: 'Punto luminoso que brilla en el cielo nocturno.', icono: '⭐' },
      { palabra: 'COLOMBIA', silabas: ['CO', 'LOM', 'BIA'], pista: 'País de hermosas montañas, café y dos océanos.', icono: '🇨🇴' },
      { palabra: 'CUADERNO', silabas: ['CUA', 'DER', 'NO'], pista: 'Hojas en blanco donde anotamos nuestras ideas.', icono: '📓' },
      { palabra: 'ARDILLA', silabas: ['AR', 'DI', 'LLA'], pista: 'Animal inquieto que trepa comiendo frutos secos.', icono: '🐿️' },
      { palabra: 'LEYENDA', silabas: ['LE', 'YEN', 'DA'], pista: 'Relato tradicional popular transmitido de abuelos a nietos.', icono: '🏔️' },
      { palabra: 'SEMILLA', silabas: ['SE', 'MI', 'LLA'], pista: 'Pequeño grano que germina para dar frutos en la huerta.', icono: '🌱' },
      { palabra: 'BANDERA', silabas: ['BAN', 'DE', 'RA'], pista: 'Símbolo patrio tricolor que flamea con el viento.', icono: '🇨🇴' },
      { palabra: 'PAJARO', silabas: ['PÁ', 'JA', 'RO'], pista: 'Ave libre que trina al amanecer con sus plumas.', icono: '🐦' },
      { palabra: 'CANTO', silabas: ['CAN', 'TO'], pista: 'Melodía que entonan las aves al amanecer.', icono: '🎶' }
    ]
  },
  avanzado: {
    nombre: 'Nivel 3: Palabras Literarias de 4 Sílabas',
    icono: '🌳',
    palabras: [
      { palabra: 'METAFORA', silabas: ['ME', 'TÁ', 'FO', 'RA'], pista: 'Figura que compara dos realidades sin usar "como".', icono: '🎭' },
      { palabra: 'PERSONAJE', silabas: ['PER', 'SO', 'NA', 'JE'], pista: 'Ser real o ficticio que actúa dentro de una historia.', icono: '🧙' },
      { palabra: 'DICCIONARIO', silabas: ['DIC', 'CIO', 'NA', 'RIO'], pista: 'Libro maestro que reúne las definiciones del idioma.', icono: '📖' },
      { palabra: 'LITERATURA', silabas: ['LI', 'TE', 'RA', 'TU', 'RA'], pista: 'Arte de la expresión verbal escrita y hablada.', icono: '✒️' },
      { palabra: 'ORTOGRAFIA', silabas: ['OR', 'TO', 'GRA', 'FÍA'], pista: 'Reglas para escribir correctamente cada letra y tilde.', icono: '✍️' },
      { palabra: 'NARRADOR', silabas: ['NA', 'RRA', 'DOR'], pista: 'Voz que relata los acontecimientos en una novela.', icono: '🗣️' },
      { palabra: 'CRONOLOGIA', silabas: ['CRO', 'NO', 'LO', 'GÍA'], pista: 'Orden temporal en que ocurren los sucesos históricos.', icono: '⏳' },
      { palabra: 'ARGUMENTO', silabas: ['AR', 'GU', 'MEN', 'TO'], pista: 'Razonamiento que demuestra o refuta una proposición.', icono: '💡' },
      { palabra: 'HIPERBOLE', silabas: ['HI', 'PÉR', 'BO', 'LE'], pista: 'Exageración mayúscula para engrandecer una idea.', icono: '💥' },
      { palabra: 'CALIGRAFIA', silabas: ['CA', 'LI', 'GRA', 'FÍA'], pista: 'Arte de trazar letras bellas y legibles a mano.', icono: '✒️' }
    ]
  }
};

export default function ConstructorPalabras({ gradoNumero = 1 }) {
  const nivel = gradoNumero <= 2 ? 'basico' : gradoNumero <= 5 ? 'intermedio' : 'avanzado';
  const retos = NIVELES_PALABRAS[nivel].palabras.slice(0, 5).map((item) => ({ piezas: item.silabas, pista: item.pista, icono: item.icono, locucion: item.silabas.join('') }));
  return <ArmarSecuencia titulo="Arma palabras" gradoNumero={gradoNumero} retos={retos} />;
}
