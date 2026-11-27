import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import contenidoPlan from '../data/contenidoPlan.json';
import RondasJuego from './games/RondasJuego';
import ArcadeDidactico from './games/ArcadeDidactico';
import GeneradorFichas from './classroom/GeneradorFichas';
import { voiceReader } from '../utils/speech';
import { getRetosTema } from '../utils/contenidoCurricular';

const vocales = [['A', 'abeja', '🐝'], ['E', 'estrella', '⭐'], ['I', 'iguana', '🦎'], ['O', 'oso', '🐻'], ['U', 'uva', '🍇']];

export default function ModuloLeccion({ guia, gradoNombre, gradoNumero = 1, onSiguienteGuia, siguienteGuiaUrl }) {
  const contenido = contenidoPlan[guia.id];
  const [paso, setPaso] = useState(0);
  const [recurso, setRecurso] = useState(null);
  const [revisado, setRevisado] = useState(false);
  const [vocal, setVocal] = useState(null);
  const foco = useRef(null);
  const inicial = gradoNumero <= 2;
  const pasos = [inicial ? 'Mira y escucha' : 'Descubre', inicial ? 'Juega' : 'Practica', inicial ? 'Crea' : 'Aplica'];
  useEffect(() => () => voiceReader.stop(), []);

  function cambiarPaso(indice) {
    voiceReader.stop();
    setPaso(indice);
    setRecurso(null);
    requestAnimationFrame(() => foco.current?.focus());
  }

  if (!contenido) return <p role="status">Este tema necesita contenido curricular. Elige otro tema.</p>;

  return <div className="lengua-leccion space-y-4">
    <nav className="lengua-actividades" aria-label="Pasos del tema">
      {pasos.map((nombre, i) => <button key={nombre} className="lengua-pestana" aria-current={paso === i && !recurso ? 'step' : undefined}
        aria-pressed={paso === i && !recurso} onClick={() => cambiarPaso(i)}>
        <span className="lengua-paso-numero" aria-hidden="true">{i + 1}</span>{nombre}
      </button>)}
    </nav>
    <div ref={foco} tabIndex={-1} className="outline-none">
      {recurso === 'juegos' ? <>
        <p className="text-sm text-slate-600 mb-3">Práctica adicional de tu grado. Para seguir el tema, vuelve a los pasos de arriba.</p>
        <ArcadeDidactico gradoNumero={gradoNumero} />
      </> : recurso === 'ficha' ? <GeneradorFichas guia={guia} gradoNombre={gradoNombre} /> : <>
        {paso === 0 && <section className="lengua-panel space-y-4" aria-label="Explicación del tema">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-bold">{inicial ? 'Vamos a descubrir' : 'La idea clave'}</h2>
            <button className="lengua-nav-guia" onClick={() => voiceReader.speak(contenido.lectura)}>🔊 Escuchar</button>
          </div>
          {guia.id === '1-1-3' && <div className="lengua-reto-vocales">
            {vocales.map(([letra, palabra, icono]) => <button key={letra} className="lengua-pestana" aria-pressed={vocal === letra}
              onClick={() => { setVocal(letra); voiceReader.speak(`${letra}. ${palabra}.`); }}>
              <span aria-hidden="true">{icono}</span><strong>{letra} <small>{letra.toLowerCase()}</small></strong><span>{palabra}</span>
            </button>)}
          </div>}
          <p className={inicial ? 'text-lg leading-relaxed' : 'text-base leading-relaxed'}>{contenido.lectura}</p>
          <p className="text-sm text-slate-600">{inicial ? 'Puedes escuchar y leer con ayuda de tu docente.' : 'Después del ejemplo, pon a prueba lo que entendiste.'}</p>
        </section>}
        {paso === 1 && <RondasJuego key={guia.id} titulo={contenido.titulo} gradoNumero={gradoNumero}
          consigna={inicial ? 'Escucha y toca tu respuesta. Puedes intentarlo otra vez.' : 'Resuelve el reto de este tema. Usa la pista si lo necesitas.'}
          retos={getRetosTema(guia.id)} />}
        {paso === 2 && <section className="lengua-panel space-y-4" aria-label="Aplicación del tema">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-bold">{inicial ? 'Ahora tú' : 'Crea y comparte'}</h2>
            <button className="lengua-nav-guia" onClick={() => voiceReader.speak(contenido.produccion)}>🔊 Escuchar</button>
          </div>
          <p className="text-base leading-relaxed">{contenido.produccion}</p>
          <p className="text-sm text-slate-600">{inicial ? 'Hazlo en tu cuaderno o con materiales del salón. Pide ayuda si la necesitas.' : 'Realiza la actividad en tu cuaderno o compártela en clase. Usa la explicación para revisar tu trabajo.'}</p>
          <label className="flex gap-3 items-start"><input type="checkbox" checked={revisado} onChange={e => setRevisado(e.target.checked)} className="mt-1" />
            <span>{inicial ? 'Ya lo hice y puedo contarlo.' : 'Revisé mi trabajo y puedo explicar cómo apliqué el tema.'}</span></label>
          <p className="text-sm text-slate-500">Esta revisión es tuya; la actividad abierta se comenta con el docente.</p>
        </section>}
      </>}
    </div>
    <nav className="lengua-continuar" aria-label="Continuar el tema">
      {paso > 0 && !recurso && <button className="lengua-nav-guia" onClick={() => cambiarPaso(paso - 1)}>← Paso anterior</button>}
      {recurso ? <button className="lengua-nav-guia lengua-nav-guia-primary" onClick={() => cambiarPaso(paso)}>Volver al tema →</button>
        : paso < 2 ? <button className="lengua-nav-guia lengua-nav-guia-primary" onClick={() => cambiarPaso(paso + 1)}>Continuar · {pasos[paso + 1]} →</button>
        : siguienteGuiaUrl ? <Link className="lengua-nav-guia lengua-nav-guia-primary" to={siguienteGuiaUrl}>Siguiente tema →</Link>
        : onSiguienteGuia ? <button className="lengua-nav-guia lengua-nav-guia-primary" onClick={onSiguienteGuia}>Siguiente tema →</button>
        : <Link className="lengua-nav-guia lengua-nav-guia-primary" to="/espanol#grados">Volver a los grados →</Link>}
    </nav>
    <details className="es-docente">
      <summary>Recursos adicionales</summary>
      <div className="flex flex-wrap gap-2 mt-3">
        <button className="lengua-nav-guia" onClick={() => { voiceReader.stop(); setRecurso('juegos'); }}>Juegos de práctica libre</button>
        <button className="lengua-nav-guia" onClick={() => { voiceReader.stop(); setRecurso('ficha'); }}>Ficha de este tema</button>
      </div>
    </details>
  </div>;
}
