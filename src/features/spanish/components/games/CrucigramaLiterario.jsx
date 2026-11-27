import { useState } from 'react';
import MarcoJuego from './MarcoJuego';
import { voiceReader } from '../../utils/speech';
import { sounds } from '../../utils/audio';
import { GameProgress } from '../../utils/gamification';

const PUZZLES = [
  {
    id: 1,
    nombre: 'Reto Lírico y Estilístico',
    nivel: 'Grado 6° - 7°',
    size: 7,
    palabras: [
      { id: '1H', numero: 1, direccion: 'H', palabra: 'VERSO', r: 0, c: 0, pista: 'Cada una de las líneas que componen un poema.' },
      { id: '2H', numero: 2, direccion: 'H', palabra: 'RIMA', r: 2, c: 0, pista: 'Semejanza de sonidos al final de dos o más versos.' },
      { id: '3H', numero: 3, direccion: 'H', palabra: 'TEXTO', r: 4, c: 2, pista: 'Enunciado o conjunto de palabras con sentido coherente.' },
      { id: '4H', numero: 4, direccion: 'H', palabra: 'PROSA', r: 6, c: 2, pista: 'Forma natural de expresión no sujeta a rima ni medida.' },
      { id: '1V', numero: 1, direccion: 'V', palabra: 'VERBO', r: 0, c: 0, pista: 'Clase de palabra que expresa una acción, movimiento o estado.' },
      { id: '2V', numero: 2, direccion: 'V', palabra: 'MITO', r: 2, c: 2, pista: 'Relato sagrado tradicional sobre dioses o el origen del cosmos.' },
      { id: '3V', numero: 3, direccion: 'V', palabra: 'ODA', r: 4, c: 6, pista: 'Poema lírico de tono elevado que alaba a un personaje u objeto.' }
    ]
  },
  {
    id: 2,
    nombre: 'Narrativa y Estructura Literaria',
    nivel: 'Grado 7° - 8°',
    size: 7,
    palabras: [
      { id: '1H', numero: 1, direccion: 'H', palabra: 'PUNTO', r: 2, c: 1, pista: 'Signo ortográfico que indica la pausa final de una oración.' },
      { id: '2H', numero: 2, direccion: 'H', palabra: 'EPICA', r: 5, c: 0, pista: 'Género poético narrativo sobre grandes hazañas bélicas y héroes.' },
      { id: '3H', numero: 3, direccion: 'H', palabra: 'NOVELA', r: 6, c: 0, pista: 'Narración extensa en prosa con personajes, trama y capítulos.' },
      { id: '1V', numero: 4, direccion: 'V', palabra: 'CRONICA', r: 0, c: 5, pista: 'Texto que narra acontecimientos reales en orden cronológico.' },
      { id: '2V', numero: 5, direccion: 'V', palabra: 'TEMA', r: 2, c: 4, pista: 'Asunto o idea central que el autor desarrolla en su texto.' }
    ]
  },
  {
    id: 3,
    nombre: 'Métrica, Teatro y Fonología',
    nivel: 'Grado 8° - 9°',
    size: 7,
    palabras: [
      { id: '1H', numero: 1, direccion: 'H', palabra: 'VERSOS', r: 0, c: 0, pista: 'Conjunto de líneas que siguen un compás métrico determinado.' },
      { id: '2H', numero: 2, direccion: 'H', palabra: 'RITMO', r: 5, c: 1, pista: 'Sensación de movimiento sonoro y musicalidad en la lengua.' },
      { id: '3H', numero: 3, direccion: 'H', palabra: 'DRAMA', r: 6, c: 0, pista: 'Obra escrita para ser actuada con diálogo frente al público.' },
      { id: '1V', numero: 4, direccion: 'V', palabra: 'SONETO', r: 0, c: 5, pista: 'Composición clásica de 14 versos endecasílabos y rima consonante.' },
      { id: '2V', numero: 5, direccion: 'V', palabra: 'FONEMA', r: 1, c: 4, pista: 'Unidad mínima fonológica que distingue significados en el habla.' }
    ]
  },
  {
    id: 4,
    nombre: 'Palabras y Rimas Mágicas',
    nivel: 'Grado 4° - 6°',
    size: 7,
    palabras: [
      { id: '1H', numero: 1, direccion: 'H', palabra: 'RIMA', r: 0, c: 0, pista: 'Sonidos iguales o semejantes al final de dos versos.' },
      { id: '2H', numero: 2, direccion: 'H', palabra: 'NIDO', r: 2, c: 0, pista: 'Hogar que construyen las aves con ramitas para sus huevos.' },
      { id: '3H', numero: 3, direccion: 'H', palabra: 'DULCE', r: 4, c: 2, pista: 'Sabor rico como la miel, el caramelo o la panela.' },
      { id: '4H', numero: 4, direccion: 'H', palabra: 'OSO', r: 6, c: 4, pista: 'Mamífero grande como el oso de anteojos de nuestros páramos.' },
      { id: '1V', numero: 1, direccion: 'V', palabra: 'RANA', r: 0, c: 0, pista: 'Anfibio saltador verde que canta en los charcos.' },
      { id: '2V', numero: 5, direccion: 'V', palabra: 'DADO', r: 2, c: 2, pista: 'Cubo con puntos numerados del 1 al 6 para jugar.' },
      { id: '3V', numero: 6, direccion: 'V', palabra: 'ECO', r: 4, c: 6, pista: 'Repetición de un sonido al chocar contra las montañas.' }
    ]
  }
];

