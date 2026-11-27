import { useState } from 'react';
import MarcoJuego from './MarcoJuego';
import RondasJuego from './RondasJuego';
import { voiceReader } from '../../utils/speech';

const ABECEDARIO = [
  { letra: 'A', min: 'a', palabra: 'Árbol', icono: '🌳', color: 'from-amber-400 to-orange-500', tipo: 'vocal' },
  { letra: 'B', min: 'b', palabra: 'Barco', icono: '⛵', color: 'from-sky-400 to-blue-600', tipo: 'consonante' },
  { letra: 'C', min: 'c', palabra: 'Casa', icono: '🏠', color: 'from-emerald-400 to-teal-600', tipo: 'consonante' },
  { letra: 'D', min: 'd', palabra: 'Delfín', icono: '🐬', color: 'from-cyan-400 to-blue-500', tipo: 'consonante' },
  { letra: 'E', min: 'e', palabra: 'Estrella', icono: '⭐', color: 'from-yellow-400 to-amber-500', tipo: 'vocal' },
  { letra: 'F', min: 'f', palabra: 'Flor', icono: '🌸', color: 'from-pink-400 to-rose-500', tipo: 'consonante' },
  { letra: 'G', min: 'g', palabra: 'Gato', icono: '🐱', color: 'from-amber-500 to-orange-600', tipo: 'consonante' },
  { letra: 'H', min: 'h', palabra: 'Hoja', icono: '🍃', color: 'from-lime-400 to-green-600', tipo: 'consonante' },
  { letra: 'I', min: 'i', palabra: 'Isla', icono: '🏝️', color: 'from-teal-400 to-emerald-600', tipo: 'vocal' },
  { letra: 'J', min: 'j', palabra: 'Jirafa', icono: '🦒', color: 'from-yellow-500 to-amber-600', tipo: 'consonante' },
  { letra: 'K', min: 'k', palabra: 'Koala', icono: '🐨', color: 'from-slate-400 to-slate-600', tipo: 'consonante' },
  { letra: 'L', min: 'l', palabra: 'Luna', icono: '🌙', color: 'from-indigo-400 to-violet-600', tipo: 'consonante' },
  { letra: 'M', min: 'm', palabra: 'Mariposa', icono: '🦋', color: 'from-purple-400 to-fuchsia-600', tipo: 'consonante' },
  { letra: 'N', min: 'n', palabra: 'Nido', icono: '🪺', color: 'from-amber-600 to-yellow-700', tipo: 'consonante' },
  { letra: 'Ñ', min: 'ñ', palabra: 'Ñandú', icono: '🦤', color: 'from-rose-400 to-red-600', tipo: 'consonante' },
  { letra: 'O', min: 'o', palabra: 'Oso', icono: '🐻', color: 'from-orange-400 to-amber-600', tipo: 'vocal' },
  { letra: 'P', min: 'p', palabra: 'Perro', icono: '🐶', color: 'from-blue-400 to-indigo-600', tipo: 'consonante' },
  { letra: 'Q', min: 'q', palabra: 'Queso', icono: '🧀', color: 'from-yellow-400 to-amber-500', tipo: 'consonante' },
  { letra: 'R', min: 'r', palabra: 'Rana', icono: '🐸', color: 'from-emerald-400 to-green-600', tipo: 'consonante' },
  { letra: 'S', min: 's', palabra: 'Sol', icono: '☀️', color: 'from-amber-400 to-orange-500', tipo: 'consonante' },
  { letra: 'T', min: 't', palabra: 'Tortuga', icono: '🐢', color: 'from-teal-500 to-emerald-700', tipo: 'consonante' },
  { letra: 'U', min: 'u', palabra: 'Uva', icono: '🍇', color: 'from-violet-500 to-purple-700', tipo: 'vocal' },
  { letra: 'V', min: 'v', palabra: 'Vaca', icono: '🐄', color: 'from-sky-500 to-blue-700', tipo: 'consonante' },
  { letra: 'W', min: 'w', palabra: 'Wafle', icono: '🧇', color: 'from-amber-500 to-yellow-600', tipo: 'consonante' },
  { letra: 'X', min: 'x', palabra: 'Xilófono', icono: '🎵', color: 'from-fuchsia-400 to-pink-600', tipo: 'consonante' },
  { letra: 'Y', min: 'y', palabra: 'Yoyó', icono: '🪀', color: 'from-red-400 to-rose-600', tipo: 'consonante' },
  { letra: 'Z', min: 'z', palabra: 'Zanahoria', icono: '🥕', color: 'from-orange-500 to-amber-600', tipo: 'consonante' }
];

