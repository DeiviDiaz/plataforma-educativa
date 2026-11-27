import { useState } from 'react';
import MarcoJuego from './MarcoJuego';
import { correccionesPorGrado } from '../../data/correccionesPorGrado';
import { voiceReader } from '../../utils/speech';
import { sounds } from '../../utils/audio';
import { GameProgress } from '../../utils/gamification';

export default function DetectiveGramatical({ gradoNumero = 4 }) {
  const retos = correccionesPorGrado[gradoNumero] || correccionesPorGrado[3];
  const [indice, setIndice] = useState(0);
  const [encontrada, setEncontrada] = useState(false);
  const [corregida, setCorregida] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const terminado = indice === retos.length;
  const reto = retos[indice];
  function corregir(opcion) {
    if (corregida) return;
    if (opcion === reto.correccion) {
      setCorregida(true); setMensaje('✓ ' + reto.explicacion);
      sounds.playSuccess(); GameProgress.addXP(10, indice + 1 === retos.length ? 'detective_placa' : null);
    } else setMensaje('Esa forma todavía tiene el error. Prueba la otra opción.');
  }
  return <MarcoJuego titulo="Detective de palabras" gradoNumero={gradoNumero} consigna="Hay una palabra mal escrita. Tócala y elige cómo corregirla."
    actual={terminado ? undefined : indice + 1} total={terminado ? undefined : retos.length}>
    {terminado ? <div className="es-juego-final"><span aria-hidden="true">✓</span><h3>¡Corregiste todas las oraciones!</h3><button className="es-boton-principal" onClick={() => {setIndice(0);setEncontrada(false);setCorregida(false);setMensaje('');}}>Volver a practicar</button></div> : <>
      <div className="es-juego-herramientas">
        <button onClick={() => voiceReader.speak(reto.texto)}>🔊 Escuchar oración</button>
        <button onClick={() => setMensaje('Revisa cómo se escribe «' + reto.error + '».')}>💡 Ver pista</button>
      </div>
      <div className="es-texto-detective" aria-label="Oración para revisar">{reto.texto.split(' ').map((palabra, index) => <button key={index} disabled={corregida}
        data-estado={palabra === reto.error && encontrada ? (corregida ? 'bien' : 'revisar') : undefined}
        onClick={() => { if (palabra === reto.error) {setEncontrada(true);setMensaje('Encontraste la palabra. Elige cómo se escribe.');} else setMensaje('Esa palabra está bien. Busca otra.'); }}>
        {palabra === reto.error && corregida ? reto.correccion : palabra}
      </button>)}</div>
      {encontrada && <div className="es-juego-opciones">{(indice % 2 ? [reto.error, reto.correccion] : [reto.correccion, reto.error]).map((opcion) => <button key={opcion} disabled={corregida} onClick={() => corregir(opcion)}>{opcion}</button>)}</div>}
      <div role="status" className="es-juego-feedback"><p>{mensaje}</p></div>
      {corregida && <button className="es-boton-principal" onClick={() => { setIndice(indice + 1); setEncontrada(false); setCorregida(false); setMensaje(''); }}>{indice + 1 === retos.length ? 'Ver resultado' : 'Siguiente oración →'}</button>}
    </>}
  </MarcoJuego>;
}
