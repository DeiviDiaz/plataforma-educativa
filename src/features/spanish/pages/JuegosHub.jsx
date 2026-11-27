import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import ArcadeDidactico from '../components/games/ArcadeDidactico';
import RondasJuego from '../components/games/RondasJuego';
import mallaData from '../data/mallaCurricularEspanol.json';
import contenidoPlan from '../data/contenidoPlan.json';
import { getRetosTema } from '../utils/contenidoCurricular';
import { voiceReader } from '../utils/speech';

const grados = Object.values(mallaData.grados);

export default function JuegosHub() {
  const [params, setParams] = useSearchParams();
  const grado = grados.find(item => item.id === params.get('grado')) || grados[0];
  const periodo = grado.periodos.find(item => item.unidades.some(unidad => unidad.guias.some(guia => guia.id === params.get('guia'))))
    || grado.periodos.find(item => String(item.numero) === params.get('periodo')) || grado.periodos[0];
  return <div className={`es-sala-juegos space-y-5 ${grado.numero <= 2 ? 'lengua-inicial' : grado.numero <= 5 ? 'lengua-primaria' : 'lengua-secundaria'}`}>
    <header className="es-encabezado"><p className="es-contexto">Español · {grado.nombre}</p><h1>Practica lo aprendido</h1></header>
    <div className="flex flex-wrap gap-4">
      <label>Grado<select className="lengua-select" value={grado.id} onChange={e => { voiceReader.stop(); setParams({ grado: e.target.value }); }}>
        {grados.map(item => <option key={item.id} value={item.id}>{item.nombre}</option>)}
      </select></label>
      <label>Periodo<select className="lengua-select" value={periodo.numero} onChange={e => { voiceReader.stop(); setParams({ grado: grado.id, periodo: e.target.value }); }}>
        {grado.periodos.map(item => <option key={item.numero} value={item.numero}>{item.nombre}</option>)}
      </select></label>
    </div>
    <PracticaPeriodo key={grado.id + ':' + periodo.numero} grado={grado} periodo={periodo} />
    <details className="es-docente" open={Boolean(params.get('juego'))}>
      <summary>Más juegos · Práctica libre de mi grado</summary>
      <p className="my-3 text-sm text-slate-600">Estos juegos conservan sus propios bancos de ejercicios. Para repasar el periodo seleccionado, usa los retos de arriba.</p>
      <ArcadeDidactico key={grado.id + ':' + (params.get('juego') || '')} gradoNumero={grado.numero} juegoInicial={params.get('juego')} />
    </details>
  </div>;
}

function PracticaPeriodo({ grado, periodo }) {
  const [jugando, setJugando] = useState(false);
  const guias = periodo.unidades.flatMap(unidad => unidad.guias);
  // Una pregunta específica por guía: todas las guías del periodo están representadas.
  const retos = guias.map(guia => ({ ...getRetosTema(guia.id).at(-1), contexto: contenidoPlan[guia.id].lectura }));
  return <section className="space-y-3">
    {jugando ? <>
      <button className="lengua-nav-guia" onClick={() => { voiceReader.stop(); setJugando(false); }}>← Volver al repaso</button>
      <RondasJuego titulo={'Repaso · ' + periodo.nombre} gradoNumero={grado.numero} retos={retos}
        consigna={grado.numero <= 2 ? 'Escucha el ejemplo y toca tu respuesta.' : 'Lee o escucha el ejemplo y resuelve un reto de cada tema.'} />
    </> : <div className="lengua-panel space-y-3">
      <h2 className="text-xl font-bold">Retos de mi periodo</h2>
      <p>{guias.length} temas · Sin límite de tiempo · Con pistas y reintentos</p>
      <details><summary className="cursor-pointer">Ver los temas que voy a repasar</summary><ul className="list-disc pl-5 mt-2">{guias.map(guia => <li key={guia.id}>{guia.nombre}</li>)}</ul></details>
      <button className="lengua-nav-guia lengua-nav-guia-primary" onClick={() => setJugando(true)}>Empezar repaso →</button>
    </div>}
  </section>;
}
