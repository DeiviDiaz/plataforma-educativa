import { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import mallaData from '../data/mallaCurricularEspanol.json';
import { sounds } from '../utils/audio';
import { voiceReader } from '../utils/speech';
import { lanzarConfeti } from '../utils/confetti';
import bandera from '../../../assets/bandera.webp';
import '../spanish.css';

const grados = Object.values(mallaData.grados);
const normalizarBusqueda = (texto) => texto.toLocaleLowerCase('es').normalize('NFD').replace(/[\u0300-\u036f]/g, '');

const indiceGuias = grados.flatMap((grado) => grado.periodos.flatMap((periodo) =>
  periodo.unidades.flatMap((unidad) => unidad.guias.map((guia) => {
    const titulo = guia.nombre || guia.titulo;
    return {
      gradoId: grado.id,
      gradoNombre: grado.nombre,
      guiaId: guia.id,
      titulo,
      texto: normalizarBusqueda(`${grado.nombre} ${titulo} ${guia.contenidos || ''} ${guia.leccion?.lectura || ''}`),
    };
  }))
));

export default function SpanishLayout() {
  const [enPantallaCompleta, setEnPantallaCompleta] = useState(false);
  const [busqueda, setBusqueda] = useState('');
  const [buscadorAbierto, setBuscadorAbierto] = useState(false);
  const [celebracionNivel, setCelebracionNivel] = useState(null);
  const [vozSilenciada, setVozSilenciada] = useState(() => voiceReader.isMuted());
  const navigate = useNavigate();
  const location = useLocation();
  const esPortada = location.pathname.replace(/\/$/, '') === '/espanol';
  const parametros = new URLSearchParams(location.search);
  const gradoId = location.pathname.split('/')[3];
  const gradoActual = mallaData.grados[gradoId];
  const guiaActual = parametros.get('guia');
  const periodoActual = gradoActual?.periodos.find((item) => item.unidades.some((unidad) => unidad.guias.some((guia) => guia.id === guiaActual)));
  let regreso = { to: '/espanol', label: 'Volver a los grados' };
  if (esPortada) regreso = { to: '/', label: 'Volver al inicio' };
  else if (gradoActual && periodoActual) regreso = { to: '/espanol/grado/' + gradoId + '?periodo=' + periodoActual.numero, label: 'Volver a los temas' };
  else if (gradoActual && parametros.has('periodo')) regreso = { to: '/espanol/grado/' + gradoId, label: 'Volver a los periodos' };
  else if (location.pathname.endsWith('/juegos')) regreso = {
    to: '/espanol/grado/' + (parametros.get('grado') || '1') + (guiaActual ? '?guia=' + encodeURIComponent(guiaActual) : parametros.has('periodo') ? '?periodo=' + encodeURIComponent(parametros.get('periodo')) : ''),
    label: guiaActual ? 'Volver al tema' : parametros.has('periodo') ? 'Volver a los temas' : 'Volver a los periodos',
  };


  useEffect(() => {
    if (location.hash === '#grados') {
      document.getElementById('grados')?.scrollIntoView();
    } else if (!location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.search, location.hash]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setEnPantallaCompleta(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    const handleProgresoActualizado = (e) => {
      const data = e.detail || {};

      if (data.subioDeNivel && data.rangoNuevo) {
        sounds.playLevelUp();
        lanzarConfeti();
        setCelebracionNivel(data.rangoNuevo);
        voiceReader.speak(`¡Felicitaciones! Has subido de nivel. Tu nuevo rango es: ${data.rangoNuevo.titulo}.`);
      }
    };

    window.addEventListener('lengua_viva_progreso_actualizado', handleProgresoActualizado);

    const handleVozCambiada = (e) => {
      if (e.detail) setVozSilenciada(e.detail.muted);
    };
    window.addEventListener('lengua_viva_voz_estado_cambiado', handleVozCambiada);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      window.removeEventListener('lengua_viva_progreso_actualizado', handleProgresoActualizado);
      window.removeEventListener('lengua_viva_voz_estado_cambiado', handleVozCambiada);
    };
  }, []);

  const togglePantallaCompleta = () => {
    sounds.playClick();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  };

  const toggleVoz = () => {
    sounds.playClick();
    const mut = voiceReader.toggleMute();
    setVozSilenciada(mut);
    if (!mut) {
      voiceReader.speak("Voz pedagógica activada.");
    }
  };

  const consulta = normalizarBusqueda(busqueda.trim());
  const resultados = consulta.length >= 2
    ? indiceGuias.filter((guia) => guia.texto.includes(consulta)).slice(0, 6)
    : [];

  const seleccionarResultado = (resultado) => {
    sounds.playClick();
    setBusqueda('');
    setBuscadorAbierto(false);
    navigate(`/espanol/grado/${resultado.gradoId}?guia=${encodeURIComponent(resultado.guiaId)}`, {
      state: { enfocarGuia: true },
    });
  };

  return (
    <div className={esPortada ? "spanish-area" : "spanish-area lengua-interior"}>
      <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-800 antialiased selection:bg-indigo-100 selection:text-indigo-900">
        
        {/* ══════════ HEADER PRINCIPAL ELEGANTE ══════════ */}
        <header className="es-barra-superior">
          <div className="es-barra-interior">
            <Link to={regreso.to} className="es-regresar" onClick={() => { sounds.playClick(); voiceReader.stop(); }}>← {regreso.label}</Link>
            <div className="es-controles">
              <label className="sr-only" htmlFor="es-cambiar-grado">Cambiar grado</label>
              <select id="es-cambiar-grado" className="es-selector-grado" value={gradoActual?.id || ''} onChange={(event) => {
                if (event.target.value) { voiceReader.stop(); navigate('/espanol/grado/' + event.target.value); }
              }}>
                <option value="" disabled>Cambiar grado</option>
                {grados.map((grado) => <option key={grado.id} value={grado.id}>{grado.nombre}</option>)}
              </select>
              <details key={location.key} className="es-buscador">
                <summary>Buscar tema</summary>
            <div className="es-buscador-contenido"
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) setBuscadorAbierto(false);
              }}
              onKeyDown={(event) => {
                if (event.key === 'Escape') {
                  event.currentTarget.querySelector('input').focus();
                  setBuscadorAbierto(false);
                }
              }}>
              <form onSubmit={(event) => {
                event.preventDefault();
                if (resultados.length) seleccionarResultado(resultados[0]);
              }}>
                <label htmlFor="lengua-busqueda" className="sr-only">Buscar una guía de Español</label>
                <input id="lengua-busqueda" type="search" value={busqueda}
                  onFocus={() => setBuscadorAbierto(true)}
                  onChange={(event) => {
                    setBusqueda(event.target.value);
                    setBuscadorAbierto(true);
                  }}
                  placeholder="Buscar una guía o un tema"
                  className="lengua-select w-full" />
              </form>
              {buscadorAbierto && consulta.length >= 2 && (
                <div className="absolute top-full mt-1 left-0 w-full bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden z-50">
                  <p role="status" className="px-3 py-2 bg-slate-50 text-sm text-slate-600">
                    {resultados.length ? 'Guías sugeridas' : 'No encontramos guías para esa búsqueda.'}
                  </p>
                  {resultados.map((resultado) => (
                    <button key={resultado.guiaId} type="button" onClick={() => seleccionarResultado(resultado)}
                      className="w-full text-left p-3 hover:bg-indigo-50 border-t border-slate-100">
                      <span className="block text-xs text-indigo-700">{resultado.gradoNombre}</span>
                      <span className="font-semibold text-sm">{resultado.titulo}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

              </details>
              <button type="button" onClick={toggleVoz} aria-label={vozSilenciada ? 'Activar voz' : 'Silenciar voz'} title={vozSilenciada ? 'Activar voz' : 'Silenciar voz'}>{vozSilenciada ? '🔇' : '🔊'}</button>
              <button type="button" onClick={togglePantallaCompleta} aria-label={enPantallaCompleta ? 'Salir de pantalla completa' : 'Pantalla completa'} title="Pantalla completa">{enPantallaCompleta ? '🗗' : '⛶'}</button>
            </div>
          </div>
        </header>

        {/* ══════════ CONTENIDO PRINCIPAL ══════════ */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-4 sm:py-5">
          <Outlet />
        </main>

        {/* ══════════ PIE DE PÁGINA LIMPIO ══════════ */}
        <footer className="institution-footer border-t border-slate-200 bg-white py-8 text-center text-xs text-slate-500 font-medium space-y-2 mt-auto">
          <div className="flex items-center justify-center gap-2 text-sm text-slate-800 font-bold">
            <span>📖✨</span>
            <span>Lengua Viva • Plataforma Interactiva de Lenguaje</span>
          </div>
          <p className="text-slate-400 max-w-lg mx-auto">
            Diseñada para grados 1° a 9° de básica rural y urbana • Fonética con voz para primero • Arcade didáctico • 100% Funcional sin Internet
          </p>
          <div className="institution-footer__identity">
            <img className="institution-footer__flag" src={bandera} alt="Bandera" />
            <p>© 2026 Centro Educativo Rural Caliyaco. Todos los derechos reservados.</p>
          </div>
        </footer>

        {/* ══════════ MODAL CELEBRACIÓN DE NIVEL ══════════ */}
        {celebracionNivel && (
          <div
            onClick={() => setCelebracionNivel(null)}
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in cursor-pointer select-none"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900 border border-amber-400/40 text-white rounded-3xl max-w-md w-full p-6 sm:p-8 text-center space-y-4 shadow-2xl relative cursor-default"
            >
              <button
                onClick={() => setCelebracionNivel(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold flex items-center justify-center text-sm cursor-pointer transition-colors"
                title="Cerrar"
              >
                ✕
              </button>

        {celebracionNivel && <aside className="es-aviso-logro" role="status">
          <span>✓ Nuevo logro · {celebracionNivel.titulo}</span>
          <button type="button" aria-label="Cerrar aviso de logro" onClick={() => setCelebracionNivel(null)}>×</button>
        </aside>}

      </div>
    </div>
  );
}
