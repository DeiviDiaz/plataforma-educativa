import { useState } from 'react';
import MarcoJuego from './MarcoJuego';
import { voiceReader } from '../../utils/speech';
import { sounds } from '../../utils/audio';
import { GameProgress } from '../../utils/gamification';

const MAZOS_PAREJAS = {
  rimas: {
    nombre: 'Rimas y Sonidos',
    descripcion: 'Encuentra las palabras que riman con la misma musicalidad',
    icono: '🎵',
    parejas: [
      { id: 'p1', a: { texto: 'RATÓN', icono: '🐭' }, b: { texto: 'BOTÓN', icono: '🔘' } },
      { id: 'p2', a: { texto: 'CAMPANA', icono: '🔔' }, b: { texto: 'MANZANA', icono: '🍎' } },
      { id: 'p3', a: { texto: 'ESTRELLA', icono: '⭐' }, b: { texto: 'BOTELLA', icono: '🍾' } },
      { id: 'p4', a: { texto: 'VENTANA', icono: '🪟' }, b: { texto: 'RANA', icono: '🐸' } },
      { id: 'p5', a: { texto: 'CANCIÓN', icono: '🎶' }, b: { texto: 'CORAZÓN', icono: '❤️' } },
      { id: 'p6', a: { texto: 'PINTOR', icono: '🎨' }, b: { texto: 'FLOR', icono: '🌸' } }
    ]
  },
  sinonimos: {
    nombre: 'Sinónimos Expresivos',
    descripcion: 'Empareja términos que tienen significados semejantes',
    icono: '📚',
    parejas: [
      { id: 'p1', a: { texto: 'ALEGRE', icono: '😃' }, b: { texto: 'FELIZ', icono: '🎉' } },
      { id: 'p2', a: { texto: 'VELOZ', icono: '⚡' }, b: { texto: 'RÁPIDO', icono: '🐆' } },
      { id: 'p3', a: { texto: 'ENORME', icono: '🐘' }, b: { texto: 'GIGANTE', icono: '🏔️' } },
      { id: 'p4', a: { texto: 'DULCE', icono: '🍯' }, b: { texto: 'MELOSO', icono: '🍬' } },
      { id: 'p5', a: { texto: 'ANTIGUO', icono: '🏺' }, b: { texto: 'VETUSTO', icono: '📜' } },
      { id: 'p6', a: { texto: 'CALMA', icono: '🌊' }, b: { texto: 'SERENIDAD', icono: '🕊️' } }
    ]
  },
  antonimos: {
    nombre: 'Antónimos Opuestos',
    descripcion: 'Empareja palabras con significados contrarios',
    icono: '⚖️',
    parejas: [
      { id: 'p1', a: { texto: 'LUZ', icono: '☀️' }, b: { texto: 'OSCURIDAD', icono: '🌑' } },
      { id: 'p2', a: { texto: 'VALIENTE', icono: '🦁' }, b: { texto: 'TEMEROSO', icono: '🙈' } },
      { id: 'p3', a: { texto: 'SUBIR', icono: '⬆️' }, b: { texto: 'BAJAR', icono: '⬇️' } },
      { id: 'p4', a: { texto: 'ANCHO', icono: '↔️' }, b: { texto: 'ESTRECHO', icono: '↕️' } },
      { id: 'p5', a: { texto: 'INICIO', icono: '🟢' }, b: { texto: 'DESENLACE', icono: '🏁' } },
      { id: 'p6', a: { texto: 'EFÍMERO', icono: '⏳' }, b: { texto: 'ETERNO', icono: '♾️' } }
    ]
  },
  figuras: {
    nombre: 'Figuras Literarias',
    descripcion: 'Conceptos retóricos emparejados con su definición clave',
    icono: '✨',
    parejas: [
      { id: 'p1', a: { texto: 'METÁFORA', icono: '🎭' }, b: { texto: 'Comparar sin "como"', icono: '💡' } },
      { id: 'p2', a: { texto: 'SÍMIL', icono: '🔍' }, b: { texto: 'Comparar con "como"', icono: '🤝' } },
      { id: 'p3', a: { texto: 'HIPÉRBOLE', icono: '🌋' }, b: { texto: 'Exageración extrema', icono: '💥' } },
      { id: 'p4', a: { texto: 'PERSONIFICACIÓN', icono: '🦊' }, b: { texto: 'Cualidad humana a cosas', icono: '🗣️' } },
      { id: 'p5', a: { texto: 'ONOMATOPEYA', icono: '💥' }, b: { texto: 'Imitar sonido real', icono: '🔔' } },
      { id: 'p6', a: { texto: 'MORALEJA', icono: '📜' }, b: { texto: 'Enseñanza ética final', icono: '🌟' } }
    ]
  },
  fauna: {
    nombre: 'Fauna Colombiana',
    descripcion: 'Animales emblemáticos de nuestros páramos, selvas y llanos',
    icono: '🐾',
    parejas: [
      { id: 'p1', a: { texto: 'CHIGÜIRO', icono: '🦫' }, b: { texto: 'Roedor gigante de los Llanos', icono: '🌾' } },
      { id: 'p2', a: { texto: 'CÓNDOR', icono: '🦅' }, b: { texto: 'Rey de las alturas andinas', icono: '🏔️' } },
      { id: 'p3', a: { texto: 'JAGUAR', icono: '🐆' }, b: { texto: 'Guardián de la selva', icono: '🌿' } },
      { id: 'p4', a: { texto: 'OSO ANDINO', icono: '🐻' }, b: { texto: 'Cuidador de los páramos', icono: '🌱' } },
      { id: 'p5', a: { texto: 'RANA DORADA', icono: '🐸' }, b: { texto: 'Joya del Chocó', icono: '💎' } },
      { id: 'p6', a: { texto: 'GUACAMAYA', icono: '🦜' }, b: { texto: 'Alas tricolores del aire', icono: '🌈' } }
    ]
  },
  fabulas: {
    nombre: 'Fábulas y Moralejas',
    descripcion: 'Asocia cada historia clásica o colombiana con su enseñanza',
    icono: '📜',
    parejas: [
      { id: 'p1', a: { texto: 'LA LIEBRE Y LA TORTUGA', icono: '🐢' }, b: { texto: 'Constancia y humildad', icono: '🏆' } },
      { id: 'p2', a: { texto: 'EL PASTOR MENTIROSO', icono: '🐺' }, b: { texto: 'La verdad es oro', icono: '⭐' } },
      { id: 'p3', a: { texto: 'CIGARRA Y HORMIGA', icono: '🐜' }, b: { texto: 'El esfuerzo previene el frío', icono: '🥖' } },
      { id: 'p4', a: { texto: 'SIMÓN EL BOBITO', icono: '🎣' }, b: { texto: 'Pensar antes de actuar', icono: '💡' } },
      { id: 'p5', a: { texto: 'LEÓN Y EL RATÓN', icono: '🦁' }, b: { texto: 'Todos podemos ayudar', icono: '🤝' } },
      { id: 'p6', a: { texto: 'CUERVO Y LA ZORRA', icono: '🦊' }, b: { texto: 'Cuidado con la adulación', icono: '🧀' } }
    ]
  }
};