const FAMILIAS_SILABAS = [
  { consonante: 'M', nombre: 'Familia M', silabas: ['MA', 'ME', 'MI', 'MO', 'MU'], icono: '🍞', palabras: ['Mamá', 'Mesa', 'Miel', 'Mono', 'Mula'] },
  { consonante: 'P', nombre: 'Familia P', silabas: ['PA', 'PE', 'PI', 'PO', 'PU'], icono: '🦆', palabras: ['Papá', 'Pelota', 'Pipa', 'Pollo', 'Puente'] },
  { consonante: 'S', nombre: 'Familia S', silabas: ['SA', 'SE', 'SI', 'SO', 'SU'], icono: '🐸', palabras: ['Sapo', 'Semilla', 'Silla', 'Sopa', 'Suma'] },
  { consonante: 'L', nombre: 'Familia L', silabas: ['LA', 'LE', 'LI', 'LO', 'LU'], icono: '🌙', palabras: ['Lápiz', 'Leche', 'Limón', 'Loro', 'Luna'] },
  { consonante: 'T', nombre: 'Familia T', silabas: ['TA', 'TE', 'TI', 'TO', 'TU'], icono: '🍅', palabras: ['Taza', 'Tenedor', 'Tigre', 'Tomate', 'Tucán'] },
  { consonante: 'N', nombre: 'Familia N', silabas: ['NA', 'NE', 'NI', 'NO', 'NU'], icono: '🪺', palabras: ['Naranja', 'Nene', 'Nido', 'Noche', 'Nube'] },
  { consonante: 'D', nombre: 'Familia D', silabas: ['DA', 'DE', 'DI', 'DO', 'DU'], icono: '🎲', palabras: ['Dado', 'Dedo', 'Diente', 'Dona', 'Duende'] },
  { consonante: 'B', nombre: 'Familia B', silabas: ['BA', 'BE', 'BI', 'BO', 'BU'], icono: '⛵', palabras: ['Barco', 'Bebé', 'Bicicleta', 'Bota', 'Burro'] },
  { consonante: 'C', nombre: 'Familia C', silabas: ['CA', 'CE', 'CI', 'CO', 'CU'], icono: '🏠', palabras: ['Casa', 'Cereal', 'Circo', 'Conejo', 'Cuna'] },
  { consonante: 'R', nombre: 'Familia R', silabas: ['RA', 'RE', 'RI', 'RO', 'RU'], icono: '🐸', palabras: ['Ratón', 'Regalo', 'Risa', 'Rosa', 'Rueda'] },
  { consonante: 'G', nombre: 'Familia G', silabas: ['GA', 'GE', 'GI', 'GO', 'GU'], icono: '🐱', palabras: ['Gato', 'Gelatina', 'Girasol', 'Gota', 'Gusano'] },
  { consonante: 'F', nombre: 'Familia F', silabas: ['FA', 'FE', 'FI', 'FO', 'FU'], icono: '🌸', palabras: ['Familia', 'Feliz', 'Fiesta', 'Foca', 'Fuego'] },
  { consonante: 'J', nombre: 'Familia J', silabas: ['JA', 'JE', 'JI', 'JO', 'JU'], icono: '🦒', palabras: ['Jabón', 'Jefe', 'Jirafa', 'Joya', 'Jugo'] },
  { consonante: 'V', nombre: 'Familia V', silabas: ['VA', 'VE', 'VI', 'VO', 'VU'], icono: '🐄', palabras: ['Vaca', 'Vela', 'Viento', 'Volcán', 'Vuelo'] }
];

export default function AbecedarioSonoro({ gradoNumero = 1 }) {
  const [letra, setLetra] = useState(null);
  const [practicar, setPracticar] = useState(false);
  const [familia, setFamilia] = useState(0);
  const letras = gradoNumero === 1 ? ABECEDARIO.filter((item) => item.tipo === 'vocal') : ABECEDARIO.slice(0, 10);
  const retos = letras.slice(0, 5).map((item, index) => {
    const otra = letras[(index + 1) % letras.length];
    const opciones = index % 2 ? [otra.letra, item.letra] : [item.letra, otra.letra];
    return { pregunta: '¿Con qué letra empieza ' + item.palabra.toLowerCase() + '?', opciones, correcta: opciones.indexOf(item.letra), pista: 'Escucha el primer sonido de ' + item.palabra.toLowerCase() + '.', explicacion: item.palabra + ' empieza por ' + item.letra + '.', icono: item.icono };
  });
  if (practicar) return <div className="space-y-3"><button className="es-juego-ayuda" onClick={() => setPracticar(false)}>← Volver a escuchar letras</button><RondasJuego insignia="oido_oro" titulo="Reconoce la letra" gradoNumero={gradoNumero} retos={retos} /></div>;
  return <MarcoJuego titulo="Letras con voz" gradoNumero={gradoNumero} consigna="Toca una letra. Escucha cómo suena y mira su palabra.">
    <div className="es-letras-sonoras">{letras.map((item) => <button key={item.letra} aria-pressed={letra === item.letra}
      onClick={() => { setLetra(item.letra); voiceReader.speak(item.letra + '. ' + item.palabra); }}>
      <span aria-hidden="true">{item.icono}</span><strong>{item.letra} <small>{item.min}</small></strong><span>{item.palabra}</span>
    </button>)}</div>
    <p className="es-juego-feedback" role="status">{letra ? '¡Bien! Puedes escuchar otra letra o empezar el reto.' : 'Elige una letra para escucharla.'}</p>
    <button className="es-boton-principal" onClick={() => { voiceReader.stop(); setPracticar(true); }}>Jugar con estas letras →</button>
    <details className="es-juego-extra"><summary>Escuchar más letras y sílabas</summary>
      <div className="es-piezas">{ABECEDARIO.filter((item) => !letras.includes(item)).map((item) => <button key={item.letra} onClick={() => voiceReader.speak(item.letra + '. ' + item.palabra)}>{item.letra}</button>)}</div>
      <label>Familia de sílabas<select className="lengua-select" value={familia} onChange={(event) => setFamilia(Number(event.target.value))}>
        {FAMILIAS_SILABAS.map((item, index) => <option key={item.consonante} value={index}>{item.nombre}</option>)}
      </select></label>
      <div className="es-piezas">{FAMILIAS_SILABAS[familia].silabas.map((silaba) => <button key={silaba} onClick={() => voiceReader.speakSyllable(silaba)}>{silaba}</button>)}</div>
    </details>
  </MarcoJuego>;
}
