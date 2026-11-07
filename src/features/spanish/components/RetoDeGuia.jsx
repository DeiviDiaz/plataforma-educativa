import { useEffect, useState } from 'react';
import { sounds } from '../utils/audio';
import { voiceReader } from '../utils/speech';

const vocales = [
  ['A', 'abeja', '🐝'], ['E', 'estrella', '⭐'], ['I', 'iguana', '🦎'],
  ['O', 'oveja', '🐑'], ['U', 'uva', '🍇'],
];

export default function RetoDeGuia({ rondas, secuencia, explorarVocales, grado, guiaId, onSiguienteGuia }) {
  const [fase, setFase] = useState(explorarVocales ? 'explorar' : 'retos');
  const [vocal, setVocal] = useState(null);
  const [indice, setIndice] = useState(0);
  const [respuesta, setRespuesta] = useState(null);
  const [orden, setOrden] = useState([]);

  useEffect(() => () => voiceReader.stop(), []);

  const [pregunta, correcta, alternativa1, alternativa2, pista, dibujo, locucion] = rondas[indice];
  const acierto = respuesta === correcta;
  const opciones = [alternativa1, alternativa2];
  opciones.splice((Number(guiaId.split('-').at(-1)) + indice) % 3, 0, correcta);
  const pasos = secuencia?.[1] || [];
  const piezas = [...pasos.slice(2), ...pasos.slice(0, 2)];
  const total = rondas.length + Number(Boolean(secuencia));

  function avanzar() {
    voiceReader.stop();
    setRespuesta(null);
    if (indice + 1 < rondas.length) setIndice(indice + 1);
    else setFase(secuencia ? 'ordenar' : 'final');
  }

  function elegir(opcion) {
    setRespuesta(opcion);
    if (opcion === correcta) sounds.playSuccess();
    else sounds.playClick();
  }

  function reiniciar() {
    voiceReader.stop();
    setIndice(0);
    setRespuesta(null);
    setOrden([]);
    setVocal(null);
    setFase(explorarVocales ? 'explorar' : 'retos');
  }

  return (
    <section className="lengua-reto lengua-panel" aria-labelledby="reto-guia">
      {fase === 'explorar' && (
        <>
          <h3 id="reto-guia">Toca una vocal</h3>
          <div className="lengua-reto-vocales">
            {vocales.map(([letra, palabra, icono]) => (
              <button key={letra} type="button" className="lengua-pestana" aria-pressed={vocal === letra}
                onClick={() => {
                  setVocal(letra);
                  voiceReader.speak(`${letra}. ${palabra}.`);
                }}>
                <span aria-hidden="true">{icono}</span>
                <strong>{letra} <small>{letra.toLowerCase()}</small></strong>
                <span>{palabra}</span>
              </button>
            ))}
          </div>
          <button type="button" className="lengua-nav-guia lengua-nav-guia-primary"
            onClick={() => { voiceReader.stop(); setFase('retos'); }}>Jugar →</button>
        </>
      )}

      {fase === 'retos' && (
        <>
          <p className="lengua-reto-paso">Reto {indice + 1} de {total}</p>
          {dibujo && <span aria-hidden="true" className="lengua-reto-dibujo">{dibujo}</span>}
          <h3 id="reto-guia" aria-live="polite">{pregunta}</h3>
          {grado <= 5 && <button type="button" className="lengua-nav-guia"
            onClick={() => voiceReader.speak(locucion || pregunta.replace('__', 'espacio'))}>🔊 Escuchar</button>}
          <div className={`lengua-reto-opciones ${opciones.every((opcion) => opcion.length <= 4) ? 'lengua-reto-fichas' : ''}`}>
            {opciones.map((opcion) => (
              <button key={opcion} type="button" className="lengua-pestana" aria-pressed={respuesta === opcion}
                data-resultado={respuesta === opcion ? (acierto ? 'correcto' : 'pista') : undefined}
                disabled={acierto}
                onClick={() => elegir(opcion)}>{opcion}</button>
            ))}
          </div>
          <div className="lengua-reto-feedback" role="status">
            {respuesta && <p>{acierto ? '¡Bien hecho! ' : 'Prueba otra vez. '}{pista}</p>}
          </div>
          {acierto && <button type="button" className="lengua-nav-guia lengua-nav-guia-primary" onClick={avanzar}>
            {indice + 1 < total ? 'Siguiente →' : 'Terminar reto'}
          </button>}
        </>
      )}

      {fase === 'ordenar' && (
        <>
          <p className="lengua-reto-paso">Reto {total} de {total}</p>
          <h3 id="reto-guia">{secuencia[0]}</h3>
          <p>Toca las fichas en orden.</p>
          <ol className="lengua-reto-orden" aria-label="Tu secuencia">
            {pasos.map((paso, posicion) => <li key={paso}>{orden[posicion] || posicion + 1}</li>)}
          </ol>
          <div className="lengua-reto-opciones">
            {piezas.map((pieza) => (
              <button key={pieza} type="button" className="lengua-pestana"
                disabled={orden.includes(pieza) || orden.length === pasos.length}
                onClick={() => {
                  const correcta = pieza === pasos[orden.length];
                  setRespuesta(correcta ? null : pieza);
                  if (correcta) {
                    sounds.playSuccess();
                    setOrden([...orden, pieza]);
                  }
                }}>{pieza}</button>
            ))}
          </div>
          <p className="lengua-reto-feedback" role="status">
            {orden.length === pasos.length ? '¡Orden correcto!' : respuesta ? 'Esa ficha va en otro lugar. Intenta otra.' : ''}
          </p>
          {orden.length === pasos.length && <button type="button" className="lengua-nav-guia lengua-nav-guia-primary"
            onClick={() => setFase('final')}>Terminar reto</button>}
        </>
      )}

      {fase === 'final' && (
        <>
          <span aria-hidden="true" className="lengua-reto-dibujo">⭐</span>
          <h3 id="reto-guia" aria-live="polite">¡Reto completado!</h3>
          <p>Completaste {total === 1 ? '1 actividad' : `${total} actividades`} de esta guía.</p>
          <div className="flex flex-wrap gap-2">
            <button type="button" className="lengua-nav-guia" onClick={reiniciar}>Volver a jugar</button>
            {onSiguienteGuia && <button type="button" className="lengua-nav-guia lengua-nav-guia-primary"
              onClick={onSiguienteGuia}>Siguiente guía →</button>}
          </div>
        </>
      )}
    </section>
  );
}