export default function JuegoMemoriaParejas({ tema = 'rimas', gradoNumero = 2 }) {
  const mazo = MAZOS_PAREJAS[tema] || MAZOS_PAREJAS.rimas;
  function crearCartas() {
    const parejas = mazo.parejas.slice(0, gradoNumero <= 2 ? 3 : 4);
    return parejas.flatMap((pareja) => [{ ...pareja.a, pareja: pareja.id, id: pareja.id + '-a' }, { ...pareja.b, pareja: pareja.id, id: pareja.id + '-b' }]).sort(() => Math.random() - .5);
  }
  const [cartas, setCartas] = useState(crearCartas);
  const [volteadas, setVolteadas] = useState([]);
  const [encontradas, setEncontradas] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const terminado = encontradas.length === cartas.length / 2;
  function voltear(carta) {
    if (volteadas.length === 2 || volteadas.includes(carta.id) || encontradas.includes(carta.pareja)) return;
    voiceReader.speak(carta.texto);
    if (volteadas.length === 1) {
      const anterior = cartas.find((item) => item.id === volteadas[0]);
      if (anterior.pareja === carta.pareja) {
        setEncontradas([...encontradas, carta.pareja]);
        setVolteadas([]);
        setMensaje(tema === 'rimas' ? '✓ ¡Estas palabras riman!' : '✓ ¡Encontraste una pareja!');
        sounds.playSuccess(); GameProgress.addXP(10);
        return;
      }
      setMensaje('Estas no forman pareja. Escúchalas y vuelve a intentarlo.');
    } else setMensaje('Ahora toca otra tarjeta.');
    setVolteadas([...volteadas, carta.id]);
  }
  return <MarcoJuego titulo={tema === 'rimas' ? 'Parejas de rimas' : mazo.nombre} gradoNumero={gradoNumero}
    consigna={tema === 'rimas' ? 'Toca dos tarjetas. Busca palabras que terminen con un sonido parecido.' : mazo.descripcion}>
    <p className="es-etiqueta-juego">{encontradas.length} de {cartas.length / 2} parejas</p>
    <div className="es-cartas-memoria">{cartas.map((carta, index) => {
      const visible = volteadas.includes(carta.id) || encontradas.includes(carta.pareja);
      return <button key={carta.id} aria-label={visible ? carta.texto : 'Tarjeta ' + (index + 1)}
        data-encontrada={encontradas.includes(carta.pareja)} disabled={encontradas.includes(carta.pareja)} onClick={() => voltear(carta)}>
        <span aria-hidden="true">{visible ? carta.icono : '🐾'}</span><strong>{visible ? carta.texto : '?'}</strong>
      </button>;
    })}</div>
    <p className="es-juego-feedback" role="status">{terminado ? '✓ ¡Encontraste todas las parejas!' : mensaje}</p>
    {volteadas.length === 2 && <button className="es-boton-principal" onClick={() => { setVolteadas([]); setMensaje('Toca otras dos tarjetas.'); }}>Volver a intentar</button>}
    {terminado && <button className="es-boton-principal" onClick={() => { setCartas(crearCartas()); setEncontradas([]); setVolteadas([]); setMensaje(''); }}>Jugar otra vez</button>}
  </MarcoJuego>;
}
