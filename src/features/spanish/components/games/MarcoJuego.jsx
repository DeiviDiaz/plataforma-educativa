import { useEffect } from 'react';
import { voiceReader } from '../../utils/speech';

export default function MarcoJuego({ titulo, consigna, gradoNumero = 1, actual, total, children }) {
  useEffect(() => () => voiceReader.stop(), []);
  return (
    <section className={'es-juego-claro ' + (gradoNumero <= 5 ? 'es-juego-primaria' : 'es-juego-secundaria')} aria-label={titulo}>
      <header className="es-juego-cabecera">
        <div><p className="es-contexto">Español · {gradoNumero}.º</p><h2>{titulo}</h2><p>{consigna}</p></div>
        {total && <span className="es-juego-avance">{actual} de {total}</span>}
      </header>
      {total && <progress className="es-juego-progreso" aria-label="Avance del juego" value={actual - 1} max={total} />}
      {children}
    </section>
  );
}
