import { Fragment, useState } from 'react';
import MarcoJuego from './MarcoJuego';
import { textosParaCompletar } from '../../data/textosParaCompletar';
import { voiceReader } from '../../utils/speech';
import { sounds } from '../../utils/audio';
import { GameProgress } from '../../utils/gamification';

export default function CompletarTexto({ gradoNumero = 7 }) {
  const textos = textosParaCompletar[gradoNumero] || textosParaCompletar.primaria;
  const [indice, setIndice] = useState(0);
  const [espacio, setEspacio] = useState(0);
  const [respuestas, setRespuestas] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const terminado = indice === textos.length;
  const texto = textos[indice];
  const respondido = Boolean(respuestas[espacio]);
  function elegir(palabra) {
    if (respondido) return;
    if (palabra === texto.palabras[espacio]) {
      setRespuestas([...respuestas, palabra]); setMensaje('✓ La palabra encaja en este espacio.');
      sounds.playSuccess(); GameProgress.addXP(10);
    } else setMensaje('Lee la oración otra vez. Prueba otra palabra.');
  }
  function avanzar() {
    voiceReader.stop(); setMensaje('');
    if (espacio + 1 < texto.palabras.length) setEspacio(espacio + 1);
    else {setIndice(indice + 1);setEspacio(0);setRespuestas([]);}
  }
  return <MarcoJuego titulo="Completa el texto" gradoNumero={gradoNumero} consigna="Lee y elige una palabra para el espacio marcado."
    actual={terminado ? undefined : indice + 1} total={terminado ? undefined : textos.length}>
    {terminado ? <div className="es-juego-final"><span aria-hidden="true">✓</span><h3>¡Completaste los textos!</h3><button className="es-boton-principal" onClick={() => {setIndice(0);setEspacio(0);setRespuestas([]);setMensaje('');}}>Volver a practicar</button></div> : <>
      <h3 className="es-subtitulo-juego">{texto.titulo}</h3>
      <button className="es-juego-ayuda" onClick={() => voiceReader.speak(texto.texto.replaceAll('___', 'espacio'))}>🔊 Escuchar texto</button>
      <p className="es-texto-completar">{texto.texto.split('___').map((parte, i) => <Fragment key={i}>{parte}{i < texto.palabras.length && <mark data-activo={i === espacio}>{respuestas[i] || '____'}</mark>}</Fragment>)}</p>
      <p className="es-etiqueta-juego">Espacio {espacio + 1} de {texto.palabras.length}</p>
      <div className="es-juego-opciones">{[...texto.palabras, ...texto.distractores].sort((a,b) => a.localeCompare(b,'es')).map((palabra) => <button key={palabra} disabled={respondido || respuestas.includes(palabra)} onClick={() => elegir(palabra)}>{palabra}</button>)}</div>
      <div className="es-juego-feedback" role="status"><p>{mensaje}</p></div>
      {respondido && <button className="es-boton-principal" onClick={avanzar}>{espacio + 1 < texto.palabras.length ? 'Siguiente espacio →' : indice + 1 < textos.length ? 'Siguiente texto →' : 'Ver resultado'}</button>}
    </>}
  </MarcoJuego>;
}