export default function CrucigramaLiterario({ gradoNumero = 8 }) {
  const puzzle = PUZZLES[gradoNumero <= 5 ? 3 : gradoNumero <= 6 ? 0 : gradoNumero <= 8 ? 1 : 2];
  const [indice, setIndice] = useState(0);
  const [respuesta, setRespuesta] = useState('');
  const [resueltas, setResueltas] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const pista = puzzle.palabras[indice];
  const terminado = resueltas.length === puzzle.palabras.length;
  const celdas = new Map();
  for (const palabra of puzzle.palabras) {
    [...palabra.palabra].forEach((letra, offset) => {
      const fila = palabra.r + (palabra.direccion === 'V' ? offset : 0);
      const columna = palabra.c + (palabra.direccion === 'H' ? offset : 0);
      const clave = fila + '-' + columna;
      const previa = celdas.get(clave);
      celdas.set(clave, { letra, visible: Boolean(previa?.visible || resueltas.includes(palabra.id)), activa: Boolean(previa?.activa || palabra.id === pista.id) });
    });
  }
  function comprobar(event) {
    event.preventDefault();
    if (resueltas.includes(pista.id)) return;
    const normalizada = respuesta.trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();
    if (normalizada === pista.palabra) {
      setResueltas([...resueltas, pista.id]);setMensaje('✓ ¡La palabra encaja!');
      sounds.playSuccess();GameProgress.addXP(10, resueltas.length + 1 === puzzle.palabras.length ? 'crucigrama_as' : null);
    } else setMensaje('Todavía no encaja. Revisa la pista y la cantidad de letras.');
  }
  return <MarcoJuego titulo="Crucigrama de palabras" gradoNumero={gradoNumero} consigna="Elige una pista y escribe la palabra. Las letras aparecerán en el tablero.">
    <p className="es-etiqueta-juego">{resueltas.length} de {puzzle.palabras.length} palabras</p>
    <div className="es-crucigrama-contenido">
      <div className="es-crucigrama-tablero" role="img" aria-label={'Crucigrama con ' + resueltas.length + ' palabras resueltas'} style={{ gridTemplateColumns: 'repeat(' + puzzle.size + ', 1fr)' }}>
        {Array.from({length:puzzle.size * puzzle.size},(_,index) => {
          const celda=celdas.get(Math.floor(index / puzzle.size) + '-' + index % puzzle.size);
          return <span key={index} data-vacia={!celda} data-activa={celda?.activa}>{celda?.visible ? celda.letra : ''}</span>;
        })}
      </div>
      <div className="space-y-4">
        <div className="es-piezas" aria-label="Pistas del crucigrama">{puzzle.palabras.map((palabra,i) => <button key={palabra.id} aria-pressed={indice === i}
          onClick={() => {setIndice(i);setRespuesta('');setMensaje('');}}>Pista {i + 1}{resueltas.includes(palabra.id) ? ' ✓' : ''}</button>)}</div>
        <h3 className="es-subtitulo-juego">{pista.pista}</h3>
        <p>{pista.palabra.length} letras · {pista.direccion === 'H' ? 'Horizontal' : 'Vertical'}</p>
        <button className="es-juego-ayuda" onClick={() => voiceReader.speak(pista.pista)}>🔊 Escuchar pista</button>
        {!resueltas.includes(pista.id) && <form onSubmit={comprobar} className="es-formulario-palabra">
          <label htmlFor="es-respuesta-crucigrama">Tu palabra</label>
          <input id="es-respuesta-crucigrama" autoComplete="off" value={respuesta} onChange={(event) => setRespuesta(event.target.value)} maxLength={pista.palabra.length + 2} />
          <button type="submit" className="es-boton-principal" disabled={!respuesta.trim()}>Comprobar</button>
        </form>}
        <div className="es-juego-feedback" role="status"><p>{terminado ? '✓ ¡Completaste el crucigrama!' : mensaje}</p></div>
        {resueltas.includes(pista.id) && !terminado && <button className="es-boton-principal" onClick={() => {setIndice(puzzle.palabras.findIndex((item) => !resueltas.includes(item.id)));setRespuesta('');setMensaje('');}}>Siguiente pista →</button>}
        {terminado && <button className="es-boton-principal" onClick={() => {setIndice(0);setResueltas([]);setRespuesta('');setMensaje('');}}>Volver a practicar</button>}
      </div>
    </div>
  </MarcoJuego>;
}
