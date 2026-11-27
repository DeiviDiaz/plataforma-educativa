import { useRef, useState } from 'react';
import MarcoJuego from './MarcoJuego';
import { voiceReader } from '../../utils/speech';
import { sounds } from '../../utils/audio';
import { GameProgress } from '../../utils/gamification';

export default function ArmarSecuencia({ titulo, retos, gradoNumero = 1, tipo = 'palabra' }) {
  const [indice, setIndice] = useState(0);
  const [orden, setOrden] = useState([]);
  const [estado, setEstado] = useState(null);
  const tituloRef = useRef(null);
  const terminado = indice === retos.length;
  const reto = retos[indice];
  const disponibles = terminado ? [] : reto.piezas.map((texto, id) => ({ texto, id })).reverse();

  function elegir(id) {
    if (estado === 'bien') return;
    setOrden([...orden, id]);
    setEstado(null);
    sounds.playClick();
    if (tipo === 'palabra') voiceReader.speakSyllable(reto.piezas[id]);
    else voiceReader.speak(reto.piezas[id]);
  }
  function comprobar() {
    if (estado === 'bien') return;
    const correcto = orden.map((id) => reto.piezas[id]).join(' ') === reto.piezas.join(' ');
    setEstado(correcto ? 'bien' : 'revisar');
    if (correcto) { sounds.playSuccess(); GameProgress.addXP(10); }
  }
  function siguiente() {
    voiceReader.stop();
    setIndice(indice + 1);
    setOrden([]);
    setEstado(null);
    requestAnimationFrame(() => tituloRef.current?.focus());
  }
  return <MarcoJuego titulo={titulo} gradoNumero={gradoNumero} consigna={tipo === 'palabra' ? 'Toca las sílabas en orden para formar la palabra.' : 'Toca las palabras para formar una oración.'}
    actual={terminado ? undefined : indice + 1} total={terminado ? undefined : retos.length}>
    {terminado ? <div className="es-juego-final"><span aria-hidden="true">✓</span><h3>¡Terminaste!</h3><p>Formaste {retos.length} {tipo === 'palabra' ? 'palabras' : 'oraciones'}.</p>
      <button className="es-boton-principal" onClick={() => { setIndice(0); setOrden([]); setEstado(null); }}>Volver a practicar</button></div> : <>
      <div className="es-armar-contenido">
      <div className="space-y-3">
      <button className="es-juego-ayuda" onClick={() => voiceReader.speak(reto.locucion || reto.pista)}>🔊 Escuchar</button>
      <div className="es-juego-pregunta">
        {reto.icono && <span className="es-juego-ilustracion" aria-hidden="true">{reto.icono}</span>}
        <h3 ref={tituloRef} tabIndex={-1}>{reto.pista}</h3>
      </div>
      </div>
      <div className="space-y-3">
      <p className="es-etiqueta-juego">Tu {tipo}</p>
      <div className="es-zona-armar" aria-label={'Tu ' + tipo}>
        {orden.length ? orden.map((id) => <button key={id} disabled={estado === 'bien'} aria-label={'Quitar ' + reto.piezas[id]}
          onClick={() => { setOrden(orden.filter((item) => item !== id)); setEstado(null); }}>{reto.piezas[id]}</button>) : <span>Toca las piezas de abajo.</span>}
      </div>
      <div className="es-piezas" aria-label="Piezas disponibles">
        {disponibles.map(({ texto, id }) => <button key={id} disabled={orden.includes(id) || estado === 'bien'} onClick={() => elegir(id)}>{texto}</button>)}
      </div>
      <p className="es-juego-nota">Puedes tocar una pieza de tu respuesta para quitarla.</p>
      </div>
      </div>
      <div role="status" className="es-juego-feedback">{estado && <p>{estado === 'bien' ? '✓ ¡Así se escribe! ' + reto.piezas.join(tipo === 'palabra' ? '' : ' ') : 'Cambia el orden de las piezas y vuelve a comprobar.'}</p>}</div>
      {estado === 'bien' ? <button className="es-boton-principal" onClick={siguiente}>{indice + 1 === retos.length ? 'Ver resultado' : 'Siguiente →'}</button> : <button className="es-boton-principal" disabled={orden.length !== reto.piezas.length} onClick={comprobar}>Comprobar</button>}
    </>}
  </MarcoJuego>;
}
