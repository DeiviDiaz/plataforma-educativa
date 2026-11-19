import { useEffect, useRef } from 'react';
import { Link, useLocation, useParams, useSearchParams } from 'react-router-dom';
import ModuloLeccion from '../components/ModuloLeccion';
import mallaData from '../data/mallaCurricularEspanol.json';
import { sounds } from '../utils/audio';

export default function GradoView() {
  const { gradoId } = useParams();
  const [params, setParams] = useSearchParams();
  const location = useLocation();
  const tituloGuiaRef = useRef(null);
  const grado = Object.hasOwn(mallaData.grados, gradoId) ? mallaData.grados[gradoId] : mallaData.grados['1'];
  const periodos = grado.periodos.map((periodo) => ({
    ...periodo,
    guias: periodo.unidades.flatMap((unidad) => unidad.guias),
  }));
  const guias = periodos.flatMap((periodo) => periodo.guias);
  const guiaSolicitada = params.get('guia');
  const periodo = periodos.find((item) => item.guias.some((guia) => guia.id === guiaSolicitada)) || periodos[0];
  const guia = periodo.guias.find((item) => item.id === guiaSolicitada) || periodo.guias[0];
  const indice = guias.indexOf(guia);
  const anterior = guias[indice - 1];
  const siguiente = guias[indice + 1];
  const esInicial = grado.numero <= 2;
  const esPrimaria = grado.numero <= 5;
  const nivelVisual = esInicial ? 'lengua-inicial' : esPrimaria ? 'lengua-primaria' : 'lengua-secundaria';

  useEffect(() => {
    if (!location.state?.enfocarGuia) return;
    const frame = requestAnimationFrame(() => tituloGuiaRef.current?.focus());
    return () => cancelAnimationFrame(frame);
  }, [location]);

  function seleccionarGuia(id, abrirLectura = true) {
    sounds.playClick();
    setParams({ guia: id }, { preventScrollReset: true });
    if (abrirLectura) {
      requestAnimationFrame(() => tituloGuiaRef.current?.focus());
    }
  }

  return (
    <div className={`lengua-grado space-y-4 ${nivelVisual}`}>
      <header className="lengua-cabecera-grado">
        <h1>{grado.nombre}</h1>
        <Link to={'/espanol/juegos?' + new URLSearchParams({ grado: String(grado.numero), guia: guia.id })} className="lengua-nav-guia" onClick={() => sounds.playClick()}>
          Juegos del grado →
        </Link>
      </header>

      <div className="lengua-curso-grid">
        <aside className="lengua-ruta" aria-label="Elegir guía">
          <div>
            <label htmlFor="lengua-periodo">Periodo</label>
            <select id="lengua-periodo" className="lengua-select" value={periodo.numero}
              onChange={(event) => {
                const destino = periodos.find((item) => item.numero === Number(event.target.value));
                seleccionarGuia(destino.guias[0].id, false);
              }}>
              {periodos.map((item) => <option key={item.numero} value={item.numero}>{item.nombre}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="lengua-guia">Guía</label>
            <select id="lengua-guia" className="lengua-select" value={guia.id}
              onChange={(event) => seleccionarGuia(event.target.value, false)}>
              {periodo.guias.map((item) => <option key={item.id} value={item.id}>{item.nombre || item.titulo}</option>)}
            </select>
          </div>
        </aside>

        <section className="min-w-0 space-y-4" aria-labelledby="lengua-guia-titulo">
          <header className="lengua-titulo-actividad">
            <p className="text-sm font-semibold text-slate-600">{esInicial ? periodo.nombre : `${periodo.nombre} · Guía ${indice + 1} de ${guias.length} del grado`}</p>
            <h2 id="lengua-guia-titulo" ref={tituloGuiaRef} tabIndex={-1} className="lengua-guia-titulo">
              {guia.nombre || guia.titulo}
            </h2>
          </header>

          <ModuloLeccion key={guia.id} guia={guia} gradoNombre={grado.nombre} gradoNumero={grado.numero}
            onSiguienteGuia={siguiente ? () => seleccionarGuia(siguiente.id) : undefined} />

          <nav className="lengua-panel flex flex-wrap gap-3 justify-between" aria-label="Guías anterior y siguiente">
            {anterior ? (
              <button type="button" className="lengua-nav-guia" onClick={() => seleccionarGuia(anterior.id)}>← Guía anterior</button>
            ) : grado.numero > 1 ? (
              <Link className="lengua-nav-guia" to={`/espanol/grado/${grado.numero - 1}`}>← Ir a {grado.numero - 1}.º</Link>
            ) : <span />}
            {siguiente ? (
              <button type="button" className="lengua-nav-guia lengua-nav-guia-primary" onClick={() => seleccionarGuia(siguiente.id)}>Siguiente guía →</button>
            ) : grado.numero < 9 ? (
              <Link className="lengua-nav-guia lengua-nav-guia-primary" to={`/espanol/grado/${grado.numero + 1}`}>Ir a {grado.numero + 1}.º →</Link>
            ) : (
              <Link className="lengua-nav-guia lengua-nav-guia-primary" to="/espanol">Volver a Español</Link>
            )}
          </nav>

          <details className="lengua-panel">
            <summary className="lengua-summary">Competencias y contenidos de la guía</summary>
            <dl className="grid gap-3 mt-4 sm:grid-cols-2">
              {[
                ['Componente', guia.componente],
                ['Contenidos', guia.contenidos],
                ['Estándar', guia.estandares],
                ['Derecho básico de aprendizaje', guia.dba],
              ].map(([nombre, valor]) => (
                <div key={nombre} className="rounded-xl bg-slate-50 p-3">
                  <dt className="font-bold text-sm">{nombre}</dt>
                  <dd className="text-sm text-slate-700 mt-1">{valor}</dd>
                </div>
              ))}
            </dl>
          </details>
        </section>
      </div>
    </div>
  );
}
