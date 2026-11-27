import { useEffect, useRef } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { ArrowRight, BookOpen, Compass, Feather, Puzzle, Sparkles } from 'lucide-react';
import ModuloLeccion from '../components/ModuloLeccion';
import mallaData from '../data/mallaCurricularEspanol.json';
import contenidoPlan from '../data/contenidoPlan.json';
import { sounds } from '../utils/audio';

const iconosPeriodo = [Compass, BookOpen, Feather, Sparkles];

export default function GradoView() {
  const { gradoId } = useParams();
  const [params] = useSearchParams();
  const tituloRef = useRef(null);
  const grado = mallaData.grados[gradoId];
  const periodos = grado?.periodos.map((item) => ({ ...item, guias: item.unidades.flatMap((unidad) => unidad.guias) })) || [];
  const periodoGuia = periodos.find((item) => item.guias.some((guia) => guia.id === params.get('guia')));
  const periodo = periodoGuia || periodos.find((item) => String(item.numero) === params.get('periodo'));
  const guia = periodoGuia?.guias.find((item) => item.id === params.get('guia'));
  const base = '/espanol/grado/' + gradoId;
  const temas = periodos.flatMap((item) => item.guias);
  const indice = guia ? temas.findIndex((item) => item.id === guia.id) : -1;
  const siguiente = temas[indice + 1];
  const esInicial = grado?.numero <= 2;

  useEffect(() => {
    const frame = requestAnimationFrame(() => tituloRef.current?.focus({ preventScroll: true }));
    return () => cancelAnimationFrame(frame);
  }, [gradoId, params]);

  if (!grado) return <section className="lengua-panel"><h1>Grado no encontrado</h1><Link to="/espanol">Elegir un grado</Link></section>;

  return (
    <div className={'es-recorrido ' + (grado.numero <= 2 ? 'lengua-inicial' : grado.numero <= 5 ? 'lengua-primaria' : 'lengua-secundaria')}>
      <header className="es-encabezado">
        <p className="es-contexto">Español · {grado.nombre}{periodo ? ' · ' + periodo.nombre : ''}</p>
        <h1 ref={tituloRef} tabIndex={-1} className="outline-none">{guia ? guia.nombre || guia.titulo : periodo ? 'Elige un tema' : 'Elige un periodo'}</h1>
        <p>{guia ? (esInicial ? 'Escucha, juega y aprende paso a paso.' : 'Sigue las actividades de este tema a tu ritmo.') : periodo ? 'Abre una tarjeta para empezar a aprender.' : 'Entra al periodo que estás trabajando en clase.'}</p>
      </header>

      {!periodo && (
        <section className="es-periodos" aria-label="Periodos de Español">
          {periodos.map((item, index) => {
            const Icono = iconosPeriodo[index % iconosPeriodo.length];
            return <Link key={item.numero} className="es-periodo" data-periodo={item.numero}
              to={base + '?periodo=' + item.numero} onClick={() => sounds.playClick()}>
              <span className="es-icono"><Icono size={28} aria-hidden="true" /></span>
              <h2>{item.nombre}</h2>
              <p>{item.guias.length} temas para aprender</p>
              <span className="es-accion">Ver temas <ArrowRight size={18} aria-hidden="true" /></span>
            </Link>;
          })}
        </section>
      )}

      {periodo && !guia && (
        <section className="es-temas" aria-label="Temas del periodo">
          {periodo.guias.map((item) => {
            const jugando = Boolean(contenidoPlan[item.id]) && grado.numero <= 5;
            const Icono = jugando ? Puzzle : BookOpen;
            return <Link key={item.id} className="es-tema" to={base + '?guia=' + encodeURIComponent(item.id)} onClick={() => sounds.playClick()}>
              <span className="es-icono"><Icono size={25} aria-hidden="true" /></span>
              <p className="es-tipo-tema">{jugando ? 'Aprende jugando' : 'Lectura y práctica'}</p>
              <h2>{item.nombre || item.titulo}</h2>
              <span className="es-accion">{esInicial ? 'Vamos a aprender' : 'Abrir tema'} <ArrowRight size={18} aria-hidden="true" /></span>
            </Link>;
          })}
        </section>
      )}

      {guia && <section className="es-actividad" aria-label="Actividad del tema">
        <ModuloLeccion key={guia.id} guia={guia} gradoNombre={grado.nombre} gradoNumero={grado.numero}
          siguienteGuiaUrl={siguiente ? base + '?guia=' + encodeURIComponent(siguiente.id) : undefined} />
        <details className="es-docente">
          <summary>Para el docente · Contenidos del tema</summary>
          <p>Base curricular: {mallaData.fuenteCurricular}. Las explicaciones y los retos son adaptaciones didácticas.</p>
          <p>Referencia: tabla {contenidoPlan[guia.id]?.fuente.tabla}, fila {contenidoPlan[guia.id]?.fuente.fila}. {contenidoPlan[guia.id]?.fuente.guiaOriginal}</p>
          {mallaData.notasCurriculares?.[gradoId] && <p>{mallaData.notasCurriculares[gradoId]}</p>}
          <dl>{[['Componente', guia.componente], ['Contenidos', guia.contenidos], ['Estándar', guia.estandares], ['Aprendizaje esperado', guia.dba]].map(([nombre, valor]) =>
            <div key={nombre}><dt>{nombre}</dt><dd>{valor}</dd></div>)}</dl>
        </details>
      </section>}

      {!guia && <aside className="es-practica-libre">
        <div><h2>Repasa tu periodo</h2><p>Practica los temas del plan de área.</p></div>
        <Link className="lengua-nav-guia" to={'/espanol/juegos?grado=' + grado.numero + (periodo ? '&periodo=' + periodo.numero : '')}>Elegir práctica <ArrowRight size={18} aria-hidden="true" /></Link>
      </aside>}
    </div>
  );
}
