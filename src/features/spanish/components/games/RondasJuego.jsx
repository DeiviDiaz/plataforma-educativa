import { useRef, useState } from 'react';
import { sounds } from '../../utils/audio';
import { voiceReader } from '../../utils/speech';
import { GameProgress } from '../../utils/gamification';
import MarcoJuego from './MarcoJuego';

export default function RondasJuego({ titulo, consigna = 'Elige una respuesta. Puedes usar una pista y volver a intentarlo.', retos, gradoNumero = 1, insignia = null }) {
  const [indice, setIndice] = useState(0);
  const [respuesta, setRespuesta] = useState(null);
  const [pistaVisible, setPistaVisible] = useState(false);
  const preguntaRef = useRef(null);
  const terminado = indice === retos.length;
  const reto = retos[indice];
  const correcto = !terminado && respuesta === reto.correcta;

  function responder(opcion) {
    if (correcto) return;
    setRespuesta(opcion);
    if (opcion === reto.correcta) {
      sounds.playSuccess();
      GameProgress.addXP(10, indice + 1 === retos.length ? insignia : null);
    } else sounds.playClick();
  }

  function avanzar() {
    voiceReader.stop();
    setRespuesta(null);
    setPistaVisible(false);
    setIndice(indice + 1);
    requestAnimationFrame(() => preguntaRef.current?.focus());
  }

  function reiniciar() {
    setIndice(0);
    setRespuesta(null);
    setPistaVisible(false);
  }

  return <MarcoJuego titulo={titulo} consigna={consigna} gradoNumero={gradoNumero}
    actual={terminado ? undefined : indice + 1} total={terminado ? undefined : retos.length}>
    {terminado ? <div className="es-juego-final">
      <span aria-hidden="true">✓</span><h3>¡Completaste los {retos.length} retos!</h3>
      <p>Puedes repetir para seguir practicando o elegir otro juego.</p>
      <button className="es-boton-principal" onClick={reiniciar}>Volver a practicar</button>
    </div> : <>
      <div className="es-juego-herramientas">
        <button onClick={() => voiceReader.speak((reto.contexto || '') + '. ' + reto.pregunta + '. ' + reto.opciones.join('. '))}>🔊 Escuchar</button>
        <button aria-expanded={pistaVisible} onClick={() => setPistaVisible(!pistaVisible)}>💡 {pistaVisible ? 'Ocultar pista' : 'Ver pista'}</button>
      </div>
      {pistaVisible && <p className="es-juego-pista">{reto.pista}</p>}
      <div className="es-juego-pregunta">
        {reto.contexto && <p className="text-base leading-relaxed mb-4">{reto.contexto}</p>}
        {reto.icono && <span className="es-juego-ilustracion" aria-hidden="true">{reto.icono}</span>}
        <h3 ref={preguntaRef} tabIndex={-1}>{reto.pregunta}</h3>
      </div>
      <div className="es-juego-opciones">
        {reto.opciones.map((opcion, i) => <button key={i} disabled={correcto} onClick={() => responder(i)}
          data-estado={respuesta === i ? (correcto ? 'bien' : 'revisar') : undefined}>{opcion}</button>)}
      </div>
      <div className="es-juego-feedback" role="status">
        {respuesta !== null && <p>{correcto ? '✓ ¡Bien! ' + reto.explicacion : 'Prueba otra respuesta. ' + reto.pista}</p>}
      </div>
      {correcto && <button className="es-boton-principal" onClick={avanzar}>{indice + 1 === retos.length ? 'Ver resultado' : 'Siguiente reto →'}</button>}
    </>}
  </MarcoJuego>;
}
