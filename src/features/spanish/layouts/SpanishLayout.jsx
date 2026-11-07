import { useState, useEffect } from 'react';
import { NavLink, Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import mallaData from '../data/mallaCurricularEspanol.json';
import { sounds } from '../utils/audio';
import { voiceReader } from '../utils/speech';
import { lanzarConfeti } from '../utils/confetti';
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

  useEffect(() => {
    if (location.hash === '#grados') {
      document.getElementById('grados')?.scrollIntoView();
    } else if (!location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

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
    <div className="spanish-area">
      <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-800 antialiased selection:bg-indigo-100 selection:text-indigo-900">
        
        {/* ══════════ HEADER PRINCIPAL ELEGANTE ══════════ */}
        <header className="relative z-40 lg:sticky lg:top-0 bg-white/95 backdrop-blur-xl border-b border-slate-200/80 shadow-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
            
            <div className="relative w-full order-last sm:order-none sm:flex-1 sm:max-w-sm"
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

            {/* Herramientas & Navegación */}
            <div className="flex items-center gap-2">
              
              <Link to={esPortada ? '/' : '/espanol#grados'} onClick={() => sounds.playClick()} className="lengua-volver-inicio">
                <span aria-hidden="true">←</span> {esPortada ? 'Regresar al inicio' : 'Volver a los grados'}
              </Link>

              {/* Voz Pedagógica */}
              <button
                onClick={toggleVoz}
                title={vozSilenciada ? "Voz silenciada (Click para activar)" : "Voz activa (Click para silenciar)"}
                className={`p-2 rounded-xl border font-bold text-xs flex items-center justify-center transition-all cursor-pointer ${
                  vozSilenciada
                    ? 'bg-rose-50 text-rose-600 border-rose-200'
                    : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                }`}
              >
                <span className="text-sm">{vozSilenciada ? '🔇' : '🔊'}</span>
              </button>

              {/* Pantalla Completa / Proyector */}
              <button
                onClick={togglePantallaCompleta}
                title={enPantallaCompleta ? "Salir de pantalla completa" : "Modo Proyector de Aula"}
                className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl border border-slate-200 transition-colors cursor-pointer"
              >
                <span className="text-sm">{enPantallaCompleta ? '🗗' : '🖥️'}</span>
              </button>
            </div>
          </div>

          <nav aria-label="Cambiar de grado" className="border-t border-slate-200 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-1.5 flex items-center gap-2 flex-wrap">
              <span className="text-sm font-semibold text-slate-600 hidden sm:inline">Grados</span>
              {grados.map((grado) => (
                <NavLink key={grado.id} to={`/espanol/grado/${grado.id}`} end
                  aria-label={grado.nombre}
                  onClick={() => sounds.playClick()}
                  className="lengua-nav-grado">
                  {grado.numero}.º
                </NavLink>
              ))}
            </div>
          </nav>
        </header>

        {/* ══════════ CONTENIDO PRINCIPAL ══════════ */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-4 sm:py-5">
          <Outlet />
        </main>

        {/* ══════════ PIE DE PÁGINA LIMPIO ══════════ */}
        <footer className="border-t border-slate-200 bg-white py-8 text-center text-xs text-slate-500 font-medium space-y-2 mt-auto">
          <div className="flex items-center justify-center gap-2 text-sm text-slate-800 font-bold">
            <span>📖✨</span>
            <span>Lengua Viva • Plataforma Interactiva de Lenguaje</span>
          </div>
          <p className="text-slate-400 max-w-lg mx-auto">
            Diseñada para grados 1° a 9° de básica rural y urbana • Fonética con voz para primero • Arcade didáctico • 100% Funcional sin Internet
          </p>
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

              <span className="text-5xl block">⭐👑⭐</span>
              <span className="text-[11px] font-black uppercase tracking-widest bg-amber-400 text-slate-950 px-3 py-1 rounded-full shadow-xs inline-block">
                ¡NUEVO RANGO DESBLOQUEADO!
              </span>
              <h3 className="text-2xl font-black text-white">
                {celebracionNivel.titulo}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {celebracionNivel.desc}
              </p>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  sounds.playClick();
                  setCelebracionNivel(null);
                }}
                className="w-full py-3.5 px-6 bg-[#3659d9] hover:bg-[#2845b5] text-white font-bold text-sm rounded-xl shadow-lg transition-all cursor-pointer"
              >
                ¡Aceptar y Continuar!
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
